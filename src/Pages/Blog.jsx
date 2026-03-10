import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, ChevronRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Future of Digital Banking in 2026",
    excerpt: "Explore how artificial intelligence and blockchain are reshaping the way we manage our finances daily.",
    category: "Technology",
    author: "Sarah Jenkins",
    date: "Mar 10, 2026",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "5 Essential Tips to Protect Your Online Account",
    excerpt: "Cybersecurity is more important than ever. Learn the best practices to keep your banking details safe from hackers.",
    category: "Security",
    author: "David Chen",
    date: "Mar 05, 2026",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "How to Build a High-Yield Savings Strategy",
    excerpt: "Stop leaving money on the table. Discover how to maximize your returns with our step-by-step savings guide.",
    category: "Finance",
    author: "Emily Wong",
    date: "Feb 28, 2026",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Understanding Cryptocurrencies: A Beginner's Guide",
    excerpt: "Bitcoin, Ethereum, and beyond. Everything you need to know before making your first digital investment.",
    category: "Investment",
    author: "Michael Ross",
    date: "Feb 15, 2026",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "SecureBank Announces New Zero-Fee Policy",
    excerpt: "We are thrilled to announce that all internal transfers will now be completely free for all our users.",
    category: "Company News",
    author: "SecureBank Team",
    date: "Feb 02, 2026",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Why You Should Start Investing in Your 20s",
    excerpt: "Compound interest is the eighth wonder of the world. Learn why starting early is the key to financial freedom.",
    category: "Finance",
    author: "Sarah Jenkins",
    date: "Jan 20, 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const categories = ["All", "Technology", "Security", "Finance", "Investment", "Company News"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6 text-foreground"
          >
            Insights & <span className="text-primary">News</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Stay updated with the latest trends in digital banking, personal finance tips, and news from SecureBank.
          </motion.p>
        </div>

        {/* Filters and Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 relative z-10"
        >
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:border-primary transition-all shadow-sm"
            />
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-colors shadow-sm"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-bold text-foreground border border-border">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  <button className="flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all mt-auto w-fit">
                    Read Article <ArrowRight size={16} />
                  </button>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-muted-foreground">No articles found matching your search.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Blog;