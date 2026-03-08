import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Pages/Header";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      {/* Wrapper added to ensure the dark background applies to the whole screen */}
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Header />
        
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;