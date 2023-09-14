import React from "react";
import { useEffect} from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { tasks, dispatch } = useTasksContext();
  const {user}=useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks",{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };

    if(user){
    fetchTasks();
    }
  }, [dispatch,user]);
  return (
    <div className="home">
      <div className="flex justify-evenly w-full mt-10">
        <div className="flex flex-col w-6/12">
        {tasks ? tasks.map((task) => <TaskDetails key={task._id} task={task} />):<span>There are no Tasks Currently.</span>}
          </div>
        <TaskForm />
      </div>
    </div>
  );
};

export default Home;
