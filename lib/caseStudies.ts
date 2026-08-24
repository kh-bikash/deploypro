/**
 * Long-form engineering breakdowns. Shared so the /proof page and the
 * /case-studies index render the same list from one source.
 */
export type CaseStudyArticle = {
  slug: string;
  href: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  date: string;
  readTime: string;
};

export const caseStudyArticles: CaseStudyArticle[] = [
  {
    slug: "sql-rag",
    href: "/case-studies/sql-rag",
    title: "Scaling Enterprise SQL RAG to ~95% Accuracy",
    description:
      "How business semantics, cost-aware model routing, evals, and human feedback turned a text-to-SQL prototype into a production analytics engine.",
    thumbnail: "/case-studies/sql-rag-thumbnail.png",
    category: "Case Study",
    date: "August 2026",
    readTime: "10 min read",
  },
  {
    slug: "ai-interviewer",
    href: "/case-studies/ai-interviewer",
    title: "Building a Real-Time AI Interviewer for Technical Hiring",
    description:
      "Production-grade live voice interaction, contextual candidate retrieval, sandboxed live coding, and explainable scoring across 150+ engineer-days.",
    thumbnail: "/case-studies/ai-interviewer-thumbnail.png",
    category: "Case Study",
    date: "August 2026",
    readTime: "10 min read",
  },
  {
    slug: "agentic-learning",
    href: "/case-studies/agentic-learning",
    title: "Designing an Agentic Learning System for 1:1 Education",
    description:
      "Architectural blueprint for AI-assisted 1:1 education across 9 learner stages and 30+ capabilities: teacher copilots, mastery tracking, and safe autonomy.",
    thumbnail: "/case-studies/agentic-learning-thumbnail.png",
    category: "Architecture",
    date: "August 2026",
    readTime: "11 min read",
  },
];
