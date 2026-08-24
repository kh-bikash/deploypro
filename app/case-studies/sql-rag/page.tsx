import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArticleCta from "@/components/home/ArticleCta";
import BookCta from "@/components/home/BookCta";
import HomeNav from "@/components/home/HomeNav";
import shell from "../../home.module.css";
import styles from "./article.module.css";

export const metadata: Metadata = {
  title: "Scaling Enterprise SQL RAG to ~95% Accuracy · DEPLOY Case Study",
  description:
    "How we built an enterprise natural-language analytics system reaching ~95% benchmark accuracy through business semantics, cost-aware model orchestration, and an RLHF-inspired feedback loop.",
  openGraph: {
    title: "Scaling Enterprise SQL RAG to ~95% Accuracy · DEPLOY Case Study",
    description:
      "How business semantics, cost-aware reasoning, evals, and human feedback turned a text-to-SQL prototype into a production-grade analytics system.",
    images: ["/case-studies/sql-rag-thumbnail.png"],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scaling Enterprise SQL RAG to ~95% Accuracy · DEPLOY Case Study",
    description:
      "How business semantics, cost-aware reasoning, evals, and human feedback turned a text-to-SQL prototype into a production-grade analytics system.",
    images: ["/case-studies/sql-rag-thumbnail.png"],
  },
};

