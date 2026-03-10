import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-card border-t border-border mt-auto relative z-10">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
                <span className="font-bold text-xl">S</span>
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-foreground">
                SecureBank
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
              Experience the future of seamless and secure online banking. Your financial journey starts here.
            </p>
            <div className="flex gap-4">
              <a target="_blank" href="https://www.facebook.com/azka.azeem.2025" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a target="_blank" href="https://x.com/AzkaAzeem1" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a target="_blank" href="https://www.instagram.com/azkaazeem_804/" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/azka-azeem-338390361/" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary text-sm transition-colors">Dashboard</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-bold mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
              <Shield className="text-primary mb-4" size={28} />
              <h4 className="text-foreground font-bold mb-2">100% Secure</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your data is protected with bank-grade 256-bit encryption.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SecureBank. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with <span className="text-red-500">❤️</span> by Azka Azeem</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;