import { currentUser } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function Onboarding() {
  const user = await currentUser();
  if (!user) redirect("/");

  async function save(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const portfolio = formData.get("portfolio") as string;
    const email = user?.emailAddresses[0]?.emailAddress || "";

    await sql`
      INSERT INTO dev_profiles (id, name, bio, portfolio_url, email)
      VALUES (${user?.id}, ${name}, ${bio}, ${portfolio}, ${email})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        bio = EXCLUDED.bio,
        portfolio_url = EXCLUDED.portfolio_url;
    `;
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white">
      <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition font-medium">
        <ChevronLeft size={18} /> Back to Pool
      </Link>
      
      <div className="w-full max-w-md bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800 shadow-2xl backdrop-blur-sm">
        <h1 className="text-4xl font-black mb-2 tracking-tighter">DIVE IN.</h1>
        <p className="text-zinc-500 mb-10 font-medium">Show the world what you're building.</p>
        
        <form action={save} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Public Name</label>
            <input 
              name="name" 
              placeholder="e.g. Alex Dev" 
              required 
              className="w-full bg-black border border-zinc-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-600 outline-none transition text-white" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Bio & Skills</label>
            <textarea 
              name="bio" 
              placeholder="Next.js expert, AI enthusiast, available for hire..." 
              required 
              className="w-full bg-black border border-zinc-800 rounded-2xl p-4 h-40 focus:ring-2 focus:ring-blue-600 outline-none resize-none transition text-white" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Portfolio Link</label>
            <input 
              name="portfolio" 
              placeholder="https://yourwork.com" 
              className="w-full bg-black border border-zinc-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-600 outline-none transition text-white" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-blue-500 hover:text-white transition-all active:scale-95 mt-4"
          >
            JOIN THE POOL
          </button>
        </form>
      </div>
    </div>
  );
}
