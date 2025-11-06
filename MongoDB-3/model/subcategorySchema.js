const mongoose=require("mongoose")
const schema=mongoose.Schema({
    "SubcatName":{
        type:String,
        required:true
    },
    "categoryId":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
    }
})
const Subcategoryschema=mongoose.model("Subcategory",schema)
module.exports=Subcategoryschema