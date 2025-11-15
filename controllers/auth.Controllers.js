require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const {name, email, password, role } = req.body;
        if (!name || !password || !email) {
            return res.status(400).json({
                message: "Something is missing",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const exists = await User.findOne({
            email: email
        });
        if (exists) {
            return res.status(409).json({
                "message": "User already registered"
            })
        }
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role : role
        })
        return res.status(200).json({
            "message": "Successfully registered",
            "user_id": user._id
        })
    }catch(err){
        return res.status(400).json({
            "message:":"Something went wrong"
        })
    }
}
exports.login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Missing fields"
            })
        }
        const user  = await User.findOne({email:email});
        if(!user){
            return res.status(200).json({
                "message":"user not registered"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                "message":"Unauthorized access"
            })
        }
        const jwtToken = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
        return res.status(200).json({
            "message":"Successfully logged in",
            "jwtToken":jwtToken
        })
    }catch(err){
        return res.status(500).json({
            "message":"Something went wrong while signin"
        })
    }

}