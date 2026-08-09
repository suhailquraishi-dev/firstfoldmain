"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Our Workflow", href: "/process" },
  { label: "Plans", href: "/pricing" },
];

export function LivingNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBookCall, setShowBookCall] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const onScroll = () => {
      const clients = document.querySelector<HTMLElement>(".hero-client-fade");
      const landing = document.querySelector<HTMLElement>(".hero-shell--landing");
      const threshold = clients
        ? clients.offsetTop + clients.offsetHeight - 80
        : landing
          ? landing.offsetTop + landing.offsetHeight - 96
          : window.innerHeight * 0.85;

      setScrolled(window.scrollY > 24);
      setShowBookCall(pathname !== "/" || window.scrollY >= threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <>
      <div className={showBookCall ? "site-nav-backdrop site-nav-backdrop--visible" : "site-nav-backdrop"} aria-hidden="true" />
      <header className={["site-nav", scrolled ? "site-nav--compact" : "", showBookCall ? "site-nav--show-cta" : ""].filter(Boolean).join(" ")}>
      <a href="/" className="brand-mark" aria-label="FirstFold Studio home">
        <img src="/favicon.png" alt="" width={96} height={96} />
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
        <span>Book a call</span>
        <span className="cta-arrow" aria-hidden="true">
          <img src="/right-arrow.svg" alt="" width={16} height={16} />
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
        {[{ label: "Home", href: "/" }, ...navItems].map((item) => (
          <a key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : ""} onClick={() => setOpen(false)}>
            <span className="nav-link__body">
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
    </>
  );
}
