"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { CursorBuild } from "@/lib/cursorBuild";

// Smooth inertia scroll, hero parallax (--p), scroll progress (--sp), and cursors that draw each
// [data-reveal] element in as it scrolls into view (lib/cursorBuild).
export default function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduce) targets.forEach((el) => el.classList.add("in"));
    const cb = reduce ? null : new CursorBuild(window.innerWidth < 700 ? 4 : 6);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { cb?.add(e.target as HTMLElement); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    if (cb) {
      root.classList.add("cb-on");
      void document.fonts.ready.then(() => {
        targets.forEach((el) => io.observe(el));
        void cb.intro();
      });
    }

    const update = (y: number) => {
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--p", String(Math.min(y / window.innerHeight, 1.5)));
      root.style.setProperty("--sp", String(max > 0 ? y / max : 0));
    };
    update(window.scrollY);
    if (reduce) {
      const onScroll = () => update(window.scrollY);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
    }

    const lenis = new Lenis({ lerp: 0.085, anchors: { offset: -60 } });
    lenis.on("scroll", ({ scroll }: { scroll: number }) => update(scroll));
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); io.disconnect(); cb?.destroy(); root.classList.remove("cb-on"); };
  }, []);

  return <div className="pf-progress" aria-hidden />;
}
