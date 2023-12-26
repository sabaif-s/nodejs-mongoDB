require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const ejs=require("ejs");
const app=express();

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT=process.env.PORT || 3000;

mongoose.set("strictQuery", false);

const connectDB = async ()=>{
    try{
        const conn=mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGO DB CONNECTED`);
    }
     catch (error){
        console.log(error);
        process.exit(1);
     }
}

const nameSchema=  mongoose.Schema({
    name:String,
    text:String
})

const adminSchema=new mongoose.Schema({
    username:String,
    password:String
})

const Name=mongoose.model("Name",nameSchema);
const Admin=mongoose.model("Admin",adminSchema);
const newName= new Name({
    name:"Sabaif",
    text:"Akkam Nagahaa"
}) 

app.get("/",(req,res)=>{
    res.render("form");
})

app.get("/example",(req,res)=>{
    Name.find()
    .then((array)=>{
        res.render("example",{array:array});
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.post("/login",(req,res)=>{
 const newUser=new Admin({
    username:req.body.username,
    password:req.body.password
 })
 newUser.save()
 .then((saved)=>{
    console.log(saved);
 })
 .catch((err)=>{
    console.log(err);
 })
})
app.get("/getpass",(req,res)=>{
    Admin.find()
    .then((array)=>{
        res.render("pass",{array:array})
    })
    .catch((err)=>{
        console.log(err);
    })
})



connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Listening on PORT ${PORT}`);
    })
})