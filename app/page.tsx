import { Anton, Be_Vietnam_Pro, Caveat, JetBrains_Mono } from "next/font/google";
import { allPosts } from "@/lib/posts";
import { about, categories, core, flagships, matrix, pillars, profile } from "@/lib/portfolio";
import StageTabs from "@/components/StageTabs";
import MatrixGrid from "@/components/MatrixGrid";
import ScrollFX from "@/components/ScrollFX";
import "./portfolio.css";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--f-display" });
const script = Caveat({ subsets: ["latin"], weight: "700", variable: "--f-script" });
const sans = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["400", "600", "800"], variable: "--f-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--f-mono" });

export const metadata = { title: "Mont — Portfolio", description: profile.intro };

export default function Home() {
  const notes = allPosts().slice(0, 3);
  return (
    <div className={`pf ${display.variable} ${script.variable} ${sans.variable} ${mono.variable}`}>
      <ScrollFX />
      <nav data-reveal className="pf-nav">
        <a href="#top" className="pf-logo" aria-label="Mont Builds"><img src="/brand/logo-badge.png" alt="" width={26} height={26} /></a>
        <span className="pf-mono pf-dim">MONT.</span>
        <a href="#about">About</a>
        <a href="#flagships">Flagships</a>
        <a href="#matrix">Matrix</a>
        {notes.length > 0 && <a href="#notes">Notes</a>}
        <a href="#contact">Contact</a>
        <span className="pf-avail pf-mono"><i />Building</span>
      </nav>

      <section id="top" className="pf-hero pf-wrap">
        <h1 data-reveal className="pf-giant pf-px-fast" aria-label="Portfolio">PORT<em>FOLIO</em></h1>
        <div className="pf-herogrid">
          <div>
            <div data-reveal className="pf-hello">Hello, I&apos;m</div>
            <div data-reveal className="pf-namebox">{profile.name}.</div>
            <div data-reveal className="pf-role pf-mono"><i />{profile.role}</div>
            <p data-reveal className="pf-intro">{profile.intro}</p>
            <div data-reveal className="pf-ctas">
              <a className="pf-btn red" href="#flagships">See the work →</a>
              <a className="pf-btn" href="/posts">Read the notes</a>
            </div>
            <div data-reveal className="pf-stats">
              {profile.stats.map((s) => (
                <div key={s.label}><b>{s.value}</b><span className="pf-mono">{s.label}</span></div>
              ))}
            </div>
          </div>
          <div data-reveal className="pf-portrait pf-px-slow" aria-hidden>
            <div className="pf-portrait-in"><img src="/brand/logo-m.png" alt="" width={553} height={438} /></div>
            <div className="pf-portrait-tag pf-mono">● Build smarter. Stay ahead.</div>
          </div>
          <ol className="pf-pillars pf-px-mid">
            {pillars.map((p, n) => (
              <li data-reveal key={p.title}>
                <div className="pf-mono pf-dim">0{n + 1}.</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="about" className="pf-wrap pf-sec">
        <div data-reveal className="pf-index pf-mono">// 01.00 SEC_ABOUT</div>
        <div data-reveal className="pf-eyebrow pf-mono">Engineer profile</div>
        <h2 data-reveal>Background &amp; Philosophy</h2>
        <div data-reveal className="pf-about">
          <div>
            {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
            <blockquote>“{about.quote}”</blockquote>
          </div>
          <ul className="pf-principles">
            {about.principles.map((p) => (
              <li key={p.title}><h3>{p.title}</h3><p>{p.body}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="flagships" className="pf-wrap pf-sec">
        <div data-reveal className="pf-index pf-mono">// 02.00 SEC_FLAGSHIPS</div>
        <div data-reveal className="pf-eyebrow pf-mono">Architectural showcase</div>
        <h2 data-reveal>Flagship Builds</h2>
        <p data-reveal className="pf-lead">Systems I run every day, not demos.</p>

        <article data-reveal className="pf-core">
          <span className="pf-chip">{core.tag}</span>
          <h3>{core.title}</h3>
          <p>{core.body}</p>
          <div className="pf-corestats">
            {core.stats.map((s) => <div key={s.label}><b>{s.value}</b><span className="pf-mono">{s.label}</span></div>)}
          </div>
          <StageTabs stages={core.stages} />
        </article>

        <div className="pf-grid3">
          {flagships.map((f) => (
            <article data-reveal className="pf-card" key={f.title}>
              <div className="pf-cardhead"><span className="pf-chip">{f.tag}</span></div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <ul>{f.points.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className="pf-tags">{f.stack.map((t) => <span key={t}>{t}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="matrix" className="pf-wrap pf-sec">
        <div data-reveal className="pf-index pf-mono">// 03.00 SEC_MATRIX</div>
        <div data-reveal className="pf-eyebrow pf-mono">Engineering index</div>
        <h2 data-reveal>The Systems Matrix</h2>
        <p data-reveal className="pf-lead">What I work with, by area.</p>
        <MatrixGrid items={matrix} categories={categories} />
      </section>

      {notes.length > 0 && (
        <section id="notes" className="pf-wrap pf-sec">
          <div data-reveal className="pf-index pf-mono">// 04.00 SEC_NOTES</div>
          <div data-reveal className="pf-eyebrow pf-mono">Built in public</div>
          <h2 data-reveal>Field Notes</h2>
          <div className="pf-grid3">
            {notes.map((p) => (
              <a data-reveal className="pf-card pf-note" href={`/posts/${p.slug}`} key={p.slug}>
                <div className="pf-cardhead"><span className="pf-mono pf-dim">{p.date}</span></div>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <span className="pf-mono pf-acc">Read →</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section id="contact" className="pf-wrap pf-contact">
        <div data-reveal className="pf-eyebrow pf-mono">Direct line</div>
        <h2 data-reveal>Let&apos;s Build Something<br />That Actually Ships.</h2>
        <p data-reveal className="pf-lead">Follow the build log, or reach out when there&apos;s something worth automating.</p>
        <div data-reveal className="pf-ctas center">
          {profile.email && <a className="pf-btn red" href={`mailto:${profile.email}`}>{profile.email}</a>}
          {profile.links.map((l) => <a className="pf-btn" key={l.href} href={l.href}>{l.label}</a>)}
        </div>
        <p className="pf-foot pf-mono">© {new Date().getFullYear()} Mont Builds · Tech and AI, built in public.</p>
      </section>
    </div>
  );
}
