const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


const toDos = [
    {
        "title": "Dinner date with myself",
        "dueDate": "Yesterday"
    },
    {
        "title": "Wallow in Pit of Despair",
        "dueDate": "Now"
    },
    {
        "title": "Stare mindlesslly into space and think I've found the link in quantum physics between anti-gravitational matter and time, only to realize it ws a bad case of indigestion",
        "dueDate": "Already done.  A few times"
    },
    {
        "title": "Cry myself to sleep",
        "dueDate": "Everyday"
    },
];

app.get('/api/todos', (req,res)=>{
    res.send(toDos);
});

app.get('/api/todos/:id',(req,res)=>{
    const { id } = req.params;
    const index = id-1;
    // console.log('Getting specific id: ', index);
    // console.log(`ToDos List No. ${id}: ${toDos[index]}`);
    let message = `Unfortunately that to-do number isn't on the list - maybe you were more efficient than you thought?  Or...more likely you forgot to write it down?`

    if(toDos[index]){
        message = `ToDos List No. ${id}==> Due ${toDos[index].dueDate}: ${toDos[index].title}`;
    }
    
    res.send({
        message: message
    });
})

app.post('/api/todos',(req,res)=>{
    const { body } = req;
    const errors = [];
    console.log("Request Boday: ", body);

    if(!body.title){
        errors.push('Please add a title so you know what painful task you have to dread');
    }
    if(!body.dueDate){
        errors.push('Please add a dueDate so you can be sure you dont complete on time');
    }
    if(errors.length){
        res.status(422).send(errors);
        return;
    }

    toDos.push({
        title: body.title,
        dueDate: body.dueDate
    });

    res.send({
        message: `New to do item added: ${body.title}, to be due: ${body.dueDate}`
    });
});

app.delete('/api/todos/:id',(req,res)=>{
    const { id } = req.params;
    
});

app.patch('ap./todos/:id',(req,res))

app.listen(PORT, ()=>{
    console.log(`Server listening @ localhost:${PORT}`);
});