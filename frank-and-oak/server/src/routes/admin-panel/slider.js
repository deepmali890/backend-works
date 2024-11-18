const express = require('express');
const { 
    createSlider,
    readSlider
 } = require('../../controllers/controllers');
const fileHandle = require('../../middlewares/multer');

const sliderRouter = express.Router();

sliderRouter.post('/create-slider',fileHandle('slider'),createSlider)
sliderRouter.get('/read-slider',readSlider)


module.exports = sliderRouter;