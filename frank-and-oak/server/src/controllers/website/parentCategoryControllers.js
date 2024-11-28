const ParentCategory = require("../../models/parentCategory");

const activeParentCategoryWebsite= async(req,res)=>{
    try{
        const response = await ParentCategory.find({deleted_at:null, status: true})
        res.status(200).json({ message: 'success', data:response })
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }

}

module.exports={
    activeParentCategoryWebsite
}