// "Cursors draw the page" effect: a pool of coloured cursors. Each queued element gets a
// cursor that flies to its top-left corner, drags a wireframe selection box (handles + W×H
// label) to the bottom-right, then the element is revealed (class "in").
// Everything lives in one absolutely-positioned layer in document coordinates.

const COLORS = ["#22d3ee", "#f472b6", "#facc15", "#a78bfa", "#4ade80", "#fb923c"];
const MOVE_MS = 420;
const DRAW_MS = 520;
const HOLD_MS = 160;

interface Cur { el: HTMLDivElement; x: number; y: number; busy: boolean; color: string }

const ARROW = (c: string) =>
  `<svg class="arrow" width="18" height="20" viewBox="0 0 18 20"><path d="M1 1l15 7.2-6.6 1.9L6.8 18z" fill="${c}" stroke="#000108" stroke-width="1.4" stroke-linejoin="round"/></svg>` +
  `<svg class="cross" width="18" height="18" viewBox="0 0 18 18"><path d="M9 1v16M1 9h16" stroke="${c}" stroke-width="1.6"/></svg>`;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const rand = (a: number, b: number) => a + Math.random() * (b - a);

export class CursorBuild {
  private layer: HTMLDivElement;
  private curs: Cur[] = [];
  private queue: HTMLElement[] = [];
  private ready = false;
  private wanderTimer = 0;

  constructor(count = 6) {
    this.layer = document.createElement("div");
    this.layer.className = "cb-layer";
    this.layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(this.layer);
    const cx = window.innerWidth / 2;
    const cy = window.scrollY + window.innerHeight / 2;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "cb-cur";
      el.innerHTML = ARROW(COLORS[i % COLORS.length]);
      this.layer.appendChild(el);
      const c: Cur = { el, x: cx, y: cy, busy: true, color: COLORS[i % COLORS.length] };
      this.place(c, cx, cy, 0);
      this.curs.push(c);
    }
  }

  /** Swarm around the centre, then start working the queue. */
  async intro(ms = 1500) {
    const cx = window.innerWidth / 2;
    const cy = window.scrollY + window.innerHeight / 2;
    const t0 = performance.now();
    await new Promise<void>((done) => {
      const tick = (t: number) => {
        const k = (t - t0) / ms;
        this.curs.forEach((c, i) => {
          const a = k * Math.PI * 3 + (i / this.curs.length) * Math.PI * 2;
          const r = 40 + 50 * Math.sin(k * Math.PI) + (i % 2) * 18;
          this.place(c, cx + Math.cos(a) * r * 1.4, cy + Math.sin(a) * r, 0);
        });
        if (k < 1) requestAnimationFrame(tick); else done();
      };
      requestAnimationFrame(tick);
    });
    this.curs.forEach((c) => (c.busy = false));
    this.ready = true;
    this.wanderTimer = window.setInterval(() => this.wander(), 2200);
    this.pump();
  }

  add(el: HTMLElement) {
    this.queue.push(el);
    this.pump();
  }

  destroy() {
    clearInterval(this.wanderTimer);
    this.layer.remove();
  }

  private place(c: Cur, x: number, y: number, ms: number) {
    c.x = x; c.y = y;
    c.el.style.transitionDuration = `${ms}ms`;
    c.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  private pump() {
    if (!this.ready) return;
    while (this.queue.length) {
      const c = this.nearestFree(this.queue[0]);
      if (!c) return;
      void this.draw(c, this.queue.shift() as HTMLElement);
    }
  }

  private nearestFree(el: HTMLElement): Cur | undefined {
    const r = el.getBoundingClientRect();
    const tx = r.left, ty = r.top + window.scrollY;
    return this.curs.filter((c) => !c.busy).sort((a, b) => Math.hypot(a.x - tx, a.y - ty) - Math.hypot(b.x - tx, b.y - ty))[0];
  }

  private async draw(c: Cur, el: HTMLElement) {
    c.busy = true;
    const r = el.getBoundingClientRect();
    const x = r.left, y = r.top + window.scrollY, w = r.width, h = r.height;
    const vTop = window.scrollY, vBot = vTop + window.innerHeight;
    // A cursor parked off-screen re-enters from the nearest viewport edge.
    if (c.y < vTop - 40 || c.y > vBot + 40) this.place(c, rand(0, window.innerWidth), c.y < vTop ? vTop - 20 : vBot + 20, 0);
    await wait(16);
    this.place(c, x, y, MOVE_MS);
    await wait(MOVE_MS);

    const box = document.createElement("div");
    box.className = "cb-box";
    box.style.cssText = `left:${x}px;top:${y}px;width:0;height:0;--cb:${c.color}`;
    box.innerHTML = `<i></i><i></i><i></i><i></i><span>${Math.round(w)} × ${Math.round(h)}</span>`;
    this.layer.appendChild(box);
    c.el.classList.add("drawing");
    await wait(16);
    box.style.transitionDuration = `${DRAW_MS}ms`;
    box.style.width = `${w}px`;
    box.style.height = `${h}px`;
    this.place(c, x + w, y + h, DRAW_MS);
    await wait(DRAW_MS + HOLD_MS);

    el.classList.add("in");
    c.el.classList.remove("drawing");
    box.classList.add("done");
    setTimeout(() => box.remove(), 500);
    this.place(c, x + w + rand(-60, 40), y + h + rand(10, 50), 380);
    await wait(200);
    c.busy = false;
    this.pump();
  }

  private wander() {
    const vTop = window.scrollY;
    this.curs.filter((c) => !c.busy).forEach((c) => {
      const inView = c.y > vTop && c.y < vTop + window.innerHeight;
      const x = inView ? c.x + rand(-90, 90) : rand(40, window.innerWidth - 40);
      const y = inView ? c.y + rand(-60, 60) : vTop + rand(80, window.innerHeight - 80);
      this.place(c, Math.max(8, Math.min(window.innerWidth - 24, x)), y, inView ? 1800 : 0);
    });
  }
}
