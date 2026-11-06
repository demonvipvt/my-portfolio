import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export const metadata = { title: "About — Mont Builds" };

export default function About() {
  const file = path.join(process.cwd(), "content", "about.md");
  const md = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "# About\n\nTech and AI, built in public.";
  return <div dangerouslySetInnerHTML={{ __html: marked.parse(md, { async: false }) as string }} />;
}
