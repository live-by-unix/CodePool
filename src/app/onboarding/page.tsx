export const runtime = 'edge';
import { currentUser } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChevronLeft, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
      <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white mb-12 transition text-sm font-bold uppercase tracking-widest">
        <ChevronLeft size={16} /> Exit Editor
      </Link>
      
      <div className="w-full max-w-xl bg-zinc-900/40 p-12 rounded-[3rem] border border-zinc-800 shadow-3xl backdrop-blur-xl">
        <h1 className="text-5xl font-black mb-4 tracking-tighter text-white">PROFILE.</h1>
        <p className="text-zinc-500 mb-12 font-semibold">Update your presence in the CodePool.</p>
        
        <form action={save} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">Identify As</label>
            <input name="name" placeholder="Name or Alias" required className="w-full bg-black border border-zinc-800 rounded-[1.5rem] p-5 focus:ring-2 focus:ring-blue-600 outline-none text-white transition" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">The Mission (Bio)</label>
            <textarea name="bio" placeholder="What are you building? Skills?" required className="w-full bg-black border border-zinc-800 rounded-[1.5rem] p-5 h-44 focus:ring-2 focus:ring-blue-600 outline-none resize-none text-white transition" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">The Proof (URL)</label>
            <input name="portfolio" placeholder="Portfolio / GitHub" className="w-full bg-black border border-zinc-800 rounded-[1.5rem] p-5 focus:ring-2 focus:ring-blue-600 outline-none text-white transition" />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-black py-6 rounded-[1.5rem] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 group">
            UPDATE POOL <ArrowRight size={20} className="group-hover:translate-x-2 transition" />
          </button>
        </form>
      </div>
    </div>
  );
}
