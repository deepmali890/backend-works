const express = require("express")
const { 
    register,
    login,
    logOut
 } = require("../controllers/userControllers")

const userRouter= express.Router()

userRouter.post('/register',register)
userRouter.post('/login', login)
userRouter.post('/logOut', logOut)

module.exports= userRouter