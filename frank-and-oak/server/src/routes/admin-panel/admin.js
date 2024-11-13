const express = require("express");
const { loginAdmin } = require("../../controllers/controllers");
const multer = require('multer')

const adminRouter = express.Router();

adminRouter.post('/login',multer().none(),loginAdmin)

module.exports= adminRouter;