const express = require('express');
const multer = require('multer')
const { 
    createParentCategory, 
    readParentCategory,
    updateParentCategoryStatus
} = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.use(multer().none())

parentCategoryRouter.post('/create-category', createParentCategory)
parentCategoryRouter.get('/read-category', readParentCategory)
parentCategoryRouter.put('/update-status/:_id', updateParentCategoryStatus)

module.exports = parentCategoryRouter;