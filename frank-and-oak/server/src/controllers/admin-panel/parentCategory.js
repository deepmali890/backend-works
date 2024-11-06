const ParentCategory = require("../../models/parentCategory");

const createParentCategory = async (req, res) => {
    try {
        console.log(req.body)

        const data = new ParentCategory(req.body)

        const response = await data.save();
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' })
        res.status(500).json({ message: 'internal server error' })
    }
};

const readParentCategory = async (req, res) => {
    try {
        const data = await ParentCategory.find({ deleted_at: null })
        res.status(200).json({ message: 'Success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
};

const updateParentCategoryStatus = async (req, res) => {
    try {
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set:{
                    status: req.body.status
                }
            }
        )
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
}

const deleteParentCategory = async (req,res)=>{
    try{
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set:{
                    deleted_at: Date.now()
                }
            }
        );
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
    
}

const multiDeleteCategory = async(req,res)=>{
    try{
        const data = await ParentCategory.updateMany(
            { _id: { $in: req.body.ids } },
                {
                    $set:{
                        deleted_at: Date.now()
                    }
                }
        )
        res.status(200).json({ message: 'success' ,data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
}

module.exports = {
    createParentCategory,
    readParentCategory,
    updateParentCategoryStatus,
    deleteParentCategory,
    multiDeleteCategory
}