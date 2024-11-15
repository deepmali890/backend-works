// +++ adnmin panel+++ //


// parent category controllres //

const { createParentCategory,
    readParentCategory,
    updateParentCategoryStatus,
    deleteParentCategory,
    multiDeleteCategory,
    parentCategoryById,
    updateParentCategory,
    deletedParentCategory,
    restoreParentCategory,
    activeParentCategory
} = require("./admin-panel/parentCategory");


// color category controllres //
const {
    createColor,
    Viewcolor,
    updateColorStatus,
    deletecolor,
    multicolordelete,
    colorCatById,
    updateColorCategory,
    deletedColorCategory,
    restorecolor
} = require("./admin-panel/colorcontroolers");


const { createSize,
    readSize,
    updateSizeStatus,
    deletesize,
    deleteMultiSize,
    updateCategoryById,
    updateSizeCategory,
    deletedSizeCategory,
    restoresizeCategory,
} = require("./admin-panel/sizecontrollers");
const { createProductCategory,
    readProductCategory,
    updateProductCategoryStatus,
    deleteProductCategory,
    updateProductCategory,
    productcategoryById,
    multiProductCategory,
    deletedProductCategory,
    restoreProductCategory,
    updateProductFeatur } = require("./admin-panel/productcontroller");
const { registerAdmin,
    loginAdmin,
    updateAdmin,
    generateOtp,
    updateAdminEmail
} = require("./admin-panel/adminControllers");


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
    deleteMultiSize,
    parentCategoryById,
    updateParentCategory,
    updateCategoryById,
    updateSizeCategory,
    colorCatById,
    updateColorCategory,
    deletedParentCategory,
    deletedSizeCategory,
    deletedColorCategory,
    restoreParentCategory,
    restorecolor,
    restoresizeCategory,
    activeParentCategory,
    createProductCategory,
    readProductCategory,
    updateProductCategoryStatus,
    deleteProductCategory,
    productcategoryById,
    updateProductCategory,
    multiProductCategory,
    deletedProductCategory,
    restoreProductCategory,
    updateProductFeatur,
    registerAdmin,
    loginAdmin,
    updateAdmin,
    generateOtp,
    updateAdminEmail
}