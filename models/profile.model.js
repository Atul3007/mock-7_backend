const mongoose=require("mongoose");
const notesschema=mongoose.Schema({
    pic: String,
    name: String,
    bio: String,
    phone: Number,
    email: String,
    pass: String,
    userid:String
})
const notesmodel=mongoose.model("note",notesschema);
module.exports={
    notesmodel
}