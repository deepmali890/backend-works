const express = require('express');
const { createProductCategory,
    readProductCategory,
    updateProductCategoryStatus, 
    deleteProductCategory,
    updateProductCategory,
    productcategoryById,
    multiProductCategory,
    deletedProductCategory,
    restoreProductCategory,
    updateProductFeatur} = require('../../controllers/controllers');
const fileHandle = require('../../middlewares/multer');

const productCategoryRouter = express.Router();

productCategoryRouter.post('/create-category', fileHandle('product-category'), createProductCategory)
productCategoryRouter.get('/read-category', readProductCategory)
productCategoryRouter.put('/update-status/:_id', updateProductCategoryStatus)
productCategoryRouter.put('/delete-category/:_id', deleteProductCategory)
productCategoryRouter.get('/read_category/:_id', productcategoryById)
productCategoryRouter.put('/update-ProductCategory/:_id', updateProductCategory)
productCategoryRouter.put('/multidelete-product_category', multiProductCategory)
productCategoryRouter.get('/deleted-productCategory', deletedProductCategory)
productCategoryRouter.put('/restore-product-category/:_id', restoreProductCategory)
productCategoryRouter.put('/update-product-category-feature/:_id', updateProductFeatur)

module.exports = productCategoryRouter;