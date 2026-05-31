import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = Omit<React.HTMLAttributes<HTMLElement>, "title"> & {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  containerClassName?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  containerClassName,
  children,
  ...props
}: Props) {
  return (
    <section id={id} className={cn("section-padding relative", className)} {...props}>
      <div className={cn("container max-w-6xl", containerClassName)}>
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={cn(
              "mb-12 flex flex-col gap-4",
              align === "center" && "items-center text-center",
            )}
          >
            {eyebrow && (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="heading-2 text-balance">
                {typeof title === "string" ? <span>{title}</span> : title}
              </h2>
            )}
            {description && (
              <p className="body-lg max-w-2xl text-pretty">{description}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
