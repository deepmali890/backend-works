
const multer = require ('multer')
const path = require('path')



const storage =(foldername)=> multer.diskStorage({
    destination: (req, file, next) => {
        next(null, `./uploads/${foldername}`)
    },
    filename: (req, file, next) => {
        next(null, Date.now() + Math.floor(Math.random() * 999) + path.extname(file.originalname))
    }
})

const upload= (foldername)=> multer({storage : storage(foldername)}).fields([
    {name: 'thumbnail', maxCount: 1},
    {name: 'images', maxCount: 10}
])
 module.exports = upload