const ProductSchema  = require('../models/product');
const createProduct = async (req, res) => {
    try{
        const {name, description, price , category , stock} = req.body;
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                "message": "Please enter all the details related to product"
            })
        }
        const product = await ProductSchema.create({
            name : name,
            description : description,
            price : price,
            category : category,
            stock : stock
        })
        return res.status(201).json({
            "message":"Product successfully registered",
            "id": product._id
        })
    }catch(err){
        return res.status(500).json({
            "message":"Product could not be registered"
        })
    }
}
const updateProduct = async (req,res) =>{
    try{
        const productId = req.params.id;
        const updatedProduct = await ProductSchema.findByIdAndUpdate(
            productId,
            {$set:req.body},
            {new :true, runValidators:true}
        );
        if(!updatedProduct){
            return res.status(404).json({
                "message"  : "Product not found"
            })
        }
        return res.status(200).json({
            "message":"Successfully updated",
            "New product":updatedProduct
        })
    }catch(err){
        return res.status(500).json({
            "message":"Server Error"
        })
    }
}
const deleteProduct = async(req, res) =>{
    try{
        const productId = req.params.id;
        const deletedProduct = await ProductSchema.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({
                "message":"Product not found"
            })
        }
        return res.status(200).json({
            "message":"Successfully deleted product"
        })
    }catch(err){
        return res.status(500).json({
            "message":"Server Error"
        })
    }
}
const allProducts = async(req, res) =>{
    try{
        const allProduct = await ProductSchema.find();
        return res.status(200).json({
            "message":"Successfully all product",
            "products":allProduct
        })
    }catch(err){
        return res.status(500).json({
            "message":"Server Error"
        })
    }
}
module.exports = {createProduct, updateProduct, deleteProduct, allProducts};