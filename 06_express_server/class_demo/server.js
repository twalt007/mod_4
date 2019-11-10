// Build demo express server here
const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));//this is the same as our .createServer  ==> and event emitter'
app.use(express.json());

const students = [
    {
        name: 'Jo Schmoe',
        course: 'Wilderness Survival',
        grade: 3
    },
    {
        name: 'Charlie Brown',
        course: 'Existential Crisis-ing',
        grade: 89
    },
    {
        name: 'Katherine of Padua',
        course: 'Cuckholding',
        grade: 50
    },
    {
        name: 'Bond, James',
        course: 'Generally dashing things, in the full sense of the word',
        grade: 99
    },
    {
        name: 'David - the Statue',
        course: 'posturing - nude',
        grade: 100
    }
];

app.get('/api/students',(req,res)=>{
    res.send(students);
});

app.delete('/api/students/:index',(req,res)=>{
    const { index } = req.params;
    console.log('Delete Student: ', index);
    let message = `Student at index ${index} does not exist on black list, not a valid target for disposal`;

    const removed = students.splice(index, 1);
    console.log("removed student: ", removed);

    if(removed.length){
        message = `Succuessfully disposed ${removed[0].name} from black list`;
    }

    res.send({
        message: message
    });
});

app.post('/api/students/',(req,res)=>{
    const { body } = req;
    const errors =[];

    console.log('Request Body: ',body);

    if (!body.name){
        errors.push('Missing student name');
    }
    if (!body.course){
        errors.push('Missing student course');
    }
    if (!body.grade){
        errors.push('Missing student grade');
    }

    if(errors.length){
        res.status(422).send(errors);
        return;
    }

    students.push({
        name: body.name,
        course: body.course,
        grade: body.grade
    })

    res.send({
        message: `${body.name} is added to the black list to be targeted for disposal.`
    });
});

app.listen(3000, ()=>{
    console.log('Server listening @ localhost:3000');
}); 