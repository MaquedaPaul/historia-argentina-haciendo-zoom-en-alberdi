---
id: T02
parent: S04
milestone: M005
provides:
  - gh CLI v2.88.1 installed via winget (at /c/Program Files/GitHub CLI/gh.exe)
  - Deploy deferred by user — no live URL yet
key_files: []
key_decisions:
  - GitHub Pages selected as deployment target over Netlify
  - Deploy deferred at user request; will be completed in a future session
patterns_established:
  - gh CLI must be referenced by full path (/c/Program Files/GitHub CLI/gh.exe) until a new terminal session picks up the updated PATH
  - gh auth login (device flow) or GITHUB_TOKEN env var needed before repo creation
observability_surfaces:
  - "gh auth status — check if GitHub token is configured"
  - "git remote -v — confirm remote is set after future deploy"
  - "curl -I <live-url>/index.html — HTTPS status check once site is live"
duration: 5m
verification_result: deferred
completed_at: 2026-03-19
blocker_discovered: false
---

# T02: Deploy to GitHub Pages or Netlify

**gh CLI installed (v2.88.1) but deploy deferred by user request — no live URL created.**

## What Happened

T01 left a clean git repo with 1 commit and no remote configured. This task called for pushing to GitHub Pages or Netlify to get a live HTTPS URL.

Steps taken:
1. Confirmed `gh` CLI was not in PATH; installed it via `winget install GitHub.cli` (v2.88.1, installed to `/c/Program Files/GitHub CLI/`).
2. Prompted user for a GitHub Personal Access Token (PAT with `repo` scope) to authenticate and create the remote repo.
3. User chose to defer the deploy — no token was provided and no push was made.

## Verification

Deploy not executed. No live URL was created. Must-haves are unmet pending the deferred deploy.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `winget install GitHub.cli` | 0 | ✅ pass — gh v2.88.1 installed | ~30s |
| 2 | `/c/Program Files/GitHub CLI/gh.exe --version` | 0 | ✅ pass — version confirmed | <1s |
| 3 | `gh auth status` | 1 | ⏭ deferred — not logged in | <1s |
| 4 | Live URL load / audio curl / Lighthouse | — | ⏭ deferred — no URL yet | — |

## Diagnostics

When resuming this task in a new session:
- Open a new terminal (so `gh` is in PATH from the updated system PATH)
- Run `gh auth login` (browser device flow) or set `GITHUB_TOKEN` env var
- Then: `gh repo create historia-argentina --public --source=. --remote=origin --push`
- GitHub Pages: repo Settings → Pages → Source: `main` / `/ (root)` → Save
- Wait ~1-2 min, visit `https://<username>.github.io/historia-argentina/`
- Verify: `curl -I https://<username>.github.io/historia-argentina/index.html`
- Verify audio: `curl -I https://<username>.github.io/historia-argentina/audio/colonial.mp3`

## Deviations

Deploy deferred at user request. The task plan assumed credentials would be available; the user explicitly asked to deploy later.

## Known Issues

- No GitHub remote configured (`git remote -v` is empty).
- `gh` is not in PATH for the current terminal session — open a new terminal or use full path.
- All slice-level verification checks requiring a live URL (Lighthouse scores, audio 200, HTTPS load) remain unmet until deploy is completed.

## Files Created/Modified

None — no source files changed. gh CLI was installed at OS level via winget.
