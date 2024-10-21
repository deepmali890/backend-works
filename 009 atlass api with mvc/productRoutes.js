const express = require('express');
const upload = require('./multer');
const {createProduct, readAllproducts, updateProducts, deleteProducts, } = require('./productControlls');

const productRoutes= express.Router();

productRoutes.post('/insert_data',upload('products'),createProduct)
productRoutes.get('/read_data',readAllproducts )
productRoutes.put('/update_data/:_id',upload('products'),updateProducts)
productRoutes.delete('/delete_data/:_id',deleteProducts)

module.exports= productRoutes