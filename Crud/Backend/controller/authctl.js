const schema=require("../model/authSchema")
const bcrypt=require("bcrypt")
const moment=require("moment")
const jwt=require("jsonwebtoken")


module.exports.register=async(req,res)=>{
    // console.log(req.body);
    let user=await schema.findOne({email:req.body.email})

    if(user){
        return res.status(200).json({msg:"User Already registered!"})
    }
    
    req.body.password=await bcrypt.hash(req.body.password,10)
    req.body.createdAt=moment().format('MMMM Do YYYY, h:mm:ss a');
    await schema.create(req.body).then((data)=>{
        res.status(200).json({msg:"Data created successfully!",data:data})
    })
    
}

module.exports.login=async(req,res)=>{
    let user=await schema.findOne({email:req.body.email})

    if(!user){
        return res.status(200).json({msg:"User Not registered!"})
    }

    if(await bcrypt.compare(req.body.password,user.password)){
        let token=jwt.sign({user},"rnw",{expiresIn:"1h"})
        console.log(token);
        
        return res.status(200).json({msg:"User logged successfully!",token:token})
    }
    else{
        return res.status(400).json({msg:"User password is wrogn!"})
    }
}   

module.exports.allUser=async(req,res)=>{
    await schema.find().then((data)=>{
        res.json({data:data})
    })
}