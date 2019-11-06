// Build Static Webserver Here
const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((request,response)=> {
    console.log('Server received a request: ', request.url);
    let filePath = '.' + request.url;

    if(filePath === './'){
        filePath += 'index.html';
    }

    const ext = path.extname(filePath);

    console.log('File Extension: ', ext);

    const mimeTypes = {
        '.html': ''
    }

    console.log('File Path: ', filePath);
    fs.readFile(filePath, (error, data) => {
        response.end(data,'utf-8');
    })
});

server.listen(3000,()=>{
    console.log('Server is listening @ 127.0.01:3000')
});

