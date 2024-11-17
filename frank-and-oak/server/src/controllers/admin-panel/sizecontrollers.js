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
        const data = await addSize.find({ deleted_at: null,status:true });
        res.status(200).json({ message: 'success', data})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
        }
};

const updateSizeStatus = async (req, res) => {
    try {
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
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
}

const deletesize= async (req,res)=>{
    try{
        const data = await addSize.updateOne(
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

const deleteMultiSize=async (req,res)=>{
    try{
        const data = await addSize.updateMany(
            { _id: { $in: req.body.ids } },
            {
                $set:{
                    deleted_at: Date.now()
                }
            }
        )
        res.status(200).json({ message: 'success', data})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error'})

    }
}

const updateCategoryById= async (req,res)=>{
    try{
        const response = await addSize.findOne(req.params);
        res.status(200).json({ message: 'success', data:response})

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error'})

    }
}

const updateSizeCategory= async (req,res)=>{
    try{
        const response = await addSize.updateOne(
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
        res.status(500).json({ message: 'internal server error'})

    }

}

const deletedSizeCategory= async(req,res)=>{
    try{
        const response = await addSize.find({deleted_at: {$ne: null}})
        res.status(200).json({ message: 'success', data:response})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error'})

    }


}

const restoresizeCategory=async(req,res)=>{
   try{
    const response = await addSize.updateOne(
        req.params,
        {
            $set:{
                deleted_at:null
            }
        }
    );
    res.status(200).json({ message: 'success', data:response})
   }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error'})

    }
}


module.exports= {
    createSize,
    readSize,
    updateSizeStatus,
    deletesize,
    deleteMultiSize,
    updateCategoryById,
    updateSizeCategory,
    deletedSizeCategory,
    restoresizeCategory
}