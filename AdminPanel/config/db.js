const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/seodashboard")
const db=mongoose.connection
db.once("open",(err)=>{
    err?console.log(err):console.log("Database Started Successfully!");
})
module.exports=db
