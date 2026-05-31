import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { Section } from "@/components/common/section";
import { education } from "@/data/achievements";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Foundation"
      description="Where my engineering instincts were forged."
    >
      <div className="grid gap-5">
        {education.map((edu, idx) => (
          <motion.article
            key={edu.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="overflow-hidden rounded-2xl border border-border/70 bg-surface/50 p-6 backdrop-blur sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="grid size-12 place-items-center rounded-xl bg-[linear-gradient(135deg,hsl(var(--primary)/0.2),hsl(var(--accent)/0.2))] text-primary ring-1 ring-primary/20">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                    {edu.degree}
                  </h3>
                  <p className="mt-0.5 text-sm text-primary/90">{edu.field}</p>
                  <p className="mt-2 text-sm font-medium text-foreground/85">
                    {edu.institution}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {edu.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {edu.startYear} – {edu.endYear}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <Award className="size-3.5" />
                {edu.grade}
              </div>
            </div>

            <ul className="mt-5 space-y-2 border-t border-border/60 pt-4">
              {edu.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
