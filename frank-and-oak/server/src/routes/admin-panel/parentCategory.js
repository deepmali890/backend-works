const express = require('express');
const multer = require('multer')
const { 
    createParentCategory, 
    readParentCategory,
    updateParentCategoryStatus,
    deleteParentCategory,
    multiDeleteCategory,
    parentCategoryById,
    updateParentCategory,
    deletedParentCategory,
    restoreParentCategory,
    activeParentCategory
} = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.use(multer().none())

parentCategoryRouter.post('/create-category', createParentCategory)
parentCategoryRouter.get('/read-category', readParentCategory)
parentCategoryRouter.put('/update-status/:_id', updateParentCategoryStatus)
parentCategoryRouter.put('/delete-category/:_id',deleteParentCategory)
parentCategoryRouter.put('/multi-deleteCategory',multiDeleteCategory)
parentCategoryRouter.get('/read-category/:_id', parentCategoryById)
parentCategoryRouter.put('/update-category/:_id', updateParentCategory)
parentCategoryRouter.get('/deleted-categories', deletedParentCategory)
parentCategoryRouter.put('/restore-category/:_id', restoreParentCategory)
parentCategoryRouter.get('/active-category', activeParentCategory)

module.exports = parentCategoryRouter;