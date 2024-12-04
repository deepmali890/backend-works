const express = require('express')
const { readProducByParentcategoryWeb, readProductWeb } = require('../../controllers/controllers')

const productRouterWeb = express.Router()

productRouterWeb.get('/products-by-parent-category/:id',readProducByParentcategoryWeb)
productRouterWeb.get('/products',readProductWeb)

module.exports={
    productRouterWeb
}