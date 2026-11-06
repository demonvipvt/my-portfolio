# Mont Builds site
Personal-brand v-log: each video starts as research, the write-up is published here first, then FB / IG / YouTube.
Posts = `content/posts/<slug>.md` with front matter (title, date, summary, tags, optional `youtube` video id). `scripts/publish-post.sh <file.md>` validates, builds, commits, pushes; Vercel deploys on push. About text: `content/about.md` (real facts only).
Home `/` = portfolio (copy in `lib/portfolio.ts`, styles in `app/portfolio.css`); post list at `/posts`. Blog pages live in the `app/(blog)` route group.
