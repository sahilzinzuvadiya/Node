const express=require("express")
const routes=express.Router()
const productctl=require("../controller/productctl")
const passport=require("../middleware/localSt")



routes.get("/addProduct",passport.checkAuth,productctl.addProduct)
routes.post("/addPro",passport.checkAuth,productctl.addPro)
routes.get("/viewProduct",passport.checkAuth,productctl.viewProduct)

module.exports=routes