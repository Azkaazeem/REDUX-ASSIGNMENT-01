import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Code, Award, Github, Linkedin, Phone } from 'lucide-react';
import MyPic from "../assets/my-pic.jpeg"

const About = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-20">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 pt-24 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold font-heading mb-6 text-foreground"
                    >
                        About <span className="text-primary">SecureBank</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        We are redefining the future of digital banking. Our mission is to provide a seamless,
                        secure, and modern financial experience for everyone.
                    </motion.p>
                </div>

                {/* Vision & Mission Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-colors"
                    >
                        <Target className="text-primary mb-6" size={40} />
                        <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            To empower individuals with full control over their finances through cutting-edge technology,
                            ensuring every transaction is fast, transparent, and completely secure.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-card border border-border hover:border-blue-500/30 transition-colors"
                    >
                        <Shield className="text-blue-500 mb-6" size={40} />
                        <h2 className="text-2xl font-bold mb-4 text-foreground">Our Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We employ bank-grade encryption and advanced authentication protocols to ensure your data
                            and funds are protected against all modern digital threats.
                        </p>
                    </motion.div>
                </div>

                {/* Founder & Developer Section */}
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground"
                    >
                        Meet the <span className="text-primary">Creator</span>
                    </motion.h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        The vision and technical expertise behind SecureBank.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-card rounded-3xl border border-border overflow-hidden shadow-lg flex flex-col md:flex-row items-center"
                >
                    {/* Profile Image - Yahan aap apni tasveer ka link daal sakte hain */}
                    <div className="w-full md:w-2/5 h-[400px] md:h-auto relative">
                        <img
                            src= {MyPic
                                
                            }
                            alt="Azka - Founder & Developer"
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay for style */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:hidden" />
                    </div>

                    {/* Profile Details */}
                    <div className="w-full md:w-3/5 p-8 md:p-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
                            <Code size={16} /> Founder & Lead Developer
                        </div>

                        <h3 className="text-3xl font-bold text-foreground mb-2">Azka Azeem</h3>
                        <p className="text-lg text-primary mb-6">Frontend Developer</p>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            I built SecureBank to demonstrate how modern web technologies like React, Tailwind CSS,
                            and Supabase can come together to create a robust and user-friendly banking interface.
                            My passion lies in crafting seamless user experiences and writing clean, scalable code.
                        </p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            {['React', 'JavaScript', 'Tailwind CSS', 'Supabase', 'HTML/CSS', 'Redux'].map((skill) => (
                                <span key={skill} className="px-4 py-2 rounded-xl bg-secondary/50 border border-border text-sm font-medium text-foreground">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 pt-6 border-t border-border">
                            <a target='_blank' href="https://github.com/Azkaazeem" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                                <Github size={18} />
                            </a>
                            <a target='_blank' href="https://www.linkedin.com/in/azka-azeem-338390361/" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-blue-600 hover:text-white transition-all">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://wa.me/923161132149?text=Hi%20Azka%20Azeem,%20I%20am%20contacting%20you%20from%20SecureBank." target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-green-500 hover:text-white transition-all">
                                <Phone size={18} />
                            </a>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default About;