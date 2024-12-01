const express = require('express');
const { createSize,
    readSize,
    updateSizeStatus,
    deletesize,
    deleteMultiSize,
    updateCategoryById,
    updateSizeCategory,
    deletedSizeCategory,
    restoresizeCategory,
    PermanentdeleteSize,

} = require('../../controllers/controllers');
const multer = require('multer');

const sizeRouter = express.Router();


sizeRouter.use(multer().none())
sizeRouter.post('/create-size', createSize);
sizeRouter.get('/read-size', readSize)
sizeRouter.put('/update-status/:_id', updateSizeStatus)
sizeRouter.put('/delete-size/:_id', deletesize)
sizeRouter.put('/multi-sizeDelete', deleteMultiSize)
sizeRouter.get('/read-Cat/:_id', updateCategoryById)
sizeRouter.put('/update-Cat/:_id', updateSizeCategory)
sizeRouter.get('/deleted-seizeCategory', deletedSizeCategory)
sizeRouter.put('/restore-category/:_id', restoresizeCategory)
sizeRouter.delete('/delete-size/:_id', PermanentdeleteSize)


module.exports = {
    sizeRouter
}