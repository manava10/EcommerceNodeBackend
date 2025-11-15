const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    items:[{
        productId:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        price:Number,
        quantity:Number
    }],
    totalPrice:Number,
    status:{
        type:String,
        enum:["NOT DELIVERED","Delivered"],
        default:"NOT DELIVERED"
    }
},{timestamps:true})

module.exports = mongoose.model('Order',OrderSchema);