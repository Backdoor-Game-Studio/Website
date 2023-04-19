import { Routes, Route } from "react-router-dom"
import Home from "./screens/Home";
import Madness from "./screens/Madness";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";

import "./styles/App.css";

const App = () => {
  return(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="madness" element={<Madness />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
  );
}

export default App;
