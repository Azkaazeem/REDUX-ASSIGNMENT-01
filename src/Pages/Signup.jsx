import React, { useState } from 'react';

const SignUpPage = ({ onSwitch }) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(circle_at_top_right,_#1a1608_0%,_#000000_100%)] font-['Montserrat']">
      
      {/* Main Card Container */}
      <div className="max-w-lg w-full bg-[#111111] border border-[#d4af37]/20 p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm relative overflow-hidden">
        
        {/* Subtle Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#d4af37]/10 blur-[100px] rounded-full"></div>

        {/* Profile Image Input (Golden Circle) */}
        <div className="text-center mb-8 relative z-10 flex flex-col items-center">
          <label htmlFor="profileImageInput" className="cursor-pointer relative group">
            <div className="w-24 h-24 rounded-full border-2 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)] flex items-center justify-center overflow-hidden bg-[#1a1a1a] transition-all group-hover:border-[#fcf6ba]">
              
              {profileImage ? (
                <img src={profileImage} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}

              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </div>
            </div>
          </label>
          <input id="profileImageInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          <p className="text-[#d4af37] text-[10px] mt-2 font-bold uppercase tracking-widest">Upload Identity</p>
        </div>

        {/* Signup Form */}
        <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
          <div className="group">
            <label className="block text-[10px] font-bold text-[#d4af37] uppercase mb-1 ml-1 tracking-wider">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full bg-[#1a1a1a] border border-gray-800 text-white px-4 py-2.5 rounded-lg outline-none transition-all duration-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 placeholder:text-gray-700" />
          </div>

          <div className="group">
            <label className="block text-[10px] font-bold text-[#d4af37] uppercase mb-1 ml-1 tracking-wider">Email Address</label>
            <input type="email" placeholder="name@luxury.com" className="w-full bg-[#1a1a1a] border border-gray-800 text-white px-4 py-2.5 rounded-lg outline-none transition-all duration-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 placeholder:text-gray-700" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="group">
              <label className="block text-[10px] font-bold text-[#d4af37] uppercase mb-1 ml-1 tracking-wider">Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#1a1a1a] border border-gray-800 text-white px-4 py-2.5 rounded-lg outline-none transition-all duration-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 placeholder:text-gray-700" />
            </div>
            <div className="group">
              <label className="block text-[10px] font-bold text-[#d4af37] uppercase mb-1 ml-1 tracking-wider">Confirm</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#1a1a1a] border border-gray-800 text-white px-4 py-2.5 rounded-lg outline-none transition-all duration-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 placeholder:text-gray-700" />
            </div>
          </div>

          <button className="w-full py-3.5 rounded-lg text-black font-extrabold uppercase tracking-[0.15em] text-xs transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-[0_10px_20px_rgba(212,175,55,0.2)] bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:brightness-110 mt-4">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center relative z-10 border-t border-gray-800/50 pt-6">
          <p className="text-gray-500 text-xs">
            Already a member?
            <button 
              onClick={onSwitch} 
              className="ml-2 text-[#d4af37] font-bold hover:text-[#fcf6ba] transition-all underline-offset-4 hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;