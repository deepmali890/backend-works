const express = require('express')
const { readProducByParentcategoryWeb } = require('../../controllers/controllers')

const productRouterWeb = express.Router()

productRouterWeb.get('/products-by-parent-category/:id',readProducByParentcategoryWeb)

module.exports={
    productRouterWeb
}