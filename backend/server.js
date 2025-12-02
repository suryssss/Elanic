const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const connectDB=require("./config/db")

dotenv.config()

const userRoute=require("./routes/userRoute")
const productRoute=require("./routes/productRoute")
const cartRoute=require("./routes/cartRoute")

const app=express()
app.use(express.json())
app.use(cors())


console.log(process.env.PORT)

const PORT=process.env.PORT || 9000

connectDB()

app.get("/",(req,res)=>{
    res.send("Welcome to Elanic API!")
})

app.use("/api/user",userRoute)
app.use("/api/products",productRoute)
app.use("/api/cart",cartRoute)


app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
