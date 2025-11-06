const mongoose=require("mongoose")
const schema=mongoose.Schema({
    "catName":{
        type:String,
        required:true
    },
    "image":{
        type:String,
        required:true
    }
})
const categoryschema=mongoose.model("category",schema)
module.exports=categoryschema