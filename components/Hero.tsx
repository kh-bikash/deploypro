"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { deploySteps } from "@/lib/content";

const LETTERS = ["D", "E", "P", "L", "O", "Y"];
const CYCLE_MS = 1250;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % deploySteps.length);
    }, CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, hero.offsetHeight)));

      if (stageRef.current) {
        stageRef.current.style.transform = `translateY(${-22 * p}px)`;
        stageRef.current.style.opacity = String(Math.max(0.25, 1 - p * 0.68));
      }
      if (bottomRef.current) {
        bottomRef.current.style.transform = `translateY(${-12 * p}px)`;
        bottomRef.current.style.opacity = String(Math.max(0.2, 1 - p * 0.76));
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const step = deploySteps[active];

  return (
    <header className="hero" id="top" ref={heroRef}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        src="/media/hero-loop.mp4"
      />
      <div className="hero-overlay" />
      <Nav variant="hero" />

      <div className="deploy-hero-copy">
        <div className="deploy-kicker">
          <span className="deploy-kicker-dot" aria-hidden="true" />
          AUTOMATION, FROM SIGNAL TO OUTCOME
        </div>

        <div className="deploy-word-stage" ref={stageRef}>
          <div className="deploy-word" aria-label="DEPLOY">
            {LETTERS.map((char, i) => (
              <div
                key={char}
                className={i === active ? "deploy-letter active" : "deploy-letter"}
                onMouseEnter={() => {
                  setPaused(true);
                  setActive(i);
                }}
                onMouseLeave={() => setPaused(false)}
              >
                <span className="letter-char" aria-hidden="true">
                  {char}
                </span>
                <div className="letter-meaning">
                  <strong>{deploySteps[i].word}</strong>
                  <small>{deploySteps[i].short}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="deploy-flow-line" aria-hidden="true">
            <span style={{ transform: `translateX(${active * 100}%)` }} />
          </div>

          <div className="deploy-active-copy" aria-live="polite">
            <div className="deploy-active-index">{String(active + 1).padStart(2, "0")}</div>
            <div className="deploy-active-text">
              <span>{step.word}</span>
              <small>{step.short}</small>
            </div>
          </div>
        </div>

        <div className="deploy-hero-bottom" ref={bottomRef}>
          <div className="deploy-hero-statement">
            <h1>
              Build the system.
              <br />
              <span>DEPLOY the outcome.</span>
            </h1>
            <p>
              Two forward-deployed engineers embed with your team and turn one business workflow into
              a production system — connected to your stack, human-controlled, measured on your own
              baseline, and handed over to the people who run it.
            </p>

            <div className="hero-actions">
              <Link className="primary" href="/#start">
                Start with one workflow
              </Link>
              <Link className="text-link" href="/#results">
                See what we have shipped →
              </Link>
            </div>
          </div>

          <div className="deploy-cycle-card">
            <div className="cycle-top">
              <span>DEPLOY POD</span>
              <i aria-hidden="true" />
            </div>
            <div className="cycle-big">02</div>
            <div className="cycle-label">forward-deployed engineers, one workflow</div>
            <div className="cycle-steps">
              <span>Product</span>
              <span>Engineering</span>
              <span>Handover</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-meta">
        <div className="hero-meta-inner">
          <div>
            <strong>DEPLOY</strong> · Detect → Enrich → Plan → Link → Operate → Yield
          </div>
          <div className="scroll-note">
            Scroll <span aria-hidden="true">↓</span>
          </div>
        </div>
      </div>
    </header>
  );
}
