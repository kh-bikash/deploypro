import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookCta from "@/components/home/BookCta";
import HomeNav from "@/components/home/HomeNav";
import shell from "../../home.module.css";
import styles from "../sql-rag/article.module.css";

export const metadata: Metadata = {
  title: "Designing an Agentic Learning System for 1:1 Education · DEPLOY Case Study",
  description:
    "How we architected a 9-stage, 30+ capability agentic learning roadmap across diagnostics, teacher copilots, adaptive practice, and safe autonomous tutoring.",
  openGraph: {
    title: "Designing an Agentic Learning System for 1:1 Education · DEPLOY Case Study",
    description:
      "A systems blueprint for AI-assisted 1:1 education: digital learning identities, teacher amplification, and outcome-driven evals.",
    images: ["/case-studies/agentic-learning-thumbnail.png"],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Designing an Agentic Learning System for 1:1 Education · DEPLOY Case Study",
    description:
      "A systems blueprint for AI-assisted 1:1 education: digital learning identities, teacher amplification, and outcome-driven evals.",
    images: ["/case-studies/agentic-learning-thumbnail.png"],
  },
};

export default function AgenticLearningCaseStudyPage() {
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
              <li className={styles.crumbActive}>Agentic Learning</li>
            </ol>
          </nav>

          {/* Badge */}
          <div className={styles.badgeRow}>
            <span className={styles.categoryBadge}>Architecture &amp; Strategy</span>
          </div>

          <h1 className={styles.title}>
            Designing an Agentic Learning System for 1:1 Education
          </h1>

          <p className={styles.leadSummary}>
            How we designed an AI-assisted learning architecture across diagnostics, planning,
            tutoring, mastery tracking, and parent communication covering 9 learner-journey stages
            and 30+ capabilities.
          </p>

          <div className={styles.metaRow}>
            <div className={styles.metaLeft}>
              <span>DEPLOY Engineering</span>
              <span className={styles.metaDot}>·</span>
              <time dateTime="2026-08-24">August 2026</time>
              <span className={styles.metaDot}>·</span>
              <span>11 min read</span>
            </div>
            <div className={styles.tagsPill}>
              <span>EdTech AI</span>
              <span>Agentic Systems</span>
              <span>Human-in-the-Loop</span>
              <span>Evals</span>
            </div>
          </div>

          {/* Featured Hero Thumbnail */}
          <div className={styles.heroThumbnail}>
            <Image
              src="/case-studies/agentic-learning-thumbnail.png"
              alt="Designing an Agentic Learning System for 1:1 Education"
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
            <p className={styles.leadParagraph}>The product already worked.</p>
            <p>Students learned through live 1:1 classes with human teachers.</p>
            <p>
              The problem was that the quality of the experience depended heavily on which teacher a
              student happened to get, how much time that teacher had, and how consistently progress
              was tracked outside the classroom.
            </p>
            <p>That created a ceiling.</p>
            <p>
              A strong teacher could produce a strong outcome. A weaker process could produce a weaker
              one. And between classes, the system had very little intelligence of its own.
            </p>
            <p>The opportunity was not to replace the teacher.</p>
            <p>
              It was to build enough intelligence around the teacher that the system could enforce a
              quality floor while the teacher continued to set the ceiling.
            </p>
          </section>

          {/* Section 1: The biggest problem was not teaching */}
          <section className={styles.section}>
            <h2>The biggest problem was not teaching</h2>
            <p>
              The first discovery finding was that the most expensive work was often happening around
              the lesson rather than inside it.
            </p>
            <p>
              Teachers were spending time on homework review, progress tracking, planning, profile
              updates, parent communication, and repeated administrative preparation.
            </p>
            <p>Those tasks had two uncomfortable characteristics:</p>
            <div className={styles.calloutPill}>
              <strong>high effort and low confidence.</strong>
            </div>
            <p>That combination matters.</p>
            <p>
              If a teacher spends significant time reviewing work but still does not feel certain
              about what the student has truly mastered, the system is paying for effort without
              gaining reliable learning signal.
            </p>
            <p>That became the starting point for the roadmap.</p>
            <p>
              The goal was to move from a class-centric product to a learning system that
              continuously understands:
            </p>
            <ul>
              <li>what the student knows</li>
              <li>where they are struggling</li>
              <li>what should happen next</li>
              <li>when the teacher needs to intervene</li>
              <li>what parents should know</li>
              <li>what can happen between live classes</li>
            </ul>
          </section>

          {/* Section 2: A student needed a digital learning identity first */}
          <section className={styles.section}>
            <h2>A student needed a digital learning identity first</h2>
            <p>The roadmap quickly exposed a dependency problem.</p>
            <p>It is easy to brainstorm AI features:</p>
            <ul>
              <li>adaptive practice</li>
              <li>automated homework review</li>
              <li>personalized learning plans</li>
              <li>parent summaries</li>
              <li>instant tutoring</li>
              <li>mastery alerts</li>
              <li>next-course recommendations</li>
            </ul>
            <p>
              But those features become weak if the system does not have a reliable representation of
              the student.
            </p>
            <p>
              So the first foundational idea was a <strong>digital learning identity</strong>.
            </p>
            <p>This is not just a profile containing age, grade, or enrolled course.</p>
            <p>It is a continuously updated picture of the learner:</p>
            <ul>
              <li>diagnostic performance</li>
              <li>current skill level</li>
              <li>recent mistakes</li>
              <li>mastery signals</li>
              <li>pace</li>
              <li>learning goals</li>
              <li>homework behavior</li>
              <li>teacher observations</li>
              <li>progress over time</li>
            </ul>
            <p>Once that layer exists, other systems stop operating independently.</p>
            <p>A homework review can update the learner profile.</p>
            <p>The learner profile can change tomorrow&apos;s practice difficulty.</p>
            <p>A mastery signal can change the agenda for the next live session.</p>
            <p>A parent summary can explain progress using the same underlying evidence.</p>
            <p>Without that foundation, every feature becomes another isolated AI tool.</p>
          </section>

          {/* Section 3: The journey was larger than one agent */}
          <section className={styles.section}>
            <h2>The journey was larger than one agent</h2>
            <p>
              The discovery mapped the full learner journey across <strong>nine stages</strong>, from
              first interaction to course completion.
            </p>
            <p>
              Each stage had a current state, a target state, and a set of capabilities required to
              move from one to the other.
            </p>
            <p>
              At the beginning of the journey, AI can help with onboarding and diagnostics.
            </p>
            <p>
              During regular classes, it can help teachers prepare by summarizing homework, surfacing
              learning signals, and proposing a lesson agenda.
            </p>
            <p>
              Between classes, the system can provide reminders, adaptive practice, and instant
              doubt-solving.
            </p>
            <p>
              Later, the same learning history can support parent reporting, mastery validation,
              renewal decisions, and next-course recommendations.
            </p>
            <p>
              The roadmap named more than <strong>30 distinct capabilities</strong> across this
              journey.
            </p>
            <p>That number was useful because it immediately made one thing clear:</p>
            <p>
              this was not one AI feature. It was an operating system for the learning experience.
            </p>
          </section>

          {/* Section 4: Not everything needed to be AI */}
          <section className={styles.section}>
            <h2>Not everything needed to be AI</h2>
            <p>
              One of the most important scoping decisions was separating ordinary software from
              model-driven systems.
            </p>
            <p>Roughly a third of the roadmap could be handled with conventional automation:</p>
            <ul>
              <li>scheduling</li>
              <li>reminders</li>
              <li>assignment triggers</li>
              <li>profile updates</li>
              <li>approval workflows</li>
              <li>dashboards</li>
              <li>synchronization</li>
              <li>status tracking</li>
            </ul>
            <p>These systems do not need model judgment.</p>
            <p>
              Calling every automation an AI agent would increase complexity without improving the
              product.
            </p>
            <p>
              Another large group of capabilities did need generation or retrieval, but could still
              keep a teacher in the approval loop.
            </p>
            <p>Examples included:</p>
            <ul>
              <li>diagnostic support</li>
              <li>learning-plan generation</li>
              <li>homework review</li>
              <li>teaching briefings</li>
              <li>session summaries</li>
              <li>parent digests</li>
              <li>mastery summaries</li>
              <li>curriculum recommendations</li>
            </ul>
            <p>
              These are ideal human-in-the-loop workflows because the model can reduce effort while
              the teacher retains decision authority.
            </p>
            <p>Only a small subset required genuine autonomy.</p>
            <p>That distinction changed the build strategy.</p>
          </section>

          {/* Section 5: Autonomous systems had the highest value and highest risk */}
          <section className={styles.section}>
            <h2>Autonomous systems had the highest value — and the highest risk</h2>
            <p>The most transformative capabilities were also the ones that needed the most caution.</p>
            <p>Examples included:</p>
            <ul>
              <li>a 24/7 tutor</li>
              <li>adaptive practice</li>
              <li>live session intelligence</li>
              <li>predictive learner progression or renewal support</li>
            </ul>
            <p>
              Unlike a teacher-approved summary, these systems may act without a human reviewing every
              output.
            </p>
            <p>That changes the safety bar.</p>
            <p>A generated teacher briefing can be wrong and corrected before class.</p>
            <p>
              A tutoring agent giving a student the wrong explanation at 9pm may reinforce a
              misconception immediately.
            </p>
            <p>That means autonomous learning systems need stronger evaluation before they are trusted.</p>
            <p>
              The roadmap therefore treated autonomy as something to earn, not something to enable by
              default.
            </p>
          </section>

          {/* Section 6: Evals had to come before scale */}
          <section className={styles.section}>
            <h2>Evals had to come before scale</h2>
            <p>One of the strongest rules in the roadmap was simple:</p>

            <blockquote className={styles.exampleQuote}>
              &ldquo;The output looked plausible&rdquo; is not a quality bar.
            </blockquote>

            <p>A learning plan can sound excellent and still be badly calibrated.</p>
            <p>A homework summary can be fluent while missing the actual misconception.</p>
            <p>A tutoring answer can be technically correct but too advanced for the student.</p>
            <p>So any model-driven capability needs an evaluation harness before it reaches learners.</p>
            <p>The evaluation question is different for each workflow.</p>

            <p>
              <strong>For homework review:</strong>
            </p>
            <ul>
              <li>Did the system identify the actual mistake?</li>
              <li>Did it classify the misconception correctly?</li>
              <li>Did the teacher agree with the recommendation?</li>
            </ul>

            <p>
              <strong>For adaptive practice:</strong>
            </p>
            <ul>
              <li>Was the next question at the right difficulty?</li>
              <li>Did the student improve after the intervention?</li>
              <li>Did the system avoid repeating already-mastered material?</li>
            </ul>

            <p>
              <strong>For a tutoring agent:</strong>
            </p>
            <ul>
              <li>Was the answer correct?</li>
              <li>Was the explanation age-appropriate?</li>
              <li>Did it guide rather than simply reveal the answer?</li>
              <li>Did the student demonstrate understanding afterward?</li>
            </ul>

            <p>This makes evaluation a product-design problem, not merely a model benchmark.</p>
          </section>

          {/* Section 7: Teacher amplification was the core design principle */}
          <section className={styles.section}>
            <h2>Teacher amplification was the core design principle</h2>
            <p>The roadmap was deliberately not built around the idea of replacing live teachers.</p>
            <p>
              Teachers are still responsible for judgment, motivation, explanation, and the nuanced
              parts of learning that are difficult to automate safely.
            </p>
            <p>
              The system is most valuable where it can remove repetitive work and increase the
              quality of information available to the teacher.
            </p>
            <p>Before class, the teacher should already know:</p>
            <ul>
              <li>what homework was completed</li>
              <li>where the student struggled</li>
              <li>what changed since the previous session</li>
              <li>which concept needs attention</li>
              <li>what practice may be appropriate next</li>
            </ul>
            <p>
              After class, the system should capture the important signals without forcing the
              teacher to manually rebuild the student&apos;s learning history.
            </p>
            <p>
              The model sets the floor. The teacher still sets the ceiling.
            </p>
          </section>

          {/* Section 8: The best build order */}
          <section className={styles.section}>
            <h2>The best build order followed dependency, not excitement</h2>
            <p>The roadmap intentionally did not start with the 24/7 tutor.</p>
            <p>
              That would have been the most visible AI feature, but it would also have been built on
              weak foundations.
            </p>
            <p>The recommended order started with the systems that everything else depends on:</p>

            <h3>1. Learning identity and diagnostics</h3>
            <p>Create the profile, baseline assessment, and mastery signals first.</p>

            <h3>2. Teacher-efficiency workflows</h3>
            <p>
              Automate homework review and produce pre-class insight briefings. These are easier to
              measure and immediately reduce repetitive teacher work.
            </p>

            <h3>3. Between-class learning</h3>
            <p>
              Introduce adaptive practice and tutoring once the system has enough learner context to
              personalize them meaningfully.
            </p>

            <h3>4. Parent intelligence</h3>
            <p>
              Generate useful progress summaries and better preparation for parent-teacher
              conversations.
            </p>

            <h3>5. Long-term prediction</h3>
            <p>
              Only after enough history exists should the system attempt stronger predictive
              decisions such as renewal or next-course recommendations.
            </p>

            <p>This sequence reduces the risk of building intelligent features on top of weak data.</p>
          </section>

          {/* Section 9: Measurement */}
          <section className={styles.section}>
            <h2>Measurement needed to start before the build</h2>
            <p>A transformation roadmap is only useful if the impact can eventually be measured.</p>
            <p>That means baselines must exist before automation changes the workflow.</p>
            <p>Several metrics stood out:</p>
            <ul>
              <li>teacher time spent on homework review</li>
              <li>time from a student question to a useful answer</li>
              <li>time required to prepare for parent-teacher meetings</li>
              <li>percentage of students with validated mastery signals</li>
              <li>learner progress by cohort</li>
              <li>renewal or progression rates over time</li>
            </ul>
            <p>These metrics create a before-and-after view.</p>
            <p>
              Without them, the team may build something that feels impressive without being able to
              show whether learning or teacher productivity actually improved.
            </p>
          </section>

          {/* Section 10: What made this system complex */}
          <section className={styles.section}>
            <h2>What made this system complex</h2>
            <p>The complexity was not the number of agents.</p>
            <p>It was the dependency between them.</p>
            <p>A tutoring agent needs a learner profile.</p>
            <p>A learner profile needs diagnostics and session signals.</p>
            <p>Adaptive practice needs reliable mastery data.</p>
            <p>Parent summaries need validated progress.</p>
            <p>Predictive recommendations need history.</p>
            <p>
              This means the product cannot be designed as a collection of disconnected copilots.
            </p>
            <p>
              It has to behave like a learning system where each capability improves the context
              available to the next one.
            </p>
            <p>That is the larger architectural insight from the roadmap.</p>
          </section>

          {/* Section 11: What we learned */}
          <section className={styles.section}>
            <h2>What we learned</h2>
            <p>
              The first lesson was that <strong>AI should not be added uniformly</strong>. Some
              workflows are ordinary automation. Some benefit from model assistance with human
              approval. Only a few justify true autonomy.
            </p>
            <p>
              The second was that a <strong>digital learning identity is more valuable than any single agent</strong>
              . Once the system knows the learner continuously, personalization becomes much easier
              across the product.
            </p>
            <p>
              The third was that <strong>educational AI needs evals tied to learning outcomes, not just output quality</strong>
              .
            </p>
            <p>
              And finally, the most valuable AI systems in education may be the ones students barely
              notice. A better teacher briefing, a more accurate mastery signal, or a well-timed
              practice recommendation can improve the learning experience without replacing the human
              relationship at the center of it.
            </p>
          </section>

          {/* Section 12: The takeaway */}
          <section className={styles.takeawaySection}>
            <h2>The takeaway</h2>
            <p>The roadmap did not produce one giant autonomous tutor.</p>
            <p>It produced a build order for an agentic learning system.</p>
            <p>
              The path starts with structured learner data, removes repetitive teacher work,
              introduces human-reviewed intelligence, and only then moves toward autonomous support
              where the value justifies the risk.
            </p>

            <div className={styles.conclusionCallout}>
              <p>
                <strong>
                  Diagnostics create the learning identity.
                  <br />
                  Teacher copilots create leverage.
                  <br />
                  Adaptive systems create continuity.
                  <br />
                  Evals make autonomy safe enough to earn.
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
