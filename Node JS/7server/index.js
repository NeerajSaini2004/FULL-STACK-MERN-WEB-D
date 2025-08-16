const http=require('http');
const port = 5009;
const hostname = 'localhost';

const Server=http.createServer((req, res) => {
    // res.statusCode=200; // Set the response status code
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('node server created by neeraj saini');
//   res.statusCode = 500; // Set the response status code
//     res.setHeader('Content-Type', 'application/json'); 
//     res.end(JSON.stringify({ error:"sever error!"}));


//home page
//about page
//contact page
//prducts page
//rest....>error
    if(req.url == '/') {
        res.statusCode = 200; // Set the response status code
        res.setHeader('Content-Type', 'text/plain');
       
        res.end('welcome to node js server by neeraj saini'); // End the response
        
    }
    else if(req.url == '/about') {
        res.statusCode = 200; // Set the response status code
        res.setHeader('Content-Type', 'text/plain');
       
        res.end('about page'); // End the response   
    }
    else if(req.url == '/contact') {
        res.statusCode = 200; // Set the response status code
        res.setHeader('Content-Type', 'text/plain');
       
        res.end('contact page'); // End the response
    }
    else if(req.url == '/products') {

        const options = {
            hostname: 'fakestoreapi.com',
            path: '/products/1',
            method: 'GET'
        }
        
        const apiReq=http.request(options, (apiRes) => {
            apiRes.on("data", (data) => {
                 res.statusCode = 200; // Set the response status code
        res.setHeader('Content-Type', 'application/json');
       
        res.end(data.tostring()); // End the response
            })
            
        });
        apiReq.on("error", () => {
            console.log(e);
        });
        apiReq.end();

       
    }
    else {
        res.statusCode = 404; // Not Found
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found!'); 
        
    }

  
});

Server.listen(port, ()=>{
    console.log(`the http Server is running on port ${port} at ${hostname}`);
});