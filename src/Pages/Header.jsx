import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react"; // LogOut icon import kiya
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Supabase import kiya
import { toast } from "sonner";

const navLinks = [
  { label: "Home", href: "/" }, // "#" ki jagah "/" laga diya
  { label: "Dashboard", href: "/dashboard" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null); // User ka status save karne ke liye state
  const navigate = useNavigate();

  // Component load hotay hi check karo ke user login hai ya nahi
  useEffect(() => {
    // Current session get karo
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Agar user background mein login/logout ho toh usay track karo
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully!");
      setMobileOpen(false); // Mobile menu band karne ke liye
      navigate("/login"); // Logout ke baad login par bhej dein
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight">
          <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-sm">
            C
          </span>
          <span className="text-foreground">
            Secure<span className="text-primary">Bank</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            // Agar user login nahi hai, toh Dashboard ka link na dikhao
            if (link.label === "Dashboard" && !user) return null;
            
            return (
              <Link key={link.label} to={link.href} className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground group">
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-3/4" />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Buttons (Login/Signup YA Logout) */}
        <div className="hidden md:flex gap-3">
          {user ? (
            // Agar Login hai toh sirf Logout ka button dikhao
            <button 
              onClick={handleLogout}
              className="px-5 py-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white text-sm font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            // Agar Login nahi hai toh Sign In aur Sign Up dikhao
            <>
              <Link to="/login" className="px-5 py-2 rounded-lg border border-border text-foreground text-sm font-semibold transition-colors duration-300 hover:bg-secondary/50">
                Sign In
              </Link>
              <Link to="/signup" className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-shadow duration-300 hover:glow-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground p-2">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => {
                if (link.label === "Dashboard" && !user) return null;
                return (
                  <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors py-2 text-sm font-medium">
                    {link.label}
                  </Link>
                );
              })}
              <div className="h-px bg-border my-1" />
              
              {/* Mobile Buttons Logic */}
              <div className="flex flex-col gap-2 mt-1">
                {user ? (
                  <button onClick={handleLogout} className="px-5 py-2.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white text-sm font-semibold w-full transition-all flex items-center justify-center gap-2">
                    <LogOut size={18} /> Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="px-5 py-2.5 rounded-lg border border-border text-center text-foreground text-sm font-semibold w-full">Sign In</Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)} className="px-5 py-2.5 rounded-lg bg-primary text-center text-primary-foreground text-sm font-semibold w-full">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;