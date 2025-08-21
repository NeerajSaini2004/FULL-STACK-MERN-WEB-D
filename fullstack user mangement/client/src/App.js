import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#282c34" }}>
        <Link to="/" style={{ margin: "10px", color: "white" }}>Home</Link>
        <Link to="/register" style={{ margin: "10px", color: "white" }}>Register</Link>
        <Link to="/login" style={{ margin: "10px", color: "white" }}>Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
