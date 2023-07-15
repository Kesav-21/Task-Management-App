import React from 'react'
import { useState } from 'react' 

const TaskForm = () => {
  const [title,setTitle]=useState("")
  const [due,setDue]=useState("")
  const [priority,setPriority]=useState("")
  const [label,setLabel]=useState("")

    return (
        <form>
            <h3>Add a new Task</h3>
            <label>Task Title:</label>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
            <label>Due Date:</label>
            <input type="date" onChange={(e)=>setDue(e.target.value)} value={due}/>
            <label>Task Priority:</label>
            <input type="text" onChange={(e)=>setPriority(e.target.value)} value={priority}/>
            <label>Task Labels:</label>
            <input type="text" onChange={(e)=>setLabel(e.target.value)} value={label}/>
        </form>  
  )
}

export default TaskForm