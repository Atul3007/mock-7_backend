const mongoose=require("mongoose");
const userschema=mongoose.Schema({
    name:String,
    phone:Number,
    bio:String,
    email:String,
    pass:String,
    url:String
})
const usermodel=mongoose.model("user",userschema);
module.exports={
    usermodel
}