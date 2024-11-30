const express = require('express');
const allRoutes = require('./src/app');
require('dotenv').config();
require('./src/db/config')
const path = require('path');
const cors = require('cors')

const app = express();



// middleware
app.use(cors())
app.use(express.json());
app.use('/web-files', express.static(path.join(__dirname,'src','uploads','product-category')));
app.use('/product-files', express.static(path.join(__dirname,'src','uploads','products')));
app.use('/web-filess', express.static(path.join(__dirname,'src','uploads','admin')));
app.use('/story-files', express.static(path.join(__dirname,'src','uploads','story')));
app.use('/slider-files', express.static(path.join(__dirname,'src','uploads','slider')));
app.use('/frank and oak files/products/',express.static(path.join(__dirname,'src','uploads','products')))




app.use('/api', allRoutes)


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})