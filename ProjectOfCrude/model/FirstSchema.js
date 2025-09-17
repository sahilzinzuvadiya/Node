const mongoose = require("mongoose")
const schema = mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    "author": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "category": {
        type: String,
        required: true,
        enum: ["Fiction", "Non-Fiction", "Science", "History", "Technology", "Other"],//only allow values
    },
    "quantity": {
        type: Number,
        required: true
    }
})
const firstSchema=mongoose.model("CrudProject",schema)
module.exports=firstSchema