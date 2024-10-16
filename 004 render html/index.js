const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();



const filepath = path.join(__dirname, 'public');
app.use(express.static(filepath));

fs.writeFileSync(`${filepath}/gallery.html`, 'hello gallery');

app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.get('/home', (req, res)=>{
    res.sendFile(`${filepath}/home.html`)

})

app.get('/about', (req, res)=>{
    res.sendFile(`${filepath}/about.html`)
})

app.get('/contact', (req, res)=>{
    res.sendFile(`${filepath}/contact.html`)
})

app.get('/gallery', (req, res)=>{
    res.sendFile(`${filepath}/gallery.html`)
})

app.get('*', (req, res)=>{
    res.sendFile(`${filepath}/404.html`)
})


app.listen(2200, ()=>{
    console.log('Server is running on port 2200')
})