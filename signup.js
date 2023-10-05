const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/movies",{useNewUrlParser:true});

// Express Specific stuff
app.use("/static",express.static("static"));
app.use(express.urlencoded());

// Pug specific stuff
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));

let moviesschema=mongoose.Schema({
    name:String,
    star:String,
    status:String
});

let film= mongoose.model("movieslist",moviesschema);


app.get("/",(req,res)=>{
    res.status(200).render("form");
});
app.post("/",(req,res)=>{
    let data=new film(req.body);
    data.save().then(()=>{
        res.status(200);
        res.redirect("/dashboard");
    })
});
app.get("/dashboard",(req,res)=>{
    film.find({name:"Batman"}).then((information)=>{
        res.render("dashboard",{
            messages:information
        })
    })
})
app.listen(2000,()=>{
    console.log("Successfully running on port:2000");
});