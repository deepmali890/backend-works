const express = require('express');
const upload = require('./multer');
const {createProduct, readAllproducts,} = require('./productControlls');

const productRoutes= express.Router();

productRoutes.post('/insert_data',upload('products'),createProduct)
productRoutes.get('/read_data',readAllproducts )

module.exports= productRoutes