const express = require('express');
const { createSize,
     readSize,
      updateSizeStatus,
       deletesize, 
       deleteMultiSize
    } = require('../../controllers/controllers');
const multer = require('multer');

const sizeRouter = express.Router();


sizeRouter.use(multer().none())
sizeRouter.post('/create-size', createSize);
sizeRouter.get('/read-size', readSize)
sizeRouter.put('/update-status/:_id', updateSizeStatus)
sizeRouter.put('/delete-size/:_id',deletesize)
sizeRouter.put('/multi-sizeDelete', deleteMultiSize)


module.exports= {
    sizeRouter
}