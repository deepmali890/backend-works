const {mongoose } = require("mongoose");

const sizeSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    ordar:String,
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

sizeSchema.pre('insertOne', function(){
    this.created_at = new Date();
});

sizeSchema.pre('save',function(){
    this.created_at = new Date();
});

const addSize= mongoose.model('add_size',sizeSchema);

module.exports = addSize;