"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { homeNav } from "@/lib/home";
import { site } from "@/lib/site";
import styles from "./HomeNav.module.css";

export default function HomeNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        {/* two separate targets — the wordmark goes home, the parent brand goes
            to Build Fast with AI (nesting anchors would be invalid markup) */}
        <div className={styles.brand}>
          <Link className={styles.mark} href="/">
            <em>deploy</em>
          </Link>
          <span className={styles.by}>
            by{" "}
            <a
              className={styles.parent}
              href={site.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{site.parent}</span>
              <i aria-hidden="true">↗</i>
            </a>
          </span>
        </div>

        <nav className={styles.links} aria-label="Primary">
          {homeNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <a className={`${styles.cta} btn-chase`} href="#book">
          Book a call
        </a>

        <button
          className={styles.toggle}
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div className={open ? `${styles.mobile} ${styles.open}` : styles.mobile}>
        {homeNav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <a href="#book" onClick={() => setOpen(false)}>
          Book a call
        </a>
      </div>
    </header>
  );
}
