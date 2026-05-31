import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* base radial wash */}
      <div className="absolute inset-x-0 top-0 h-[120vh] bg-radial-glow" />

      {/* grid */}
      <div
        className="absolute inset-0 bg-grid-pattern [background-size:48px_48px] opacity-[0.22] mask-fade-b"
      />

      {/* soft drifting orbs */}
      <motion.div
        className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[120px]"
        animate={{ x: [0, 40, -10, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[380px] w-[380px] rounded-full bg-secondary/20 blur-[120px]"
        animate={{ x: [0, -40, 20, 0], y: [0, -30, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-[320px] w-[320px] rounded-full bg-accent/20 blur-[120px]"
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
