"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { site } from "@/content/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4"
      style={{
        background: "rgba(3, 0, 20, 0.65)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Logo / name */}
      <Link
        href="/"
        className="text-base font-medium tracking-tight text-slate-100 transition-opacity hover:opacity-80"
        style={{
          fontFamily: "var(--font-sans)",
        }}
      >
        {site.name}
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-7 text-sm md:flex">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "page" : undefined}
            className="relative pb-0.5 transition-colors"
            style={{
              color: isActive(l.href) ? "#f5f5f5" : "#94a3b8",
              fontFamily: "var(--font-sans)",
            }}
          >
            {l.label}
            {isActive(l.href) && (
              <span
                className="absolute -bottom-0.5 left-0 h-px w-full rounded-full"
                style={{ background: "#0000f2" }}
              />
            )}
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <div className="hidden md:flex">
        <Link
          href="/contact"
          className="rounded-full px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-md"
          style={{
            background: "#0000f2",
            boxShadow: "0 0 18px rgba(0, 0, 242, 0.3)",
          }}
        >
          Contact Me
        </Link>
      </div>

      {/* Mobile: hamburger */}
      <div className="flex items-center md:hidden">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="flex h-8 w-8 items-center justify-center"
        >
          <span
            className="relative block h-px w-5 before:absolute before:-mt-2 before:block before:h-px before:w-5 after:absolute after:mt-2 after:block after:h-px after:w-5"
            style={{
              background: "#f5f5f5",
            }}
          />
        </button>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={LINKS}
        activeHref={pathname}
      />
    </header>
  );
}
