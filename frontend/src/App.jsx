import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Subject from "./pages/Subject";
import Navbar from "./components/Navbar/Navbar"

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subject/:id" element={<Subject />} />
      </Routes>
    </Router>
  );
};

export default App;
