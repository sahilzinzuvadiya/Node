const mongoose=require("mongoose")
const schema=mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "password":{
        type:Number,
        required:true
    },
    "image":{
        type:String,
        required:true
    },
})
const firstSchema=mongoose.model("CRUD",schema)
module.exports=firstSchema