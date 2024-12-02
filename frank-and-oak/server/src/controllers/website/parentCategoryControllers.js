const ParentCategory = require("../../models/parentCategory");
const ProductCategory = require("../../models/productCategory");

const activeParentCategoryWebsite= async(req,res)=>{
    try{
        const response = await ParentCategory.find({ deleted_at: null, status: true });

        const data = await Promise.all(
          response.map(async (category) => {
            const productcategories = await ProductCategory.find({ parent_category: category._id });
            // console.log(productcategories)
            // category.subCategory = productcategories;
            return {...category._doc, subCategory:productcategories};
          })
        );
        
        // console.log(data); 

        res.status(200).json({ message: 'success', data })
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }

}

module.exports={
    activeParentCategoryWebsite
}