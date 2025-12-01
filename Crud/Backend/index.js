const express=require("express")
const port=1006
const path=require("path")
const db=require("./config/db")
const cors=require("cors")

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.use("/",require("./route/route"))
app.use("/auth",require("./route/authRoute"))
app.use("/upload",express.static(path.join(__dirname,"upload")))

app.listen(port,(err)=>{
    err?console.log(err):console.log(`Server started on port ${port}`);
})
