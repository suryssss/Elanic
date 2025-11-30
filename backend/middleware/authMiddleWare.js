const jwt=require("jsonwebtoken")
const User=require("../models/User")



const protect=async(req,res,next)=>{
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token=req.headers.authorization.split(" ")[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)

            req.user=await User.findById(decoded.user.id).select("-password")
            next()
        } catch (error) {
            console.error("Token verification failed",error)
            res.status(401).json({message:"Unauthorized,token failed"})
        }
    }
    else{
        res.status(401).json({message:"Unauthorized,no token"})
    }
}

const admin=(req,res,next)=>{
    if (req.user && req.user.role==="admin"){
        next()
    }
    else{
        res.status(403).json({message:"not authorized as admin"})
    }
}

module.exports={protect,admin}