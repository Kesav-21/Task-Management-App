const User=require('../models/userModel')

//login user
const loginUser=async(req,res)=>{
    res.json({msg:"login user"})
}

//register user
const registerUser=async(req,res)=>{
    res.json({msg:"register user"})
}

module.exports={loginUser,registerUser}