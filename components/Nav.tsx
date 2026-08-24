"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
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
          <Link className="brand" href="/" aria-label="DEPLOY Home" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <Logo size={24} />
            <span className="brand-words">
              <strong>DEPLOY</strong>
              <small>from Build Fast with AI</small>
            </span>
          </Link>
          <div className="links">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="dropdown" style={{ position: "relative", display: "inline-flex" }}>
                  <span style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    {item.label}
                    <small style={{ fontSize: "8px", opacity: 0.6 }}>▼</small>
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      background: "#111113",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      padding: "6px",
                      minWidth: "140px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} style={{ padding: "4px 8px", fontSize: "13px" }}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : item.href ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "current" : undefined}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ) : null,
            )}
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
          <div key={item.label}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span style={{ fontSize: "12px", textTransform: "uppercase", opacity: 0.6, letterSpacing: ".1em" }}>
                {item.label}
              </span>
            )}
            {item.children && (
              <div style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href} style={{ fontSize: "13px", opacity: 0.8 }}>
                    ↳ {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link href="/#start">Start a conversation</Link>
      </div>
    </nav>
  );
}
