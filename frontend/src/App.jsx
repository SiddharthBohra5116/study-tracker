import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Subject from "./pages/Subject";
import Navbar from "./components/Navbar/Navbar"
import DailyTargetList from "./pages/DailyTarget";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subjects/:id" element={<Subject />} />
        <Route path="/dailytargets" element={<DailyTargetList/>} />

      </Routes>
    </Router>
  );
};

export default App;
