const { ifError } = require("assert");
const Product = require("./productModel");
const { param } = require("./productRoutes");
const fs = require('fs')

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


const updateProducts= async (req, res)=>{
   try{
      const ifProduct = await Product.findOne(req.params)
      if(!ifProduct) return res.status(500).json({message: 'Data Not Found'})

         console.log(ifProduct)
         const data = req.body

         if(req.files){
            if(req.files.thumbnail){
               data.thumbnail = req.files.thumbnail[0].filename;

               if(fs.existsSync(`./uploads/products/${ifProduct.thumbnail}`)){
                  fs.unlinkSync(`./uploads/products/${ifProduct.thumbnail}`)
               }
                
            }
            if(req.files.images) {
               data.images = req.files.images.map((image) => image.filename);
               
               ifProduct.images.map((img)=>{
                  if(fs.existsSync(`./uploads/products/${img}`)){
                     fs.unlinkSync(`./uploads/products/${img}`)
                  }
               })
              
            }

            
         }
      const response = await Product.updateOne(
         req.params,
         {
            $set: data
         }
      )
      res.status(200).json({meaasge: 'success', data:response})
   }
   catch(error){
      console.log(error)
      res.status(500).json({message: 'internal server error'})
   }
}

const deleteProducts= async (req, res)=>{
   try{
      const ifProduct = await Product.findOne(req.params)
      if(!ifProduct) return res.status(500).json({message: 'Data Not Found'})

         if(fs.existsSync(`./uploads/products/${ifProduct.thumbnail}`)){
            fs.unlinkSync(`./uploads/products/${ifProduct.thumbnail}`)
         }

         ifProduct.images.map((img)=>{
            if(fs.existsSync(`./uploads/products/${img}`)){
               fs.unlinkSync(`./uploads/products/${img}`)
            }
         })


      const response = await Product.deleteOne(req.params)
      res.status(200).json({meaasge: 'success', data:response})
   }
   catch(error){
      console.log(error)
      res.status(500).json({message: 'internal server error'})
   }
}
 
 module.exports={createProduct ,readAllproducts, updateProducts, deleteProducts}