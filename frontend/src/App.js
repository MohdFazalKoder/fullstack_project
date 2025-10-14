import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import FileUpload from "./components/FileUpload";
import View from "./components/View";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/home" element={<Home />} />

        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Login page */}
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* File Upload (Default route '/') */}
        <Route
          path="/"
          element={
            token ? <FileUpload token={token} setToken={setToken} /> : <Navigate to="/login" />
          }
        />

        {/* View page with filename */}
        <Route
          path="/view/:filename"
          element={token ? <View token={token} /> : <Navigate to="/login" />}
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
