import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { sql } from "@/lib/db";
import { Search, Code2, Rocket, ExternalLink, Globe } from "lucide-react";
import Link from "next/link";

export default async function HomePage({ searchParams }: { searchParams: { q?: string } }) {
  const user = await currentUser();
  const query = searchParams?.q || "";

  const devs = query 
    ? await sql`SELECT * FROM search_devs(${query})`
    : await sql`SELECT * FROM dev_profiles ORDER BY created_at DESC LIMIT 20`;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="flex justify-between items-center py-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl text-white">
            <Code2 size={28} />
          </div>
          <span className="text-3xl font-black tracking-tight text-white">CODEPOOL</span>
        </div>
        <div className="flex items-center gap-6">
          {user && (
            <Link href="/onboarding" className="text-sm font-semibold text-gray-400 hover:text-blue-400 transition">
              Manage Profile
            </Link>
          )}
          <div className="scale-110">
            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </nav>

      <section className="mt-16 text-center max-w-3xl mx-auto">
        <h1 className="text-7xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-none">
          THE TALENT POOL.
        </h1>
        <p className="text-gray-400 text-lg mb-10 font-medium">
          The decentralized directory for the world's best developers.
        </p>
        <form className="relative max-w-xl mx-auto group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition" />
          <input 
            name="q"
            defaultValue={query}
            placeholder="Search by tech, name, or bio..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-lg text-white"
          />
        </form>
      </section>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devs.map((dev: any) => (
          <div key={dev.id} className="bg-zinc-900/40 border border-zinc-800 p-7 rounded-[2rem] hover:bg-zinc-800/60 hover:border-zinc-700 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">{dev.name}</h3>
                {dev.rank > 0 && (
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded-lg font-black uppercase tracking-widest">
                    Match
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 mb-8">
                {dev.bio}
              </p>
            </div>
            <div className="flex items-center justify-between pt-5 border-t border-zinc-800">
              <span className="text-xs text-zinc-500 font-mono truncate max-w-[140px]">
                {dev.email}
              </span>
              <div className="flex gap-2">
                {dev.portfolio_url && (
                  <a 
                    href={dev.portfolio_url} 
                    target="_blank" 
                    className="p-2.5 bg-zinc-800 rounded-xl hover:bg-white text-zinc-400 hover:text-black transition shadow-sm"
                  >
                    <Globe size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {devs.length === 0 && (
        <div className="mt-32 text-center flex flex-col items-center">
          <Rocket className="text-zinc-800 mb-4" size={48} />
          <p className="text-zinc-600 font-medium italic">
            {query ? `No results for "${query}"` : "The pool is currently empty."}
          </p>
        </div>
      )}
    </div>
  );
}
