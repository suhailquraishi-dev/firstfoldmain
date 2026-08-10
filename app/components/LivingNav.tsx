"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Websites", href: "/services", badge: "60% Off" },
  { label: "How it Works", href: "/process" },
  { label: "Plans", href: "/pricing" },
];

export function LivingNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBookCall, setShowBookCall] = useState(false);
  const [heroTopNav, setHeroTopNav] = useState(pathname === "/");
  const [navIntroDone, setNavIntroDone] = useState(pathname !== "/");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reset = window.setTimeout(() => setNavIntroDone(pathname !== "/" || reduced), 0);
    if (pathname !== "/" || reduced) return () => window.clearTimeout(reset);

    const timer = window.setTimeout(() => setNavIntroDone(true), 1980);
    return () => {
      window.clearTimeout(reset);
      window.clearTimeout(timer);
    };
  }, [pathname]);

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
      const isHomeTop = pathname === "/" && window.scrollY < window.innerHeight - 84;
      setHeroTopNav(isHomeTop);
      setShowBookCall(!isHomeTop && (pathname !== "/" || window.scrollY >= threshold));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/" && !navIntroDone) {
    return null;
  }

  return (
    <>
      <div className={showBookCall ? "site-nav-backdrop site-nav-backdrop--visible" : "site-nav-backdrop"} aria-hidden="true" />
      <header className={["site-nav", scrolled ? "site-nav--compact" : "", showBookCall ? "site-nav--show-cta" : "", heroTopNav ? "site-nav--home-rail" : "", heroTopNav && !navIntroDone ? "site-nav--loader-wait" : ""].filter(Boolean).join(" ")}>
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
                {"badge" in item ? <span className="nav-link__badge">{item.badge}</span> : null}
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

      <a href="/contact" className="nav-mobile-call" aria-label="Book a call">
        <span>Call</span>
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
              {"badge" in item ? <span className="nav-link__badge">{item.badge}</span> : null}
            </span>
            <span className="cta-arrow" aria-hidden="true">
              <img src="/right-arrow.svg" alt="" width={16} height={16} />
            </span>
          </a>
        ))}
      </div>
      </header>
    </>
  );
}
