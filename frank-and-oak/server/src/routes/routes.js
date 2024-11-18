const express = require('express');
const parentCategoryRouter = require('./admin-panel/parentCategory');
const colorRouter = require('./admin-panel/color');
const { sizeRouter } = require('./admin-panel/size');
const productCategoryRouter = require('./admin-panel/productsCategory');
const adminRouter = require('./admin-panel/admin');
const productRouter = require('./admin-panel/productroutes');
const storyRouter = require('./admin-panel/story');
// const { sizeRouter } = require('./admin-panel/size');

const adminPanelRouter = express.Router();
const websiteRouter = express.Router();
const appRouter = express.Router();

adminPanelRouter.use('/parent-category', parentCategoryRouter)
adminPanelRouter.use('/color', colorRouter)
adminPanelRouter.use('/size',sizeRouter)
adminPanelRouter.use('/product-category', productCategoryRouter)
adminPanelRouter.use('/admin',adminRouter)
adminPanelRouter.use('/products',productRouter)
adminPanelRouter.use('/story',storyRouter)

module.exports = {
    adminPanelRouter,
    websiteRouter,
    appRouter
    
}


