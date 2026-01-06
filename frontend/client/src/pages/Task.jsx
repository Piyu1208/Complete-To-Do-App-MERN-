import { useState, useEffect } from "react";
import api from "../api/axios";
import TaskItem from "../components/TaskItem";
import TaskInput from "../components/TaskInput";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleClick = async () => {
    try {
      await api.post("/task", {
        title: title
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get("/task");
      console.log(res);
      setTasks(res.data);
    } catch(err) {
      console.log(err.response?.data);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await api.patch(`/task/${task._id}`, {
        completed: !task.completed
      });
      fetchTasks();
    } catch(err) {
      console.log(err.rsponse?.data);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/task/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <>
    <div className="container mt-4"
      style={{ maxWidth: "600px"}}
    >
      <h1 className="mb-3">Tasks</h1>
      <TaskInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onSubmit={handleClick}
      />
      <ul className="list-group">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
    </>
  );
}


export default Task;