export default function SqlRagCaseStudyPage() {
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
              <li className={styles.crumbActive}>SQL RAG at Scale</li>
            </ol>
          </nav>

          {/* Badge */}
          <div className={styles.badgeRow}>
            <span className={styles.categoryBadge}>Production Case Study</span>
          </div>

          <h1 className={styles.title}>Scaling Enterprise SQL RAG to ~95% Accuracy</h1>

          <p className={styles.leadSummary}>
            How business semantics, cost-aware reasoning, rigorous evals, and an RLHF-inspired
            feedback loop turned a fragile text-to-SQL prototype into a production-grade analytics
            engine.
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
              <span>Enterprise AI</span>
              <span>RAG</span>
              <span>Evals</span>
              <span>RLHF</span>
            </div>
          </div>

          {/* Featured Hero Thumbnail */}
          <div className={styles.heroThumbnail}>
            <Image
              src="/case-studies/sql-rag-thumbnail.png"
              alt="Scaling Enterprise SQL RAG to ~95% Accuracy"
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
            <p className={styles.leadParagraph}>
              Natural-language analytics looks simple when the database is small. It becomes a very
              different problem once the system has to reason across dozens of related entities,
              hundreds of thousands of operational records, ambiguous business terminology, and
              multi-turn analytical questions.
            </p>
            <p>
              We built an enterprise SQL RAG system for that environment. The final product reached
              the <strong>mid-90% range on a controlled end-to-end evaluation set</strong>, answered
              most analytical questions in the <strong>low tens of seconds</strong>, and reduced
              model cost per correct answer materially compared with the first production prototype.
            </p>
            <p>
              The difficult part was not teaching an LLM to write SQL. It was teaching the overall
              system when <strong>not</strong> to guess.
            </p>
          </section>

          {/* Section 1: Where basic text-to-SQL broke */}
          <section className={styles.section}>
            <h2>Where basic text-to-SQL broke</h2>
            <p>
              Our early prototype worked well on clean questions. Ask for a simple aggregation,
              ranking, or time-based comparison and the model could usually produce something
              plausible.
            </p>
            <p>Real business questions were harder.</p>
            <p>A request such as:</p>

            <blockquote className={styles.exampleQuote}>
              Which accounts performed best this quarter?
            </blockquote>

            <p>does not have one universal answer.</p>
            <p>
              &ldquo;Best&rdquo; could mean growth, revenue, conversion, activity, margin, or
              another company-specific metric. Several interpretations can produce perfectly valid
              SQL, and that is exactly what makes the failure dangerous: the database executes the
              query successfully even when the business interpretation is wrong.
            </p>
            <p>
              As the data environment grew, we saw the same pattern repeatedly. Syntax errors were
              easy to catch. Semantic errors were much harder because the results still looked
              believable.
            </p>
            <p>
              That moved the focus of the project from SQL generation to{" "}
              <strong>business understanding</strong>.
            </p>
          </section>

          {/* Section 2: Business context became part of the data layer */}
          <section className={styles.section}>
            <h2>Business context became part of the data layer</h2>
            <p>
              A schema tells an LLM which tables and columns exist. It does not explain how an
              organization defines terms such as <em>active</em>, <em>qualified</em>,{" "}
              <em>completed</em>, <em>recognized</em>, or <em>high value</em>.
            </p>
            <p>
              We therefore treated approved business definitions, reporting conventions, valid
              categories, and important analytical terms as first-class context.
            </p>
            <p>
              The goal was not to give the model more text. It was to give it{" "}
              <strong>less, but more relevant, context</strong>.
            </p>
            <p>That distinction mattered.</p>
            <p>
              In a wide relational environment, supplying the entire schema increases token usage
              while also increasing the number of plausible but incorrect joins, filters, and fields
              available to the model. Narrowing the context to the entities and business concepts
              relevant to the current question improved both consistency and cost.
            </p>
            <p>
              Ambiguity also became an explicit product state. If two interpretations could
              materially change the answer, the system could ask one short clarification instead of
              silently choosing one.
            </p>
            <p>That small design decision prevented a large class of confident analytical errors.</p>
          </section>

          {/* Section 3: Cost optimization */}
          <section className={styles.section}>
            <h2>Cost optimization: from cost per call to cost per correct answer</h2>
            <p>
              The first production version was expensive for a simple reason: too much work was
              being delegated to high-capability models.
            </p>
            <p>
              A single question could trigger intent understanding, context retrieval, relational
              reasoning, analytical generation, validation, explanation, and a follow-up response.
              Using the strongest model with a large context window for every step worked, but it did
              not scale economically.
            </p>
            <p>We started measuring a different number:</p>

            <div className={styles.calloutPill}>
              <strong>cost per correct answer.</strong>
            </div>

            <p>That changed the optimization strategy.</p>
            <p>
              Smaller models could handle lightweight normalization, formatting, and simpler
              classification tasks. More expensive reasoning was reserved for ambiguous or
              structurally difficult questions. Stable business context and frequently reused
              metadata could be reused rather than regenerated repeatedly.
            </p>
            <p>
              Reducing irrelevant context was especially effective because it improved three things
              at the same time: fewer tokens, lower latency, and fewer wrong analytical paths.
            </p>
            <p>
              Across successive iterations, model-side cost per successful answer fell materially
              while the evaluation score remained within the target band.
            </p>
            <p>
              The important lesson was that cost optimization was not primarily about finding a
              cheaper model. It was about{" "}
              <strong>spending model intelligence only where it changed the outcome</strong>.
            </p>
          </section>

          {/* Section 4: Evals changed how we built the system */}
          <section className={styles.section}>
            <h2>Evals changed how we built the system</h2>
            <p>
              At first, we measured obvious engineering signals: did the generated request execute,
              did the result render, and did the answer look reasonable?
            </p>
            <p>Those metrics were too weak.</p>
            <p>
              A query can execute without errors and still use the wrong reporting period, wrong
              grouping, wrong business definition, or wrong context from a previous turn.
            </p>
            <p>We moved the benchmark to the final business answer.</p>
            <p>
              The evaluation set contained several dozen carefully selected analytical questions
              covering filtering, aggregation, ranking, period comparisons, multi-condition
              questions, ambiguous terminology, unsupported values, and conversational follow-ups.
            </p>
            <p>
              A response counted as correct only when the{" "}
              <strong>final interpretation and returned result</strong> matched the expected
              benchmark answer.
            </p>
            <p>
              That produced a much more meaningful score. The strongest evaluated version landed at
              roughly <strong>95% end-to-end accuracy</strong> on the controlled internal set.
            </p>
            <p>More importantly, every failure was classified.</p>
            <p>
              Instead of recording only &ldquo;wrong answer,&rdquo; we separated failures into
              categories such as business interpretation, retrieval quality, temporal reasoning,
              grouping, filter behavior, conversational context, and result presentation.
            </p>
            <p>That turned evaluation into an engineering tool.</p>
            <p>
              If accuracy moved down, we could see <em>why</em>. If a new model or retrieval change
              improved one class of questions but hurt another, the regression suite exposed it
              before release.
            </p>
          </section>

            <ArticleCta />

          {/* Section 5: Human feedback */}
          <section className={styles.section}>
            <h2>Human feedback became an RLHF-style improvement loop</h2>
            <p>Offline evals tell you about the failures you already know how to test.</p>
            <p>Users find the failures you did not anticipate.</p>
            <p>
              We added lightweight feedback to analytical answers and stored enough surrounding
              context to make a negative result reproducible: the original question, interpreted
              intent, important assumptions, resulting answer, system version, and user feedback.
            </p>
            <p>
              We describe this as an <strong>RLHF-inspired loop</strong>, not continuous online
              retraining.
            </p>
            <p>
              Raw thumbs-up and thumbs-down signals are noisy. A user may dislike a technically
              correct answer because of terminology, formatting, or a changed business convention.
              Training directly on every rating would introduce new errors.
            </p>
            <p>
              Instead, reviewed feedback was used to improve the system in several ways. Real
              failures were promoted into new eval cases. Repeated preference patterns informed
              answer behavior. Retrieval mistakes revealed missing or irrelevant business context.
              Hard examples helped us decide when stronger reasoning was worth the additional cost.
            </p>
            <p>
              Over time, curated examples can also become useful preference data for supervised
              fine-tuning or preference optimization.
            </p>
            <p>
              The key was treating feedback as{" "}
              <strong>evaluation data first and training data second</strong>.
            </p>
          </section>

          {/* Section 6: What the later system looked like */}
          <section className={styles.section}>
            <h2>What the later system looked like</h2>
            <p>
              The exact client dataset and commercial metrics are intentionally abstracted, but the
              operating profile was roughly:
            </p>

            {/* Operating Profile Table */}
            <div className={styles.tableCard}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Production Profile</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Relational complexity</td>
                    <td>Dozens of connected entities</td>
                  </tr>
                  <tr>
                    <td>Data volume</td>
                    <td>Hundreds of thousands of operational records</td>
                  </tr>
                  <tr>
                    <td>Schema width</td>
                    <td>Many dozens of fields in major analytical entities</td>
                  </tr>
                  <tr>
                    <td>Typical response time</td>
                    <td>Low tens of seconds</td>
                  </tr>
                  <tr>
                    <td>End-to-end benchmark</td>
                    <td>Mid-90% range</td>
                  </tr>
                  <tr>
                    <td>Data access</td>
                    <td>Read-only</td>
                  </tr>
                  <tr>
                    <td>Model cost</td>
                    <td>Materially lower per correct answer than the first production version</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>These numbers were not optimized independently.</p>
            <p>
              Lowering inference cost at the expense of semantic accuracy would have created a
              cheaper but less useful product. Increasing accuracy with unrestricted context and
              expensive models would have produced a system that was difficult to scale.
            </p>
            <p>
              The production target was the intersection of{" "}
              <strong>accuracy, business understanding, latency, and cost</strong>.
            </p>
          </section>

          {/* Section 7: What we learned */}
          <section className={styles.section}>
            <h2>What we learned</h2>
            <p>
              The most expensive failures were semantic, not syntactic. Invalid SQL is obvious; a
              valid answer based on the wrong business assumption can pass unnoticed.
            </p>
            <p>
              More context was not always better. In complex schemas, irrelevant context increased
              both cost and ambiguity.
            </p>
            <p>
              Evals were more valuable than repeated prompt tweaking because they gave every
              engineering change a consistent test. Human feedback became significantly more useful
              once those eval categories existed, because each production failure could be converted
              into a measurable regression case.
            </p>
            <p>
              And RLHF was ultimately a data-quality problem. Collecting ratings was easy. Creating
              clean, reviewed preference data that represented what a <em>better analytical answer</em>{" "}
              actually meant was the difficult part.
            </p>
          </section>

          {/* Section 8: The takeaway */}
          <section className={styles.takeawaySection}>
            <h2>The takeaway</h2>
            <p>
              We did not reach ~95% benchmark accuracy by finding one perfect prompt or one perfect
              model.
            </p>
            <p>
              The gains came from making the system understand the business more precisely,
              shrinking the amount of unnecessary reasoning, evaluating the final answer instead of
              the generated SQL, and turning reviewed user feedback into a continuous improvement
              loop.
            </p>

            <div className={styles.conclusionCallout}>
              <p>
                <strong>
                  RAG supplied context. Business semantics reduced guessing. Evals gave us a quality
                  bar. Human feedback showed us what the benchmark missed. Cost optimization made the
                  system practical to scale.
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
