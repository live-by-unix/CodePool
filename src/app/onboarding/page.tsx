import { currentUser } from "@clerk/nextjs";
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
    const email = user?.emailAddresses[0].emailAddress;

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
      <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition">
        <ChevronLeft size={16} /> Back to Pool
      </Link>
      <form action={save} className="w-full max-w-md bg-gray-900/50 p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
        <h1 className="text-3xl font-black mb-2">Dive In.</h1>
        <p className="text-gray-500 mb-8 font-medium">Create or update your developer profile.</p>
        <div className="space-y-4">
          <input name="name" placeholder="Display Name" required className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none" />
          <textarea name="bio" placeholder="What are you building? What are your skills?" required className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 h-40 focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
          <input name="portfolio" placeholder="https://yourportfolio.com" className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none" />
          <button type="submit" className="w-full bg-white text-black font-black py-4 rounded-2xl hover:scale-[1.02] transition active:scale-95">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
