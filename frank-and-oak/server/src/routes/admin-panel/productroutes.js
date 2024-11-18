const express = require('express');
const {
    createProduct,
    readproduct,
    updateStatus,
    deleteProduct,
    updateProduct
} = require('../../controllers/controllers');
const fileHandle = require('../../middlewares/multer');


const productRouter = express.Router();

productRouter.post('/add-product', fileHandle('products'), createProduct)
productRouter.get('/read-product', readproduct)
productRouter.put('/update-status/:_id', updateStatus)
productRouter.put('/delete-product/:_id',deleteProduct)
productRouter.put('/update-product/:_id',updateProduct)


module.exports = productRouter;