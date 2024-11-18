const express = require('express');
const { createStory, readStory, deleteStory, updateStoryStatus, storyById, updateStory, deletedStory, restoreStory, multiDeleteStory } = require('../../controllers/controllers');
const multer = require('multer');
const fileHandle = require('../../middlewares/multer');

const storyRouter= express.Router();

// storyRouter.use(multer().none())
storyRouter.post('/create-story', fileHandle('story'),createStory)
storyRouter.get('/read-story',readStory)
storyRouter.put('/delete-story/:_id',deleteStory)
storyRouter.put('/upadteStory-status/:_id',updateStoryStatus)
storyRouter.get('/read-story/:_id',storyById)
storyRouter.put('/update-story/:_id',updateStory)
storyRouter.get('/deleted-story',deletedStory)
storyRouter.put('/restore-story/:_id',restoreStory)
storyRouter.put('/multiDelete-story',multiDeleteStory)

module.exports= storyRouter;