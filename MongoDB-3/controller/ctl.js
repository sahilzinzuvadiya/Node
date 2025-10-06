// const schema=require("../model/firstSchema")
// const fs=require("fs")

// module.exports.FirstPage=async(req,res)=>{
//     await schema.find().then((data)=>{
//         res.render("index",{data})
//     }) 
// }

// module.exports.Add=async(req,res)=>{
//     // console.log(req.body);
//     // console.log(req.file);
    
//     req.body.image=req.file.path
//     await schema.create(req.body).then(()=>{
//         res.redirect("/")
//     })
// }

// module.exports.Delete=async(req,res)=>{
//     let singleData=await schema.findById(req.query.id)
//     fs.unlinkSync(singleData.image)
//     await schema.findByIdAndDelete(req.query.id).then(()=>[
//         res.redirect("/")
//     ])
// }

// module.exports.Edit=async(req,res)=>{
//     let singleData=await schema.findById(req.query.id)
//     res.render("edit",{singleData})
// }

// module.exports.Update=async(req,res)=>{
//     let singleData=await schema.findById(req.body.id)
//     let img=""

//     req.file?img=req.file.path:img=singleData.image

//     req.file && fs.unlinkSync(singleData.image)

//     req.body.image=img
    
//     await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
//         res.redirect("/")
//     })
// }

const schema=require("../model/firstSchema")
const fs=require("fs")

module.exports.loginPage=(req,res)=>{
    res.render("Login")
}

module.exports.Login=async(req,res)=>{
    // console.log(req.body);
    let admin=await schema.findOne({email:req.body.email})
    // console.log(admin);
    
    if(admin){
        if(req.body.password==admin.password){
            
            res.cookie("admin",admin)
            res.redirect("/dashboard")
        }
    }else{
        res.redirect("/")
    }
}

module.exports.dashboard=(req,res)=>{
        // res.render("Dashboard")
    if(req.cookies.admin){
        res.render("Dashboard")
    }else{
        res.redirect("/")
    }
    
}
module.exports.Addadmin=(req,res)=>{
    res.render("AddAdmin")
}
module.exports.Viewadmin=(req,res)=>{
    res.render("viewAdmin")
}
module.exports.Add=async(req,res)=>{
    req.body.image=req.file.path
    await schema.create(req.body).then(()=>{
        res.redirect("/addAdmin")
    })
}
module.exports.first=async(req,res)=>{
    await schema.find().then((data)=>{
        res.render("viewAdmin",{data})
    })
}

module.exports.Delete=async(req,res)=>{
    let singleData=await schema.findById(req.query.id)
    fs.unlinkSync(singleData.image)
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/viewAdmin")
    })
}

module.exports.Edit=async(req,res)=>{
    let singleData=await schema.findById(req.query.id)
    // console.log(singleData);
    res.render("Edit",{singleData})
}

module.exports.Update=async(req,res)=>{
    let singleData=await schema.findById(req.body.id)
    let img=""

    req.file?img=req.file.path:img=singleData.image

    req.file&&fs.unlinkSync(singleData.image)

    req.body.image=img

    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/viewAdmin")
    })
}