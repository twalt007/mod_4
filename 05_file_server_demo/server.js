// Build Static Webserver Here
const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((request,response)=> {
    console.log('Server received a request: ', request.url);
    let filePath = '.' + request.url;

    if(filePath === './'){
        filePath += 'index.html';
    } else if(filePath === './api/user'){
        const user = {
            name: 'Kathy Smith',
            username: 'theRealKathy',
            email: 'kathy@example.com',
            phone: '(999)732-1114'
        }

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(user));
        return;
    }

    const ext = path.extname(filePath);

    console.log('File Extension: ', ext);

    const mimeTypes = {
        '.html': 'text/html',
        '.css':'text/css',
        '.png':'image/png',
        '.js':'text/javascript'
    }

    const type = mimeTypes[ext] || null;

    console.log('File MIME Type: ', type);

    console.log('File Path: ', filePath);
    fs.readFile(filePath, (error, data) => {
        console.log('Read File Error: ', error);
        if(error || !type){
            if(error.code === 'ENOENT'){
                fs.readFile('./404.html',(error,data)=>{
                    response.writeHead(404, {'Content-Type': 'text/html'});
                    response.end(data, 'utf-8');
                });
                return;
            };
            response.writeHead(500, 'Internal Server Error');
            response.end();
            return;
        }

        response.writeHead(200, {'Content-Type': type});
        response.end(data,'utf-8');
    })
});

server.listen(3000,()=>{
    console.log('Server is listening @ 127.0.01:3000')
});

