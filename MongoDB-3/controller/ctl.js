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

const schema = require("../model/firstSchema")
const fs = require("fs")
const mailer=require("../middleware/mailer")

module.exports.loginPage = (req, res) => {
    res.render("Login")
}

module.exports.Login = async (req, res) => {

    res.redirect("/dashboard")
}

module.exports.dashboard = (req, res) => {

    res.render("Dashboard")

}
module.exports.Addadmin = (req, res) => {
    res.render("AddAdmin")
}
module.exports.Viewadmin = (req, res) => {
    res.render("viewAdmin")
}
module.exports.Add = async (req, res) => {
    req.body.image = req.file.path
    await schema.create(req.body).then(() => {
        res.redirect("/addAdmin")
    })
}
module.exports.first = async (req, res) => {
    await schema.find().then((data) => {
        res.render("viewAdmin", { data })
    })
}

module.exports.Delete = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    fs.unlinkSync(singleData.image)
    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/viewAdmin")
    })
}

module.exports.Edit = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    // console.log(singleData);
    res.render("Edit", { singleData })
}

module.exports.Update = async (req, res) => {
    let singleData = await schema.findById(req.body.id)
    let img = ""

    req.file ? img = req.file.path : img = singleData.image

    req.file && fs.unlinkSync(singleData.image)

    req.body.image = img

    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/viewAdmin")
    })
}

module.exports.logout = async (req, res) => {
    req.session.destroy()
    res.redirect("/")
}

module.exports.verifypass = async (req, res) => {
    res.render("changePassword")
}

module.exports.chnagepassword = async (req, res) => {
    console.log("user",req.user);
    console.log(req.body);
    
    let admin = req.user
    if (admin.password == req.body.oldpass) {
        if (req.body.newpass == req.body.confirmpass) {
            await schema.findByIdAndUpdate(admin.id, { password: req.body.newpass }).then(() => {
                res.redirect("/logout")
            })
        } else {
            res.redirect("/changePassword")
        }
    } else {
        res.redirect("/logout")
    }
}

module.exports.forgotpass=async(req,res)=>{
    console.log(req.body);
    
    let admin=await schema.findOne({email : req.body.email})
    if(admin){
        let otp=Math.floor(Math.random()*1000000+9000000)
        mailer.sendOtp(req.body.email,otp)
        req.session.otp=otp
        req.session.adminID=admin.id
        res.render("verifyOtp")
    }else{
        res.redirect("/")
    }
}

module.exports.verifyotp=async(req,res)=>{
    let adminId=req.session.adminID
    let otp=req.session.otp
    if (req.body.otp == otp) {
        if (req.body.newpass == req.body.confirmpass) {
            await schema.findByIdAndUpdate(adminId, { password: req.body.newpass }).then(() => {
                res.redirect("/")
            })
        } else {
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }
}
