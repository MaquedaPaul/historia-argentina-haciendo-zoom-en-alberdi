---
estimated_steps: 5
estimated_files: 1
---

# T01: Merge milestone/M013 → main, push, and verify live site

**Slice:** S03 — Deploy a GitHub Pages
**Milestone:** M013

## Description

All M013 work (lightbox modal, iOS scroll-lock fix, 16-check verify gate) is on the `milestone/M013` branch in the git worktree at `C:/Users/gabri/.gsd/projects/5c2d4cb4b462/worktrees/M013`. The `origin/main` GitHub remote (the GitHub Pages source branch) only has content through M008 + one M009 plan-docs commit. This task merges the branch into `main` on the main repository root and pushes it so GitHub Pages auto-deploys the updated site.

**Context:** The main repo root is `C:/Users/gabri/Desktop/historia` on branch `main`. The worktree at `C:/Users/gabri/.gsd/projects/5c2d4cb4b462/worktrees/M013` is on branch `milestone/M013`. Git remotes are shared — `origin` is configured on the main repo and visible from both. The divergence between `milestone/M013` and `origin/main` is only in `.gsd/` plan files (no conflicts with `index.html`, `app.js`, or `styles.css`).

## Steps

1. **Pre-flight gate** — Run the S02 structural verification gate from the worktree working directory. It must exit 0 before proceeding:
   ```bash
   node C:/Users/gabri/Desktop/historia/.gsd/worktrees/M013/.gsd/milestones/M013/slices/S02/verify-s02.js
   ```
   If any check fails, stop and fix the issue before continuing.

2. **Merge and push from main repo root** — All git operations must happen at the main repo root (`C:/Users/gabri/Desktop/historia`), not in the worktree. Switch to `main`, merge `milestone/M013`, then push:
   ```bash
   cd C:/Users/gabri/Desktop/historia
   git checkout main
   git merge milestone/M013 --no-ff -m "feat(M013): Modal de Imágenes — lightbox, iOS scroll-lock, accordion integration"
   git push origin main
   ```
   If `git merge` reports conflicts (unlikely — the only diverging commit on `origin/main` is `.gsd/` plan files), resolve by keeping both sides (the `.gsd/` files don't conflict with `index.html`/`app.js`/`styles.css`).

3. **Confirm push** — Verify the new commits are on `origin/main`:
   ```bash
   cd C:/Users/gabri/Desktop/historia
   git log --oneline origin/main | head -5
   ```
   The top commit should include `feat(M013)` or the most recent M013 commit.

4. **Wait for GitHub Pages build** — Poll the Pages API every 15 seconds until `status` is `"built"` (typically 30–90 seconds). Max wait: 3 minutes.
   ```bash
   gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status'
   ```
   If it returns `"errored"`, run `gh run list -R MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --limit 3` to see which build step failed, then check the run logs.

5. **Verify live site** — Confirm the updated content is serving:
   ```bash
   # HTTP status
   curl -s -o /dev/null -w "%{http_code}" https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/

   # Modal HTML present (returns 1 if found)
   curl -s https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep -c 'id="img-modal"'

   # Accordion (card-detail) HTML present (returns count > 0)
   curl -s https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep -c 'class="card-detail'
   ```

## Must-Haves

- [ ] `node verify-s02.js` exits 0 (all 16 checks PASS) before any push
- [ ] `git push origin main` succeeds with no rejected refs
- [ ] `gh api .../pages --jq '.status'` returns `"built"` (not `"errored"`)
- [ ] Live URL returns HTTP 200
- [ ] Live URL HTML contains `id="img-modal"` (confirms M013 content is live, not cached old build)
- [ ] Live URL HTML contains `class="card-detail` (confirms M012 accordion content also live)

## Verification

```bash
# 1. Pre-flight gate
node C:/Users/gabri/Desktop/historia/.gsd/worktrees/M013/.gsd/milestones/M013/slices/S02/verify-s02.js
# Expected: exits 0, all 16 checks [PASS]

# 2. Push confirmed
git -C C:/Users/gabri/Desktop/historia log --oneline origin/main | head -3

# 3. Pages status
gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status'
# Expected: "built"

# 4. HTTP 200
curl -s -o /dev/null -w "%{http_code}" https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/
# Expected: 200

# 5. Modal present
curl -s https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep -c 'id="img-modal"'
# Expected: 1

# Failure path — if status is not "built":
gh run list -R MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --limit 3
```

## Observability Impact

- Signals added/changed: GitHub Pages `status` field transitions from `built` (old content) → `building` → `built` (new content); git `origin/main` ref advances to M013 HEAD
- How a future agent inspects this: `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status,.html_url'` gives current state and URL; `curl -s <url> | grep 'id="img-modal"'` confirms content freshness
- Failure state exposed: `gh run list` shows the build run with its conclusion (`success`/`failure`) and a URL to the detailed log; Pages API `status: errored` signals the build pipeline failed before serving

## Inputs

- `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M013/.gsd/milestones/M013/slices/S02/verify-s02.js` — 16-check structural gate that must exit 0 (created in S02-T02)
- `milestone/M013` branch — contains all M013 commits (lightbox modal, iOS scroll-lock, verify gate) plus earlier M009–M012 content merged in
- `origin/main` — currently at M008 + one M009 plan-docs commit; will be advanced by this task
- GitHub Pages source: `main` branch, path `/` (confirmed via API: `"source":{"branch":"main","path":"/"}`)

## Expected Output

- `origin/main` ref advanced to include all M013 commits
- GitHub Pages `status: built` with new HTML containing `id="img-modal"` and `class="card-detail"`
- Live URL `https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` returns HTTP 200 with M013 content
