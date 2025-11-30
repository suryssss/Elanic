const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const connectDB=require("./config/db")

const userRoute=require("./routes/UserRoute")
const productRoute=require("./routes/productRoute")

const app=express()
app.use(express.json())
app.use(cors())
dotenv.config()

console.log(process.env.PORT)

const PORT=process.env.PORT || 9000

connectDB()

app.get("/",(req,res)=>{
    res.send("Welcome to Elanic API!")
})

app.use("/api/user",userRoute)
app.use("/api/products",productRoute)


app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
