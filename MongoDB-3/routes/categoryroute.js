const express=require("express")
const routes=express.Router()
const ctl=require("../controller/categoryctl")
const passport=require("../middleware/localSt")
const multer=require("../middleware/multer")


routes.get("/addcategory",passport.checkAuth,ctl.addcategory)
routes.post("/addcat",passport.checkAuth,multer,ctl.addcat)
routes.get("/viewcategory",passport.checkAuth,ctl.viewcategory)

module.exports=routes