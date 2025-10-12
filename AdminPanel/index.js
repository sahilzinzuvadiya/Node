const express=require("express")
const port=1005
const path=require("path")
const session=require("express-session")

const app=express()

const db=require("./config/db")
const passport=require("passport")

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))
app.use("/upload",express.static(path.join(__dirname,"upload")))
app.use(express.static(path.join(__dirname,"public")))
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

app.use("/",require("./routes/route"))

app.listen(port,(err)=>{
    err?console.log(err):console.log(`Server Started on port ${port}`);
})