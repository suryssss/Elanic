const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")


const app=express()
app.use(express.json())
app.use(cors())
dotenv.config()

console.log(process.env.PORT)

const PORT=process.env.PORT || 9000

app.get("/",(req,res)=>{
    res.send("Welcome to Elanic API!")
})

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
