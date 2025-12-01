const multer=require("multer")

const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"upload/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now())
    }   
})
const multerimg=multer({storage:Storage}).single("image")
module.exports=multerimg