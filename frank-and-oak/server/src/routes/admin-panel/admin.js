const express = require("express");
const { loginAdmin, updateAdmin, generateOtp, updateAdminEmail } = require("../../controllers/controllers");
const multer = require('multer');
const fileHandle = require("../../middlewares/multer");

const adminRouter = express.Router();

adminRouter.post('/login',multer().none(),loginAdmin)
adminRouter.put('/update-admin/:_id',fileHandle('admin'),updateAdmin )
adminRouter.post('/genrate-otp',generateOtp)
adminRouter.put('/update-email', updateAdminEmail)

module.exports= adminRouter;