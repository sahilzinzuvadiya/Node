const express = require("express")
const route = express.Router()
const ctl = require("../controller/ctl")
const multer=require("../middleware/multer")
const passport = require("../middleware/localSt")

route.get("/",ctl.loginpage)

route.post("/login",passport.authenticate("local",{failureRedirect:"/"}),ctl.Login)

route.get("/dashboard",passport.checkAuth, ctl.dashboard)

route.get("/addAdmin",passport.checkAuth, ctl.addAdmin)

// route.get("/viewAdmin", ctl.viewadmin)

route.post("/addData",multer,ctl.Add)

route.get("/viewAdmin",passport.checkAuth,ctl.find)

route.get("/deleteData",ctl.Delete)

route.get("/editData",ctl.Edit)

route.post("/updateData",multer,ctl.Update)

route.get("/logout",ctl.logout)
module.exports = route