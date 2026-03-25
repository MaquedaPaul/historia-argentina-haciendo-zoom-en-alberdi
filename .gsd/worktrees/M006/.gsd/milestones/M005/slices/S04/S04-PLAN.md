# S04: Optimization and Deploy

**Goal:** Commit the project to git, deploy to a public HTTPS URL, and verify Lighthouse mobile scores >90 on Performance and Accessibility.
**Demo:** Visit the live public URL — all content loads, images render, animations play, sound toggle works, responsive layout correct on mobile. Lighthouse mobile audit shows Performance >90 and Accessibility >90.

## Must-Haves

- Initial git commit with all source files (`index.html`, `styles.css`, `app.js`) + audio assets
- Live public HTTPS URL (GitHub Pages or Netlify)
- Lighthouse mobile Performance >90
- Lighthouse mobile Accessibility >90
- No mixed content warnings (all resources over HTTPS)
- `README.md` with project description

## Verification

- Live URL loads `index.html`, `styles.css`, `app.js` over HTTPS with no errors in Network tab
- All 33 Wikimedia images load (no broken image placeholders in the deployed version)
- Audio files accessible at `<live-url>/audio/*.mp3` (returns 200, not 404)
- Lighthouse mobile audit: Performance >90, Accessibility >90
- `git log --oneline` shows at least 1 commit
- `.sound-toggle` button visible and functional on deployed site

## Tasks

- [x] **T01: Create README.md and prepare git commit** `est:15m`
  - Why: The repo has zero commits. A README provides context and the commit captures the stable final state.
  - Files: `README.md` (new), `.gitignore` (verify)
  - Do: Write `README.md` with project title, description (interactive history of Argentina 1500-1900), tech stack (vanilla HTML/CSS/JS), features list (3 periods, 34 event cards, certeza system, animated timelines, ambient sound, responsive), and credits (Wikimedia Commons images, Freesound.org audio). Verify `.gitignore` excludes `.gsd/` and any OS files. Stage all files: `git add index.html styles.css app.js audio/ README.md .gitignore`. Commit: `git commit -m "Historia Argentina 1500-1900: complete site with 34 event cards, 3 animated timelines, ambient sound, and responsive design"`.
  - Verify: `git log --oneline` shows 1 commit. `git status` is clean (working tree clean).
  - Done when: All source files committed with descriptive message.

- [x] **T02: Deploy to GitHub Pages or Netlify** `est:15m`
  - Why: The site must be publicly accessible — M005 acceptance criterion "Sitio publicado y accesible."
  - Files: none (operational task)
  - Do: Option A (GitHub Pages): `git remote add origin <repo-url>`, `git push -u origin main`, enable Pages in GitHub repo settings (Source: main branch, root). Option B (Netlify): drag-and-drop project folder at app.netlify.com. Either way, confirm live URL loads correctly with HTTPS.
  - Verify: Visit live URL → page loads completely. Network tab: no 404s, no mixed content. All 3 source files and audio assets load.
  - Done when: Site accessible at a public HTTPS URL.

- [x] **T03: Lighthouse audit and final fixes** `est:30m`
  - Why: M005 acceptance criterion requires Lighthouse Performance >90 and Accessibility >90.
  - Files: `styles.css`, `index.html`, `app.js` (if fixes needed)
  - Do: Run Lighthouse audit in Chrome DevTools (Incognito, mobile preset) against the deployed URL. Target: Performance >90, Accessibility >90, Best Practices >90, SEO >90. If Performance <90: check for render-blocking resources, unoptimized images, large transfers. If Accessibility <90: check for missing alt text, color contrast, ARIA issues, focus order. Apply fixes and redeploy. Re-audit until targets met.
  - Verify: Lighthouse mobile: Performance >90, Accessibility >90. Screenshot of audit results.
  - Done when: Lighthouse mobile scores meet all targets on the deployed site.

## Files Likely Touched

- `README.md` — new project README
- `.gitignore` — verify exclusions
- `styles.css`, `index.html`, `app.js` — only if Lighthouse audit reveals issues

## Observability / Diagnostics

**Runtime signals**
- `git log --oneline` — confirm at least 1 commit exists with the expected message
- `git status` — must be clean (or only `.gsd/` untracked) before deployment
- Browser Network tab on the live URL — look for 404s on images/audio and mixed-content warnings
- Lighthouse DevTools panel (Incognito, mobile preset) — scores are the primary acceptance gate

**Inspection surfaces**
- `git show --stat HEAD` — lists every file in the initial commit; verifies audio assets are included
- `curl -I <live-url>/audio/colonial.mp3` — quick CLI check that audio is reachable (HTTP 200)
- `curl -I <live-url>/index.html` — verify HTTPS content-type and status

**Failure visibility**
- If images are broken on deploy: Wikimedia URLs use HTTPS so mixed-content is unlikely; check `.gitignore` didn't accidentally exclude any file
- If audio 404s: confirm `audio/` directory was committed (`git show --stat HEAD | grep audio`)
- If Lighthouse Performance <90: most likely culprit is render-blocking Google Fonts; add `display=swap` or preconnect hint
- If Lighthouse Accessibility <90: run `axe` in DevTools console for actionable findings

**Redaction constraints**
- No secrets in this slice — no API keys, tokens, or credentials involved
