import React, { useState, useEffect } from "react";
import TaskForm from "./Taskform";
import TodoList from "./Todolist";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const userid = localStorage.getItem("userid");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTaskData, setEditTaskData] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const navigate=useNavigate()

  // Fetch tasks from the API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      console.log(userid)
      const response = await fetch(
        `http://127.0.0.1:8000/todo/user/${userid}/`
      );
      const data = await response.json();
      console.log(data)
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  // Add task
  const addTask = async (newTask) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/todo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Edit task
  const editTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/todo/edit/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      const data = await response.json();

      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...data } : task
      );
      setTasks(updatedTasks);
      setEditTaskData(null);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/todo/edit/${id}/`, {
        method: "DELETE",
      });

      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleEditClick = (task) => {
    setEditTaskData(task); // Set the task to be edited
  };
  const filteredTasks = tasks.filter((task) => {
    const matchesName = task.task_name
      ?task.task_name.toLowerCase()
      .includes(filterName.toLowerCase()):false;
    const matchesDate = filterDate
      ? new Date(task.created_at).toDateString() ===
        new Date(filterDate).toDateString()
      : true;
    return matchesName && matchesDate;
  });

  //HandleLogouot
  function handleLogout() {
    localStorage.removeItem("userid");
    navigate("/");
  }

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-4xl font-bold mb-8 text-center">Todo List</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 mb-4 absolute right-10 top-5 max-sm:right-3 "
        >
          Logout
        </button>

        <div className="mb-4 w-[50%] max-[400px]:w-full mx-auto">
          <input
            type="text"
            placeholder="Filter by task name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Task Form to add new tasks */}
        <TaskForm
          userid={userid}
          addTask={addTask}
          editTaskData={editTaskData}
          handleUpdateTask={editTask}
        />

        {/* List of tasks */}
        <TodoList
          tasks={filteredTasks}
          handleEditClick={handleEditClick}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default Task;
