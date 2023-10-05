const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/harrykart",{useNewUrlParser:true});

// Setting up express
app.use("/static",express.static("static"));
app.use(express.urlencoded());

// Setting Up template engine as pug
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));

// Mongoose  
let kittyschema=new mongoose.Schema({
    name:String
});

let kittymodel=mongoose.model("kitten",kittyschema);

app.get("/",(req,res)=>{
    // res.sendFile(__dirname+"/index.html")
    kittymodel.find({}).then((cubs)=>{
        res.render("notindex",{
           cubslist:cubs 
        });
    })
});

app.listen(2000,()=>{
    console.log("Server is running on port:2000");
});