"use client";
import { useState } from "react";
import type { Stage } from "@/lib/portfolio";

export default function StageTabs({ stages }: { stages: Stage[] }) {
  const [i, setI] = useState(0);
  const s = stages[i];
  return (
    <div className="pf-stages">
      <div className="pf-eyebrow pf-mono">6-stage pipeline · click a stage</div>
      <div className="pf-tabs" role="tablist">
        {stages.map((x, n) => (
          <button key={x.key} role="tab" aria-selected={n === i} className={n === i ? "on" : ""} onClick={() => setI(n)}>
            {x.key}: {x.title}
          </button>
        ))}
      </div>
      <div className="pf-stage" role="tabpanel">
        <div className="pf-mono pf-acc">{s.key} · {s.title}</div>
        <p>{s.body}</p>
      </div>
    </div>
  );
}
