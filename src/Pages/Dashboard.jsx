import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowDownLeft, ArrowUpRight, Send, Wallet, Activity, CreditCard, Hash, Loader2, AlertTriangle, X } from "lucide-react";
import { supabase } from "../supabaseClient";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setInitialData, updateBalance, addTransaction } from "../store/bankingSlice";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("User");
  const [userPin, setUserPin] = useState("----");

  // Forms State
  const [amount, setAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [loading, setLoading] = useState({ deposit: false, withdraw: false, transfer: false });
  const [activeTab, setActiveTab] = useState("deposit");

  // Popup State for Transfer Confirmation
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { balance, history } = useSelector((state) => state.banking);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();

    const channel = supabase.channel('realtime-banking')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, (payload) => {
        if (payload.new.balance !== undefined) {
          dispatch(setInitialData({ balance: payload.new.balance, history }));
        }
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, (payload) => {
        dispatch(addTransaction(payload.new));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      setUserName(session.user.user_metadata?.full_name || session.user.email.split('@')[0]);

      let { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).maybeSingle();

      let currentBalance = 0;
      let currentPin = profile?.pin;

      // EMAIL SAVE KARNE KA NAYA LOGIC
      if (!profile) {
        currentPin = Math.floor(1000 + Math.random() * 9000).toString();
        await supabase.from('profiles').insert([{ 
          id: session.user.id, 
          balance: 0, 
          pin: currentPin,
          email: session.user.email // <--- Yahan Email auto-save hoga
        }]);
      } else {
        currentBalance = profile.balance || 0;
        // Agar purani profile hai par email ya pin missing hai toh auto-update kardo
        if (!currentPin || !profile.email) {
          currentPin = currentPin || Math.floor(1000 + Math.random() * 9000).toString();
          await supabase.from('profiles').update({ 
            pin: currentPin,
            email: session.user.email // <--- Yahan Email auto-update hoga
          }).eq('id', session.user.id);
        }
      }

      setUserPin(currentPin);

      const { data: trans } = await supabase.from('transactions').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });

      dispatch(setInitialData({ balance: currentBalance, history: trans || [] }));
    }
  };

  const handleTransaction = async (type) => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return toast.error("Please enter a valid amount");

    let newBalance = type === 'deposit' ? balance + val : balance - val;
    if (type === 'withdraw' && val > balance) return toast.error("Insufficient balance!");

    setLoading({ ...loading, [type]: true });

    const { error: balError } = await supabase.from('profiles').update({ balance: newBalance }).eq('id', user.id);

    if (!balError) {
      await supabase.from('transactions').insert([{ user_id: user.id, type, amount: val }]);
      dispatch(updateBalance({ type, amount: val }));
      setAmount("");
      toast.success(`${type.toUpperCase()} Successful!`);
      fetchData();
    } else {
      toast.error(balError.message);
    }
    setLoading({ ...loading, [type]: false });
  };

  const initiateTransfer = () => {
    const val = parseFloat(transferAmount);
    const cleanEmail = receiverEmail.trim(); // <--- Spaces hata dega
    
    if (!val || val <= 0) return toast.error("Please enter a valid amount");
    if (!cleanEmail) return toast.error("Please enter receiver's email");
    if (cleanEmail === user.email) return toast.error("You cannot transfer to yourself");
    if (val > balance) return toast.error("Insufficient balance for transfer!");
    
    setShowConfirmModal(true);
  };

  const executeTransfer = async () => {
    setShowConfirmModal(false); 
    setLoading({ ...loading, transfer: true });
    
    const val = parseFloat(transferAmount);
    const cleanEmail = receiverEmail.trim(); // <--- Spaces hata dega

    try {
      const { data: receiverProfile, error: receiverError } = await supabase
        .from('profiles')
        .select('id, balance, email')
        .eq('email', cleanEmail) // <--- Clean email search hoga
        .maybeSingle();

      if (receiverError || !receiverProfile) throw new Error("Receiver not found! Unho ne abhi tak apna account setup nahi kiya.");

      const senderNewBalance = balance - val;
      await supabase.from('profiles').update({ balance: senderNewBalance }).eq('id', user.id);

      const receiverNewBalance = (receiverProfile.balance || 0) + val;
      await supabase.from('profiles').update({ balance: receiverNewBalance }).eq('id', receiverProfile.id);

      await supabase.from('transactions').insert([
        { user_id: user.id, type: 'transfer_out', amount: val, description: `To ${cleanEmail}` },
        { user_id: receiverProfile.id, type: 'transfer_in', amount: val, description: `From ${user.email}` }
      ]);

      setTransferAmount("");
      setReceiverEmail("");
      toast.success("Money transferred successfully!");
      fetchData();

    } catch (err) {
      toast.error(err.message);
    }

    setLoading({ ...loading, transfer: false });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 md:p-10 max-w-7xl mx-auto relative">
      
      {/* --- CONFIRMATION POPUP MODAL --- */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowConfirmModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-2xl z-10 text-center"
            >
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <AlertTriangle size={32} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2">Confirm Transfer</h3>
              
              <p className="text-muted-foreground mb-6">
                Are you sure you want to send <strong className="text-foreground">${Number(transferAmount).toFixed(2)}</strong> to <strong className="text-foreground">{receiverEmail.trim()}</strong>? This action cannot be undone.
              </p>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 h-12 rounded-xl font-bold text-foreground bg-secondary hover:bg-secondary/80 transition-all border border-border"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeTransfer}
                  className="flex-1 h-12 rounded-xl font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                >
                  Yes, Send Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* --- END POPUP --- */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-4xl md:text-5xl font-bold mb-2">
            Hello, <span className="text-primary capitalize">{userName}</span>
          </motion.h1>
          <p className="text-muted-foreground flex items-center gap-2">
            Welcome to your secure dashboard.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-6 py-3 rounded-2xl bg-secondary/50 border border-border flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Hash size={20} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Account PIN</p>
            <p className="text-xl font-mono font-bold tracking-widest text-foreground">{userPin}</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-card to-card/50 border border-border shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <p className="text-muted-foreground font-medium mb-1 flex items-center gap-2">
                  <Wallet size={18} /> Total Balance
                </p>
                <h2 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
                  <span className="text-primary">$</span>{Number(balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
              <div className="p-3 bg-secondary rounded-2xl text-muted-foreground">
                <Activity size={24} />
              </div>
            </div>

            <div className="flex gap-2 p-1 bg-secondary/50 rounded-2xl w-fit relative z-10">
              {['deposit', 'withdraw', 'transfer'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-background text-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <span>{tab}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 relative z-10 min-h-[140px]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'transfer' ? (
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <input
                        type="email"
                        value={receiverEmail}
                        onChange={(e) => setReceiverEmail(e.target.value)}
                        placeholder="Receiver's Email"
                        className="flex-[2] h-14 px-4 rounded-xl bg-background border border-border outline-none focus:border-primary text-base font-medium transition-all"
                      />
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                        <input
                          type="number"
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                          placeholder="Amount"
                          className="w-full h-14 pl-10 pr-4 rounded-xl bg-background border border-border outline-none focus:border-primary text-lg font-medium transition-all"
                        />
                      </div>
                    </div>
                    <button
                      onClick={initiateTransfer} 
                      disabled={loading.transfer}
                      className="w-full h-14 rounded-xl font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)]"
                    >
                      {loading.transfer ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                      <span>Send Money Securely</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-14 pl-10 pr-4 rounded-xl bg-background border border-border outline-none focus:border-primary text-lg font-medium transition-all"
                      />
                    </div>
                    <button
                      onClick={() => handleTransaction(activeTab)}
                      disabled={loading[activeTab]}
                      className={`h-14 px-8 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 min-w-[160px] ${activeTab === 'deposit' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                      {loading[activeTab] ? <Loader2 className="animate-spin" size={20} /> : activeTab === 'deposit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      <span className="capitalize">{activeTab}</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="rounded-3xl border border-border bg-card overflow-hidden shadow-lg flex flex-col h-[500px]"
        >
          <div className="p-6 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-md">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Clock size={20} className="text-primary" /> Recent Activity
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {history.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <CreditCard size={40} className="mb-4 opacity-20" />
                <p>No transactions yet.<br />Start by depositing some funds!</p>
              </div>
            ) : (
              history.map((tx) => {
                const isPositive = tx.type === 'deposit' || tx.type === 'transfer_in';
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    key={tx.id}
                    className="p-4 rounded-2xl bg-secondary/30 border border-border/50 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {isPositive ? <ArrowDownLeft size={22} /> : <ArrowUpRight size={22} />}
                      </div>
                      <div>
                        <span className="font-bold capitalize text-foreground flex items-center gap-2">
                          {tx.type.replace('_', ' ')}
                        </span>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(tx.created_at).toLocaleDateString()} {tx.description && `• ${tx.description}`}
                        </p>
                      </div>
                    </div>
                    <div className={`font-bold text-lg ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {isPositive ? '+' : '-'}${Number(tx.amount).toFixed(2)}
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;