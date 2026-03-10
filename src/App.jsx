import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; // <-- Ye line add karni hai

// Imports
import Header from "./Pages/Header";
import Footer from "./Comps/Footer"; 
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard"; 
import Blog from "./Pages/Blog";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound"; 
import ProtectedRoute from "./Comps/ProtectedRoute"; 

const App = () => {
  return (
    <BrowserRouter>
      {/* Toaster ko yahan add karein taa ke poori app mein notifications dikh sakein */}
      <Toaster position="top-center" richColors /> 
      
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
        <Header />
        
        <main className="pt-16 flex-1">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;