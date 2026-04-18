"use client";
export const runtime = 'edge';

import { useState, useEffect } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Search, Code2, Globe, Zap, Users, Moon, Sun, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { isSignedIn } = useUser();
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync theme with the HTML element for global CSS consistency
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`${isDark ? "bg-[#000] text-white" : "bg-[#fff] text-black"} min-h-screen transition-all duration-700 selection:bg-blue-600 selection:text-white font-sans`}>
      
      {/* --- GIANT NAVIGATION --- */}
      <nav className={`sticky top-0 z-50 backdrop-blur-3xl border-b ${isDark ? "border-white/5 bg-black/60" : "border-black/5 bg-white/60"} px-10 py-10 md:px-24`}>
        <div className="max-w-[2200px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="bg-blue-600 p-5 rounded-[2rem] shadow-[0_0_50px_rgba(37,99,235,0.4)] hover:rotate-12 transition-transform">
              <Code2 size={48} color="white" />
            </div>
            <span className="text-5xl font-black tracking-tighter leading-none italic">CODEPOOL</span>
          </div>

          <div className="hidden lg:flex items-center gap-16">
            {/* THEME TOGGLE WORKER */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`group flex items-center gap-4 px-6 py-4 rounded-3xl border-2 transition-all active:scale-90 ${isDark ? "bg-zinc-900 border-zinc-800 text-yellow-400" : "bg-zinc-100 border-zinc-200 text-blue-600"}`}
            >
              {isDark ? <Sun size={32} className="group-hover:rotate-180 transition-transform duration-500" /> : <Moon size={32} className="group-hover:-rotate-12 transition-transform duration-500" />}
              <span className="text-xl font-black uppercase tracking-widest">{isDark ? "Light" : "Dark"}</span>
            </button>
            
            {isSignedIn && (
              <Link href="/onboarding" className="text-2xl font-black hover:text-blue-500 transition-colors tracking-tighter">
                DASHBOARD
              </Link>
            )}
            
            <div className="scale-125">
              {isSignedIn ? (
                <UserButton appearance={{ elements: { userButtonAvatarBox: "h-16 w-16 border-2 border-blue-500" } }} />
              ) : (
                <SignInButton mode="modal">
                  <button className={`px-12 py-6 rounded-[2rem] font-black text-2xl tracking-tight transition-all active:scale-95 ${isDark ? "bg-white text-black hover:bg-blue-600 hover:text-white" : "bg-black text-white hover:bg-blue-600"}`}>
                    GET STARTED
                  </button>
                </SignInButton>
              )}
            </div>
          </div>

          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={56} /> : <Menu size={56} />}
          </button>
        </div>
      </nav>

      {/* --- HERO & MEGA SEARCH --- */}
      <main className="px-10 md:px-24 py-40 md:py-72 max-w-[2200px] mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className={`inline-flex items-center gap-5 px-10 py-4 rounded-full text-base font-black uppercase tracking-[0.5em] mb-20 border-2 ${isDark ? "bg-blue-500/5 border-blue-500/20 text-blue-400" : "bg-blue-50 border-blue-100 text-blue-600"}`}>
            <Zap size={24} fill="currentColor" /> Verified Human Engineering 
          </div>
          
          <h1 className="text-[9rem] md:text-[18rem] font-black tracking-[-0.06em] leading-[0.7] mb-32 uppercase select-none">
            Find <br />
            <span className={isDark ? "text-zinc-900" : "text-zinc-100"}>The One.</span>
          </h1>

          {/* THE MEGA SEARCH BAR */}
          <form className="w-full max-w-7xl relative group">
            <Search className={`absolute left-16 top-1/2 -translate-y-1/2 transition-all duration-700 ${isDark ? "text-zinc-800 group-focus-within:text-blue-500 group-focus-within:scale-110" : "text-zinc-200 group-focus-within:text-blue-600"}`} size={64} />
            <input 
              name="q"
              placeholder="Search by tech or talent..."
              className={`w-full py-20 pl-40 pr-16 rounded-[5rem] text-4xl md:text-7xl font-bold focus:outline-none focus:ring-[20px] transition-all border-4 shadow-3xl ${
                isDark 
                ? "bg-zinc-950 border-zinc-900 text-white focus:ring-blue-500/5 focus:border-blue-500 placeholder:text-zinc-900" 
                : "bg-white border-zinc-100 text-black focus:ring-blue-500/5 focus:border-blue-600 placeholder:text-zinc-100"
              }`}
            />
            <button type="submit" className="absolute right-10 top-1/2 -translate-y-1/2 bg-blue-600 p-8 rounded-[3.5rem] text-white hover:scale-105 active:scale-95 transition-all hidden md:block">
              <ArrowRight size={56} />
            </button>
          </form>
        </div>

        {/* --- GRID (Spaced Out) --- */}
        <div className="mt-80 grid grid-cols-1 lg:grid-cols-2 gap-24">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className={`p-24 rounded-[6rem] border-4 transition-all duration-1000 flex flex-col min-h-[800px] group ${
                isDark 
                ? "bg-zinc-950 border-zinc-900 hover:border-blue-500/30" 
                : "bg-white border-zinc-100 hover:border-blue-600 shadow-2xl"
              }`}
            >
              <div className="flex justify-between items-start mb-24">
                <div className={`h-40 w-40 rounded-[3rem] flex items-center justify-center transition-all group-hover:-rotate-6 ${isDark ? "bg-zinc-900 text-white" : "bg-zinc-100 text-black"}`}>
                  <Users size={80} />
                </div>
                <div className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-2xl tracking-tight">
                  HUMAN_VERIFIED
                </div>
              </div>
              
              <h3 className="text-7xl md:text-8xl font-black mb-12 leading-none uppercase tracking-tighter">Contributor_{i}</h3>
              <p className={`text-4xl leading-tight mb-auto font-medium ${isDark ? "text-zinc-700 group-hover:text-zinc-400" : "text-zinc-300 group-hover:text-zinc-600"}`}>
                Architecting hyper-scale protocols. Specialist in low-latency systems and distributed state machines.
              </p>

              <div className="flex items-center justify-between mt-24">
                <div className="space-y-4">
                  <span className={`text-lg font-black uppercase tracking-[0.6em] ${isDark ? "text-zinc-800" : "text-zinc-200"}`}>Origin</span>
                  <div className="text-3xl font-black text-blue-500 flex items-center gap-4">
                    <div className="h-5 w-5 bg-blue-500 rounded-full animate-pulse" />
                    LIVE_NODE
                  </div>
                </div>
                <button className={`p-10 rounded-[4rem] transition-all hover:scale-110 active:scale-75 ${isDark ? "bg-white text-black hover:bg-blue-600 hover:text-white" : "bg-black text-white hover:bg-blue-600"}`}>
                  <Globe size={64} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- MAXIMALIST FOOTER --- */}
      <footer className={`mt-80 border-t-8 py-40 px-12 md:px-24 ${isDark ? "border-white/5 bg-zinc-950" : "border-black/5 bg-zinc-50"}`}>
        <div className="max-w-[2200px] mx-auto flex flex-col xl:flex-row justify-between items-center gap-32">
          <p className="font-black text-6xl tracking-tighter uppercase italic">CodePool.26</p>
          <div className="flex flex-wrap justify-center gap-24 text-3xl font-black text-zinc-700">
            <span className="hover:text-blue-500 cursor-pointer">NETWORK</span>
            <span className="hover:text-blue-500 cursor-pointer">NODES</span>
            <span className="hover:text-blue-500 cursor-pointer">API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
