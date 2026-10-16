import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  youtube?: string;
  html: string;
}

const DIR = path.join(process.cwd(), "content", "posts");

export function allPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        title: String(data.title ?? f),
        date: new Date(data.date ?? Date.now()).toISOString().slice(0, 10),
        summary: String(data.summary ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        youtube: typeof data.youtube === "string" ? data.youtube : undefined,
        html: marked.parse(content, { async: false }) as string,
      };
    })
    .filter((p) => !p.title.startsWith("DRAFT"))
    .sort((a, b) => b.date.localeCompare(a.date));
}
