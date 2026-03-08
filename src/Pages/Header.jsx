import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Blog", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo - Left Side */}
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight">
          <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-sm">
            C
          </span>
          <span className="text-foreground">
            Coin<span className="text-primary">core</span>
          </span>
        </Link>

        {/* Desktop Nav - Middle */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-3/4" />
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons - Right Side */}
        <div className="hidden md:flex gap-3">
          <Link to="/login" className="px-5 py-2 rounded-lg border border-border text-foreground text-sm font-semibold transition-colors duration-300 hover:bg-secondary/50">
            Sign In
          </Link>
          <Link to="/signup" className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-shadow duration-300 hover:glow-btn">
            Sign Up
          </Link>
        </div>

        {/* Mobile Toggle (Hamburger) - Right Side on Mobile */}
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
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {/* Mobile 4 Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Divider */}
              <div className="h-px bg-border my-1" />

              {/* Mobile 2 Auth Buttons */}
              <div className="flex flex-col gap-2 mt-1">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="px-5 py-2.5 rounded-lg border border-border text-center text-foreground text-sm font-semibold w-full transition-colors hover:bg-secondary/50">
                  Sign In
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="px-5 py-2.5 rounded-lg bg-primary text-center text-primary-foreground text-sm font-semibold w-full transition-shadow hover:glow-btn">
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;