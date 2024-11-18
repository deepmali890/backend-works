const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema({
    name: String,
    heading: String,
    sub_heading: String,
    thumbnail: String,
    status: {
        type: Boolean,
        default: true
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

sliderSchema.pre('insertOne', function(){
    this.created_at = new Date();
});

sliderSchema.pre('save',function(){
    this.created_at = new Date();
});

const Slider = mongoose.model('slider',sliderSchema)

module.exports = Slider;

