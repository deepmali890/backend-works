const mongoose = require ('mongoose');

const parentCategortSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:String,
    status:{
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
});

parentCategortSchema.pre('insertOne', function(){
    this.created_at = new Date();
});

parentCategortSchema.pre('save',function(){
    this.created_at = new Date();
});
 
const ParentCategory = mongoose.model('parent_category', parentCategortSchema)

module.exports = ParentCategory