function TaskItem({ task, toggleComplete, deleteTask }) {
  return (
    <>
    <li
     style={{
      textDecoration: task.completed ? "line-through" : "none"
     }}

     className="list-group-item d-flex justify-content-between align-items-center"
    >
      {task.title}

      <button 
        className="btn btn-success btn-sm me-2"
        onClick={() => toggleComplete(task)}
      >
        ✓
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => deleteTask(task._id)}
      >
        ✕
      </button>
    </li>
    </>
  );
}


export default TaskItem;