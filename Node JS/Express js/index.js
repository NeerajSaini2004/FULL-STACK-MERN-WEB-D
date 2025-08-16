const express= require('express');

const app= express();

const port= 3000;
const hostname= 'localhost';

app.get('/', (req, res) => {
    res.send('Hello World!');   
});

app.get('/about', (req, res) => {
    res.send('about page Hello World!');   
});

app.get('/contact', (req, res) => {
    res.send('conatact page Hello World!');   
});

app.listen (port,()=>{
    console.log(`Server is running on ${hostname}:${port}`);
});