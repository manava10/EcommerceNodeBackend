const adminFunction = (req, res) =>{
    try{
        res.status(200).json({
            "message":"This is priviliged admin endpoint only admin can access it, Yeah , I have done it. "
        })
    }catch(err){
        res.status(500).json({
            "message":"Internal Server Error"
        })
    }

}
module.exports = {adminFunction};