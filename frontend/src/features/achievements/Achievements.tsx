import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Sparkles,
  Star,
  BadgeCheck,
  X,
  Maximize2,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/section";
import { achievements } from "@/data/achievements";

const ICONS: Record<string, LucideIcon> = {
  Trophy,
  Award,
  Sparkles,
  Star,
  BadgeCheck,
};

export function Achievements() {
  const [activeImage, setActiveImage] = React.useState<string | null>(null);

  // Manage body scroll locking and padding offsets to prevent layout shift
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };

    if (activeImage) {
      // Calculate scrollbar width dynamically
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Apply body scroll lock and padding offsets
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        const header = document.querySelector("header");
        if (header) {
          header.style.paddingRight = `${scrollbarWidth}px`;
        }
      }

      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Restore default styling
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const header = document.querySelector("header");
      if (header) {
        header.style.paddingRight = "";
      }
    };
  }, [activeImage]);


  return (
    <Section
      id="achievements"
      eyebrow="Recognition"
      title={
        <>
          Awards & <span className="gradient-text">notable wins.</span>
        </>
      }
      description="Recognition received for technical excellence, customer impact, and ownership."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, idx) => {
          const Icon = ICONS[a.icon] ?? Award;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface/50 backdrop-blur transition-all hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            >
              {/* Certificate Image Preview */}
              {a.image && (
                <div 
                  onClick={() => setActiveImage(a.image || null)}
                  className="relative aspect-[4/3] w-full overflow-hidden border-b border-border/40 cursor-zoom-in"
                >
                  {/* Subtle color overlay */}
                  <div className="absolute inset-0 z-10 bg-primary/5 transition-opacity group-hover:opacity-0" />
                  
                  {/* Click to expand hover overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur ring-1 ring-white/20">
                      <Maximize2 className="size-3.5" />
                      View Certificate
                    </div>
                  </div>

                  <img
                    src={a.image}
                    alt={a.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Card Details */}
              <div className="flex flex-1 flex-col p-6 relative">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--secondary)/0.12),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100"
                />

                <div className="flex items-start justify-between">
                  <div className="grid size-11 place-items-center rounded-xl bg-[linear-gradient(135deg,hsl(var(--primary)/0.2),hsl(var(--accent)/0.2))] text-primary ring-1 ring-primary/20">
                    <Icon className="size-5" />
                  </div>
                  <span className="rounded-md border border-border bg-surface/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {a.date}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {a.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary/90">
                  {a.issuer}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {a.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md cursor-zoom-out"
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(null);
              }}
              className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-white/15"
              aria-label="Close lightbox"
            >
              <X className="size-5" />
            </button>

            {/* Expanded Image */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-surface/40 backdrop-blur-xl"
            >
              <img
                src={activeImage}
                alt="Enlarged Certificate"
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
export default Achievements;
