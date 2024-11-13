const mongoose = require('mongoose');
const { registerAdmin } = require('../controllers/controllers');

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}.${process.env.DB_CONFIG_CODE}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`;

mongoose.connect(url)
.then(()=>{
    console.log('connected to mongoDB');
    registerAdmin()
})
.catch((err)=>{
    console.log(err)
})