// +++ adnmin panel+++ //


// parent category controllres //

const { createParentCategory,
    readParentCategory,
    updateParentCategoryStatus
} = require("./admin-panel/parentCategory");


// color category controllres //
const {
    createColor,
    Viewcolor
} = require("./admin-panel/colorcontroolers");
const { createSize, readSize, updateSizeStatus } = require("./admin-panel/sizecontrollers");
module.exports = {
    createParentCategory,
    readParentCategory,
    updateParentCategoryStatus,
    createColor,
    Viewcolor,
    createSize,
    readSize,
    updateSizeStatus
}