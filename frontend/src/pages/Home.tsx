import { Hero } from "@/features/hero/Hero";
import { About } from "@/features/about/About";
import { Skills } from "@/features/skills/Skills";
import { Experience } from "@/features/experience/Experience";
import { Projects } from "@/features/projects/Projects";
import { Achievements } from "@/features/achievements/Achievements";
import { Education } from "@/features/education/Education";
import { Contact } from "@/features/contact/Contact";
import { profile } from "@/data/profile";
import { siteConfig } from "@/config/site";

export function Home() {
  return (
    <>
      {/* React 19 hoists these into <head> automatically */}
      <title>{`${profile.name} — ${profile.title}`}</title>
      <meta name="description" content={profile.summary} />
      <link rel="canonical" href={siteConfig.url} />

      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Education />
      <Contact />
    </>
  );
}
