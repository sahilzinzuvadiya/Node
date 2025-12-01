const express=require("express")
const route=express.Router()
const ctl=require("../controller/authctl")
const auth=require("../middelware/auth")

route.post("/register",ctl.register)
route.post("/login",ctl.login)
route.get("/allUser",auth.checkAuth,ctl.allUser)

module.exports=route