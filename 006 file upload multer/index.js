const express = require ('express');
const multer = require ('multer')
const path = require('path')


const app = express();

const storage = multer.diskStorage({
    destination:(req, file, next)=>{
        next(null, './uploads')
    },
    filename:(req, file, next)=>{

        console.log(path.extname(file.originalname));
        next(null, Date.now() + Math.floor(Math.random() * 999) + path.extname(file.originalname));
    }
})
 


app.use(express.json())

// if form contains no file input
// const upload = multer();   
// app.post('/upload-file', upload.none() ,(req, res)=>{
//     console.log(req.body)
//     res.send("hello")
// })



// if form contains single  file input with single file
// const upload = multer({ storage: storage }).single('thumbnail')
// app.post('/upload_file',upload, (req, res)=>{
//     const Data = req.body

//     // for single file
//     if (req.file){
//         Data.thumbnail = req.file.filename
//     }
//     console.log(Data)
//     res.send("hello")
// })





// if form contains single  file input with multiple file
// const upload = multer({ storage: storage }).array('image', 10)
// app.post('/upload_file',upload, (req, res)=>{
//     const Data = req.body

//     // for multiple file

//     console.log(req.files)
//     if (req.files.length !== 0){
//         Data.image= req.files.map((file)=> file.filename)
//     }

    
//     console.log(Data)
//     res.send("hello")
// })


// if form contains multiple  file input 
const upload = multer({ storage: storage }).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'image', maxCount: 10 }
])

// if form contains multiple  file input 
// if form contains single  file input with multiple file

app.post('/upload_file',upload, (req, res)=>{
    const Data = req.body

    // for multiple file



   if(req.files){
    if(req.files.thumbnail) Data.thumbnail = req.files.thumbnail[0].filename;
    
    if(req.files.image) Data.iamge = req.files.image.map((file)=> file.filename)
    
   }
   
   console.log(req.files)

    
    console.log(Data)
    res.send("hello")
})




app.listen(1200, ()=>{
    console.log('Server is running on port 1200');
})

