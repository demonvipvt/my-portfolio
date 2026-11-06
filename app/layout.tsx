import type { ReactNode } from "react";
import "./globals.css";

export const metadata = { title: "Mont Builds", description: "Tech and AI, built in public." };

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
