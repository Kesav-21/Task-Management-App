const mongoose=require('mongoose')

const Schema=mongoose.Schema

const taskSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    due:{
        type:Date,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    label:{
        type:String,
        requried:true
    }
},{timestamps:true})

module.exports=mongoose.model('Task',taskSchema)