const mongoose=require("mongoose")

const cartItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        res:"Product",
        required:true
    },
    name:String,
    image:String,
    price:String,
    size:String,
    color:String,
    quantity:{
        type:Number,
        default:1,
    },    
},
{_id:false}
)

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    guestId:{
        type:String,
    },
    products:[cartItemSchema],
    totalPrice:{
        type:Number,
        requried:true,
        default:0,
    },
    },
    {
        timestamps:true,
    }
)


module.exports=mongoose.model('cart',cartItemSchema)