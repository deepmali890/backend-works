const mongoose = require('mongoose')

const categorySchema= new mongoose.Schema({
    name: {type:String,required:true},
    thumbnail:String,
    description:String,
    parent_category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'parent_category'
    },
    status:{
        type:Boolean,
        default:true
    },
    slug:{
        type:String
    },
    featured:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
        default:null
    },
    deleted_at:Date,
    updated_at:{
        type:Date,
        default:Date.now
    }
})

categorySchema.pre('insertOne', function(){
    this.created_at = new Date();
});

categorySchema.pre('save',function(){
    this.created_at = new Date();
});

const ProductCategory= mongoose.model('product_categorys', categorySchema)

module.exports=ProductCategory;