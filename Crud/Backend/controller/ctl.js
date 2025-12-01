const schema=require("../model/Schema")

module.exports.addData=async(req,res)=>{
    
    await schema.create(req.body).then(()=>{
        res.status(200).json({msg:"Data added successfully!",data:req.body})
    })
}

module.exports.getData=async(req,res)=>{
    await schema.find({}).then((data)=>{
        res.status(200).json({msg:"Data found successfully!",data:data})
    })
}

module.exports.deleteData=async(req,res)=>{
    await schema.findByIdAndDelete(req.query.id).then((data)=>{
        res.status(200).json({msg:"Data deleted successfully!",data:data})
    })
}

module.exports.updateData=async(req,res)=>{
    await schema.findByIdAndUpdate(req.query.id,req.body).then((data)=>{
        res.status(200).json({msg:"Data updated successfully!",data:data})
    })
}