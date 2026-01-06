function TaskInput({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); //stops page refresh
        onSubmit();
      }}
    >
      <div className="input-group mb-3">
        <input
          className="form-control" 
          type="text"
          placeholder="Add a new task"
          value={value}
          onChange={onChange}
        />

        <button 
          className="btn btn-primary"
          type="submit"
        >Add</button>
      </div>
    </form>
  );
}

export default TaskInput;