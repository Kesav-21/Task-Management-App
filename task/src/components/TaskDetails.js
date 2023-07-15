import React from 'react'
import { useTasksContext } from '../hooks/useTasksContext'

const TaskDetails = ({task}) => {
  const {dispatch}=useTasksContext()

  const handleClick=async()=>{
    const response=await fetch('/api/tasks/'+task._id,{
      method:'DELETE'
    })
    const json=await response.json()

    if(response.ok){
      dispatch({type:'DELETE_TASK',payload:json})
    }
  }
  return (
    <div>
        <h4>{task.title}</h4>
        <p>{task.due}</p>
        <p>{task.priority}</p>
        <p>{task.label}</p>
        <span onClick={handleClick}>Delete</span>
    </div>
  )
}

export default TaskDetails