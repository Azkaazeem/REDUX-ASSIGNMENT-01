import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Aapke naye banaye gaye components import karein
// (Path apne folder structure ke mutabiq adjust kar lein agar zaroorat ho)
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Header ko Routes se bahar rakha hai taake ye navigation bar har page par nazar aaye */}
        <Header />
        
        {/* pt-16 isliye lagaya hai taake page ka content fixed Header ke peeche na chhupe */}
        <div className="pt-16">
          <Routes>
            {/* Aapka pehle se mojood Index route */}
            <Route path="/" element={<Index />} />
            
            {/* Naye Login aur Sign Up pages ke routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;