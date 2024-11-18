const Product = require("../../models/product");

const createProduct = async (req, res) => {
    try {

        const data = req.body;

        if (typeof (data.sizes) === 'string') data.sizes = [data.sizes]
        if (typeof (data.colors) === 'string') data.colors = [data.colors]

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.animate_thumbnail) data.animate_thumbnail = req.files.animate_thumbnail[0].filename;


            if (req.files.gallery) data.gallery = req.files.gallery.map((img) => img.filename)
        }

        const dataToSave = new Product(data);
        const response = await dataToSave.save();

        res.status(200).json({ message: "Success", data: response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

const readproduct = async (req, res) => {
    try {
        const data = await Product.find({ deleted_at: null })
        const filepath = `${req.protocol}://${req.get('host')}/product-files/`
        res.status(200).json({ message: "Success", data, filepath });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateStatus = async (req, res) => {
    try {

        const data = await Product.updateOne(
            req.params,
            { $set: { status: req.body.status } },
        )
        res.status(200).json({ message: "success", data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const data = await Product.updateOne(
            req.params,
            { $set: { deleted_at: Date.now() } },
        )
        res.status(200).json({ message: "success", data })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

const productById = async (req, res) => {
    try {

        const response = await Product.findOne(req.params)
        res.status(200).json({ message: "success", data: response })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

const updateProduct = async (req, res) => {
    try {
        const response = await Product.updateOne(
            req.params,
            { $set: req.body },
        )
        res.status(200).json({ message: "success", data: response })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

const deletedProduct = async (req, res) => {
    try {
        const response = await Product.find({ deleted_at: { $ne: null } })
        res.status(200).json({ message: "success", data: response })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })

    }
}

const restoreProduct = async (req, res) => {
    try {
        const response = await Product.updateOne(
            req.params,
            {
                $set: {
                    deleted_at: null
                }
            }
        )
        res.status(200).json({ message: "success", data: response })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

const multiDeleteProduct = async (req, res) => {
    try {
        const data = await Product.updateMany(
            { _id: { $in: req.body.ids } },
            {
                $set:{
                    deleted_at: Date.now()
                }
            }
        )
        res.status(200).json({ message: "success", data })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })


    }
}

module.exports = {
    createProduct,
    readproduct,
    updateStatus,
    deleteProduct,
    updateProduct,
    productById,
    deletedProduct,
    restoreProduct,
    multiDeleteProduct
}