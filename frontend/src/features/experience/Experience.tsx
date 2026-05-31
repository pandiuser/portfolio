import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, Sparkles, Wrench } from "lucide-react";
import { Section } from "@/components/common/section";
import { experiences } from "@/data/experience";
import { Badge } from "@/components/ui/badge";
import { calcDuration, formatDate } from "@/lib/utils";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Five years of <span className="gradient-text">shipping production.</span>
        </>
      }
      description="Each role has shaped how I think about systems — from PKI automation at AppViewX to AI research tooling at Entropik."
    >
      <div className="relative">
        <div
          aria-hidden
          className="absolute left-[18px] top-2 bottom-2 hidden w-px bg-[linear-gradient(to_bottom,hsl(var(--primary)/0.6),hsl(var(--border))_30%,hsl(var(--border)))] md:block"
        />

        <ol className="space-y-10">
          {experiences.map((exp, idx) => (
            <motion.li
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
              className="relative md:pl-14"
            >
              <div
                aria-hidden
                className="absolute left-0 top-2 hidden size-9 place-items-center rounded-full border border-border bg-surface text-primary md:grid"
              >
                <span className="grid size-3 place-items-center">
                  <span className="absolute size-3 animate-pulse-glow rounded-full bg-primary/50" />
                  <span className="relative size-2 rounded-full bg-primary" />
                </span>
              </div>

              <article className="rounded-2xl border border-border/70 bg-surface/50 p-6 backdrop-blur transition-colors hover:border-primary/40 sm:p-8">
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                        {exp.role}
                      </h3>
                      {!exp.endDate && (
                        <Badge variant="success">Current</Badge>
                      )}
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 text-foreground/85">
                        <Building2 className="size-3.5 text-primary" />
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="font-medium hover:text-primary"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <span className="font-medium">{exp.company}</span>
                        )}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        {exp.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {formatDate(exp.startDate)} –{" "}
                        {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        <span className="text-muted-foreground/60">
                          · {calcDuration(exp.startDate, exp.endDate)}
                        </span>
                      </span>
                    </div>
                  </div>
                </header>

                <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                  {exp.summary}
                </p>

                <div className="mt-5">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Key responsibilities
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {exp.responsibilities.map((r) => (
                      <li
                        key={r}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                      >
                        <span
                          aria-hidden
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"
                        />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {exp.achievements.length > 0 && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {exp.achievements.map((a) => (
                      <div
                        key={a.label}
                        className="flex items-start gap-2 rounded-lg border border-border/60 bg-surface-muted/40 px-3 py-2.5"
                      >
                        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-secondary" />
                        <div className="text-xs">
                          {a.metric && (
                            <div className="font-semibold text-foreground">
                              {a.metric}
                            </div>
                          )}
                          <div className="text-muted-foreground">{a.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5">
                  <h4 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    <Wrench className="size-3" />
                    Tech
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border/60 bg-surface/60 px-2 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
