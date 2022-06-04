const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});
require('./db/conn');

// made using atlas

const PORT = process.env.PORT;



// Middleware
const Middleware = (req,res,next) =>{
    console.log('hello my middleware');
    next();
}


app.get('/',(req,res) =>{
    res.send('hello world from the server')
});

app.get('/about',Middleware,(req,res) =>{
    res.send('hello about world from the server')
})

app.get('/contact',(req,res) =>{
    res.send('hello contact world from the server');
})

app.get('/signin',(req,res) =>{
    res.send('hello login world from the server');
})

app.get('/signup',(req,res) =>{
    res.send('hello singin world from the server');
})

app.listen(PORT,() =>{
    console.log(`server is running at port ${PORT}`)
})