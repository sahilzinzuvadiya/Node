const schema=require("../models/firstSchema")
const fs=require("fs")

module.exports.first=async(req,res)=>{
    await schema.find().then((data)=>{
        res.render("Home",{data})
    })
}

module.exports.add=async(req,res)=>{
    req.body.image=req.file.path
    await schema.create(req.body).then(()=>{
        res.redirect("/")
    })
}

module.exports.delete=async(req,res)=>{
    let singleData=await schema.findById(req.query.id)
    fs.unlinkSync(singleData.image)
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/")
    })
}

module.exports.edit=async(req,res)=>{
    let singleData=await schema.findById(req.query.id)
    res.render("EditForm",{singleData})
}

module.exports.update=async(req,res)=>{
    let singleData=await schema.findById(req.body.id)
    console.log(singleData);
    
    let img=""

    req.file?img=req.file.path:img=singleData.image

    req.file && fs.unlinkSync(singleData.image)

    req.body.image=img

    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/")
    })
}