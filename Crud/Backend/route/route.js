const express=require("express")
const route=express.Router()
const ctl=require("../controller/ctl")
const multer=require("../middelware/multer")

route.post("/addData",multer,ctl.addData)
route.get("/getData",ctl.getData)
route.delete("/deleteData",multer,ctl.deleteData)
route.put("/updateData",multer,ctl.updateData)

module.exports=route