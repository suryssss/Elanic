const express=require("express")
const router=express.Router()
const Order=require("../models/Order")
const {protect,admin}=require("../middleware/authMiddleWare")

router.get("/",protect,admin,async(req,res)=>{
    try {
        const orders=await Order.find({})
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to fetch orders"})
    }
})

router.put("/:id",protect,admin,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id)
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }
        order.status=req.body.status || order.status
        order.isDelivered=
        req.body.status==="Delivered"? true :order.isDelivered;
        order.deliveredAt=
        req.body.status==="Delivered"? Date.now() : order.deliveredAt;
        const updatedOrder=await order.save()
        res.json(updatedOrder)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to update order"})
    }
})

router.delete("/:id",protect,admin,async(req,res)=>{
    try {
        const order=await Order.findByIdAndDelete(req.params.id)
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }
        res.json({message:"Order deleted successfully",order})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to delete order"})
    }
})


module.exports=router