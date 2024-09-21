import React, { useState, useEffect } from "react";

const TaskForm = ({ userid,addTask, editTaskData, handleUpdateTask }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");

  useEffect(() => {
    if (editTaskData) {
     
      setTaskName(editTaskData.task_name);
      setDescription(editTaskData.description);
      setCategory(editTaskData.category);
    }
    else {
        setTaskName("");
        setDescription("");
        setCategory("Work");
      }
  }, [editTaskData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTaskData) {
      handleUpdateTask(editTaskData.id, { user_id:editTaskData.user_id,task_name: taskName, description, category });
  
      
    } else {
      addTask({ user_id:userid, task_name: taskName, description, category });
    }
    setTaskName("");
    setDescription("");
    setCategory("Work");
  };

  return (
    <div className="mb-8">
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* Change form title based on mode (add or edit) */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editTaskData ? "Edit Task" : "Add Task"}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="taskName">
          Task Name
        </label>
        <input
          id="taskName"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task description"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>
      </div>

      <div className="text-center">
        {/* Change button text based on mode (add or edit) */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {editTaskData? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  </div>
  );
};

export default TaskForm;
