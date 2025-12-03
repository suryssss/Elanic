const express=require("express")
const User=require("../models/User")
const router=express.Router()
const {protect,admin}=require("../middleware/authMiddleWare")

router.get("/",protect,admin,async(req,res)=>{
    try {
        const users= await User.findOne({})
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to fetch users"})
    }
})


router.post("/",protect,admin,async(req,res)=>{
    const {name,email,password,role}=req.body
    try {
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        user=new User({name,
            email,
            password,
            role:role||"customer",
        })
        await user.save()
        res.status(201).json({message:"User created successfully",user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to create user"})
    }
})


router.put("/:id", protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        const updatedUser = await user.save(); 
        res.status(200).json({
            message: "User updated successfully",
            updatedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update user" });
    }
});


router.delete("/:id",protect,admin,async(req,res)=>{
    try {
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({message:"User deleted successfully",user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to delete user"})
    }
})


module.exports=router
