"use client";
export const runtime = 'edge';

import { useState, useEffect } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Search, Code2, Rocket, Globe, Zap, Users, Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { isSignedIn, user } = useUser();
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`${isDark ? "bg-[#050505] text-white" : "bg-[#fcfcfc] text-black"} min-h-screen transition-colors duration-500 selection:bg-blue-500/30`}>
      
      {/* --- HEADER --- */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b ${isDark ? "border-white/5 bg-black/50" : "border-black/5 bg-white/50"} px-6 py-6 md:px-12`}>
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
              <Code2 size={32} color="white" />
            </div>
            <span className="text-3xl md:text-4xl font-black tracking-tighter">CODEPOOL</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-3 rounded-2xl border transition-all ${isDark ? "bg-zinc-900 border-zinc-800 text-yellow-400 hover:bg-zinc-800" : "bg-zinc-100 border-zinc-200 text-blue-600 hover:bg-zinc-200"}`}
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            
            {isSignedIn && (
              <Link href="/onboarding" className={`text-lg font-bold transition ${isDark ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-black"}`}>
                Dashboard
              </Link>
            )}
            
            {isSignedIn ? (
              <UserButton appearance={{ elements: { userButtonAvatarBox: "h-12 w-12" } }} />
            ) : (
              <SignInButton mode="modal">
                <button className={`px-8 py-4 rounded-2xl font-black text-lg transition-transform active:scale-95 ${isDark ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"}`}>
                  SIGN IN
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 flex flex-col p-10 gap-8 lg:hidden ${isDark ? "bg-black" : "bg-white"}`}>
          <button onClick={() => setIsDark(!isDark)} className="flex items-center gap-4 text-2xl font-bold">
            {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />} 
            Theme
          </button>
          {isSignedIn && <Link href="/onboarding" className="text-4xl font-black">DASHBOARD</Link>}
          <div className="mt-auto">
            {isSignedIn ? <UserButton /> : <SignInButton mode="modal"><button className="text-4xl font-black underline">SIGN IN</button></SignInButton>}
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <main className="px-6 md:px-12 py-20 md:py-40 max-w-[1800px] mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full text-sm font-black uppercase tracking-[0.3em] mb-12 border ${isDark ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-blue-50 border-blue-100 text-blue-600"}`}>
            <Zap size={18} fill="currentColor" /> Global Engineering Network
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tightest leading-[0.8] mb-16">
            CODE <br className="hidden md:block" />
            <span className={isDark ? "text-zinc-600" : "text-zinc-300"}>POOL</span>
          </h1>

          <div className="w-full max-w-4xl relative group">
            <Search className={`absolute left-8 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-zinc-600 group-focus-within:text-blue-500" : "text-zinc-400"}`} size={32} />
            <input 
              placeholder="Search talent, tech, or project name..."
              className={`w-full py-10 pl-20 pr-10 rounded-[3rem] text-2xl md:text-3xl font-medium focus:outline-none focus:ring-4 transition-all border-2 ${
                isDark 
                ? "bg-zinc-900/40 border-zinc-800 text-white focus:ring-blue-500/20 focus:border-blue-500" 
                : "bg-white border-zinc-200 text-black focus:ring-blue-500/10 focus:border-blue-600 shadow-2xl"
              }`}
            />
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`p-12 rounded-[4rem] border-2 transition-all duration-500 flex flex-col min-h-[500px] ${
                isDark 
                ? "bg-zinc-900/20 border-zinc-800 hover:border-blue-500/50" 
                : "bg-white border-zinc-100 hover:border-blue-600 shadow-xl"
              }`}
            >
              <div className="flex justify-between items-start mb-12">
                <div className={`h-20 w-20 rounded-3xl flex items-center justify-center transition-colors ${isDark ? "bg-zinc-800 text-white" : "bg-zinc-100 text-black"}`}>
                  <Users size={40} />
                </div>
                <div className="bg-blue-600 text-white px-5 py-2 rounded-2xl font-black text-sm tracking-tighter">
                  MATCH: 98%
                </div>
              </div>
              
              <h3 className="text-4xl font-black mb-6 uppercase">Dev Node _{i}</h3>
              <p className={`text-xl leading-relaxed mb-auto font-medium ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                Full-stack engineer specialized in distributed systems and high-concurrency Rust backends. 
                Currently exploring AI-driven infrastructure.
              </p>

              <div className="flex items-center justify-between mt-12">
                <div className="flex flex-col">
                  <span className={`text-xs font-black uppercase tracking-widest ${isDark ? "text-zinc-700" : "text-zinc-300"}`}>Status</span>
                  <span className="font-bold">Available</span>
                </div>
                <button className={`p-5 rounded-3xl transition-all ${isDark ? "bg-white text-black hover:bg-blue-500 hover:text-white" : "bg-black text-white hover:bg-blue-600"}`}>
                  <Globe size={28} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className={`mt-40 border-t py-20 px-12 ${isDark ? "border-white/5 bg-zinc-950" : "border-black/5 bg-zinc-50"}`}>
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="font-black text-xl tracking-tighter">© 2026 CODEPOOL EDGE</p>
          <div className="flex gap-12 font-bold text-zinc-500">
            <span className="hover:text-blue-500 cursor-pointer">PRIVACY</span>
            <span className="hover:text-blue-500 cursor-pointer">TERMS</span>
            <span className="hover:text-blue-500 cursor-pointer">API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
