const express=require("express")
const port=1002
const path=require("path")

const app=express()
const db=require("./confige/db")

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use("/",require("./routes/route"))

app.get("/MovieForm",(req,res)=>{
    res.render("MovieForm")
})

app.get("/Home",(req,res)=>{
    res.render("Home")
})


app.listen(port,(err)=>{
    err?console.log(err):console.log(`Server Started on port ${port}`);
})