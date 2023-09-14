import React from 'react'
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Delete from '../assets/images/delete.png'

const TaskDetails = ({task}) => {
  const {dispatch}=useTasksContext()
  const {user}=useAuthContext()

  const handleClick=async()=>{
    if(!user){
      return
    }
    const response=await fetch('/api/tasks/'+task._id,{
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json=await response.json()

    if(response.ok){
      dispatch({type:'DELETE_TASK',payload:json})
    }
  }
  return (
    <div className='w-full my-2 bg-slate-400 rounded-md p-4 shadow-lg '>
      <div className='flex justify-between'>
        <h4 className='font-bold'>{task.title}</h4>
        <span onClick={handleClick} className='relative '><img src={Delete} width={25} height={25}/></span>
        </div>
        <p className='font-medium'>{task.due}</p>
        <p>{task.priority}</p>
        <p>{task.label}</p>
        
    </div>
  )
}

export default TaskDetails