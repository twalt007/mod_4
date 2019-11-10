const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const PORT = process.env.PORT || 3001;
const jwtConfig = require('./config/jwt');
const db = require('./db');

// bcrypt functions
const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

const app = express();

app.use(express.json());

app.get('/api/to-dos', async (req, res) => {
    const [toDos] = await db.query('SELECT id, title, completed_at FROM to_dos');

    res.send({ toDos });
});

app.get('/api/to-dos/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(422).send('Invalid item ID received');
    }

    const [[item = null]] = await db.execute(
        'SELECT * FROM to_dos WHERE id=?',
        [id]
    );

    if (!item) {
        return res.status(404).send(`No item found with the ID: ${id}`);
    }

    res.send({ item });
});

app.post('/api/to-dos', async (req, res) => {
    const { title, details } = req.body;
    const errors = [];

    if (!title) {
        errors.push('No title received');
    }
    if (!details) {
        errors.push('No details received');
    }

    if (errors.length) {
        return res.status(422).send(errors);
    }

    const [result] = await db.execute(
        'INSERT INTO to_dos (title, details, created_at) VALUES (?, ?, CURRENT_TIME)',
        [title, details]
    );

    res.send({
        message: 'New to do item created',
        itemId: result.insertId
    });
});

app.delete('/api/to-dos/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(422).send('Invalid item ID received');
    }

    const [result] = await db.execute(
        'DELETE FROM to_dos WHERE id=?',
        [id]
    );

    let message = `Unable to delete, no item found with ID: ${id}`;

    if (result.affectedRows) {
        message = `Successfully deleted item with ID: ${id}`;
    } else {
        return res.status(404).send(`No item with ID: ${id}`);
    }

    res.send({
        message
    });
});

app.patch('/api/to-dos/:id', async (req, res) => {
    const { body, params: { id } } = req;
    const whiteList = ['title', 'details', 'completed'];
    const updateValues = [];
    let sql = 'UPDATE to_dos SET ';
    let didUpdate = false;
    let status = 422;

    if (!id || isNaN(id)) {
        return res.status(status).send('Invalid item ID received');
    }

    whiteList.forEach(col => {
        let update = body[col];

        if (update !== undefined) {
            didUpdate = true;
            if (updateValues.length) {
                sql += ', ';
            }
            if (col === 'completed') {
                col += '_at';
                if (update) {
                    sql += `${col}=CURRENT_TIME `;
                    return;
                }
                update = null;
            }
            sql += `${col}=? `;
            updateValues.push(update);
        }
    });

    const output = {
        message: `Unable to update item with ID: ${id}. No valid field data received.`,
        item: null
    };

    if (didUpdate) {
        sql += 'WHERE id=?';
        updateValues.push(id);

        const [result] = await db.execute(sql, updateValues);

        if (result.affectedRows) {
            status = 200;
            output.message = `Successfully updated item with ID: ${id}`

            const [[item]] = await db.execute('SELECT id, title, details, completed_at FROM to_dos WHERE id=?', [id]);

            output.item = item;
        } else {
            status = 404;
            output.message = `Unable to update item. No item found with ID: ${id}.`;
        }
    }

    res.status(status).send(output);
});

app.post('/auth/sign-in', async (req, res) => {
    const { email, password } = req.body;
    const errors = [];

    if (!email) {
        errors.push('No email address received');
    }
    if (!password) {
        errors.push('No password received');
    }

    if (errors.length) {
        return res.status(422).send(errors);
    }

    const [[user = null]] = await db.execute('SELECT name, id, password FROM users WHERE email=?', [email]);

    if(!user){
        return res.status(401).send('Invalid email and/or password');
    }

    const passMatch = await compare(password, user.password);

    if(!passMatch){
        return res.status(401).send('Invalid email and/or password');
    }

    const token = jwt.encode({id: user.id, ts: Date.now()}, jwtConfig.secret);

    res.send({
        name: user.name,
        token
    });
});

app.post('/auth/sign-up', async (req, res) => {
    const { email, name, password } = req.body;
    const errors = [];

    if (!email) {
        errors.push('No email address received');
    }
    if (!name) {
        errors.push('No name received');
    }
    if (!password) {
        errors.push('No password received');
    }

    if (errors.length) {
        return res.status(422).send(errors);
    }

    const [[existingUser = null]] = await db.execute('SELECT id FROM users WHERE email=?', [email]);

    if (existingUser) {
        return res.status(422).send('Email address already in use');
    }

    const salt = await genSalt(10);
    const passHash = await hash(password, salt);

    const [result] = await db.execute('INSERT INTO users (email, name, password) VALUES (?, ?, ?)', [email, name, passHash]);

    if (!result.affectedRows) {
        return res.status(500).send('Error creating new user account');
    }

    const token = jwt.encode({ id: user.id, ts: Date.now() }, jwtConfig.secret);

    res.send({
        message: 'New account created successfully',
        name,
        token
    });
});

app.listen(PORT, () => {
    console.log('Server Listening @ localhost:%d', PORT);
});

async function withAuth(req, res, next){
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).send('Not authorized');
    }
    
    const payload = jwt.decode(authorization, jwtConfig.secret);

    const [[user]] = await db.execute('SELECT * FROM users WHERE id=?', [payload.id]);

    if(!user){
        return res.status(401).send('Not authorized');
    }

    req.user = user;
    next();
}
