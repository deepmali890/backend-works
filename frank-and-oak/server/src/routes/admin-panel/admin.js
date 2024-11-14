const express = require("express");
const { loginAdmin, updateAdmin } = require("../../controllers/controllers");
const multer = require('multer');
const fileHandle = require("../../middlewares/multer");

const adminRouter = express.Router();

adminRouter.post('/login',multer().none(),loginAdmin)
adminRouter.put('/update-admin/:_id',fileHandle('admin'),updateAdmin )

module.exports= adminRouter;