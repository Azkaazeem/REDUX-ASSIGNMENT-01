import React, { useEffect, useState } from "react";
import { Clock, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { supabase } from "../supabaseClient";
import { toast } from "sonner";
// Redux Hooks aur Actions import karein
import { useSelector, useDispatch } from "react-redux";
import { setInitialData, updateBalance, addTransaction } from "../store/bankingSlice";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("User");
  const [amount, setAmount] = useState("");

  // Redux se balance aur history fetch karein
  const { balance, history } = useSelector((state) => state.banking);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      setUserName(session.user.user_metadata?.full_name || session.user.email.split('@')[0]);

      let currentBalance = 0;
      let currentHistory = [];

      // 1. Supabase se Profile (Balance) fetch karein
      const { data: profile } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', session.user.id)
        .maybeSingle();
        
      if (profile && profile.balance != null) {
        currentBalance = Number(profile.balance);
      }

      // 2. Supabase se Transactions (History) fetch karein
      const { data: trans } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
        
      if (trans) {
        currentHistory = trans;
      }

      // 3. Redux Store ko Initial Data se update karein
      dispatch(setInitialData({ balance: currentBalance, history: currentHistory }));
    }
  };

  const handleTransaction = async (e, type) => {
    if (e) e.preventDefault(); 

    const val = parseFloat(amount);
    if (!val || val <= 0) return toast.error("Please enter a valid amount");

    let newBalance = type === 'deposit' ? balance + val : balance - val;
    if (type === 'withdraw' && val > balance) return toast.error("Insufficient balance!");

    // 1. Database (Supabase) mein Profile update karein
    const { error: balError } = await supabase
      .from('profiles')
      .upsert({ id: user.id, balance: newBalance });
    
    if (!balError) {
      // 2. Database mein Transaction insert karein aur return karwayein
      const { data: insertedTx, error: txError } = await supabase
        .from('transactions')
        .insert([{ user_id: user.id, type, amount: val }])
        .select() // .select() isliye lagaya taa ke DB naya ID aur created_at wapis bhej de
        .single();

      if (txError) return toast.error("Transaction Error: " + txError.message);

      // 3. REDUX State ko update karein (foran UI change karne ke liye)
      dispatch(updateBalance({ type, amount: val }));
      
      // Agar db se return aaya hai toh wo pass karein, warna local object bana lein
      if (insertedTx) {
          dispatch(addTransaction(insertedTx));
      } else {
          dispatch(addTransaction({ id: Date.now(), type, amount: val, created_at: new Date().toISOString() }));
      }

      setAmount("");
      toast.success(`${type.toUpperCase()} Successful!`);
    } else {
      toast.error(balError.message || "Database Error! Make sure tables exist.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Welcome back, <span className="text-primary capitalize">{userName}</span></h1>

      <div className="rounded-2xl p-8 bg-card border border-border shadow-xl">
        <p className="text-muted-foreground mb-1 font-medium">Available Balance</p>
        <h2 className="text-5xl font-bold mb-8 text-foreground">${Number(balance || 0).toFixed(2)}</h2>
        
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row gap-4 max-w-md">
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="0.00" 
            className="flex-1 p-3 rounded-xl border bg-background outline-none focus:ring-2 focus:ring-primary text-foreground" 
          />
          <div className="flex gap-2">
            <button type="button" onClick={(e) => handleTransaction(e, 'deposit')} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all">
              Deposit
            </button>
            <button type="button" onClick={(e) => handleTransaction(e, 'withdraw')} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all">
              Withdraw
            </button>
          </div>
        </form>
      </div>

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