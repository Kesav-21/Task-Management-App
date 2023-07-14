const Task=require('../models/taskModel')
const mongoose=require('mongoose')

// Get all Tasks
const getTasks=async(req,res)=>{
    const tasks=await Task.find({}).sort({createdAt:-1})
    res.status(200).json(tasks)
}

const getTask=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such task'})
    }

    const task=await Task.findById(id)

    if(!task){
        return res.status(404).json({error:'No such task'})
    }
    res.status(200).json(task)
}

//create a task
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
        emptyFields.push('fields')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please enter all the fields',emptyFields})
    }

    try{
        const workout=await Task.create({title,due,priority,label})
        res.status(200).json(task)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

// delete a workout
const deleteTask=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such task'})
    }
    const task=await Task.findOneAndDelete({_id:id})
    if(!task){
        return res.status(400).json({error:'No such task'})
    }
}