import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/services/contact";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import type { ApiError } from "@/types/api";

const schema = z.object({
  name: z.string().min(2, "Name is too short").max(120, "Name is too long"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject is too short").max(160, "Subject is too long"),
  message: z.string().min(20, "Tell me a little more").max(4000, "Message is too long"),
  honeypot: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const [sent, setSent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "", honeypot: "" },
  });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      setSent(true);
      form.reset();
      toast.success("Thanks — I'll get back within 24 hours.");
    },
    onError: (error: ApiError) => {
      if (error.fieldErrors) {
        for (const [field, messages] of Object.entries(error.fieldErrors)) {
          form.setError(field as keyof FormValues, {
            type: "server",
            message: messages[0],
          });
        }
      }
      toast.error(error.message ?? "Something went wrong. Try again.");
    },
  });

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
      <div className="grid gap-6 lg:grid-cols-5">
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5 lg:col-span-2"
        >
          <ContactRow
            icon={<Mail className="size-4" />}
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactRow
            icon={<Linkedin className="size-4" />}
            label="LinkedIn"
            value="pandiyarajan-s"
            href={profile.socials.linkedin}
            external
          />
          <ContactRow
            icon={<Github className="size-4" />}
            label="GitHub"
            value="pandiyarajans"
            href={profile.socials.github}
            external
          />
          <ContactRow
            icon={<MapPin className="size-4" />}
            label="Based in"
            value={profile.location}
          />

          <div className="rounded-2xl border border-border/70 bg-surface/50 p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Resume
            </p>
            <p className="mt-2 text-sm text-foreground/85">
              Detailed PDF with experience, projects, and references.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <a href={profile.resumeUrl} download>
                <Download className="size-3.5" />
                Download PDF
              </a>
            </Button>
          </div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="lg:col-span-3"
        >
          <div className="gradient-border relative overflow-hidden p-6 sm:p-8">
            {sent ? (
              <SuccessState onReset={() => setSent(false)} />
            ) : (
              <form
                onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
                noValidate
                className="space-y-5"
              >
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  {...form.register("honeypot")}
                  className="pointer-events-none absolute -left-[9999px] opacity-0"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    error={form.formState.errors.name?.message}
                    htmlFor="name"
                  >
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      autoComplete="name"
                      {...form.register("name")}
                    />
                  </Field>
                  <Field
                    label="Email"
                    error={form.formState.errors.email?.message}
                    htmlFor="email"
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      autoComplete="email"
                      {...form.register("email")}
                    />
                  </Field>
                </div>

                <Field
                  label="Subject"
                  error={form.formState.errors.subject?.message}
                  htmlFor="subject"
                >
                  <Input
                    id="subject"
                    placeholder="Senior backend role at Acme"
                    {...form.register("subject")}
                  />
                </Field>

                <Field
                  label="Message"
                  error={form.formState.errors.message?.message}
                  htmlFor="message"
                >
                  <Textarea
                    id="message"
                    placeholder="What are you building? What does the team look like? What problem keeps you up at night?"
                    rows={6}
                    {...form.register("message")}
                  />
                </Field>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">
                    I read every message. No noreply addresses, ever.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    variant="gradient"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && (
        <p className={cn("text-xs text-destructive")} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-center gap-3">
      <div className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20">
        {icon}
      </div>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-medium text-foreground">{value}</div>
      </div>
      {href && <ArrowUpRight className="ml-auto size-4 text-muted-foreground" />}
    </div>
  );

  if (!href) {
    return (
      <div className="rounded-xl border border-border/70 bg-surface/50 p-4 backdrop-blur">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="block rounded-xl border border-border/70 bg-surface/50 p-4 backdrop-blur transition-all hover:border-primary/40 hover:-translate-y-0.5"
    >
      {content}
    </a>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-success/15 text-success ring-1 ring-success/30">
        <CheckCircle2 className="size-6" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight">Message received.</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Thanks for reaching out — I'll respond within 24 hours, often sooner.
      </p>
      <Button variant="ghost" className="mt-6" onClick={onReset}>
        Send another
      </Button>
    </div>
  );
}
