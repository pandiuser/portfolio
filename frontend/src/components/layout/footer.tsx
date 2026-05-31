import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/40 py-12">
      <div className="container max-w-6xl">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))] text-sm font-bold text-primary-foreground">
                P
              </span>
              {profile.name}
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {profile.shortBio}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="grid size-10 place-items-center rounded-lg border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50"
                aria-label="GitHub"
              >
                <Github className="size-4" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="grid size-10 place-items-center rounded-lg border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={profile.socials.email}
                className="grid size-10 place-items-center rounded-lg border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-foreground/80 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Get in touch
            </h3>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex items-center gap-1.5 text-base font-medium text-foreground hover:text-primary"
            >
              {profile.email}
              <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-2 text-sm text-muted-foreground">{profile.location}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Open to {profile.availableFor.toLowerCase()}.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
