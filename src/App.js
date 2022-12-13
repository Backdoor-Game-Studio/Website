import { Routes, Route } from "react-router-dom"
import Auth from "./screens/Auth";
import Home from "./screens/Home";
import Madness from "./screens/Madness";
import Login from "./screens/Login";

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="madness" element={<Madness />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
