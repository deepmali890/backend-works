const multer = require('multer')
const path = require('path')
const storage= (foldername)=> multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./src/uploads/${foldername}`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Math.floor(Math.random() * 999999) + path.extname(file.originalname));
    }
})

const fileHandle = (foldername)=> multer({storage:storage(foldername)}).fields([
    {
        name:'thumbnail',
        maxCount:1
    }
])

module.exports = fileHandle;
