const mongoose = require ('mongoose')

const storySchema = mongoose.Schema({
    name:String,
    thumbnail:String,
    banner:String,
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
})

storySchema.pre('insertOne', function(){
    this.created_at = new Date();
});

storySchema.pre('save',function(){
    this.created_at = new Date();
});

const Story = mongoose.model('story',storySchema)

module.exports = Story;