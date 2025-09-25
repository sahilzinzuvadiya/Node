const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Movies")
const db=mongoose.connection
db.once("open",(err)=>{
    err?console.log(err):console.log("DataBase connected successfully!");
})
module.exports=db