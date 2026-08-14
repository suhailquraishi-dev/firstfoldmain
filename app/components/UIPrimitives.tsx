"use client";

/* eslint-disable @next/next/no-img-element */

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
