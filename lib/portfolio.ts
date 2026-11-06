// All portfolio copy lives here. Real facts only — edit freely.

export interface Pillar { title: string; body: string }
export interface Stage { key: string; title: string; body: string }
export interface Flagship { tag: string; title: string; body: string; points: string[]; stack: string[] }
export interface MatrixItem { cat: Category; title: string; body: string; tags: string[] }
export type Category = "Agents" | "Web" | "Commerce" | "Media";

export const profile = {
  name: "MONT",
  role: "Full-stack lead · AI agent builder",
  intro:
    "I build AI tools for Shopify merchants, and the agent workflows that build them: orchestrated, verified, and written up in public.",
  stats: [
    { value: "3", label: "Agent tiers" },
    { value: "VI/EN", label: "Bilingual" },
    { value: "0", label: "Unverified “tests passed”" },
  ],
  // TODO(Mont): set email / socials when you decide on public contact. Empty = hidden.
  email: "",
  links: [
    { label: "RSS", href: "/feed.xml" },
    { label: "Posts", href: "/posts" },
  ],
};

export const pillars: Pillar[] = [
  { title: "Orchestration", body: "Claude plans and gates. Cheaper models type the code. One task, one workspace." },
  { title: "Verification", body: "No “done” without the command and its output. Unverified means said out loud." },
  { title: "Built in public", body: "Every video starts as research. The write-up lands here first." },
];

export const about = {
  paragraphs: [
    "I'm Mont, a full-stack lead building AI tools for Shopify merchants. Day to day that means Next.js, TypeScript and a lot of agents that write code under supervision.",
    "Most of my time goes into how the work gets done: splitting tasks so an agent can't misread them, routing each step to the cheapest model that can do it, and checking every result before it ships.",
  ],
  quote: "Correctness over speed. Automate the boring part, verify the rest.",
  principles: [
    { title: "Think before coding", body: "State assumptions first, especially when the ticket is vague." },
    { title: "Simplicity first", body: "The smallest fix that solves the actual problem." },
    { title: "Surgical changes", body: "Touch only what the task needs." },
  ],
};

export const core = {
  tag: "Core workflow",
  title: "Javis: agent task pipeline",
  body:
    "Every ticket runs through the same six stages, each in its own task workspace. Finished tasks leave a final summary behind, so the next agent starts with context instead of guesses.",
  stats: [
    { value: "6", label: "Stages" },
    { value: "1:1", label: "Task : workspace" },
    { value: "100%", label: "Summarised" },
  ],
  stages: [
    { key: "S1", title: "Analyze", body: "Read the ticket, the code and the docs. Write assumptions down before touching anything." },
    { key: "S2", title: "Plan", body: "Cut the work into small task files with a strict test checklist each." },
    { key: "S3", title: "Implement", body: "A cheaper model types the code against the task file. Ambiguity means stop and ask." },
    { key: "S4", title: "Test", body: "The orchestrator re-runs the exact test command itself. Output is the evidence." },
    { key: "S5", title: "Review", body: "Diff reviewed against the coding standards and the original spec." },
    { key: "S6", title: "Summarize", body: "final_summary.md goes into the knowledge archive for the next task." },
  ] satisfies Stage[],
};

export const flagships: Flagship[] = [
  {
    tag: "Media",
    title: "Newsreel: AI news shorts",
    body: "Vertical Vietnamese AI-news videos built end to end in code: brief, script, storyboard, TTS, render, QA.",
    points: ["720×1280 at 30fps with Remotion", "Rolling karaoke captions", "Claude owns script and QA"],
    stack: ["Remotion", "React", "TTS"],
  },
  {
    tag: "Agents",
    title: "Model routing",
    body: "The expensive model plans and checks, cheaper models implement. Targets a 60–80% token saving on implementation work.",
    points: ["Spec, implement, verify stages", "A different vendor verifies", "Deadlines stop hung runs"],
    stack: ["Claude Code", "opencode", "Haiku"],
  },
  {
    tag: "Web",
    title: "Mont Builds",
    body: "This site. Markdown in, one script validates, builds, commits and pushes; Vercel deploys.",
    points: ["Static Next.js", "RSS feed", "Posts before socials"],
    stack: ["Next.js", "TypeScript", "Vercel"],
  },
];

export const categories: Category[] = ["Agents", "Web", "Commerce", "Media"];

export const matrix: MatrixItem[] = [
  { cat: "Agents", title: "Claude Code skills & hooks", body: "Packaged workflows for diagnose, TDD, review and PR creation.", tags: ["Skills", "Hooks"] },
  { cat: "Agents", title: "Jira over MCP", body: "Tickets read, transitioned and commented on from the agent loop.", tags: ["MCP", "Jira"] },
  { cat: "Agents", title: "Task event log", body: "Decisions and links recorded per task, searchable later.", tags: ["Registry"] },
  { cat: "Web", title: "Next.js App Router", body: "TypeScript strict, Tailwind, server components by default.", tags: ["Next.js", "TS"] },
  { cat: "Web", title: "Testing", body: "Jest and React Testing Library, red-green-refactor when it pays.", tags: ["Jest", "RTL"] },
  { cat: "Commerce", title: "Merchant tooling", body: "AI features for Shopify stores: search, discovery and analytics.", tags: ["Shopify"] },
  { cat: "Commerce", title: "Service config on EKS", body: "Secrets via AWS Secrets Manager and External Secrets Operator.", tags: ["AWS", "K8s"] },
  { cat: "Media", title: "Code-driven video", body: "Scene templates in React, narration by TTS, rendered headless.", tags: ["Remotion"] },
];
