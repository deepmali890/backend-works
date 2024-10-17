const express = require('express');
const productRoutes = require('./productRoutes');
require('./config')
const path = require('path')


const app = express();
app.use(express.json())

app.use('/web-files', express.static('./uploads/products'))

app.use('/product', productRoutes)



app.listen(1400, ()=>{
    console.log('server is running on port 1400')
})