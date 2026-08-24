"use client";

import { useEffect } from "react";

/**
 * Inertial (Lenis-style) scrolling.
 *
 * We ease the *real* scroll position rather than transforming a wrapper, so
 * position:sticky, scroll-driven sections and anchor offsets all keep working.
 * Pointer/touch scrolling is left alone — only wheel input and in-page anchors
 * are eased, because touch already has native momentum.
 */
const EASE = 0.1;
const MAX_STEP = 220;

export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    // CSS smooth-scroll would animate every frame we write — hand control over.
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    let target = window.scrollY;
    let current = target;
    let raf = 0;
    let running = false;
    let self = false;

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const tick = () => {
      const delta = target - current;
      if (Math.abs(delta) < 0.4) {
        current = target;
        self = true;
        window.scrollTo(0, current);
        self = false;
        stop();
        return;
      }
      current += delta * EASE;
      self = true;
      window.scrollTo(0, current);
      self = false;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      // let the browser keep zoom and horizontal gestures
      if (event.ctrlKey || event.metaKey) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      // don't fight a nested scroller (none today, but cheap insurance)
      let node = event.target as HTMLElement | null;
      while (node && node !== document.body) {
        const style = getComputedStyle(node);
        if (
          /(auto|scroll)/.test(style.overflowY) &&
          node.scrollHeight > node.clientHeight + 1
        ) {
          return;
        }
        node = node.parentElement;
      }

      event.preventDefault();
      const lines = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      const step = Math.max(-MAX_STEP, Math.min(MAX_STEP, event.deltaY * lines));
      target = Math.max(0, Math.min(maxScroll(), target + step));
      start();
    };

    // Any scroll we did not drive (keyboard, scrollbar, find-in-page) resets the target.
    const onScroll = () => {
      if (self || running) return;
      target = current = window.scrollY;
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as HTMLElement)?.closest?.("a");
      if (!link || !link.getAttribute("href") || link.target === "_blank") return;

      // Handles both "#why" and "/#why"; anything on another path is left to
      // navigate normally.
      let url: URL;
      try {
        url = new URL(link.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin) return;
      if (url.pathname !== location.pathname) return;
      if (!url.hash || url.hash === "#") return;

      const dest = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!dest) return;

      event.preventDefault();
      target = Math.max(
        0,
        Math.min(maxScroll(), dest.getBoundingClientRect().top + window.scrollY),
      );
      history.pushState(null, "", url.hash);
      start();
    };

    const onResize = () => {
      target = Math.max(0, Math.min(maxScroll(), target));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("click", onAnchorClick);

    return () => {
      stop();
      root.style.scrollBehavior = previousBehavior;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);

  return null;
}
