const express = require('express');
const {
    createProduct,
    readproduct,
    updateStatus,
    deleteProduct,
    updateProduct,
    productById,
    restoreProduct,
    deletedProduct,
    multiDeleteProduct
} = require('../../controllers/controllers');
const fileHandle = require('../../middlewares/multer');


const productRouter = express.Router();

productRouter.post('/add-product', fileHandle('products'), createProduct)
productRouter.get('/read-product', readproduct)
productRouter.put('/update-status/:_id', updateStatus)
productRouter.put('/delete-product/:_id',deleteProduct)
productRouter.get('/read-products/:_id',productById)
productRouter.put('/update-product/:_id',updateProduct)
productRouter.get('/deleted-product', deletedProduct)
productRouter.put('/restore-category/:_id',restoreProduct)
productRouter.put('/multi-delete-product',multiDeleteProduct)


module.exports = productRouter;