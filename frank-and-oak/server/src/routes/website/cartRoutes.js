const express = require('express');
const { createCart } = require('../../controllers/controllers');

const cartRouter= express.Router();

cartRouter.post('/create-cart', createCart)

module.exports={
    cartRouter
}