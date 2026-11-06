import type { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="blog">
      <header>
        <a href="/" className="brand">Mont Builds</a>
        <nav><a href="/posts">Posts</a><a href="/about">About</a><a href="/feed.xml">RSS</a></nav>
      </header>
      <main>{children}</main>
      <footer>Tech and AI, built in public.</footer>
    </div>
  );
}
