const express = require('express');
const { createColor, Viewcolor } = require('../../controllers/controllers');


const colorRouter = express.Router();

colorRouter.post('/create-color', createColor)
colorRouter.get('/viewColor',Viewcolor )

module.exports= colorRouter;