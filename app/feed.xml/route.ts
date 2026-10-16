import { allPosts } from "@/lib/posts";

const SITE = process.env.SITE_URL ?? "https://montbuilds.vercel.app";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const dynamic = "force-static";

export function GET() {
  const items = allPosts()
    .map((p) => `<item><title>${esc(p.title)}</title><link>${SITE}/posts/${p.slug}</link><guid>${SITE}/posts/${p.slug}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Mont Builds</title><link>${SITE}</link><description>Tech and AI, built in public.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
