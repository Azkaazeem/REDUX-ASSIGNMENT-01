import React from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl bg-card border border-border text-center glow-border"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to Dashboard 🏦</h1>
        <p className="text-muted-foreground">Aapka secure banking portal successfully login ho chuka hai!</p>
      </motion.div>
    </div>
  );
};

export default Dashboard;