const express = require('express');

const app = express();// is a router and server ka bhi kam kmarta hai isliye isko poet dena hai




app.get('/greet', (req, res)=>{
    res.send("hello world")
})

app.get('/login', (req, res)=>{
    res.send("hello login page")
})


app.listen(5200, ()=>{
    console.log("server is running on port 5200");
})