const express=require("express")
const port=1004
const path=require("path")
const app=express()

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use("/",express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`server strted on port ${port}`);
    }
})