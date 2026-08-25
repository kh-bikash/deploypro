"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { homeNav } from "@/lib/home";
import { site } from "@/lib/site";
import styles from "./HomeNav.module.css";

export default function HomeNav() {
  const [open, setOpen] = useState(false);
  /** the bar is transparent over the hero and takes a background once content
      starts passing underneath it */
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // navigating away should never leave the sheet hanging open
  useEffect(() => setOpen(false), [pathname]);

  // ...nor should widening past the breakpoint that hides the toggle
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1001px)");
    const sync = () => mq.matches && setOpen(false);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* An open sheet owns the screen — letting the page scroll behind it is what
     makes the two look like they are fighting. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      {/* Outside the header on purpose: backdrop-filter on the bar would make
          it the containing block and clip this to the bar's own height. */}
      {open && (
        <button
          className={styles.scrim}
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}

      <header
        className={styles.nav}
      data-solid={scrolled || open ? "true" : "false"}
      data-open={open ? "true" : "false"}
    >
      <div className={styles.inner}>
        {/* two separate targets — the wordmark goes home, the parent brand goes
            to Build Fast with AI (nesting anchors would be invalid markup) */}
        <div className={styles.brand}>
          <Link className={styles.mark} href="/">
            <Image
              src="/logo.png"
              alt="DEPLOY"
              width={303}
              height={264}
              priority
            />
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

        <a className={`${styles.cta} btn-chase`} href="/#book">
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
        <a href="/#book" onClick={() => setOpen(false)}>
          Book a call
        </a>
      </div>
      </header>
    </>
  );
}
