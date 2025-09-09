const express=require("express")
const port=1005

const app=express()

let students=[
    {"id":1,"task":"Update CRM entries","priority":"Low"},
    {"id":2,"task":"Code review","priority":"High"},
    {"id":3,"task":"Deploy new feature","priority":"Medium"},
    {"id":4,"task":"Call client","priority":"Low"}
]

app.set("view engine","ejs")

app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index",{students})
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.post("/addData",(req,res)=>{
    // console.log(req.body);
    req.body.id=students.length+1;
    // req.body.id=Date.now()
    students.push(req.body)
    res.redirect("/")
})

app.get("/deleteData/:id",(req,res)=>{
    // console.log(req.params.id);
    let newData=students.filter((item)=>item.id!=req.params.id)
    students=newData
    res.redirect("/")
})

app.get("/editData",(req,res)=>{
    // console.log(req.query);
    let singleData=students.find((item)=>item.id==req.query.id)
    // console.log(singleData);
    res.render("edit",{singleData})
})

app.post("/updateData",(req,res)=>{
    console.log(req.body);
    let data=students.find((item)=>item.id==req.body.id)
    data.task=req.body.task
    data.priority=req.body.priority
    res.redirect("/")
})

app.listen(port,(err)=>{
    err?console.log(err):console.log(`server started on port ${port}`);
})