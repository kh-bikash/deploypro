"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
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
          <Link className={styles.mark} href="/" aria-label="DEPLOY Home">
            <Logo size={25} />
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
          {homeNav.map((item) =>
            item.children ? (
              <div key={item.label} className={styles.dropdownItem}>
                <button
                  type="button"
                  className={styles.dropdownTrigger}
                  aria-haspopup="true"
                >
                  <span>{item.label}</span>
                  <span className={styles.dropdownChevron} aria-hidden="true">
                    ▼
                  </span>
                </button>
                <div className={styles.dropdownMenu}>
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className={styles.dropdownLink}>
                      <span className={styles.dropdownTitle}>
                        {child.label}
                        <i aria-hidden="true" style={{ fontStyle: "normal", fontSize: "10px", opacity: 0.6 }}>↗</i>
                      </span>
                      {child.description && (
                        <span className={styles.dropdownDesc}>{child.description}</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ) : item.href ? (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ) : null,
          )}
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
          <div key={item.label}>
            {item.href ? (
              <Link href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <div style={{ padding: "8px 0 4px", fontSize: "12px", textTransform: "uppercase", letterSpacing: ".14em", color: "var(--v2-dim-2)", fontFamily: "var(--font-mono)" }}>
                {item.label}
              </div>
            )}
            {item.children && (
              <div className={styles.mobileSubList}>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={styles.mobileSubLink}
                    onClick={() => setOpen(false)}
                  >
                    ↳ {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <a href="#book" onClick={() => setOpen(false)}>
          Book a call
        </a>
      </div>
    </header>
  );
}
