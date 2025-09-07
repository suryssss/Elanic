require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const authRoute=require("./routes/auth/auth-route")

mongoose.connect(process.env.MONGO_URL
).then(()=>console.log("connected to mongodb")).catch((err)=>console.log(err))

const app=express()
const PORT=process.env.PORT || 5000

app.use(
    cors({
        origin :'http://localhost:5173',
        methods :['GET','POST','PUT','DELETE'],
        allowedHeaders :['Content-Type','Authorization','Cache-Control','Expires','Pragma'],
        credentials :true,
    })
)

app.use(cookieParser());
app.use(express.json())
app.use("/api/auth",authRoute)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
