const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name : {
        type: String
    },
    description : {
        type: String
    },
    price : {
        type: Number,
    }
    ,
    category:{
        type:String
    },
    stock :{
        type:Number
    }
},{timestamps:true})
module.exports = mongoose.model('Product',ProductSchema);