# S03: Deploy a GitHub Pages

**Goal:** Merge el branch `milestone/M013` en `main` y pushearlo a GitHub para que GitHub Pages refleje todos los cambios de M010–M013 (accordion M012 + lightbox modal M013).
**Demo:** `curl -s -o /dev/null -w "%{http_code}" https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` retorna `200`; el HTML de la respuesta contiene `id="img-modal"`.

## Must-Haves

- `node .gsd/milestones/M013/slices/S02/verify-s02.js` sale 0 (16 checks PASS) antes de cualquier push
- `milestone/M013` mergeado en `main` sin conflictos y pusheado a `origin/main`
- GitHub Pages build completado (`status: built` vía API) con los nuevos commits
- La URL live responde HTTP 200 y el HTML contiene `id="img-modal"` y `class="card-detail"`

## Proof Level

- This slice proves: operational (live public URL updated)
- Real runtime required: yes (GitHub Pages build pipeline)
- Human/UAT required: no

## Verification

```bash
# 1. Pre-flight structural gate (must exit 0)
node .gsd/milestones/M013/slices/S02/verify-s02.js

# 2. Confirm milestone/M013 merged into main and pushed
git -C C:/Users/gabri/Desktop/historia log --oneline origin/main | head -3

# 3. GitHub Pages build status (poll until "built")
gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status'

# 4. Live URL — HTTP status
curl -s -o /dev/null -w "%{http_code}" https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/

# 5. Live URL — modal HTML present
curl -s https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep -c 'id="img-modal"'

# 6. Failure-path diagnostic: if build not "built", get last workflow run
gh run list -R MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --limit 3
```

## Observability / Diagnostics

- Runtime signals: GitHub Pages API field `status` transitions `null → building → built` (or `errored`); GitHub Actions workflow run status via `gh run list`
- Inspection surfaces:
  - `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status'` — current build state
  - `gh run list -R MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --limit 3` — workflow run log (CI/build errors surface here)
  - `curl -s -o /dev/null -w "%{http_code}" <live-url>` — HTTP reachability
  - `curl -s <live-url> | grep 'id="img-modal"'` — content freshness (proves new HTML is live, not cached old build)
- Failure visibility: if `gh api` shows `status: errored`, the `gh run list` output names the failing step; if curl returns 404, Pages is not yet built or the source branch was not set correctly
- Redaction constraints: none (public repo, no secrets involved)

## Integration Closure

- Upstream surfaces consumed: `index.html`, `app.js`, `styles.css` from `milestone/M013`; `.gsd/milestones/M013/slices/S02/verify-s02.js` as structural gate
- New wiring introduced in this slice: `milestone/M013` merged into `main`; `origin/main` updated to include M009–M013 content
- What remains before the milestone is truly usable end-to-end: nothing — deploy is the final step of M013

## Tasks

- [ ] **T01: Merge milestone/M013 → main, push, and verify live site** `est:20m`
  - Why: All M013 code is on the `milestone/M013` worktree branch; `origin/main` (the GitHub Pages source) lags behind. This task does the merge, push, and post-deploy verification.
  - Files: `C:/Users/gabri/Desktop/historia/` (main repo root — git operations run here, not in the worktree)
  - Do: Run pre-flight gate → switch to `main` in the main repo → merge `milestone/M013` → push → poll Pages API until `built` → curl-verify live URL
  - Verify: `gh api repos/.../pages --jq '.status'` returns `"built"`; `curl` of live URL returns 200 and contains `id="img-modal"`
  - Done when: Live URL at `https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` returns HTTP 200 with `id="img-modal"` in response body

## Files Likely Touched

- `C:/Users/gabri/Desktop/historia/` — git checkout, merge, push (no source file edits)
- `.gsd/milestones/M013/slices/S02/verify-s02.js` — read-only (pre-flight gate)
