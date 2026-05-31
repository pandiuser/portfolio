import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title={
        <>
          Let's build something <span className="gradient-text">real.</span>
        </>
      }
      description="Open to senior backend engineer roles, contract work, and interesting platform problems. I respond within 24 hours."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        <ContactCard
          icon={<Mail className="size-5" />}
          label="Email"
          value={profile.email}
          href={`mailto:${profile.email}`}
          description="Send me an email directly."
        />
        <ContactCard
          icon={<Phone className="size-5" />}
          label="Phone"
          value={profile.phone}
          href={`tel:${profile.phone.replace(/\s+/g, "")}`}
          description="Call or text me directly."
        />
        <ContactCard
          icon={<Linkedin className="size-5" />}
          label="LinkedIn"
          value="pandiyarajans"
          href={profile.socials.linkedin}
          external
          description="Connect on my professional network."
        />
        <ContactCard
          icon={<Github className="size-5" />}
          label="GitHub"
          value="pandiuser"
          href={profile.socials.github}
          external
          description="Audit my open-source codebases."
        />
        <ContactCard
          icon={<MapPin className="size-5" />}
          label="Based in"
          value={profile.location}
          description="Open to remote and local roles."
        />
        
        {/* Premium Resume Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-surface/50 p-5 backdrop-blur transition-all hover:border-primary/40 hover:-translate-y-1 relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--secondary)/0.12),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100"
          />
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20">
              <Download className="size-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Resume
              </div>
              <div className="text-sm font-semibold text-foreground">Download PDF</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            Detailed PDF with experience, projects, and references.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-4 w-full cursor-pointer hover:bg-primary/10">
            <a href={profile.resumeUrl} download>
              <Download className="size-3.5 mr-1.5" />
              Download Resume
            </a>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  description: string;
}

function ContactCard({
  icon,
  label,
  value,
  href,
  external,
  description,
}: ContactCardProps) {
  const content = (
    <div className="flex flex-col justify-between h-full relative">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--secondary)/0.12),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20">
          {icon}
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </div>
          <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {value}
          </div>
        </div>
        {href && <ArrowUpRight className="ml-auto size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />}
      </div>
      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );

  if (!href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border/70 bg-surface/50 p-5 backdrop-blur transition-all"
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group block rounded-2xl border border-border/70 bg-surface/50 p-5 backdrop-blur transition-all hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
    >
      {content}
    </motion.a>
  );
}
export default Contact;
