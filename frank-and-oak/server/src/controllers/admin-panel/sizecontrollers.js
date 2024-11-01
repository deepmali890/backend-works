const addSize = require("../../models/size");

const createSize= async (req,res)=>{
    try{
        const data = new addSize(req.body);
        const response= await data.save();
        res.status(200).json({ message: 'success', data:response})

    }
    catch(error){
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' })
        res.status(500).json({ message: 'internal server error' })
    }
}

const readSize = async (req,res)=>{
    try{
        const data = await addSize.find({ deleted_at: null });
        res.status(200).json({ message: 'success', data})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
        }
};

const updateSizeStatus= async (req,res)=>{
    try{
        const data = await addSize.updateOne(
            req.params,
            {
                $set:{
                    status: req.body.status
                }
            }
        )
        res.status(200).json({ message: 'success', data })
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
        }
}

module.exports= {
    createSize,
    readSize,
    updateSizeStatus
}