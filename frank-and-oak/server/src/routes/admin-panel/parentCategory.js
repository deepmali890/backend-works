const express = require('express');
const multer = require('multer')
const { 
    createParentCategory, 
    readParentCategory,
    updateParentCategoryStatus,
    deleteParentCategory,
    multiDeleteCategory
} = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.use(multer().none())

parentCategoryRouter.post('/create-category', createParentCategory)
parentCategoryRouter.get('/read-category', readParentCategory)
parentCategoryRouter.put('/update-status/:_id', updateParentCategoryStatus)
parentCategoryRouter.put('/delete-category/:_id',deleteParentCategory)
parentCategoryRouter.put('/multi-deleteCategory',multiDeleteCategory)

module.exports = parentCategoryRouter;