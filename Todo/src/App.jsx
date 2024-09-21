import { useState } from "react";
import Login from "./Account/Login.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  RouterProvider,
  Outlet,
  Router,
  Navigate,
} from "react-router-dom";

import Task from "./page/Task.jsx";

import Register from "./Account/Register.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Task />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
