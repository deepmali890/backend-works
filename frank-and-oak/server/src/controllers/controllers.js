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
    activeParentCategory,
    PermanentdeleteParentCategory,
    allDeleteParentCategory
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

// size ///
const { createSize,
    readSize,
    updateSizeStatus,
    deletesize,
    deleteMultiSize,
    updateCategoryById,
    updateSizeCategory,
    deletedSizeCategory,
    restoresizeCategory,
    PermanentdeleteSize,
} = require("./admin-panel/sizecontrollers");


/// product category  ////
const { createProductCategory,
    readProductCategory,
    updateProductCategoryStatus,
    deleteProductCategory,
    updateProductCategory,
    productcategoryById,
    multiProductCategory,
    deletedProductCategory,
    restoreProductCategory,
    updateProductFeatur,
    activeProductCategory } = require("./admin-panel/productcontroller");


//// admin ///

const {
    registerAdmin,
    loginAdmin,
    updateAdmin,
    generateOtp,
    updateAdminEmail,
    forgetPassword,
    resetPassword,
    finalPassword
} = require("./admin-panel/adminControllers");

//// product ///
const {
    createProduct,
    readproduct,
    updateStatus,
    deleteProduct,
    updateProduct,
    productById,
    restoreProduct,
    deletedProduct,
    multiDeleteProduct
} = require("./admin-panel/product");
const { createStory, readStory, deleteStory, updateStoryStatus, storyById, updateStory, deletedStory, restoreStory, multiDeleteStory } = require("./admin-panel/story");
const { createSlider, readSlider, updateSliderStatus, deleteSlider, sliderById, updateSlider, multiDelete, deletedSlider, restoreSlider } = require("./admin-panel/slider");




// parent Category for website
const {
    activeParentCategoryWebsite
} = require("./website/parentCategoryControllers");
const { readProducByParentcategoryWeb, readProductWeb } = require("./website/productController");
const { createCart } = require("./website/cartController");


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
    updateAdminEmail,
    forgetPassword,
    resetPassword,
    finalPassword,
    activeProductCategory,
    createProduct,
    readproduct,
    updateStatus,
    deleteProduct,
    productById,
    updateProduct,
    deletedProduct,
    restoreProduct,
    multiDeleteProduct,
    createStory,
    readStory,
    deleteStory,
    updateStoryStatus,
    storyById,
    updateStory,
    deletedStory,
    restoreStory,
    multiDeleteStory,
    createSlider,
    readSlider,
    updateSliderStatus,
    deleteSlider,
    sliderById,
    updateSlider,
    multiDelete,
    deletedSlider,
    restoreSlider,
    activeParentCategoryWebsite,
    readProducByParentcategoryWeb,
    PermanentdeleteParentCategory,
    // allDeleteParentCategory
    PermanentdeleteSize,
    createCart,
    readProductWeb

}