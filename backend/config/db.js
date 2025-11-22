const mongoose=require("mongoose")

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports=connectDB
