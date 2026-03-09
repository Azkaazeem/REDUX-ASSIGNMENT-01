import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">The Future of Banking is Here</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight text-foreground"
        >
          Manage Your Money <br className="hidden md:block" />
          with <span className="text-gradient">Confidence</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          SecureBank provides a seamless, secure, and intuitive banking experience. 
          Track your transactions, manage your balance, and take control of your financial future.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link to="/signup" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:glow-btn transition-all flex items-center justify-center gap-2 group">
            Get Started Free
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          <Link to="/login" className="px-8 py-4 rounded-xl border border-border bg-card text-foreground font-bold text-lg hover:bg-secondary/50 transition-colors flex items-center justify-center">
            Sign In to Account
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Shield className="text-primary" size={32} />, title: "Bank-Grade Security", desc: "Your data and funds are protected by industry-leading encryption and security protocols." },
            { icon: <Zap className="text-blue-500" size={32} />, title: "Lightning Fast", desc: "Experience instant deposits and withdrawals. No more waiting for days to access your money." },
            { icon: <Globe className="text-purple-500" size={32} />, title: "Access Anywhere", desc: "Manage your finances from anywhere in the world, on any device, 24/7." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;