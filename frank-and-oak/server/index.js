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
app.use('/web-filess', express.static(path.join(__dirname,'src','uploads','admin')));




app.use('/api', allRoutes)


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})