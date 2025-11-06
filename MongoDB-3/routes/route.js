const express=require("express")
const routes=express.Router()
const ctl=require("../controller/ctl")
const multer=require("../middleware/multer")
const passport=require("../middleware/localSt")

routes.get("/",ctl.loginPage)

routes.post("/login",passport.authenticate("local",{failureRedirect:"/"}),ctl.Login)

routes.get("/dashboard",passport.checkAuth,ctl.dashboard)

routes.get("/addAdmin",passport.checkAuth,ctl.Addadmin)

routes.get("/changePassword",ctl.verifypass)

routes.post("/changePassword",ctl.chnagepassword)
// routes.get("/viewAdmin",ctl.Viewadmin)   

routes.get("/viewAdmin",passport.checkAuth,ctl.first)

routes.post("/addData",multer,ctl.Add)

routes.get("/deleteData",ctl.Delete)

routes.get("/editData",ctl.Edit)

routes.post("/updateData",multer,ctl.Update)

routes.get("/logout",ctl.logout)

routes.post("/forgotpass",ctl.forgotpass)

routes.post("/verifyotp",ctl.verifyotp)


module.exports=routes