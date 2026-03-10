import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative overflow-hidden px-6 text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-8 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <AlertTriangle size={48} />
        </div>
        
        <h1 className="text-7xl md:text-9xl font-bold font-heading text-foreground tracking-widest mb-4">
          4<span className="text-primary">0</span>4
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        
        <p className="text-muted-foreground max-w-md mb-8">
          Oops! The page you are looking for doesn't exist, has been moved, or you typed the wrong URL.
        </p>

        <Link to="/" className="h-14 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]">
          <Home size={20} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;