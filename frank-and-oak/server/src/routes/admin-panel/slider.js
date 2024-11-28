const express = require('express');
const {
    createSlider,
    readSlider,
    updateSliderStatus,
    deleteSlider,
    sliderById,
    updateSlider,
    multiDelete,
    deletedSlider,
    restoreSlider
} = require('../../controllers/controllers');
const fileHandle = require('../../middlewares/multer');

const sliderRouter = express.Router();

sliderRouter.post('/create-slider', fileHandle('slider'), createSlider)
sliderRouter.get('/read-slider', readSlider)
sliderRouter.put('/update-slider-status/:_id', updateSliderStatus)
sliderRouter.put('/delete-slider/:_id', deleteSlider)
sliderRouter.get('/read-slider/:_id', sliderById)
sliderRouter.put('/update-slider/:_id', updateSlider)
sliderRouter.put('/multi-delete', multiDelete)
sliderRouter.get('/deleted-slider', deletedSlider)
sliderRouter.put('/restore-slider/:_id',restoreSlider)


module.exports = sliderRouter;