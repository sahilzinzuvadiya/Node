const express=require("express")
const port=1004
const path=require("path")

const app=express()
const route=require("./routes/route")
const db=require("./config/db")
const cookie=require("cookie-parser")
const session=require("express-session")
const passport = require("passport")


app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use("/upload",express.static(path.join(__dirname,"upload")));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookie())

app.use(
    session({
        name:"local",
        secret:"sahil",
        resave:true,
        saveUninitialized:false,
        cookie:{maxAge:100*100*60}
    })
)

app.use(passport.initialize())
app.use(passport.session())
app.use("/",route)
app.use("/category",require("./routes/categoryroute"))
app.use("/subcategory",require("./routes/subcategoryroute"))
app.use("/product",require("./routes/productRoute"))

app.listen(port,(err)=>{
    err ? console.log(err): console.log(`Server Strated on port ${port}`);
})
                                                                                                      