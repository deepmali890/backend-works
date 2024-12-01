const Cart = require("../../models/cart");

const createCart = async(req,res)=>{
    try {

        const dataToSave = new Cart(req.body);
        const data = await dataToSave.save()
        res.status(200).json({message:"success", data})

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" });
        
    }
}

module.exports={
    createCart
}