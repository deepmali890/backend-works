const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    images:{
        type:Object,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }

});

const Product = mongoose.model('products',productSchema );

module.exports = Product;