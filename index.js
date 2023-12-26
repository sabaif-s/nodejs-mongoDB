require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const ejs=require("ejs");
const app=express();

app.set("view engine","ejs");
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

const Name=mongoose.model("Name",nameSchema);

const newName= new Name({
    name:"Sabaif",
    text:"Akkam Nagahaa"
})

newName.save();
   

app.get("/",(req,res)=>{
    res.render("home")
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



connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Listening on PORT ${PORT}`);
    })
})