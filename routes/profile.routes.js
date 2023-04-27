const express=require("express");
const note_router=express.Router();
const {usermodel}=require("../models/user.model")
const {notesmodel}=require("../models/profile.model")
note_router.post("/:id",async(req,res)=>{
    const id=req.params.id;
   let userid=req.body.userId;
   let user=await notesmodel.findOne({_id:userid});
   console.log(userid,user)
   if(id==userid){
    res.send(user);
   }
})
note_router.post("/",async(req,res)=>{
    const payload=req.body;
    try {
        const newnote=new notesmodel(payload);
        await newnote.save();
        res.send(" created")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
})
note_router.patch("/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id;
    try {
        let data=await notesmodel.findByIdAndUpdate(({_id:id},payload));
            res.send(data);
    } catch (error) {
        res.send(payload);
       
    }
    
            
    
})
note_router.delete("/:id",async(req,res)=>{
    const id=req.params.id;
    try {
       
        await notesmodel.findByIdAndDelete({"_id":id});
        res.send("Deleted");
       
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"});
    }
})
module.exports={
    note_router
}