export const runtime = 'edge';
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { sql } from "@/lib/db";
import { Search, Code2, Rocket, Globe, Zap, Users, Moon } from "lucide-react";
import Link from "next/link";

export default async function HomePage({ searchParams }: { searchParams: { q?: string } }) {
  const user = await currentUser();
  const query = (await searchParams)?.q || "";

  const devs = query 
    ? await sql`SELECT * FROM search_devs(${query})`
    : await sql`SELECT * FROM dev_profiles ORDER BY created_at DESC LIMIT 20`;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto p-6">
        <nav className="flex justify-between items-center py-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              <Code2 size={28} color="white" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white">CODEPOOL</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-1 rounded-full pr-3 group cursor-not-allowed opacity-60">
              <div className="bg-zinc-800 p-1.5 rounded-full text-blue-400">
                <Moon size={14} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight text-zinc-400">Dark Mode</span>
            </div>

            {user && (
              <Link href="/onboarding" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">
                Dashboard
              </Link>
            )}
            
            <div className="flex items-center">
              {user ? (
                <UserButton appearance={{ elements: { userButtonAvatarBox: "h-10 w-10 border-2 border-zinc-800" } }} />
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-white text-black px-6 py-2.5 rounded-full font-black hover:bg-zinc-200 transition-all active:scale-95">
                    SIGN IN
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </nav>

        <section className="mt-24 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-[11px] font-black text-blue-400 mb-10 uppercase tracking-[0.2em]">
            <Zap size={14} fill="currentColor" /> Live Node Discovery
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 bg-gradient-to-b from-white via-white to-zinc-700 bg-clip-text text-transparent leading-[0.85] py-2">
            FIND YOUR <br /> CO-FOUNDER.
          </h1>

          <form className="relative group max-w-2xl mx-auto mb-16">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={24} />
            <input 
              name="q"
              defaultValue={query}
              placeholder="Search by skill (React, Rust, AI)..."
              className="w-full bg-zinc-900/50 backdrop-blur-md border-2 border-zinc-800 rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:border-blue-600 transition-all text-xl text-white placeholder:text-zinc-600 shadow-2xl"
            />
          </form>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {devs.map((dev: any) => (
            <div key={dev.id} className="group relative bg-zinc-900/20 border border-zinc-800/80 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-zinc-800 h-12 w-12 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Users size={22} />
                  </div>
                  {dev.rank > 0 && (
                    <span className="text-[10px] bg-blue-600 text-white px-3 py-1 rounded-lg font-black uppercase tracking-widest shadow-lg">
                      {Math.round(dev.rank * 100)}% Match
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">{dev.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-4 font-medium mb-10">
                  {dev.bio}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50 relative z-10">
                <span className="text-[11px] text-zinc-500 font-mono tracking-tighter truncate max-w-[150px] uppercase">
                  {dev.email.split('@')[0]}
                </span>
                {dev.portfolio_url && (
                  <a 
                    href={dev.portfolio_url} 
                    target="_blank" 
                    className="p-3 bg-white text-black rounded-xl hover:scale-110 active:scale-90 transition-all shadow-[0_5px_15px_rgba(255,255,255,0.1)]"
                  >
                    <Globe size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {devs.length === 0 && (
          <div className="mt-32 text-center pb-40">
            <div className="inline-block p-6 bg-zinc-900/50 rounded-full mb-6 border border-zinc-800">
              <Rocket size={48} className="text-zinc-700" />
            </div>
            <p className="text-2xl font-black text-zinc-600 tracking-tight uppercase">No developers discovered yet</p>
            <p className="text-zinc-800 font-bold mt-2">Try a different search or clear the filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
