const schema=require("../model/categorySchema")
const subSchema=require("../model/subcategorySchema")

module.exports.addSubcategory=async(req,res)=>{
    await schema.find().then((data)=>{
        res.render("addSubcat",{data})
    })
}

module.exports.addSubcat=async(req,res)=>{
    await subSchema.create(req.body).then(()=>{
        res.redirect("/subcategory/addSubcategory")
    })
}    

module.exports.viewsubcategory=async(req,res)=>{
    await subSchema.find().populate("categoryId").then((data)=>{
        console.log(data);
        
        res.render("viewSubCat",{data})
    })
}