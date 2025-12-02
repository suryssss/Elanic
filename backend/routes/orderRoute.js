const express=require("express")
const Order=require("../models/Order")
const {protect}=require("../middleware/authMiddleWare")


const router=express.Router()

router.get("/my-orders",protect,async(req,res)=>{
    try {
        const order=await Order.find({user:req.user._id}).sort({
            createdAt:-1
        })
        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to fetch orders"})
    }
})


router.get("/:id",protect,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if(!order) return res.status(404).json({message:"Order not found"})
        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to fetch order"})
    }
})


module.exports=router