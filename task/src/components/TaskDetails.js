import React from 'react'

const TaskDetails = ({task}) => {
  return (
    <div>
        <h4>{task.title}</h4>
        <p>{task.due}</p>
        <p>{task.priority}</p>
        <p>{task.label}</p>
    </div>
  )
}

export default TaskDetails