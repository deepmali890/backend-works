const mongoose = require('mongoose')

const adminSchema= mongoose.Schema({
    name:String,
    facebook:String,
    instagram:String,
    youtube:String,
    twitter:String,
    logo:String,
    fevicon:String,
    footer_logo:String,
    password:String,
    email:String,
    thumbnail:String,
});

const Admin = mongoose.model("admins", adminSchema);

module.exports = Admin;