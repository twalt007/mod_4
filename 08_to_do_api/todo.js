const express = require('express');
const PORT = process.env.PORT || 3001;
const db = require('./db');

const app = express();

app.use(express.json());

app.get('/api/to-dos', async (req, res) => {
    
    res.send('Sends an array of to do items');
});

app.get('/api/to-dos/:id', async (req, res) => {
    // Receives an ID as a URL parameter

    res.send('Sends a single to do item based on the id url parameter received');
});

app.post('/api/to-dos', async (req, res) => {
    // Receives a 'title' and 'details' in the body

    res.send('Creates a new to do item and send back its id');
});

app.delete('/api/to-dos/:id', async (req, res) => {
    // Receives an ID as a URL parameter

    res.send('Deletes a single to do item based on the id received in the url');
});

app.patch('/api/to-dos/:id', async (req, res) => {
    // Receives an ID as a URL parameter
    // Receives 'title', 'details', or 'completed' in the body

    res.send('Updates a given to do item based on the id received from the url and the data received in the body. Sends back a message and the updated item.');
});

app.listen(PORT, () => {
    console.log('Server Listening @ localhost:%d', PORT);
});
