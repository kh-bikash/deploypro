"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

type Props = { variant?: "hero" | "solid" };

export default function Nav({ variant = "solid" }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className={variant === "hero" ? "nav" : "site-nav"} aria-label="Primary">
      <div className="nav-inner">
        <div className="nav-left">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              D
            </span>
            <span className="brand-words">
              <strong>DEPLOY</strong>
              <small>from Build Fast with AI</small>
            </span>
          </Link>
          <div className="links">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "current" : undefined}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Link className="nav-cta" href="/#start">
          Start a conversation
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div className={open ? "nav-mobile open" : "nav-mobile"}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/#start">Start a conversation</Link>
      </div>
    </nav>
  );
}
