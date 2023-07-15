const Task=require('../models/taskModel')
const mongoose=require('mongoose')

//get all tasks
const getTasks=async(req,res)=>{
    const tasks=await Task.find({}).sort({createdAt:-1})
    res.status(200).json(tasks)
}

// get a single task
const getTask=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Not a Valid id"})
    }

    const task=await Task.findById(id)

    if(!task){
        return res.status(404).json({error:"No such Task"})
    }

    res.status(200).json(task)
}

//create a new task
const createTask=async(req,res)=>{
    const {title,due,priority,label}=req.body

    let emptyFields=[]

    if(!title){
        emptyFields.push('title')
    }
    if(!due){
        emptyFields.push('due')
    }
    if(!priority){
        emptyFields.push('priority')
    }
    if(!label){
        emptyFields.push('label')
    }

    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the fields',emptyFields})
    }

    try{
        const task=await Task.create({title,due,priority,label})
        res.status(200).json(task)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete a single task
const deleteTask=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Not a valid'})
    }

    const task=await Task.findOneAndDelete({_id:id})

    if(!task){
        return res.status(400).json({error:"Not found"})
    }

    res.status(200).json(task)
}

//patch a single task
const updateTask=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Not a valid'})
    }

    const task=await Task.findByIdAndUpdate({_id:id},{
        ...req.body
    })
    
    if(!task){
        return res.status(400).json({error:"Not found"})
    }

    res.status(200).json(task)
}


module.exports={
    createTask,
    getTask,
    getTasks,
    deleteTask,
    updateTask
}