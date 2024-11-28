const Product = require("../../models/product");

const readProducByParentcategoryWeb = async (req, res) => {
    try {
        const data = await Product.find({parent_category:req.params.id, deleted_at:null, status:true})
        .populate('parent_category')
        .populate('product_category')
        .populate('sizes')
        .populate('colors')

         const filepath = `${req.protocol}://${req.get('host')}/frank and oak files/products/`
         res.status(200).json({ message: 'success', data, filepath })
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
}

module.exports={
    readProducByParentcategoryWeb
}