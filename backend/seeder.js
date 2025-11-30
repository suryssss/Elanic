const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Product = require("./models/Product");
const User =require("./models/User")
const products = require("./data/product");

mongoose.connect(process.env.MONGODB_URL)


const seedUsers=async()=>{
    try {
        await Product.deleteMany()
        await User.deleteMany()
        
        const createdUser= await User.create({
            name:"Admin User",
            email:"admin@example.com",
            password:"1234567",
            role:"admin",
        })

        const UserId=createdUser._id
        const sampleProducts=products.map((product)=>{
            return {...product,user:UserId}
        })

        await Product.insertMany(sampleProducts)

        console.log("Product data seeded")
    } catch (error) {
        console.error("error in seeding",error)
        process.exit()
    }
}

seedUsers()