"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/#experience", label: "Experience" },
    { href: "/#work", label: "Selected work" },
    { href: "/resume", label: "Résumé" },
  ];
  return (
    <header className="navigation">
      <Link className="wordmark" href="/" aria-label="Lakshman Chelliah home">
        lc<span>.</span>
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={pathname === l.href ? "page" : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <Link className="nav-contact" href="/#contact">
        Let’s connect <ArrowUpRight size={15} />
      </Link>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="menu-toggle" aria-label="Open navigation">
          <Menu size={22} />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="mobile-menu">
            <Dialog.Title>Explore</Dialog.Title>
            <Dialog.Description>
              Résumé, work, and ways to get in touch.
            </Dialog.Description>
            {links.map((l) => (
              <Link onClick={() => setOpen(false)} key={l.href} href={l.href}>
                {l.label}
                <ArrowUpRight />
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setOpen(false)}>
              Contact
              <ArrowUpRight />
            </Link>
            <Dialog.Close
              className="icon-button menu-close"
              aria-label="Close navigation"
            >
              <X />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
