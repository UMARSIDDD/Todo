import React, { useState } from "react";

const TodoList = ({ tasks, handleEditClick, deleteTask }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white rounded-lg shadow-md p-6">

          <h3 className="text-xl font-semibold mb-2">{task.task_name}</h3>
          <p className="text-gray-700 mb-4">{task.description}</p>
          <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
            {task.category}
          </span>

          <div className="mt-4 flex justify-between">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
              onClick={() => handleEditClick(task)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
