const express=require("express")
const User=require("../models/User")
const jwt=require("jsonwebtoken")


const router=express.Router()

router.post("/register",async(req,res)=>{
    
    const {name,email,password}=req.body
    try {
        res.send(name,email,password)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
})


module.exports=router
