import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Pages/Header";
import Footer from "./Comps/Footer"; // Footer import kiya
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard"; 

const App = () => {
  return (
    <BrowserRouter>
      {/* Humne min-h-screen aur flex column ka use kiya hai taa ke Footer hamesha neechay rahe */}
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
        <Header />
        
        {/* flex-1 ki wajah se main content poori jagah le ga aur footer end me rahega */}
        <main className="pt-16 flex-1">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} /> 
          </Routes>
        </main>
        
        {/* Footer sabse neechay add kar diya */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;