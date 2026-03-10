import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Popup State
  const [popup, setPopup] = useState({
    isOpen: false,
    type: 'success', // 'success' ya 'error'
    message: '',
    isDevError: false // Developer error check karne ke liye
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. User Input Error Check
    if (!formData.name || !formData.email || !formData.message) {
      setPopup({
        isOpen: true,
        type: 'error',
        message: "Please ensure all required fields are filled out correctly before submitting.",
        isDevError: false
      });
      return;
    }

    setLoading(true);

    try {
      // Supabase DB Insert
      const { error } = await supabase
        .from('BankContact')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            subject: formData.subject, 
            message: formData.message 
          }
        ]);

      // Agar Supabase ne error return kiya
      if (error) {
        throw error; // Isko catch block mein bhej do
      }

      // 3. Success (Agar koi error nahi aaya)
      setPopup({
        isOpen: true,
        type: 'success',
        message: "Thank you for reaching out! We have received your message and our team will get back to you shortly.",
        isDevError: false
      });
      
      // Form fields clear kar dein
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (err) {
      // 2. Developer/Network Error (Jaise Failed to fetch)
      setPopup({
        isOpen: true,
        type: 'error',
        message: `System Error: ${err.message}. Please check your database connection.`,
        isDevError: true
      });
    } finally {
      // Chahe success ho ya error, loading ko false karna zaroori hai
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      
      {/* --- POPUP MODAL --- */}
      <AnimatePresence>
        {popup.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-2xl z-10 text-center"
            >
              <button 
                onClick={closePopup}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex justify-center mb-6">
                {popup.type === 'success' ? (
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <CheckCircle2 size={32} />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                    <AlertCircle size={32} />
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-3">
                {popup.type === 'success' ? 'Success!' : 'Oops!'}
              </h3>
              
              <p className={`text-sm mb-8 ${popup.isDevError ? 'text-red-400 font-mono bg-red-500/10 p-3 rounded-lg text-left overflow-x-auto' : 'text-muted-foreground'}`}>
                {popup.message}
              </p>

              <button 
                onClick={closePopup}
                className={`w-full h-12 rounded-xl font-bold text-white transition-all ${
                  popup.type === 'success' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {popup.type === 'success' ? 'Continue' : 'Try Again'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* --- END POPUP --- */}


      {/* Background Effects */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6 text-foreground"
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Have a question or need assistance? Fill out the form below and our team will get back to you as soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Contact Information (Left Side) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Head Office</h4>
                    <p className="text-muted-foreground text-sm mt-1">123 SecureBank Tower, Tech District, Karachi, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email Us</h4>
                    <p className="text-muted-foreground text-sm mt-1">support@securebank.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Call Us</h4>
                    <p className="text-muted-foreground text-sm mt-1">+92 316 1132149</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Right Side) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-card border border-border shadow-lg relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className="w-full h-12 px-4 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    className="w-full h-12 px-4 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?" 
                  className="w-full h-12 px-4 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-all" 
                />
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-sm font-medium text-foreground">Message *</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..." 
                  rows="5"
                  className="w-full p-4 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-all resize-none" 
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                type="submit" 
                disabled={loading}
                className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-70 transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] relative z-0"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send size={20} />}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;