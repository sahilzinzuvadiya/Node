const express=require("express")
const port=1004
const path=require("path")

const app=express()
const route=require("./routes/route")
const db=require("./config/db")
const cookie=require("cookie-parser")


app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use("/upload",express.static(path.join(__dirname,"upload")));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookie())
app.use("/",route)

// app.use("/addData",route)


app.listen(port,(err)=>{
    err ? console.log(err): console.log(`Server Strated on port ${port}`);
})
