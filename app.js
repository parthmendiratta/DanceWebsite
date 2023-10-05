const express=require("express");
const path=require("path");
const fs=require("fs");
const alert=require("alert");
const app=express();
const body_parser=require("body-parser");
const port=80;
const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/danceacademy",{useNewUrlParser:true});

// Define Mongooose schema
var dance = new mongoose.Schema({
    name:String,
    email:String,
    phone_no:Number,
    age:Number,
    information:String
})

var contact=mongoose.model("contact",dance);
// EXPRESS SPECOFIC STUFF
app.use("/static",express.static("static"));
app.use(express.urlencoded());

// PUGG SPECIFIC STUFF
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    const params={};
    res.status(200).render("home.pug",params);
});
app.get("/contact",(req,res)=>{
    const params={};
    res.status(200).render("contact.pug",params);
});
app.post("/contact",(req,res)=>{
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.status(200);
        res.render("dashboard.pug");
    }).catch(()=>{
        res.status(400).send("This item is not stored");
    })
});
contact.find({name:"James Bond"}).then((err,docs)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(docs);
    }
})
app.listen(8000,()=>{
    console.log("This application has been successfully started on port:8000");
});