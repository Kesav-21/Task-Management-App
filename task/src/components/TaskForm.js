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
    <div className='border-4 w-3/12 rounded-2xl from-white-900 bg-gradient-to-b shadow-2xl'>
    <form onSubmit={handleSubmit}>
      <h3 className="text-3xl font-bold text-center my-3 text-red-800">Add a new Task</h3>
      <div className='flex flex-col w-3/4 mx-auto my-3'>
      <label className='font-semibold mb-2 text-md'>Task Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Task Title"
        className={`${emptyFields.includes('title')?'error':''}rounded-lg text-gray-900 p-2 border-2 border-slate-300 focus:outline-none focus:border-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-600`}
      />
      </div>
      <div className='flex flex-col w-3/4 mx-auto my-3'>
      <label className='font-semibold mb-2 text-md'>Due Date:</label>
      <input
       type="date"
       onChange={(e) => setDue(e.target.value)}
       value={due}
       className={`${emptyFields.includes('due')?'error':''}rounded-lg text-gray-900 p-2 border-2 border-slate-300 focus:outline-none focus:border-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-600`}
       />
       </div>
       <div className='flex flex-col w-3/4 mx-auto my-3'>
      <label className='font-semibold mb-2 text-md'>Task Priority:</label>
      <input
        type="text"
        onChange={(e) => setPriority(e.target.value)}
        value={priority}
        placeholder="Task Priority"
        className={`${emptyFields.includes('priority')?'error':''}rounded-lg text-gray-900 p-2 border-2 border-slate-300 focus:outline-none focus:border-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-600`}
      />
      </div>
      <div className='flex flex-col w-3/4 mx-auto my-3'>
      <label className='font-semibold mb-2 text-md'>Task Labels:</label>
      <input
        type="text"
        onChange={(e) => setLabel(e.target.value)}
        value={label}
        placeholder="Task Labels"
        className={`${emptyFields.includes('label')?'error':''}rounded-lg text-gray-900 p-2 border-2 border-slate-300 focus:outline-none focus:border-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-600`}
      />
      </div>
      <div className='flex flex-col w-3/4 mx-auto my-3'>
      <button className='p-3 mx-auto w-3/4 rounded-xl bg-amber-200 hover:bg-amber-500 mb-3 font-bold'>Add Task</button>
      {error && <div className='text-red-700 text-center font-semibold'>*{error}</div>}
      </div>
    </form>
    </div>
  );
};

export default TaskForm;
