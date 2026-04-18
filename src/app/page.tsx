import { currentUser, SignInButton, UserButton } from "@clerk/nextjs";
import { sql } from "@/lib/db";
import { Search, Code2, Rocket, ExternalLink, Globe } from "lucide-react";
import Link from "next/link";

export default async function HomePage({ searchParams }: { searchParams: { q?: string } }) {
  const user = await currentUser();
  const query = searchParams.q || "";

  const devs = query 
    ? await sql`SELECT * FROM search_devs(${query})`
    : await sql`SELECT * FROM dev_profiles ORDER BY created_at DESC LIMIT 20`;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="flex justify-between items-center py-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
            <Code2 size={28} />
          </div>
          <span className="text-3xl font-black tracking-tight">CODEPOOL</span>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <Link href="/onboarding" className="text-sm font-medium text-gray-400 hover:text-white transition">
              Edit Profile
            </Link>
          )}
          {user ? <UserButton afterSignOutUrl="/" /> : <SignInButton mode="modal" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition" />}
        </div>
      </nav>

      <section className="mt-12 text-center max-w-2xl mx-auto">
        <h1 className="text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Find your dev.
        </h1>
        <form className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition" />
          <input 
            name="q"
            defaultValue={query}
            placeholder="Search by skill, name, or tech..."
            className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-lg"
          />
        </form>
      </section>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devs.map((dev: any) => (
          <div key={dev.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{dev.name}</h3>
                {dev.rank > 0 && <span className="text-[10px] bg-blue-500 text-white px-2 py-1 rounded-md font-bold uppercase tracking-widest">Match</span>}
              </div>
              <p className="text-gray-400 text-sm line-clamp-3 mb-6">{dev.bio}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-xs text-gray-500 truncate max-w-[150px]">{dev.email}</span>
              {dev.portfolio_url && (
                <a href={dev.portfolio_url} target="_blank" className="p-2 bg-white/10 rounded-full hover:bg-white text-white hover:text-black transition">
                  <Globe size={16} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {devs.length === 0 && (
        <div className="mt-20 text-center opacity-20 italic text-2xl">
          No developers found in the pool...
        </div>
      )}
    </div>
  );
}
