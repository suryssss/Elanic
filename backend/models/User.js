const mongoose=require("mongoose")
const bcryptjs=require("bcryptjs")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:[/.+\@.+\..+/,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    },
},
{
    timestamps:true
}
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    const salt=await bcryptjs.genSalt(10)
    this.password=await bcryptjs.hash(this.password,salt);
    next();
})


userSchema.methods.matchPassword=async function (enteredPassword){
    return await bcryptjs.compare(enteredPassword,this.password)
};


module.exports=mongoose.model("User",userSchema);
