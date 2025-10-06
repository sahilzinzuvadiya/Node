const mongoose=require("mongoose")
const schema=mongoose.Schema({
    "firstname":{
        type:String,
        required:true
    },
    "lastname":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "image":{
        type:String,
        required:true
    }
})
const firstschema=mongoose.model("MVC",schema)
module.exports=firstschema