import React from 'react';

const LoginPage = ({ onSwitch }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(circle_at_top_right,_#1a1608_0%,_#000000_100%)] font-['Montserrat']">
      
      {/* Main Card Container */}
      <div className="max-w-lg w-full bg-[#111111] border border-[#d4af37]/20 p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm relative overflow-hidden">
        
        {/* Subtle Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#d4af37]/10 blur-[100px] rounded-full"></div>

        {/* Logo Section */}
        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center justify-center p-3 rounded-full border-2 border-[#d4af37] mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl text-[#d4af37] tracking-wide italic">
            Welcome
          </h1>
          <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-[0.3em] font-semibold">
            The Gold Standard Experience
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
          <div className="group">
            <label className="block text-[10px] font-bold text-[#d4af37] uppercase mb-1.5 ml-1 tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@luxury.com"
              className="w-full bg-[#1a1a1a] border border-gray-800 text-white px-4 py-3 rounded-lg outline-none transition-all duration-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 placeholder:text-gray-700"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] font-bold text-[#d4af37] uppercase mb-1.5 ml-1 tracking-wider">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#1a1a1a] border border-gray-800 text-white px-4 py-3 rounded-lg outline-none transition-all duration-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 placeholder:text-gray-700"
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center text-gray-500 cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="mr-2 w-3 h-3 accent-[#d4af37] bg-black border-gray-800" />
              Remember me
            </label>
            <a href="#" className="text-[#d4af37] hover:text-[#fcf6ba] transition-colors font-medium">
              Forgot Password?
            </a>
          </div>

          <button className="w-full py-3.5 rounded-lg text-black font-extrabold uppercase tracking-[0.15em] text-xs transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-[0_10px_20px_rgba(212,175,55,0.2)] bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:brightness-110">
            Sign In
          </button>
        </form>

        {/* Form Footer */}
        <div className="mt-10 text-center relative z-10 border-t border-gray-800/50 pt-6">
          <p className="text-gray-500 text-xs">
            New to the elite?
            <button
              onClick={onSwitch}
              className="ml-2 text-[#d4af37] font-bold hover:text-[#fcf6ba] transition-all underline-offset-4 hover:underline cursor-pointer"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  ); // Yahan return close hua
}; // Yahan component function close hua

export default LoginPage;