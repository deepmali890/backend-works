const mongoose = require("mongoose")

const expenseSchema = mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
},{timestamps:true})
 
const Expense = mongoose.model("Expense",expenseSchema)