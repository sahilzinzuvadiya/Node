const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Project_1")
const db=mongoose.connection
db.once("open",(err)=>{
    err?console.log(err):console.log(`DB started successfully!`);
})
module.exports=db