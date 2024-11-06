// +++ adnmin panel+++ //


// parent category controllres //

const { createParentCategory,
    readParentCategory,
    updateParentCategoryStatus,
    deleteParentCategory,
    multiDeleteCategory
} = require("./admin-panel/parentCategory");


// color category controllres //
const {
    createColor,
    Viewcolor,
    updateColorStatus,
    deletecolor,
    multicolordelete
} = require("./admin-panel/colorcontroolers");
const { createSize, readSize, updateSizeStatus, deletesize, deleteMultiSize,  } = require("./admin-panel/sizecontrollers");
module.exports = {
    createParentCategory,
    readParentCategory,
    updateParentCategoryStatus,
    createColor,
    Viewcolor,
    createSize,
    readSize,
    updateSizeStatus,
    updateColorStatus,
    deleteParentCategory,
    deletesize,
    deletecolor,
    multiDeleteCategory,
    multicolordelete,
    deleteMultiSize
}