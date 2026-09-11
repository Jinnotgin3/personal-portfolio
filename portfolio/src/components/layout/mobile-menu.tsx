"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  activeHref: string;
}

export function MobileMenu({ open, onClose, links, activeHref }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-16 z-40 flex flex-col gap-6 bg-background px-6 py-10 md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className={`text-2xl font-medium ${l.href === activeHref ? "text-accent" : "text-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={onClose} className="mt-4 w-fit rounded-full bg-accent px-5 py-3 text-white">
            Contact Me
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
