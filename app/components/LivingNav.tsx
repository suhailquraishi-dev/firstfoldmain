"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CtaArrow, MeetingIcons } from "./UIPrimitives";

const navItems = [
  { label: "Websites", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Plans", href: "/pricing" },
];

export function LivingNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBookCall, setShowBookCall] = useState(false);
  const [heroTopNav, setHeroTopNav] = useState(pathname === "/");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const isHomeTop = pathname === "/" && window.scrollY < window.innerHeight - 84;
      setHeroTopNav(isHomeTop);
      setShowBookCall(!isHomeTop);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <>
      <div className={showBookCall ? "site-nav-backdrop site-nav-backdrop--visible" : "site-nav-backdrop"} aria-hidden="true" />
      <header className={["site-nav", scrolled ? "site-nav--compact" : "", showBookCall ? "site-nav--show-cta" : "", heroTopNav ? "site-nav--home-rail" : ""].filter(Boolean).join(" ")}>
      <a href="/" className="brand-mark" aria-label="FirstFold Studio home">
        <img className="brand-mark__full" src="/firstfold-logo-nav.svg" alt="" width={2044} height={380} />
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
        <MeetingIcons />
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
    </>
  );
}
