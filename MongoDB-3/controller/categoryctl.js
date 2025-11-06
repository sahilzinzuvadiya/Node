const schema=require("../model/categorySchema")

module.exports.addcategory=(req,res)=>{
    res.render("addcat")
}

module.exports.addcat=async(req,res)=>{
    // console.log(req.body);
    req.body.image=req.file.path
    await schema.create(req.body).then(()=>{
        res.redirect("/category/addcategory")
    })
}

module.exports.viewcategory=async(req,res)=>{
    await schema.find().then((data)=>{
        res.render("viewcat",{data})
    })
}