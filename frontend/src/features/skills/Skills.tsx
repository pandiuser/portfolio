import { motion } from "framer-motion";
import { Section } from "@/components/common/section";
import { technologies } from "@/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <Section
      id="skills"
      title={
        <>
          Technologies I <span className="gradient-text">Work With</span>
        </>
      }
    >
      <div className="grid grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-5 mt-16 justify-items-start">
        {technologies.map((tech, idx) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.04 }}
            className="flex flex-col items-center justify-center gap-3 group"
          >
            <div
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-2xl p-4 transition-all duration-300 group-hover:scale-110",
                // Default glassmorphism styling
                "bg-surface/40 border border-white/5 backdrop-blur-sm group-hover:bg-surface-elevated/60 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
                // White background wrapper for specific logos (Python, Django, HTML, Linux)
                tech.whiteBg && "bg-white p-3.5 group-hover:bg-white/95 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              )}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                className={cn(
                  "h-10 w-10 object-contain transition-transform duration-300",
                  // Apply filter for dark-colored logos to make them readable
                  tech.invert && "brightness-0 invert opacity-80 group-hover:opacity-100"
                )}
              />
            </div>
            <span className="text-xs font-semibold tracking-wide text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
export default Skills;
