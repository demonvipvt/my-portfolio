import type { ReactNode } from "react";
import "./globals.css";

export const metadata = { title: "Mont Builds", description: "Tech and AI, built in public." };

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <a href="/" className="brand">Mont Builds</a>
          <nav><a href="/">Posts</a><a href="/about">About</a><a href="/feed.xml">RSS</a></nav>
        </header>
        <main>{children}</main>
        <footer>Tech and AI, built in public.</footer>
      </body>
    </html>
  );
}
