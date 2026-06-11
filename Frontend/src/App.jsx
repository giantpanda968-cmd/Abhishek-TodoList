import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "./pages/feed";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/signup";
import Login from "./pages/login";

const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task" element={<Feed />} />
      </Routes>
    </div>
  );
};

export default App;
