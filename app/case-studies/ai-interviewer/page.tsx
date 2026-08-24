import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArticleCta from "@/components/home/ArticleCta";
import BookCta from "@/components/home/BookCta";
import HomeNav from "@/components/home/HomeNav";
import shell from "../../home.module.css";
import styles from "../sql-rag/article.module.css";

export const metadata: Metadata = {
  title: "Building a Real-Time AI Interviewer for Technical Hiring · DEPLOY Case Study",
  description:
    "How we built a production real-time AI technical interviewer with live voice, contextual candidate retrieval, live coding sandboxes, and explainable scoring across 150+ engineer-days.",
  openGraph: {
    title: "Building a Real-Time AI Interviewer for Technical Hiring · DEPLOY Case Study",
    description:
      "How we built a production real-time AI technical interviewer with live voice, coding execution, and explainable scoring.",
    images: ["/case-studies/ai-interviewer-thumbnail.png"],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Building a Real-Time AI Interviewer for Technical Hiring · DEPLOY Case Study",
    description:
      "How we built a production real-time AI technical interviewer with live voice, coding execution, and explainable scoring.",
    images: ["/case-studies/ai-interviewer-thumbnail.png"],
  },
};

export default function AiInterviewerCaseStudyPage() {
  return (
    <div className={shell.shell}>
      <HomeNav />

      {/* Case Study Header */}
      <header className={shell.routeTop}>
        <div className={styles.headerContainer}>
          {/* Breadcrumb navigation */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className={styles.crumbDivider}>/</li>
              <li>
                <Link href="/case-studies">Case Studies</Link>
              </li>
              <li className={styles.crumbDivider}>/</li>
              <li className={styles.crumbActive}>AI Interviewer</li>
            </ol>
          </nav>

          {/* Badge */}
          <div className={styles.badgeRow}>
            <span className={styles.categoryBadge}>Production Case Study</span>
          </div>

          <h1 className={styles.title}>
            Building a Real-Time AI Interviewer for Technical Hiring
          </h1>

          <p className={styles.leadSummary}>
            How we built an AI-led technical interview system with live voice, adaptive questioning,
            sandboxed code execution, and explainable scoring across 150+ engineer-days.
          </p>

          <div className={styles.metaRow}>
            <div className={styles.metaLeft}>
              <span>DEPLOY Engineering</span>
              <span className={styles.metaDot}>·</span>
              <time dateTime="2026-08-24">August 2026</time>
              <span className={styles.metaDot}>·</span>
              <span>10 min read</span>
            </div>
            <div className={styles.tagsPill}>
              <span>Realtime Voice</span>
              <span>Live Coding</span>
              <span>Evals</span>
              <span>Hiring AI</span>
            </div>
          </div>

          {/* Featured Hero Thumbnail */}
          <div className={styles.heroThumbnail}>
            <Image
              src="/case-studies/ai-interviewer-thumbnail.png"
              alt="Building a Real-Time AI Interviewer for Technical Hiring"
              width={1600}
              height={900}
              priority
              className={styles.heroImage}
            />
          </div>
        </div>
      </header>

      {/* Main article body */}
      <article className={styles.article}>
        <div className={styles.readingColumn}>
          {/* Opening Section */}
          <section className={styles.section}>
            <p className={styles.leadParagraph}>The first version worked.</p>
            <p>
              It could listen to a candidate, generate a response, ask the next question, and keep
              the interview moving.
            </p>
            <p>But it did not yet feel like an interview.</p>
            <p>That difference became the core engineering problem.</p>
            <p>
              A technical interview is highly sensitive to delay. If the interviewer pauses too long
              after every answer, the conversation feels artificial. If the system cannot understand
              what the candidate is coding in real time, it loses the ability to ask meaningful
              follow-ups. And if the final recommendation cannot be traced back to evidence from the
              conversation, the result is difficult for a recruiter to trust.
            </p>
            <p>
              The challenge was therefore not simply to connect speech recognition, an LLM, and
              text-to-speech.
            </p>
            <p>
              It was to make the entire interaction feel responsive, context-aware, and defensible.
            </p>
          </section>

          {/* Section 1: Latency */}
          <section className={styles.section}>
            <h2>Latency became the first product constraint</h2>
            <p>The early implementation used a conventional sequential voice flow.</p>
            <p>
              Speech was transcribed, interpreted, sent through the language model, converted back
              to speech, and then played to the candidate.
            </p>
            <p>Functionally, it worked.</p>
            <p>Conversationally, it felt slow.</p>
            <p>
              Each additional stage added a little delay, and those delays accumulated quickly
              enough to break the rhythm of the interview.
            </p>
            <p>This changed how we evaluated the system.</p>
            <p>We were no longer asking:</p>

            <blockquote className={styles.exampleQuote}>Does every component work?</blockquote>

            <p>We started asking:</p>

            <blockquote className={styles.exampleQuote}>
              Does the candidate experience the interaction as one continuous conversation?
            </blockquote>

            <p>
              That shift influenced several later decisions, including how voice models were
              evaluated and how the realtime loop was orchestrated.
            </p>
          </section>

          {/* Section 2: Voice quality */}
          <section className={styles.section}>
            <h2>Voice quality was only one part of the TTS decision</h2>
            <p>
              A technically impressive voice model is not automatically the right model for an
              interview product.
            </p>
            <p>We evaluated speech generation across three competing dimensions:</p>
            <ul>
              <li>perceived voice quality</li>
              <li>time to first audio</li>
              <li>cost per interview minute</li>
            </ul>
            <p>The best standalone voice was not necessarily the best system choice.</p>
            <p>
              A model that sounds marginally better but adds noticeable response delay can make the
              overall interview feel worse.
            </p>
            <p>
              Likewise, a very fast model can become expensive once it is running across long
              technical interviews at scale.
            </p>
            <p>The useful optimization target was therefore not raw model quality.</p>
            <p>
              It was the best balance of{" "}
              <strong>latency, naturalness, and cost inside the complete interview experience</strong>
              .
            </p>
          </section>

          {/* Section 3: Generic questions */}
          <section className={styles.section}>
            <h2>Generic questions were not enough</h2>
            <p>A good technical interview should not feel like a shuffled question bank.</p>
            <p>
              If a candidate has several years of backend experience, the interviewer should be able
              to ask about that experience. If the role requires distributed systems, the interview
              should lean into those requirements. If the candidate performs strongly on one
              question, the next question should be able to adapt.
            </p>
            <p>
              To support that, the product used contextual retrieval over both sides of the
              interview:
            </p>
            <div className={styles.calloutPill}>
              <strong>candidate context and role context.</strong>
            </div>
            <p>
              This allowed the interviewer to generate questions that were grounded in the
              candidate&apos;s background while still remaining aligned with the job requirements.
            </p>
            <p>The result was a more specific interview rather than a generic sequence of prompts.</p>
          </section>

          {/* Section 4: Coding */}
          <section className={styles.section}>
            <h2>Coding changed the interaction completely</h2>
            <p>Technical interviews are not just conversations.</p>
            <p>
              Candidates need to solve problems, write code, run it, debug it, and explain what they
              are doing.
            </p>
            <p>
              That meant the interview experience had to understand both the spoken conversation and
              the coding session.
            </p>
            <p>
              A sandboxed execution environment was introduced so candidates could write and run code
              during the interview while the AI interviewer continued the discussion.
            </p>
            <p>This created a much richer signal.</p>
            <p>Instead of only asking:</p>

            <blockquote className={styles.exampleQuote}>What is the time complexity?</blockquote>

            <p>
              the interviewer could react to the actual approach the candidate had implemented and
              ask about trade-offs, edge cases, or a failing test.
            </p>
            <p>
              That moved the experience closer to a real technical interview rather than a
              voice-based quiz.
            </p>
          </section>

          {/* Section 5: Explainable Evaluation */}
          <section className={styles.section}>
            <h2>Evaluation had to be explainable</h2>
            <p>Generating questions was only half the system.</p>
            <p>
              The harder problem was turning a long interview into a hiring signal that someone could
              actually use.
            </p>
            <p>A recruiter does not want another forty-page transcript.</p>
            <p>They want to know:</p>
            <ul>
              <li>how the candidate performed</li>
              <li>where the strongest signals appeared</li>
              <li>which skills were weak</li>
              <li>how the candidate compared with others</li>
              <li>why the system reached its recommendation</li>
            </ul>
            <p>
              The evaluation experience therefore focused on structured evidence rather than a
              single opaque score.
            </p>
            <p>
              Hard-skill signals could come from coding performance, problem-solving, and technical
              knowledge. Communication and other softer signals could be derived from the
              conversation itself.
            </p>
            <p>
              The final output was designed to support both candidate-level feedback and
              employer-side decision-making.
            </p>
          </section>

          {/* Section 6: Scoring Consistency */}
          <section className={styles.section}>
            <h2>The scoring problem was not just accuracy</h2>
            <p>A human interviewer naturally carries context from the entire conversation.</p>
            <p>An AI system has to reproduce that consistency intentionally.</p>
            <p>
              A candidate may struggle early, recover later, change their approach after feedback,
              or explain a technically correct solution poorly.
            </p>
            <p>A useful evaluation cannot treat every response as an isolated event.</p>
            <p>
              That made consistency across the complete interview more important than individual
              question scoring.
            </p>
            <p>
              The product therefore evolved toward a broader evaluation view: skill-level
              performance, evidence from the interview, code execution results, and final
              recommendation all needed to agree with each other.
            </p>
            <p>For hiring workflows, this consistency matters as much as raw model capability.</p>
          </section>

            <ArticleCta />

          {/* Section 7: Four Workstreams */}
          <section className={styles.section}>
            <h2>Four workstreams, one product</h2>
            <p>The engagement eventually grew across four major areas:</p>

            <div className={styles.tableCard}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Workstream</th>
                    <th>Primary focus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>AI interviewer</td>
                    <td>Realtime voice, candidate context, live coding</td>
                  </tr>
                  <tr>
                    <td>Question generation</td>
                    <td>Role-aware and candidate-aware interviewing</td>
                  </tr>
                  <tr>
                    <td>Evaluation</td>
                    <td>Technical and communication signals</td>
                  </tr>
                  <tr>
                    <td>Reporting</td>
                    <td>Recruiter-facing scoring and candidate feedback</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              The total implementation represented roughly{" "}
              <strong>150+ engineer-days of scoped engineering work</strong>.
            </p>
            <p>A significant share of that effort went into the realtime interviewer itself.</p>
            <p>That was intentional.</p>
            <p>If the conversation layer feels broken, every downstream feature becomes irrelevant.</p>
            <p>
              Question generation, evaluation, and dashboards only become valuable once candidates
              can complete an interview that feels natural enough to finish.
            </p>
          </section>

          {/* Section 8: Slow Version First */}
          <section className={styles.section}>
            <h2>Why we built the slow version first</h2>
            <p>
              One of the most useful engineering decisions was building a working sequential voice
              pipeline before optimizing it.
            </p>
            <p>On paper, that can look like throwaway work.</p>
            <p>In practice, it created a measurable baseline.</p>
            <p>
              The team could observe where latency appeared, test the interview flow with something
              real, compare voice providers under actual conditions, and show the product early
              rather than waiting for the entire system to be optimized.
            </p>
            <p>That prototype answered an important question:</p>

            <blockquote className={styles.exampleQuote}>
              Is the interview concept itself useful?
            </blockquote>

            <p>Once that was proven, the engineering effort could focus on making it fast enough for production.</p>
            <p>This sequencing reduced the risk of optimizing the wrong problem.</p>
          </section>

          {/* Section 9: Production Feedback */}
          <section className={styles.section}>
            <h2>Production feedback mattered more than perfect planning</h2>
            <p>
              Realtime voice products fail in ways that are difficult to reproduce in a clean
              development environment.
            </p>
            <ul>
              <li>Candidates have different microphones.</li>
              <li>Networks fluctuate.</li>
              <li>People interrupt the interviewer.</li>
              <li>They pause mid-sentence.</li>
              <li>They restart answers.</li>
              <li>They switch between speaking and coding.</li>
            </ul>
            <p>These edge cases are not secondary details.</p>
            <p>They are the product.</p>
            <p>That is why the build included meaningful room for iteration after the first working versions.</p>
            <p>The goal was not to freeze the system once each feature existed.</p>
            <p>It was to improve the interaction based on real interviews and real failure modes.</p>
          </section>

          {/* Section 10: Difficulties */}
          <section className={styles.section}>
            <h2>What made the system difficult</h2>
            <p>The complexity came from combining several product constraints that pull in different directions.</p>
            <p>Lower latency can increase infrastructure or model cost.</p>
            <p>
              More candidate context can improve personalization but also increases reasoning
              complexity.
            </p>
            <p>
              More aggressive evaluation can create richer reports but risks producing signals that
              recruiters cannot verify.
            </p>
            <p>
              A highly adaptive interviewer can feel intelligent, but it also needs to remain
              consistent across candidates.
            </p>
            <p>The system therefore had to balance:</p>
            <div className={styles.calloutPill}>
              <strong>latency, personalization, evaluation quality, cost, and explainability.</strong>
            </div>
            <p>Optimizing any one of those in isolation would have produced a weaker product.</p>
          </section>

          {/* Section 11: Lessons */}
          <section className={styles.section}>
            <h2>What we learned</h2>
            <p>
              The first lesson was that <strong>latency is part of intelligence</strong>. A system
              can generate excellent answers and still feel unintelligent if every response arrives
              too slowly.
            </p>
            <p>
              The second was that <strong>contextual interviewing is much more valuable than generic question generation</strong>
              . Candidate and role context changes the quality of the conversation far more than
              simply adding more questions.
            </p>
            <p>
              The third was that <strong>live coding creates stronger interview signal than conversation alone</strong>
              . Seeing the candidate&apos;s actual implementation allows the interviewer to ask
              better follow-ups and makes technical evaluation more grounded.
            </p>
            <p>
              Finally, <strong>explainability is not optional in hiring</strong>. A score without
              evidence is difficult to trust. A recommendation tied back to the interview, code
              execution, and skill-level performance is much more useful to a recruiter.
            </p>
          </section>

          {/* Section 12: The Takeaway */}
          <section className={styles.takeawaySection}>
            <h2>The takeaway</h2>
            <p>Building an AI interviewer was not mainly a model problem.</p>
            <p>It was a realtime systems problem, a context problem, and an evaluation problem.</p>
            <p>
              The biggest improvements came from measuring latency instead of assuming it, grounding
              interviews in candidate and role context, integrating code execution into the
              conversation, and making final evaluations evidence-backed rather than opaque.
            </p>

            <div className={styles.conclusionCallout}>
              <p>
                <strong>
                  Voice made the interview conversational.
                  <br />
                  Context made it relevant.
                  <br />
                  Code execution made it technical.
                  <br />
                  Evidence made the result usable.
                </strong>
              </p>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className={styles.articleNav}>
            <Link href="/case-studies" className={styles.navLink}>
              ← Back to Case Studies
            </Link>
          </div>
        </div>
      </article>

      <BookCta />
    </div>
  );
}
