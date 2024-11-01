const express = require('express');
const { createSize, readSize, updateSizeStatus } = require('../../controllers/controllers');
const multer = require('multer');

const sizeRouter = express.Router();


sizeRouter.use(multer().none())
sizeRouter.post('/create-size', createSize);
sizeRouter.get('/read-size', readSize)
sizeRouter.put('update-status',updateSizeStatus)

module.exports= {
    sizeRouter
}