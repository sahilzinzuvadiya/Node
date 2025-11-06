const subSchema=require("../model/subcategorySchema")
const productSchema=require("../model/productSchema")

module.exports.addProduct=async(req,res)=>{
    await subSchema.find().then((data)=>{
        res.render("addProduct",{data})
    })
}

module.exports.addPro=async(req,res)=>{
    await productSchema.create(req.body).then(()=>{
        res.redirect("/product/addProduct")
    })
}    

module.exports.viewProduct=async(req,res)=>{
    await productSchema.find().populate(
        {
            path : "subcategoryId",
            populate:{
                path : "categoryId"
            }
        }
    ).then((data)=>{
        // console.log(data);
        
        res.render("viewProduct",{data})
    })
}