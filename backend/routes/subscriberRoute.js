const express=require("express")
const router = express.Router()
const Subscriber=require("../models/Subscriber")

router.post("/subscribe",async(req,res)=>{
    const {email}=req.body;
    if(!email) return res.status(400).json({message:"Email is required"})
    try {
        let subscriber=await Subscriber.findOne({email})
        if(subscriber) return res.status(400).json({message:"User already exists"})
        subscriber=new Subscriber({email})
        await subscriber.save()
        res.status(201).json({message:"Subscribed successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to create subscriber"})
    }
})

module.exports=router