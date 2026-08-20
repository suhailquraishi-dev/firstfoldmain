"use client";

/* eslint-disable @next/next/no-img-element */
import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

export function CtaArrow({ size = 18 }: { size?: number }) {
  return (
    <span className="cta-arrow" aria-hidden="true">
      <img src="/right-arrow.svg" alt="" width={size} height={size} />
    </span>
  );
}

export function MeetingIcons({ size = 24 }: { size?: number }) {
  return (
    <span className="meeting-icons" aria-hidden="true">
      <img src="/icons/google-meet-2026.webp" alt="" width={size} height={size} />
    </span>
  );
}

export function FoldGlyph({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "fold-glyph fold-glyph--small" : "fold-glyph"} aria-hidden="true">
      <img src="/firstfold-icon.svg" alt="" width={small ? 18 : 42} height={small ? 18 : 42} />
    </span>
  );
}

export function MotionText({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className="motion-headline"
      initial={reduced ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  );
}

export function PremiumButton({
  href,
  children,
  secondary = false,
  meeting = false,
  hideArrow = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  meeting?: boolean;
  hideArrow?: boolean;
}) {
  return (
    <a href={href} className={secondary ? "premium-button premium-button--secondary" : "premium-button"}>
      {meeting ? <MeetingIcons /> : null}
      <span>{children}</span>
      {hideArrow ? null : <CtaArrow size={20} />}
    </a>
  );
}

export function TextCta({
  href,
  children,
  className = "text-cta",
  arrowSize = 18,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrowSize?: number;
}) {
  return (
    <a href={href} className={className}>
      {children}
      <CtaArrow size={arrowSize} />
    </a>
  );
}

export function StatusBadge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={className ? `status-badge ${className}` : "status-badge"}>{children}</span>;
}

export function SectionFrame({
  eyebrow,
  title,
  copy,
  children,
  accent = "yellow",
  compact = false,
  className,
  replayMotion = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  children: ReactNode;
  accent?: "yellow" | "blue" | "brown" | "orange";
  compact?: boolean;
  className?: string;
  replayMotion?: boolean;
}) {
  const reduced = useReducedMotion();
  const classes = ["section-frame", compact ? "section-frame--compact" : "", `theme-${accent}`, className ?? ""].filter(Boolean).join(" ");
  const heading = (
    <>
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      <h2>
        <MotionText>{title}</MotionText>
      </h2>
      {copy ? <p>{copy}</p> : null}
    </>
  );

  return (
    <section className={classes}>
      {replayMotion ? (
        <motion.div
          className="section-heading"
          initial={reduced ? false : { opacity: 0.25, y: 72 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-18% 0px -18% 0px" }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
        >
          {heading}
        </motion.div>
      ) : (
        <div className="section-heading">{heading}</div>
      )}
      {children}
    </section>
  );
}
