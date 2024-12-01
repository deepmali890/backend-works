const mongoose = require('mongoose')

const cartSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    product:{
           type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    color:{
           type:mongoose.Schema.Types.ObjectId,
        ref:'colors'
    },
    size:{
           type:mongoose.Schema.Types.ObjectId,
        ref:'sizes'
    },
    quantity:{
        type:Number,
        default:1
    },
    created_at:{
        type:Date
    },
    updated_at:{
        type:Date,
        default:Date.now
        }
})

cartSchema.pre('save', function(){
    this.updated_at = Date.now;
})


const Cart = mongoose.model('carts', cartSchema)
module.exports = Cart;

