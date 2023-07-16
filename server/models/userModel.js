const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

// static register method
userSchema.statics.register=async function(email,password){

    const exists=await this.findOne({email})

    if(exists){
        throw Error('Email already exist')
    }
    
    const salt=await bcrpyt.genSalt(10)
    const hash=await bcrpyt.hash(password,salt)
    
    const user=await this.create({email,password:hash})

    return user

}


module.exports=mongoose.model('User',userSchema)