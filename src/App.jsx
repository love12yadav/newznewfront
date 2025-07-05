import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Component/LoginPage";
import SignupPage from "./Component/SignupPage";
import HeadlinesPage from "./Component/HeadlinesPage";
import Home from "./Component/Home";
import Notes from './Component/Notes';
function App() {
  const getToken = () => localStorage.getItem("jwt");

  return (
    <Router>
      <Routes>
        <Route path="/" element={getToken() ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={getToken() ? <Home /> : <Navigate to="/login" />} />
        <Route path="/headlines" element={getToken() ? <HeadlinesPage /> : <Navigate to="/login" />} />
        <Route path="/notes" element={getToken() ? <Notes /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
