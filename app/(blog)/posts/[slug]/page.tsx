import { notFound } from "next/navigation";
import { allPosts } from "@/lib/posts";

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = allPosts().find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <article>
      <h1>{p.title}</h1>
      <div className="meta">{p.date}{p.tags.length ? ` · ${p.tags.join(", ")}` : ""}</div>
      {p.youtube && (
        <p><iframe width="560" height="315" src={`https://www.youtube.com/embed/${p.youtube}`} title={p.title} allowFullScreen /></p>
      )}
      <div dangerouslySetInnerHTML={{ __html: p.html }} />
    </article>
  );
}
