const passport=require("passport")
const localSt=require("passport-local").Strategy
const schema=require("../model/firstSchema")

passport.use("local",new localSt(
    {usernameField:"email"},
    async(email,password,done)=>{
        let admin=await schema.findOne({email:email})
        if(admin){
            if(admin.password==password){
                return done(null,admin)
            }else{
                return done(null,false)
            }
        }
    }
))

passport.serializeUser((admin,done)=>{
    done(null,admin.id)
})
passport.deserializeUser(async(adminId,done)=>{
    let admin=await schema.findById(adminId)
    if(admin){
        done(null,admin)
    }else{
        done(null,false)
    }
})

passport.checkAuth=(req,res,next)=>{
    if(req.isAuthenticated()){
        next()
    }
    else{
        res.redirect("/")
    }
}

module.exports=passport