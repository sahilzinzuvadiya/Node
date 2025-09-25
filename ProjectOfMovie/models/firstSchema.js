const mongoose=require("mongoose")
const schema=mongoose.Schema({
    "image":{
        type:String,
        required:true
    },
    "title":{
        type:String,
        required:true
    },
    "genre":{
        type:String,
        required:true,
        enum:["Action","Drama","Comedy","Horror","Romance","Sci-Fi"]
    },
    "rating":{
        type:String,
        required:true,
        min: 0,
        max: 10
    },
    "review":{
        type:String,
        required:true
    }

})
const firstSchema=mongoose.model("MovieData",schema)
module.exports=firstSchema