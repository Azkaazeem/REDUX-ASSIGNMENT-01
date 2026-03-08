import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowUpRight, ArrowDownLeft, Wallet, Clock } from "lucide-react";
import { supabase } from "../supabaseClient";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("User");
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      setUserName(session.user.user_metadata?.full_name || session.user.email.split('@')[0]);

      // Database se balance fetch karein
      const { data: profile } = await supabase.from('profiles').select('balance').eq('id', session.user.id).single();
      if (profile) setBalance(profile.balance);

      // Database se transactions fetch karein
      const { data: trans } = await supabase.from('transactions').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
      if (trans) setHistory(trans);
    }
  };

  // Transaction handle karne ka function (e.preventDefault ke saath)
  const handleTransaction = async (e, type) => {
    if (e) e.preventDefault(); // Page refresh rokne ke liye

    const val = parseFloat(amount);
    if (!val || val <= 0) return toast.error("Please enter a valid amount");

    let newBalance = type === 'deposit' ? balance + val : balance - val;
    if (type === 'withdraw' && val > balance) return toast.error("Insufficient balance!");

    // 1. Database mein Update karein
    const { error: balError } = await supabase.from('profiles').update({ balance: newBalance }).eq('id', user.id);
    
    if (!balError) {
      // 2. Transaction table mein entry daalein
      await supabase.from('transactions').insert([{ user_id: user.id, type, amount: val }]);

      setBalance(newBalance);
      setAmount("");
      
      // 3. History refresh karein
      fetchData();
      toast.success(`${type.toUpperCase()} Successful!`);
    } else {
      toast.error("Database Error! Make sure tables exist.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Welcome back, <span className="text-primary capitalize">{userName}</span></h1>

      {/* Main Balance Card */}
      <div className="rounded-2xl p-8 bg-card border border-border shadow-xl">
        <p className="text-muted-foreground mb-1 font-medium">Available Balance</p>
        <h2 className="text-5xl font-bold mb-8 text-foreground">${balance.toFixed(2)}</h2>
        
        {/* Input and Buttons Form */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row gap-4 max-w-md">
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="0.00" 
            className="flex-1 p-3 rounded-xl border bg-background outline-none focus:ring-2 focus:ring-primary text-foreground" 
          />
          <div className="flex gap-2">
            {/* type="button" refresh rokne mein mazeed madad karta hai */}
            <button type="button" onClick={(e) => handleTransaction(e, 'deposit')} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all">
              Deposit
            </button>
            <button type="button" onClick={(e) => handleTransaction(e, 'withdraw')} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all">
              Withdraw
            </button>
          </div>
        </form>
      </div>

      {/* Transactions History List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex items-center gap-2 font-bold text-lg text-foreground">
          <Clock size={20} /> Recent Transactions
        </div>
        <div className="divide-y divide-border">
          {history.length === 0 ? (
            <p className="p-10 text-center text-muted-foreground">No transactions yet.</p>
          ) : (
            history.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'deposit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {tx.type === 'deposit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                    <span className="font-medium capitalize text-foreground">{tx.type}</span>
                    <p className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`font-bold ${tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                  {tx.type === 'deposit' ? '+' : '-'}${tx.amount}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;