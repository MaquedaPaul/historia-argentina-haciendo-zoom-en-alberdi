---
id: S01
milestone: M009
uat_date: 2026-03-23
---

# S01: Crear repo, push y habilitar Pages — UAT

**Milestone:** M009
**Written:** 2026-03-23

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: The slice goal is infrastructure (GitHub repo + GitHub Pages), not a code feature. The only valid proof is probing the live GitHub API and the live HTTPS URL — no artifact analysis can substitute for confirming the site actually serves HTTP 200 at the public URL.

## Preconditions

- `gh` CLI is installed and authenticated as `MaquedaPaul` with `repo` scope
- The machine has internet access and can reach `github.com` and `maquedapaul.github.io`
- `curl` is available

## Smoke Test

```bash
curl -s -o /dev/null -w "%{http_code}" https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/
```
**Expected:** `200`

If this returns `200`, the slice is functionally complete. Proceed with full test cases to confirm all must-haves.

---

## Test Cases

### 1. Repo existe y es público

Verify the GitHub repository was created and is publicly visible.

1. Run: `gh repo view MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --json visibility -q .visibility`
2. **Expected:** `PUBLIC`

If the command fails with "could not find repository", T01 did not complete. If it returns `PRIVATE`, the repo was created with wrong visibility.

---

### 2. Rama main existe y tiene los commits del proyecto

Verify all project files were pushed to `main`.

1. Run: `gh repo view MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --json defaultBranchRef -q .defaultBranchRef.name`
2. **Expected:** `main`
3. Run: `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/contents?ref=main --jq '.[].name'`
4. **Expected:** Output includes `index.html`, `app.js`, `styles.css`, `audio`, `README.md`

---

### 3. GitHub Pages habilitado con fuente correcta

Verify Pages is enabled on branch `main`, root path `/`.

1. Run: `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status,.html_url,.source'`
2. **Expected:**
   - `.status` = `built`
   - `.html_url` = `https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/`
   - `.source.branch` = `main`, `.source.path` = `/`

If `.status` = `building`, wait 30 seconds and retry. If `.status` = `errored`, check `.error.message` with:
`gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages/builds/latest --jq '.error.message'`

---

### 4. URL pública responde HTTP 200

Verify the site is live and serving the correct content.

1. Run: `curl -s -o /dev/null -w "%{http_code}" https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/`
2. **Expected:** `200`
3. Run: `curl -s https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep -c "Historia Argentina"`
4. **Expected:** A number ≥ 1 (actual: `15`)

---

### 5. HTTPS enforcement and redirect

Verify the HTTP→HTTPS redirect works (GitHub Pages enforces HTTPS by default).

1. Run: `curl -sI http://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | head -5`
2. **Expected:** `301` redirect to `https://` URL, or `200` with direct HTTPS response

---

### 6. Contenido del sitio es correcto (no página 404 de GitHub Pages)

Verify the content is the actual project and not a GitHub Pages default 404 page.

1. Run: `curl -s https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep -i "<title"`
2. **Expected:** Output contains `Historia Argentina` in the `<title>` tag (not "404" or "Page not found")

---

## Edge Cases

### Pages está en estado `building` al probar

If the Pages status is `building` when you probe:

1. Run: `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status'`
2. **Expected (retry path):** Wait 30 seconds and re-run. GitHub Pages typically completes in 30–90 seconds. The curl probe will return `404` until build completes.

### Git worktree: git remote no visible desde el worktree

If `git remote -v` from `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M009` shows no remotes:

1. Check the main repo: `git -C C:/Users/gabri/Desktop/historia remote -v`
2. **Expected:** Shows `origin https://github.com/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi.git`
3. This is correct behavior — remotes are stored in the main `.git` object store, not in each worktree. The worktree inherits them.

### Repo ya existía (conflict en POST de Pages)

If re-running Pages setup produces a `422` or `409` error:

1. Run: `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status,.html_url'`
2. **Expected:** If Pages was already enabled successfully, status will be `built` and html_url will be set. The 409/422 error is harmless in this case.

---

## Failure Signals

- `curl` returns `404` after build: `index.html` not at repo root on `main`. Check with `gh api repos/.../contents/index.html?ref=main`.
- `curl` returns `404` and Pages status is `null`: Pages was never enabled. Re-run `gh api .../pages --method POST -f "source[branch]=main" -f "source[path]=/"`.
- `gh repo view` errors with "not found": Repo does not exist. Re-run T01.
- Pages status is `errored`: `gh api .../pages/builds/latest --jq '.error.message'` for the error message.
- `git ls-remote origin main` returns no SHA: Branch was not pushed. Re-run `git push origin milestone/M009:main` from the main repo root.

---

## Not Proven By This UAT

- **Mobile rendering or visual correctness** — this UAT only proves the site serves HTTP 200 with the right title. It does not verify all sections render correctly at mobile viewports.
- **Audio playback in production** — the audio files are in `audio/` and served statically; this UAT does not play them.
- **Performance (Lighthouse score)** — GitHub Pages serves files without a build step; gzip compression behavior depends on GitHub's CDN configuration. Not tested here.
- **Custom domain** — no custom domain is configured. The site serves only from the `github.io` subdomain.
- **Automated re-deploy on push** — this UAT does not push a change and verify the site updates. Re-deploy behavior is assumed based on GitHub Pages documentation.

---

## Notes for Tester

- The public URL uses lowercase: `maquedapaul.github.io` (GitHub normalizes usernames to lowercase in Pages URLs). Both `MaquedaPaul.github.io` and `maquedapaul.github.io` resolve — use the lowercase form in canonical links.
- GitHub Pages has eventual consistency: after a push to `main`, it takes 30–90 seconds for changes to appear at the public URL. If content looks stale, check `gh api .../pages/builds/latest --jq '.status'` before diagnosing further.
- The `.gsd/` directory and temp files from the project are visible in the public repo. This is cosmetically unclean but functionally harmless.
