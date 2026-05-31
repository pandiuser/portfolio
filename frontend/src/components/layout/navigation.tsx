import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ids = siteConfig.nav.map((n) => n.href.replace("#", ""));
  const active = useActiveSection(ids);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 py-2.5 transition-all duration-300"
    >
      <div className="container max-w-6xl">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border border-transparent px-4 py-2.5 transition-all duration-300 sm:px-5",
            scrolled
              ? "glass-strong border-white/10 shadow-glow"
              : "bg-transparent",
          )}
        >
          <a
            href="#hero"
            className="group flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))] text-sm font-bold text-primary-foreground shadow-glow">
              P
            </span>
            <span className="hidden text-sm sm:inline">
              {profile.name}
              <span className="ml-1 text-muted-foreground">/</span>
              <span className="ml-1 text-muted-foreground">SSE</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-surface-muted"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="gradient"
              className="hidden sm:inline-flex"
            >
              <a href="#contact">
                Get in touch
                <ArrowUpRight className="size-3.5" />
              </a>
            </Button>

            <button
              onClick={() => setOpen((s) => !s)}
              className="grid size-10 place-items-center rounded-lg border border-border bg-surface/60 text-foreground md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container max-w-6xl md:hidden"
          >
            <nav className="mt-2 grid gap-1 rounded-2xl border border-white/10 bg-surface/90 p-3 shadow-glow backdrop-blur-xl">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-surface-muted"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
              >
                Get in touch →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
