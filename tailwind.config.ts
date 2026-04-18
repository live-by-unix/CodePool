import type { Config } from "tailwindcss";

const config: Config = {
  // CRITICAL: Tells Tailwind to look for the "dark" class on the <html> tag
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        tightest: '-.08em',
      },
    },
  },
  plugins: [],
};
export default config;
