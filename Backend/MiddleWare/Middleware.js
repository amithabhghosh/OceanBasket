const jwt = require("jsonwebtoken")
require("dotenv").config()

const CustomerAuthentication = async (req,res,next)=>{
 try {
        const {token}=req.headers
         console.log("Incoming token:", token); 
        if(!token){
            return res.json({success:false,message:"Not Authorised"})
        }
        const token_decode=jwt.verify(token,"Hello!123")
        req.body.userId=token_decode.id
        next()
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

module.exports={CustomerAuthentication}