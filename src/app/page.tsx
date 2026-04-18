export const runtime = 'edge';
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { sql } from "@/lib/db";
import { Search, Code2, Rocket, Globe, Zap, Users } from "lucide-react";
import Link from "next/link";

export default async function HomePage({ searchParams }: { searchParams: { q?: string } }) {
  const user = await currentUser();
  const query = (await searchParams)?.q || "";

  const devs = query 
    ? await sql`SELECT * FROM search_devs(${query})`
    : await sql`SELECT * FROM dev_profiles ORDER BY created_at DESC LIMIT 20`;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="flex justify-between items-center py-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Code2 size={28} />
          </div>
          <span className="text-3xl font-black tracking-tighter text-white">CODEPOOL</span>
        </div>
        <div className="flex items-center gap-6">
          {user && (
            <Link href="/onboarding" className="text-sm font-bold text-zinc-400 hover:text-white transition">
              Dashboard
            </Link>
          )}
          {user ? <UserButton /> : <SignInButton mode="modal"><button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition">Sign In</button></SignInButton>}
        </div>
      </nav>

      <section className="mt-20 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-xs font-bold text-blue-400 mb-8 uppercase tracking-widest">
          <Zap size={14} /> Live Developer Network
        </div>
        <h1 className="text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent leading-[0.9]">
          HIRE THE BEST.
        </h1>
        <form className="relative group max-w-xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition" />
          <input 
            name="q"
            defaultValue={query}
            placeholder="Search skills, names, or tech stacks..."
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-[2rem] py-6 pl-16 pr-8 focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all text-xl text-white"
          />
        </form>
      </section>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {devs.map((dev: any) => (
          <div key={dev.id} className="bg-zinc-900/30 border border-zinc-800/50 p-8 rounded-[2.5rem] hover:bg-zinc-900/60 transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-zinc-800 h-12 w-12 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-white transition">
                  <Users size={24} />
                </div>
                {dev.rank > 0 && (
                  <span className="text-[10px] bg-blue-600 px-3 py-1 rounded-full font-black uppercase tracking-widest text-white">
                    {Math.round(dev.rank * 100)}% Match
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-white mb-2">{dev.name}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-8">
                {dev.bio}
              </p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-zinc-800 relative z-10">
              <span className="text-xs text-zinc-600 font-mono truncate max-w-[120px]">{dev.email}</span>
              {dev.portfolio_url && (
                <a href={dev.portfolio_url} target="_blank" className="p-3 bg-white text-black rounded-2xl hover:bg-blue-600 hover:text-white transition shadow-lg">
                  <Globe size={20} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
