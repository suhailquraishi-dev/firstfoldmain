"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";

export function LivingNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeItem = navItems.find((item) => item.href === pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "site-nav site-nav--compact" : "site-nav"}>
      <a href="/" className="brand-mark" aria-label="FirstFold Studio home">
        <img src="/firstfold-logo.svg" alt="FirstFold Studio" width={2044} height={380} />
      </a>

      <div className="nav-context" aria-label="FirstFold studio context">
        <span>AI-native web studio</span>
        <strong>{activeItem?.label ?? "Home"}</strong>
      </div>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <a key={item.href} href={item.href} className={active ? "nav-link is-active" : "nav-link"}>
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="nav-proof" aria-label="Current sprint availability">
        <span>Now booking</span>
        <strong>10-21d sprints</strong>
      </div>

      <a href="/contact" className="nav-cta">
        <span>Start</span>
        <span className="cta-arrow" aria-hidden="true">
          <img src="/right-arrow.svg" alt="" width={18} height={18} />
        </span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
      </button>

      <div className={open ? "mobile-panel is-open" : "mobile-panel"}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="/contact" className="mobile-cta" onClick={() => setOpen(false)}>
          <span>Start a launch</span>
          <span className="cta-arrow" aria-hidden="true">
            <img src="/right-arrow.svg" alt="" width={18} height={18} />
          </span>
        </a>
      </div>
    </header>
  );
}
