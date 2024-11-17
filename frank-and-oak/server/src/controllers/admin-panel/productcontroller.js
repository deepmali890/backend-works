const ProductCategory = require("../../models/productCategory");
const path = require('path');

const createProductCategory = async (req, res) => {
    try {
        const data = req.body;

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }

        const dataToSave = new ProductCategory(data)

        const response = dataToSave.save();

        console.log(data)
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        // if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' })
        res.status(500).json({ message: 'internal server error' })
    }
}

const readProductCategory = async (req, res) => {
    try {
        const data = await ProductCategory.find({ deleted_at: null }).populate('parent_category', 'name description')
        const filepath = `${req.protocol}://${req.get('host')}/web-files/`
        res.status(200).json({ message: 'success', data, filepath })


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
}

const updateProductCategoryStatus = async (req, res) => {
    try {
        const data = await ProductCategory.updateOne(
            req.params,
            {
                $set: {
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

const deleteProductCategory = async (req, res) => {
    try {
        const data = await ProductCategory.updateOne(
            req.params,
            {
                $set: {
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

const productcategoryById = async (req, res) => {
    try {
        const response = await ProductCategory.findOne(req.params)
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
}

const updateProductCategory = async (req, res) => {
    try {
        const response = await ProductCategory.updateOne(
            req.params,
            {
                $set: req.body
            }
        )
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' })
        res.status(500).json({ message: 'internal server error' })

    }
}

const multiProductCategory = async (req, res) => {
    try {
        const response = await ProductCategory.updateMany(
            { _id: { $in: req.body.ids } },
            {
                $set: {
                    deleted_at: Date.now()
                }
            }
        )
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
}

const deletedProductCategory = async (req, res) => {
    try {
        const response = await ProductCategory.find({ deleted_at: { $ne: null } })
        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
}

const restoreProductCategory = async (req, res) => {
    try {
        const response = await ProductCategory.updateOne(
            req.params,
            {
                $set: {
                    deleted_at: null
                }
            }
        )
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
}
const updateProductFeatur = async (req, res) => {
    try {
        const data = await ProductCategory.updateOne(
            req.params,
            {
                $set: {
                    featured: req.body.featured
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

const activeProductCategory = async (req, res) => {
    try {

        const data = await ProductCategory.find({parent_category:req.params.id, deleted_at:null, status:true})
        res.status(200).json({ message: 'success', data })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
}


module.exports = {
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
    activeProductCategory

} 