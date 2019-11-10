const express = require('express');
const { resolve } = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(resolve(__dirname, 'public')));
// app.get('/', (request, response) => {
//     response.send('<h1>Hello NodeJS</h1>');
// });

app.get('/api/user', (request,response)=> {
    const user = {
        name: 'Jim Bob',
        email: 'jim@skadoodle.com',
        phone: '(509) 551-9599',
        username: 'theJimBob'
    }

    response.send(user);
});

app.listen(PORT, () => {
    console.log(`Server listening @ localhost:${PORT}`);
});
