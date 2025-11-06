const mongoose=require("mongoose")
const schema=mongoose.Schema({
    "productName":{
        type:String,
        required:true
    },
    "subcategoryId":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subcategory",
        required:true
    }
})
const Productschema=mongoose.model("Product",schema)
module.exports=Productschema