exports.health = (req,res) =>{
    res.status(200).json({
        "message":"Health of the server is good"
        ,"messag1":"Every is good in the server"
    })
}