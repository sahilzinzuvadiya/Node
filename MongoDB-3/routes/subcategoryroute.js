const express=require("express")
const routes=express.Router()
// const ctl=require("../controller/categoryctl")
const subcatctl=require("../controller/subcategoryctl")
const passport=require("../middleware/localSt")



routes.get("/addSubcategory",passport.checkAuth,subcatctl.addSubcategory)
routes.post("/addSubcat",passport.checkAuth,subcatctl.addSubcat)
routes.get("/viewSubcategory",passport.checkAuth,subcatctl.viewsubcategory)

module.exports=routes