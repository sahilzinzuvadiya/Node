const schema=require("../model/firstSchema")
const fs=require("fs")


module.exports.loginpage=(req,res)=>{
    res.render("Login")
}

module.exports.Login = (req, res) => {

    res.redirect("/dashboard")
}
module.exports.dashboard=(req,res)=>{
    res.render("dashboard")
}
module.exports.addAdmin=(req,res)=>{
    res.render("AddAdmin")
}
module.exports.viewadmin=(req,res)=>{
    res.render("ViewAdmin")
}
module.exports.find=async(req,res)=>{
    await schema.find().then((data)=>{
        res.render("ViewAdmin",{data})
    })
}
module.exports.Add=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    req.body.image=req.file.path
    await schema.create(req.body).then(()=>{
        res.redirect("/addAdmin")
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