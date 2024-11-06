const express = require('express');
const { createColor,
    Viewcolor,
    updateColorStatus,
    deletecolor,
    multicolordelete
} = require('../../controllers/controllers');


const colorRouter = express.Router();

colorRouter.post('/create-color', createColor)
colorRouter.get('/viewColor', Viewcolor)
colorRouter.put('/update-status/:_id', updateColorStatus)
colorRouter.put('/delete-color/:_id', deletecolor)
colorRouter.put('/multi-coloredelete',multicolordelete)

module.exports = colorRouter;