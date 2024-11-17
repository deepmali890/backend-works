const express = require("express");
const { loginAdmin, updateAdmin, generateOtp, updateAdminEmail, forgetPassword, resetPassword, finalPassword } = require("../../controllers/controllers");
const multer = require('multer');
const fileHandle = require("../../middlewares/multer");

const adminRouter = express.Router();
adminRouter.use(multer().none())

adminRouter.post('/login',loginAdmin)
adminRouter.put('/update-admin/:_id',fileHandle('admin'),updateAdmin )
adminRouter.post('/genrate-otp',generateOtp)
adminRouter.put('/update-email', updateAdminEmail)
adminRouter.post('/forget-password', forgetPassword)
adminRouter.post('/reset-password/:token', resetPassword)
adminRouter.post('/final-password/:id/:token',finalPassword)


module.exports= adminRouter;