const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});
require('./db/conn');
// const User = require('./model/userSchema.js');

app.use(express.json());

// we link the router files to make our route easy
app.use(require('./router/auth'));

// made using atlas

const PORT = process.env.PORT;



// Middleware
const Middleware = (req,res,next) =>{
    console.log('hello my middleware');
    next();
}



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