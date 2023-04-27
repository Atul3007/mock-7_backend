const express = require("express");
const { connection } = require("./config/db");
const {user_router}=require("./routes/user.routes");
const {note_router}=require("./routes/profile.routes");
const {authhenticate}=require("./middleware/authenticate.middleware");

const cors=require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const id="c647ab4c8d3016574745";
const secret="79406d347202e77026f7cbe758d0737dab9967a2"

const app = express();
app.use(express.json());
app.get("/api", (req, res) => {
    res.send("Welcome");
})
app.use(cors({
    origin: '*'
}));

// app.get("/api/login",(req,res)=>{
//     res.sendFile(__dirname+"../frontend/index.html");
// })

app.get("/oauth/github",async(req,res)=>{
    const {code}=req.query;
    console.log(code);
    const accesstoken=await fetch("https://github.com/login/oauth/access_token",{
        method:"POST",
        headers:{
        "Content-type":"application/json",
        Accept:"application/json"
        },
        body:JSON.stringify({
            client_id:id,
            client_secret:secret,
            code:code
        })
    }).then((res)=>res.json())
    //console.log(accesstoken)
    const userdetails=await fetch("https://api.github.com/user",{
        headers:{
            Authorization: `Bearer ${accesstoken.access_token}`
        }
    }).then((res)=>res.json());
    //res.send("redirecting");
    res.sendFile(__dirname+"/profile.html")
  //  res.sendFile(__dirname+"../frontend/index.html");
})

app.use("/api",user_router); 
app.use(authhenticate);
app.use("/api/profile",note_router);
app.listen(4500, async () => {
    try {
        await connection;
        console.log("Connected to Db");
    } catch (error) {
        console.log(error);
        console.log("Problem in db");
    }
    console.log("4500 running");
})



// "email": "babu@gmail.com",
// "pass": "123"