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
        "dueDate": "Everytime you drink too much.  And the times inbetween as well."
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
    let message = `Unfortunately to-do number ${id} isn't on the list - maybe you were more efficient than you thought?  Or...more likely you forgot to write it down?`

    if(toDos[index]){
        message = `ToDos List No. ${id}==> Due: ${toDos[index].dueDate}. Task: ${toDos[index].title}`;
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
    const index = id-1;
    let message = `Unfortunately to-do number ${id} isn't on the list - maybe you were more efficient than you thought?  Or...more likely you forgot to write it down?`

    // if(!toDos[index]){     not needed if we simply check that the idnex exists below, rathher than doing a chec for legnth
    //     res.send({
    //         message: message
    //     });
    //     return;
    // }

    if(toDos[index]){
        const removed = toDos.splice(index,1);
        message = `Congratulations! to-do number ${id}, ${removed[0].title} has been completed. But you failed miserably and didn't make the due date of ${removed[0].dueDate}`
    }

    res.send({
        message: message
    })
    
});

app.patch('/api/todos/:id', (req,res)=>{
    const { id } = req.params;
    const { body } = req;
    const index = id-1;
    const item = toDos[index];
    const errors = [];
    console.log('item pre modification', item);
    console.log('body.dueDate: ', body.dueDate, ', body.title: ', body.title)
    
    if(!body.title && !body.dueDate){
        errors.push('Well this was a useless request - you didn\'t change anything on the list.');
    }
    if(!toDos[index]){
        errors.push(`Unfortunately to-do number ${id} isn't on the list - maybe you were more efficient than you thought?  Or...more likely you forgot to write it down?`)
    }


    if(errors.length){
        res.status(422).send(errors);
        return
    }

    if(body.title){
        item.title = body.title
    }
    if(body.dueDate){
        item.dueDate = body.dueDate
    }
    console.log('testing to see if updated item', item);
    
    console.log(`this will be a patch with id ${id}; and body: `, body);

    res.send({
        message: `You have updated To-Do item no. ${id} to read Title: ${item.title}, Due Date: ${item.dueDate}`
    });
    
});

app.listen(PORT, ()=>{
    console.log(`Server listening @ localhost:${PORT}`);
});