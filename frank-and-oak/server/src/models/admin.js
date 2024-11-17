const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
    name: String,
    facebook: String,
    instagram: String,
    youtube: String,
    twitter: String,
    logo: String,
    fevicon: String,
    footer_logo: String,
    password: {
        type: String
    },
    email: String,
    thumbnail: String,
    token:
    {
        type: String,
        default: ""
    },
    verifytoken: {
        type: String
    }
});

const Admin = mongoose.model("admins", adminSchema);

module.exports = Admin;