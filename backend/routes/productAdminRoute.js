const express=require("express")
const router=express.Router()
const Product=require("../models/Product")
const {protect,admin}=require("../middleware/authMiddleWare")

router.get("/",protect,admin,async(req,res)=>{
    try {
        const products=await Product.find({})
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to fetch products"})
    }
})


module.exports=router