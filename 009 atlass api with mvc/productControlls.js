const Product = require("./productModel");

 const createProduct =async (req, res)=>{
    try{
     const data =req.body;
     // console.log(req.files);
 
     if (req.files){
         if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
         if(req.files.images) data.images = req.files.images.map((image) => image.filename);
     }
     
     const dataToSave= new Product(data)
 
     const response = await dataToSave.save();
 
 
 
     res.status(200).json({message: 'success', data : response})
    }
    catch(err){
     console.log(err)
     res.status(500).json({message: 'internal server errror'})
    }
 }

 const readAllproducts = async (req, res)=>{
    try{
         const data = await Product.find()
         const filepath= `${req.protocol}://${req.get('host')}/web-files/`

       const dummyArray =  data.map((product)=>{
            product.thumbnail = filepath +    product.thumbnail ;
            product.images= product.images.map((img)=> filepath + img)

            return product;

         })
      
         res.status(200).json({message: 'success' ,data : dummyArray, filepath})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'internal server errror'})
    }
 }
 module.exports={createProduct ,readAllproducts}