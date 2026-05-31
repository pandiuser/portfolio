import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Section } from "@/components/common/section";
import { projects, type Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Platform", "AI / ML", "Microservices", "Web App"] as const;
type Filter = (typeof FILTERS)[number];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  // Group filtered projects into rows of 2 for desktop layout
  const projectRows = useMemo(() => {
    const rows: Project[][] = [];
    for (let i = 0; i < filtered.length; i += 2) {
      rows.push(filtered.slice(i, i + 2));
    }
    return rows;
  }, [filtered]);

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={
        <>
          Production systems with <span className="gradient-text">measurable impact.</span>
        </>
      }
      description="A curated selection — each one shipped to real users. Click through for architecture, trade-offs, and results."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setExpandedId(null); // Reset expanded on filter change
            }}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
              filter === f
                ? "border-primary/60 bg-primary/15 text-primary"
                : "border-border bg-surface/50 text-muted-foreground hover:text-foreground hover:border-primary/30",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {projectRows.map((row, rowIdx) => {
            // Check if any card in this specific row is currently expanded
            const isAnyExpandedInRow = row.some((p) => expandedId === p.id);

            return (
              <motion.div
                key={`row-${rowIdx}-${row.map(p => p.id).join('-')}`}
                layout="position"
                className={cn(
                  "grid gap-6 md:grid-cols-2",
                  isAnyExpandedInRow ? "items-start" : "items-stretch"
                )}
              >
                {row.map((p, idx) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    index={rowIdx * 2 + idx}
                    expanded={expandedId === p.id}
                    onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
                  />
                ))}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </Section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}

function ProjectCard({ project, index, expanded, onToggle }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface/50 backdrop-blur transition-all hover:border-primary/40 h-full"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.18),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100"
      />

      <div className="relative aspect-[16/9] overflow-hidden border-b border-border/60 bg-[linear-gradient(135deg,hsl(var(--primary)/0.18),hsl(var(--secondary)/0.12),hsl(var(--accent)/0.18))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.4),transparent_55%)]" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] opacity-30" />

        <div className="absolute inset-0 grid place-items-center p-6">
          <div className="font-display text-3xl font-bold tracking-tight text-foreground/90 text-center sm:text-4xl">
            {project.title}
          </div>
        </div>

        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          <Badge variant="secondary">{project.category}</Badge>
          {project.featured && <Badge variant="accent">Featured</Badge>}
        </div>
        <div className="absolute right-4 top-4">
          <Badge variant="muted">{project.year}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 justify-between">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-1 text-sm text-primary/90">{project.tagline}</p>
          </div>

          <p className={cn(
            "text-sm leading-relaxed text-muted-foreground",
            !expanded && "line-clamp-3"
          )}>
            {project.description}
          </p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key={`content-${project.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-4 overflow-hidden pt-2"
              >
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Architecture
                  </h4>
                  <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                    {project.architecture}
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Challenges
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {project.challenges.map((c) => (
                      <li
                        key={c}
                        className="flex gap-2 text-sm leading-relaxed text-foreground/80"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-destructive/70" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Solutions
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {project.solutions.map((s) => (
                      <li
                        key={s}
                        className="flex gap-2 text-sm leading-relaxed text-foreground/80"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-success/70" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.impact.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Impact
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.impact.map((i) => (
                        <span
                          key={i.label}
                          className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs text-primary"
                        >
                          {i.metric ? <strong>{i.metric}</strong> : ""}{" "}
                          {i.metric ? "· " : ""}
                          {i.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, expanded ? 999 : 6).map((t) => (
              <span
                key={t}
                className="rounded-md border border-border/60 bg-surface/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
            {!expanded && project.technologies.length > 6 && (
              <span className="rounded-md border border-border/60 bg-surface/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                +{project.technologies.length - 6}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
            <button
              onClick={onToggle}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 cursor-pointer"
            >
              {expanded ? "Hide details" : "Read case study"}
              <ArrowUpRight
                className={cn(
                  "size-3.5 transition-transform",
                  expanded && "rotate-45",
                )}
              />
            </button>

            <div className="flex items-center gap-1">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="grid size-8 place-items-center rounded-md border border-border bg-surface/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                  aria-label="GitHub"
                >
                  <Github className="size-3.5" />
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="grid size-8 place-items-center rounded-md border border-border bg-surface/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                  aria-label="Live demo"
                >
                  <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
export default Projects;
