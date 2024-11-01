const Addcolor = require('../../models/color')
const createColor = async (req,res)=>{
    try{

        const data = new Addcolor(req.body);

        const response = await data.save();

        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' })
        res.status(500).json({message:"internal server error"});
    }
}

const Viewcolor = async (req,res)=>{
    try{
        const data = await Addcolor.find({ deleted_at: null })
        res.status(200).json({ message: 'Success', data })
    }
    catch(error){
        console.log(error)
     
        res.status(500).json({message:"internal server error"});
    }
}

module.exports = {
    createColor,
    Viewcolor
}