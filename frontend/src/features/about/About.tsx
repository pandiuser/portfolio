import { motion } from "framer-motion";
import { Briefcase, Code2, Cpu, Globe } from "lucide-react";
import { Section } from "@/components/common/section";
import { FadeIn } from "@/components/common/fade-in";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";

const PILLARS = [
  {
    icon: Code2,
    title: "Backend craft",
    description:
      "I've designed and shipped Django, DRF, FastAPI, and Flask services that power enterprise-scale workflows for global customers.",
  },
  {
    icon: Cpu,
    title: "Distributed systems",
    description:
      "Microservices, async workers, idempotent workflows, and observability built-in — not bolted on after the fact.",
  },
  {
    icon: Globe,
    title: "Product partnership",
    description:
      "I work directly with product owners on scope, estimation, and trade-offs — shipping outcomes, not just code.",
  },
  {
    icon: Briefcase,
    title: "Enterprise depth",
    description:
      "5 years across PKI, F5/DNS/firewall automation, RingCentral UCaaS/CCaaS, and AI research tooling.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Engineering for{" "}
          <span className="gradient-text">reliability, scale, and clarity.</span>
        </>
      }
      description="I'm Pandiyarajan — a senior backend engineer who treats production code as a long-lived product. I care about API contracts, observable systems, and writing software that's still readable a year after I ship it."
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <FadeIn className="lg:col-span-7">
          <div className="space-y-5 text-base leading-relaxed text-foreground/85">
            <p>
              Over the last 5 years, I've built systems that touch{" "}
              <span className="text-foreground">enterprise PKI, AI research tooling,
              and cloud communications</span>{" "}
              — for customers across the US, UK, and Singapore.
            </p>
            <p>
              At <span className="text-foreground font-medium">AppViewX</span>, I
              architected the Django platform powering Certificate Lifecycle Management
              across heterogeneous CA, load-balancer, DNS, and firewall vendors. The work
              shipped 100+ production workflows and boosted operational productivity by{" "}
              <span className="text-primary font-semibold">67%</span>.
            </p>
            <p>
              Today at <span className="text-foreground font-medium">Entropik</span>,
              I'm engineering a FastAPI-based AI-assisted moderated interview pipeline —
              one that converts qualitative research sessions into structured insights
              without manual moderation.
            </p>
            <p>
              When I'm not shipping production code, I'm sharpening my taste in API
              design, observability, and developer ergonomics. I believe great software
              feels obvious in hindsight — that's the bar I work toward.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {profile.industries.map((i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur"
              >
                {i}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-5">
          <div className="space-y-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group rounded-xl border border-border/70 bg-surface/50 p-4 transition-all hover:border-primary/40 hover:bg-surface-elevated/70"
              >
                <div className="flex items-start gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20">
                    <p.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="mt-16">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Career highlights
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profile.highlights.map((h, i) => (
            <FadeIn key={h} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-border/70 bg-surface/50 p-5 backdrop-blur transition-colors hover:border-primary/40">
                <div className="font-display text-2xl font-bold text-foreground/30">
                  0{i + 1}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{h}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Companies I've shipped at
        </h3>
        <div className="flex flex-wrap gap-3">
          {experiences.map((e) => (
            <div
              key={e.id}
              className="rounded-lg border border-border bg-surface/50 px-4 py-2 text-sm font-medium text-foreground/80 backdrop-blur"
            >
              {e.company}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
