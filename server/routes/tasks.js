const express=require('express');
const {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}=require('../controllers/taskController')

const router=express.router()

// Get all tasks
router.get('/',getTasks)

//Get a task
router.get('/:id',getTask)

//Post a new task
router.post('/',createTask)

//Delete a task
router.delete('/:id',deleteTask)

//Update a task
router.patch('/:id',updateTask)

module.exports=router

