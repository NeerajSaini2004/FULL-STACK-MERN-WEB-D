const e = require('cors');
const http= require('http');
const Server=http.createServer((req, res) => {
    if(req.url == '/') {
        res.write('<h1>Welcome to the Home Page</h1>');
        
    }
    else if(req.url == '/about') {
        res.write('<h1>Welcome to the About Page</h1>');    
    }
    res.end();
});

Server.listen(5002);
console.log('the http Server is running on port 5002');
