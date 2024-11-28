const express = require('express');
const { activeParentCategoryWebsite } = require('../../controllers/controllers');

const parentCategoryRouters = express.Router();

parentCategoryRouters.get('/active-category',activeParentCategoryWebsite)

module.exports= {
    parentCategoryRouters
}