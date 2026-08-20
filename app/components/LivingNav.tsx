"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CtaArrow } from "./UIPrimitives";

const navItems = [
  { label: "Websites", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Plans", href: "/pricing" },
];

export function LivingNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="site-nav site-nav--show-cta">
      <a href="/" className="brand-mark" aria-label="FirstFold Studio home">
        <img className="brand-mark__full" src="/firstfold-logo-nav.svg" alt="" width={745} height={121} />
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <a key={item.href} href={item.href} className={active ? "nav-link is-active" : "nav-link"}>
              <span className="nav-link__body">
                <span>{item.label}</span>
              </span>
            </a>
          );
        })}
      </nav>

      <a href="/contact" className="nav-cta">
        <span>Book a Call</span>
      </a>

      <a href="/contact" className="nav-mobile-call" aria-label="Book a 30 minute call">
        <span>Book a Call</span>
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
          <a key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : ""} onClick={() => setOpen(false)}>
            <span className="nav-link__body">
              <span>{item.label}</span>
            </span>
            <CtaArrow size={16} />
          </a>
        ))}
      </div>
    </header>
  );
}
