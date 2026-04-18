"use client";
export const runtime = 'edge';

import { useState, useEffect } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Search, Code2, Globe, Zap, Users, Moon, Sun, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { isSignedIn } = useUser();
  const [isDark, setIsDark] = useState(true);

  // FIX: This effect ensures the theme actually changes globally
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen transition-all duration-700 bg-white dark:bg-black text-black dark:text-white selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* --- MEGA NAVIGATION --- */}
      <nav className="sticky top-0 z-50 backdrop-blur-3xl border-b border-black/5 dark:border-white/5 bg-white/70 dark:bg-black/70 px-8 py-10 md:px-20">
        <div className="max-w-[2500px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="bg-blue-600 p-5 rounded-[2rem] shadow-[0_0_60px_rgba(37,99,235,0.4)] hover:scale-110 transition-transform">
              <Code2 size={48} color="white" />
            </div>
            <span className="text-4xl md:text-6xl font-black tracking-tightest leading-none italic uppercase">CODEPOOL</span>
          </div>

          <div className="flex items-center gap-8 md:gap-16">
            {/* THE WORKING THEME TOGGLE */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="group flex items-center gap-4 px-6 py-4 rounded-[2rem] border-4 transition-all active:scale-90 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
            >
              {isDark ? (
                <Sun size={32} className="text-yellow-400 group-hover:rotate-180 transition-transform duration-700" />
              ) : (
                <Moon size={32} className="text-blue-600 group-hover:-rotate-12 transition-transform duration-500" />
              )}
              <span className="hidden md:inline text-xl font-black tracking-widest uppercase">{isDark ? "Light" : "Dark"}</span>
            </button>
            
            <div className="scale-125 md:scale-[1.8] flex items-center gap-6 md:gap-12">
              {isSignedIn && (
                <Link href="/onboarding" className="hidden sm:block text-xl font-black hover:text-blue-500 transition-colors uppercase tracking-tighter">
                  DASHBOARD
                </Link>
              )}
              {isSignedIn ? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <button className="px-10 py-5 rounded-[1.8rem] font-black text-xl tracking-tight transition-all bg-black dark:bg-white text-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white">
                    JOIN
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO & GIGA SEARCH --- */}
      <main className="px-8 md:px-20 py-40 md:py-80 max-w-[2500px] mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-5 px-10 py-4 rounded-full text-base font-black uppercase tracking-[0.5em] mb-20 border-4 border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-600/5 text-blue-600 dark:text-blue-400">
            <Zap size={24} fill="currentColor" /> Verified Human Talent
          </div>
          
          <h1 className="text-[8rem] md:text-[20rem] font-black tracking-tightest leading-[0.75] mb-40 uppercase select-none">
            RAW <br />
            <span className="text-zinc-100 dark:text-zinc-900">POWER.</span>
          </h1>

          {/* THE MEGA SEARCH BAR */}
          <form className="w-full max-w-[100rem] relative group">
            <Search className="absolute left-16 md:left-24 top-1/2 -translate-y-1/2 transition-all duration-700 text-zinc-300 dark:text-zinc-800 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500" size={80} />
            <input 
              name="q"
              placeholder="Search by skill..."
              className="w-full py-24 md:py-32 pl-36 md:pl-56 pr-20 rounded-[5rem] md:rounded-[7rem] text-4xl md:text-8xl font-black focus:outline-none focus:ring-[30px] transition-all border-8 shadow-4xl bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-900 text-black dark:text-white focus:ring-blue-500/10 placeholder:text-zinc-100 dark:placeholder:text-zinc-900"
            />
            <button type="submit" className="absolute right-12 top-1/2 -translate-y-1/2 bg-blue-600 p-12 rounded-[4rem] text-white hover:scale-110 active:scale-90 transition-all hidden xl:block shadow-2xl">
              <ArrowRight size={80} />
            </button>
          </form>
        </div>

        {/* --- GRID (Spaced Out) --- */}
        <div className="mt-[40rem] grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* After TRUNCATE, this will be empty until new humans join */}
          <div className="col-span-full text-center opacity-10 py-80 grayscale">
            <Users size={250} className="mx-auto mb-16" />
            <h2 className="text-[8rem] md:text-[12rem] font-black italic leading-none">POOL_VACANT</h2>
            <p className="text-4xl font-bold mt-8 tracking-[1em]">AWAITING HUMAN NODES</p>
          </div>
        </div>
      </main>

      {/* --- GIANT FOOTER --- */}
      <footer className="mt-80 border-t-8 border-black/5 dark:border-white/5 py-60 px-24">
        <div className="max-w-[2500px] mx-auto flex flex-col xl:flex-row justify-between items-center gap-40">
          <p className="font-black text-6xl md:text-9xl tracking-tightest uppercase italic opacity-20 dark:opacity-5 select-none">CodePool</p>
          <div className="flex flex-wrap justify-center gap-24 text-4xl font-black text-zinc-300 dark:text-zinc-800">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">DIRECTORY</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">API_ACCESS</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">PROTOCOLS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
