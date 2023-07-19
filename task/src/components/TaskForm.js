import React from "react";
import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskForm = () => {
  const {user}=useAuthContext();
  const { dispatch } = useTasksContext();
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("");
  const [label, setLabel] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields,setEmptyFields]=useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      setError('You must be logged in')
      return
    }
    const task = { title, due, priority, label };

    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle("");
      setDue("");
      setPriority("");
      setLabel("");
      setError(null);
      setEmptyFields([])
      console.log("new task added", json);
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a new Task</h3>
      <label>Task Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title')?'error':''}
      />
      <label>Due Date:</label>
      <input
       type="date"
       onChange={(e) => setDue(e.target.value)}
       value={due}
       className={emptyFields.includes('due')?'error':''}
       />
      <label>Task Priority:</label>
      <input
        type="text"
        onChange={(e) => setPriority(e.target.value)}
        value={priority}
        className={emptyFields.includes('priority')?'error':''}
      />
      <label>Task Labels:</label>
      <input
        type="text"
        onChange={(e) => setLabel(e.target.value)}
        value={label}
        className={emptyFields.includes('label')?'error':''}
      />
      <button>Add Task</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default TaskForm;
