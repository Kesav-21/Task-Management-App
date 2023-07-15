import React from 'react'
import { useState } from 'react' 

const TaskForm = () => {
  const [title,setTitle]=useState("")
  const [due,setDue]=useState("")
  const [priority,setPriority]=useState("")
  const [label,setLabel]=useState("")
  const [error,setError]=useState(null)

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const task={title,due,priority,label}

    const response=await fetch('/api/tasks',{
      method:'POST',
      body:JSON.stringify(task),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const json=await response.json()

    if(!response.ok){
      setError(json.error)
    }
    if(response.ok){
      setTitle('')
      setDue('')
      setPriority('')
      setLabel('')
      setError(null)
      console.log("new task added",json)
    }
  }
    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a new Task</h3>
            <label>Task Title:</label>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
            <label>Due Date:</label>
            <input type="date" onChange={(e)=>setDue(e.target.value)} value={due}/>
            <label>Task Priority:</label>
            <input type="text" onChange={(e)=>setPriority(e.target.value)} value={priority}/>
            <label>Task Labels:</label>
            <input type="text" onChange={(e)=>setLabel(e.target.value)} value={label}/>
            <button>Add Task</button>
            {error && <div>{error}</div>}
        </form>  
  )
}

export default TaskForm