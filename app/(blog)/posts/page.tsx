import { allPosts } from "@/lib/posts";

export const metadata = { title: "Posts — Mont Builds" };

export default function Posts() {
  const posts = allPosts();
  return (
    <>
      <h1>Notes from building</h1>
      <p className="meta">Every video starts as research. The write-up lands here first.</p>
      {posts.length === 0 && <p>First post coming soon.</p>}
      {posts.map((p) => (
        <div className="post" key={p.slug}>
          <h2><a href={`/posts/${p.slug}`}>{p.title}</a></h2>
          <div className="meta">{p.date}{p.tags.length ? ` · ${p.tags.join(", ")}` : ""}</div>
          <p>{p.summary}</p>
        </div>
      ))}
    </>
  );
}
