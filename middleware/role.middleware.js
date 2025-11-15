const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config();
const adminRole = async (req, res, next) =>{
    try{
        const authToken = req.headers.authorization ;
        if(!authToken){
            return res.status(401).json({
                "message":"No token provided"
            })
        }
        const token = authToken.split(' ')[1];
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(payload.id).select('-password');
        if(!req.user){
            return res.status(401).json({
                "message":"Un authorized access token",
                "Note":"Access to this endpoint is not allowed"
            })
        }
        if( req.user.role !=='admin'){
            return res.status(401).json({
                "message ":"You do not have permission to access this route"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
           "message":"Server Error from middleware"
        })
    }
}
const userRole = async ( req, res, next)=>{
    //This middle ware will check , if the user is
    try{
        const authToken = req.headers.authorization;
        if(!authToken){
            return res.status(401).json({
                "message":"No token provided"
            })
        }
        const token = authToken.split(' ')[1];
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user =await User.findById(payload.id).select('-password');
        if(req.user.role !== 'user'){
            return res.status(401).json({
                "message":"Expired Token provide"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            "message":"Server Error from the user role middleware"
        })
    }
}
module.exports = {adminRole,userRole};