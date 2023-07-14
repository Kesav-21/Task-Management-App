const express=require('express');
const Task=require('../models/taskModel')
const router=express.Router()

// Get all tasks
router.get('/',(req,res)=>{
    res.json({mes:"Hello tasks"})
})

//Get a task
router.get('/:id',(req,res)=>{
    res.json({mes:"get task id"})
})

//Post a new task
router.post('/',async (req,res)=>{
    const {title,due,priority,label}=req.body
    console.log(req.body.label)
    try{
        const task=await Task.create({title,due,priority,label})
        res.status(200).json(task)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

//Delete a task
router.delete('/:id',(req,res)=>{
    res.json({msg:"delete new workout"})
})

//Update a task
router.patch('/:id',(req,res)=>{
    res.json({msg:"Patch new workout"})
})

module.exports=router

