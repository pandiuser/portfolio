import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center pb-16 pt-32 md:pt-40"
    >
      <div className="container max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <span className="relative grid size-2 place-items-center">
                <span className="absolute inset-0 animate-pulse-glow rounded-full bg-success" />
                <span className="relative size-2 rounded-full bg-success" />
              </span>
              Available for senior backend opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="heading-1 mt-6 text-balance"
            >
              Hi, I'm <span className="gradient-text">Pandiyarajan</span>.
              <br />
              <span className="text-foreground/90">I am a </span>
              <span className="gradient-text">senior software engineer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="body-lg mt-6 max-w-2xl text-pretty"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" variant="gradient">
                <a href="#contact">
                  <Mail className="size-4" />
                  Let's talk
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={profile.resumeUrl} download>
                  <Download className="size-4" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Github className="size-4" /> GitHub
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Linkedin className="size-4" /> LinkedIn
              </a>
              <a
                href={profile.socials.email}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="size-4" /> {profile.email}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <HeroStatsCard />
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground md:inline-flex"
        >
          Scroll
          <ArrowDown className="size-3 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}

function HeroStatsCard() {
  return (
    <div className="gradient-border relative overflow-hidden p-6 sm:p-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_0%,hsl(var(--primary)/0.18),transparent_60%)]" />

      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <Sparkles className="size-3.5 text-primary" />
        At a glance
      </div>

      <div className="mt-6 grid grid-cols-2 gap-5">
        {profile.metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
            className="rounded-lg border border-border/60 bg-surface/50 p-4 backdrop-blur"
          >
            <div className="font-display text-3xl font-bold tracking-tight gradient-text">
              {m.value}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-border/60 bg-surface/50 p-4 backdrop-blur">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Currently
        </div>
        <div className="mt-1 text-sm">
          <span className="font-semibold text-foreground">Senior Software Engineer</span>{" "}
          <span className="text-muted-foreground">@ Entropik</span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          Building backend systems for AI-driven user research.
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {[
          "Python",
          "Django",
          "FastAPI",
          "React",
          "TypeScript",
          "PostgreSQL",
          "AWS",
          "Docker",
        ].map((t) => (
          <span
            key={t}
            className="rounded-md border border-border/60 bg-surface/60 px-2 py-1 text-[11px] font-medium text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
