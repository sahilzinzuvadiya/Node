const express=require("express")
const route=express.Router();

const multer=require("../middleware/multer")
const clt=require("../controller/control")

route.get("/",clt.first)

route.post("/addData",multer,clt.add)

route.get("/deleteData",clt.delete)

route.get("/editData",clt.edit)

route.post("/updateData",multer,clt.update)

module.exports=route