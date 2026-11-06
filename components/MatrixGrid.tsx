"use client";
import { useState } from "react";
import type { Category, MatrixItem } from "@/lib/portfolio";

export default function MatrixGrid({ items, categories }: { items: MatrixItem[]; categories: Category[] }) {
  const [cat, setCat] = useState<Category | "All">("All");
  const shown = cat === "All" ? items : items.filter((x) => x.cat === cat);
  return (
    <>
      <div className="pf-tabs">
        {(["All", ...categories] as const).map((c) => (
          <button key={c} className={c === cat ? "on" : ""} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="pf-grid4" data-reveal>
        {shown.map((x) => (
          <article className="pf-card" key={x.title}>
            <div className="pf-cardhead"><span className="pf-chip">{x.cat}</span></div>
            <h3>{x.title}</h3>
            <p>{x.body}</p>
            <div className="pf-tags">{x.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </article>
        ))}
      </div>
    </>
  );
}
