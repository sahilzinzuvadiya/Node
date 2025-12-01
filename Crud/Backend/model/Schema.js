const mongoose=require("mongoose")
const schema=new mongoose.Schema({
    "image":{
        type:String,
        required:true
    },
    "name":{
        type:String,
        required:true
    },
    "age":{
        type:Number,
        required:true
    },
    "city":{
        type:String,
        required:true
    },
    
})
const firstSchema=mongoose.model("Student",schema)
module.exports=firstSchema