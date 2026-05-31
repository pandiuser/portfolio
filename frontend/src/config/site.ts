export const siteConfig = {
  name: "Pandiyarajan S",
  url: import.meta.env.VITE_SITE_URL || "https://pandiyarajan-portfolio.vercel.app",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  nav: [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ],
} as const;
