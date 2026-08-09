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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <a key={item.href} href={item.href} className={active ? "nav-link is-active" : "nav-link"}>
              <span className="nav-link__body">
                <img className="nav-link__icon" src={item.icon} alt="" width={18} height={18} aria-hidden="true" />
                <span>{item.label}</span>
              </span>
              <span className="cta-arrow" aria-hidden="true">
                <img src="/right-arrow.svg" alt="" width={16} height={16} />
              </span>
            </a>
          );
        })}
      </nav>

      <div className="nav-actions" aria-label="Start a FirstFold project">
        <span className="nav-section-label">Start project</span>
        <a href="/contact" className="nav-action-link">
          <img className="nav-action-icon" src="/icons/nav/calendar-days.svg" alt="" width={18} height={18} aria-hidden="true" />
          <span>Book a call</span>
          <span className="cta-arrow" aria-hidden="true">
            <img src="/right-arrow.svg" alt="" width={16} height={16} />
          </span>
        </a>
        <a href="mailto:hello@firstfold.studio" className="nav-action-link">
          <img className="nav-action-icon" src="/icons/nav/message-circle.svg" alt="" width={18} height={18} aria-hidden="true" />
          <span>Send a message</span>
          <span className="cta-arrow" aria-hidden="true">
            <img src="/right-arrow.svg" alt="" width={16} height={16} />
          </span>
        </a>
      </div>

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
              <img className="nav-link__icon" src={item.icon} alt="" width={18} height={18} aria-hidden="true" />
              <span>{item.label}</span>
            </span>
            <span className="cta-arrow" aria-hidden="true">
              <img src="/right-arrow.svg" alt="" width={16} height={16} />
            </span>
          </a>
        ))}
        <a href="/contact" className="mobile-cta" onClick={() => setOpen(false)}>
          <span>Book a call</span>
          <span className="cta-arrow" aria-hidden="true">
            <img src="/right-arrow.svg" alt="" width={18} height={18} />
          </span>
        </a>
      </div>
    </header>
  );
}
