const express=require("express")
const port=1001
const app=express()
const db=require("./confige/db")
const schema=require("./model/FirstSchema")

app.set("view engine","ejs")

app.use(express.urlencoded({extended:true}))

app.get("/",async(req,res)=>{
    await schema.find().then((data)=>{
        res.render("home",{data})
    })
})

app.get("/index",(req,res)=>{
    res.render("index")
})

app.post("/addData",async(req,res)=>{
    await schema.create(req.body).then(()=>{
        res.redirect("/")
    })
})

app.get("/deleteData",async(req,res)=>{
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/")
    })
})

app.get("/editData",async(req,res)=>{
    let singleData=await schema.findById(req.query.id)
        res.render("edit",{singleData})
    
})

app.post("/updateData",async(req,res)=>{
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/")
    })
})
app.listen(port,(err)=>{
    err?console.log(err):console.log(`server started on port ${port}`);
})