const express = require('express');
const { createColor,
    Viewcolor,
    updateColorStatus,
    deletecolor,
    multicolordelete,
    colorCatById,
    updateColorCategory,
    deletedColorCategory,
    restorecolor
} = require('../../controllers/controllers');


const colorRouter = express.Router();

colorRouter.post('/create-color', createColor)
colorRouter.get('/viewColor', Viewcolor)
colorRouter.put('/update-status/:_id', updateColorStatus)
colorRouter.put('/delete-color/:_id', deletecolor)
colorRouter.put('/multi-coloredelete',multicolordelete)
colorRouter.get('/read-cat/:_id',colorCatById)
colorRouter.put('/update-cat/:_id', updateColorCategory)
colorRouter.get('/deleted-colorCategory', deletedColorCategory)
colorRouter.put('/restore-color/:_id',restorecolor)

module.exports = colorRouter;