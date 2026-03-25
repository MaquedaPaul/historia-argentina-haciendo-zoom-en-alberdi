# S03: Deploy a GitHub Pages — UAT

**Milestone:** M013
**Written:** 2026-03-24

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: The slice goal is operational — a public URL must return HTTP 200 with the new HTML content. There is no UI to exercise manually; all verification is against the live GitHub Pages endpoint and GitHub API. The structural gate (verify-s02.js) covers the code quality angle; the curl probes cover the live deployment angle. No human/browser session is required.

## Preconditions

1. `milestone/M013` branch has been merged into `main` and pushed to `origin/main`
2. GitHub Pages is configured to serve from `main` branch root (`/`)
3. Network access to `maquedapaul.github.io` and the GitHub API is available
4. `gh` CLI is authenticated (token with `repo` scope)

## Smoke Test

```bash
curl -s -o /dev/null -w "%{http_code}" https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/
```

Expected: `200`. If this returns `404`, the Pages site is not built or the source branch is misconfigured — stop and diagnose before running further tests.

## Test Cases

### 1. Pre-flight structural gate passes (16 checks)

Run from the worktree root (NOT the main repo root):

```bash
cd C:/Users/gabri/Desktop/historia/.gsd/worktrees/M013
node .gsd/milestones/M013/slices/S02/verify-s02.js
```

**Expected:** All 16 checks print `[PASS]`. Final line: `All 16 checks passed. ✓`. Exit code 0.

Checks verified by this test:
- `id="img-modal"` exists in HTML
- `role="dialog"` on modal element
- `aria-modal="true"` on modal
- `hidden` attribute present on modal
- `.modal-close` button exists
- `.img-modal__img` element exists
- `.card-image` count ≥ 50 (currently 57)
- Modal HTML appears before `<script src="app.js">` (ordering invariant)
- `initImageModal` function present in JS
- `document.body` event delegation present
- Escape key handler present
- `openModal` function present
- `closeModal` function present
- JS syntax valid (new Function() check)
- `img-modal` CSS styles present
- `modal-close` CSS styles present

### 2. GitHub Pages build status is "built"

```bash
gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status'
```

**Expected:** `"built"`. Any other value (`null`, `"building"`, `"errored"`) means the deployment is not complete or failed.

If `"building"`: wait 30s and retry. GitHub Pages typically builds in ~37 seconds for this repo.
If `"errored"`: run `gh run list -R MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --limit 3` to identify the failing step.

### 3. Live URL returns HTTP 200

```bash
curl -s -o /dev/null -w "%{http_code}" https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/
```

**Expected:** `200`

### 4. Live HTML contains lightbox modal element

```bash
curl -s https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep -c 'id="img-modal"'
```

**Expected:** `1` — exactly one element with `id="img-modal"` in the live HTML. A result of `0` means the old HTML is still being served (CDN cache or Pages not rebuilt).

### 5. Live HTML contains accordion card-detail elements (M012 integration)

```bash
curl -s https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep -c 'class="card-detail'
```

**Expected:** `4` — the four accordion detail panels from M012 are present in the live HTML. This confirms both M012 (accordion) and M013 (lightbox) content are live together.

### 6. Most recent GitHub Actions run completed successfully

```bash
gh run list -R MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --limit 3
```

**Expected:** Most recent row shows `completed` and `success`. The workflow name should be `pages build and deployment`. Duration ~37s is normal.

## Edge Cases

### Pages build delayed (still "building" after smoke test passes)

1. Run `gh api .../pages --jq '.status'` immediately after push.
2. If `"building"`, wait 30s and re-run.
3. **Expected:** Status transitions to `"built"` within 90 seconds. If still `"building"` after 3 minutes, check `gh run list` for a stuck workflow.

### curl returns 200 but id="img-modal" count is 0 (stale cache)

1. Run: `curl -s <live-url> | grep 'id="img-modal"'`
2. If count is 0, the old HTML is being served.
3. Check: `gh api .../pages --jq '.status'` — if `"built"`, GitHub's CDN may be caching the old version.
4. **Expected:** After a successful Pages build (status `"built"`), the new HTML should be available within 60 seconds. A hard-refresh in browser (Ctrl+Shift+R) should bypass local browser cache but CDN cache may persist for 1–2 minutes.

### Merge conflict in .gsd/ files during future push

1. `git push origin main` is rejected with "rejected (fetch first)" or similar.
2. Run: `git fetch origin && git log --oneline main..origin/main`
3. If all listed commits are `.gsd/`-only, proceed with: `git merge origin/main`
4. If conflicts appear in `.gsd/` files: directly rewrite the file content (do NOT use `git checkout --ours` — fails for gitignored directories even when force-tracked).
5. `git add .gsd/<conflicted-file>` + `git commit --no-edit`
6. **Expected:** Push succeeds after merge. See KNOWLEDGE.md "Remote Divergence on Push" entry for full pattern.

## Failure Signals

- `curl` returns `404` → Pages not built or source branch misconfigured
- `gh api .../pages --jq '.status'` returns `"errored"` → Pages build failed; check `gh run list` for details
- `verify-s02.js` exits non-zero → structural regression in source files; do not deploy until resolved
- `grep -c 'id="img-modal"'` returns `0` on live URL → stale cache or wrong branch being served
- `grep -c 'class="card-detail'` returns `0` → M012 content not in live HTML; check that merge included all commits

## Not Proven By This UAT

- **Modal interactivity in a real browser** — the curl probes confirm HTML is present but do not execute JS. Click-to-open, Esc-to-close, focus-trap, and backdrop-click behavior are not tested here (they were validated in S01–S02 browser sessions).
- **iOS Safari scroll-lock** — the iOS-specific `documentElement.overflow` fix is not testable via curl or `gh` CLI; it requires a physical device or iOS simulator.
- **Mobile layout** — responsive behavior at 375px vs 1280px is not tested here; was validated in S01–S02.
- **Accordion+modal interaction** (M012+M013 integration) — visual confirmation that images inside expanded accordions are clickable and open the modal correctly is not tested here; was validated in S02.
- **Performance / Lighthouse scores** — not retested in this slice; scores established in M005 remain valid (no new CSS/JS added in M013 beyond the modal).

## Notes for Tester

- The verify-s02.js gate **must be run from the worktree root** (`C:/Users/gabri/Desktop/historia/.gsd/worktrees/M013`), not from the main repo root. The script uses `__dirname` to resolve 5 levels up to the worktree root. Running from any other directory causes all file-readable checks to fail with a false-positive failure.
- GitHub Pages CDN may serve stale content for up to 2 minutes after a successful build. If the live URL returns 200 but the modal HTML is absent, wait 60 seconds and retry the curl probe before diagnosing a build failure.
- The `gh run list` command shows the last workflow run, not the current one. If a build is in progress, it may not appear in the list yet — use `gh api .../pages --jq '.status'` as the primary build-state signal.
