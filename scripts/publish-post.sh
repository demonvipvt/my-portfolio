#!/bin/bash
# Publish one markdown post to the site: validate front matter, copy into content/posts, commit, push (Vercel deploys on push).
# usage: scripts/publish-post.sh <file.md> [slug]
set -euo pipefail
cd "$(dirname "$0")/.."
src="${1:?usage: publish-post.sh <file.md> [slug]}"
slug="${2:-$(basename "$src" .md)}"
[[ "$slug" =~ ^[a-z0-9][a-z0-9-]{2,80}$ ]] || { echo "bad slug: $slug"; exit 2; }
head -1 "$src" | grep -q '^---$' || { echo "missing front matter"; exit 2; }
for k in title date summary; do grep -q "^$k:" "$src" || { echo "front matter needs $k"; exit 2; }; done
grep -q '^title:.*DRAFT' "$src" && { echo "title starts with DRAFT"; exit 2; }
cp "$src" "content/posts/$slug.md"
pnpm build >/tmp/montbuilds-build.log 2>&1 || { rm -f "content/posts/$slug.md"; tail -20 /tmp/montbuilds-build.log; echo "BUILD FAILED, not published"; exit 1; }
git add "content/posts/$slug.md"
git commit -qm "post: $slug"
if git remote get-url origin >/dev/null 2>&1; then git push -q origin HEAD && echo "pushed: $slug"; else echo "committed locally (no remote yet): $slug"; fi
