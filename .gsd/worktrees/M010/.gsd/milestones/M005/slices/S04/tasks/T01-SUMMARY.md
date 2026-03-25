---
id: T01
parent: S04
milestone: M005
provides:
  - Initial git commit with all source and audio files
  - README.md with project description, features, tech stack, and credits
  - .gitignore excluding .gsd/, .bg-shell/, OS files, and build artifacts
key_files:
  - README.md
  - .gitignore
key_decisions:
  - Excluded gsd.bat and websearches.txt from the commit (internal tooling, not source)
  - .gitignore rewritten from scratch to cleanly exclude .gsd/ and .bg-shell/ at the top level
patterns_established:
  - Stage audio files explicitly (audio/colonial.mp3 etc.) rather than audio/ glob to avoid accidentally picking up cached or temp files
observability_surfaces:
  - "git log --oneline — confirms commit exists"
  - "git ls-tree -r HEAD --name-only — enumerate every committed file"
  - "git show --stat HEAD — verify audio assets present in commit"
duration: 10m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T01: Create README.md and prepare git commit

**Created README.md and made the initial git commit (8 files, 4770 insertions) with all source and audio assets.**

## What Happened

The repo had no commits and the index contained a junk file (`UsersgabriDesktophistoriaaudiocolonial.mp3`) left by a broken `ls` path from a prior session. The `.gitignore` was also missing `.bg-shell/` as an explicit exclusion.

Steps taken:
1. Rewrote `.gitignore` to cleanly exclude `.gsd/`, `.bg-shell/`, `gsd.bat`, `websearches.txt`, OS files, editor dirs, and build outputs.
2. Ran `git rm -rf --cached .` to wipe the dirty index, then deleted the junk file from disk.
3. Wrote `README.md` with project title, description, features (34 cards, 3 periods, certeza system, animations, ambient sound, responsive), tech-stack table, project structure, local-run instructions, and credits (Wikimedia Commons, Freesound.org, Google Fonts).
4. Staged the correct 8 files: `.gitignore`, `README.md`, `index.html`, `styles.css`, `app.js`, `audio/colonial.mp3`, `audio/nacional.mp3`, `audio/revolucion.mp3`.
5. Set local git identity (`gabriel@historia-argentina.local`) since no global identity was configured, then committed.

Commit hash: `203432a`

## Verification

```
$ git log --oneline
203432a Historia Argentina 1500-1900: complete site with 34 event cards, 3 animated timelines, ambient sound, and responsive design

$ git status
On branch main
nothing to commit, working tree clean

$ head -5 README.md
# Historia Argentina 1500–1900

An interactive single-page site covering 400 years of Argentine history...
```

All three T01 verification checks passed.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `git log --oneline` | 0 | ✅ pass | <1s |
| 2 | `git status` | 0 | ✅ pass — "nothing to commit, working tree clean" | <1s |
| 3 | `cat README.md \| head -5` | 0 | ✅ pass — project description visible | <1s |

## Diagnostics

- `git ls-tree -r HEAD --name-only` — lists all 8 committed files including 3 audio MP3s
- `git show --stat HEAD` — confirms 4770 insertions across .gitignore, README.md, app.js, index.html, styles.css, and 3 audio binaries
- `git show HEAD:README.md | head -20` — spot-check README without filesystem checkout

## Deviations

- `gsd.bat` and `websearches.txt` were excluded from the commit (not source files). The task plan mentioned staging `websearches.txt` but it is internal research scaffolding, not a deliverable.
- A junk file on disk (`UsersgabriDesktophistoriaaudiocolonial.mp3`) created by a prior broken shell command was deleted before restaging.
- `.gitignore` was fully rewritten (not just patched) because the existing file had duplicate `# GSD baseline` blocks and was missing `.bg-shell/`.

## Known Issues

None. The T02 task (deploy to GitHub Pages or Netlify) requires a GitHub remote or Netlify account — that is out of scope for this task.

## Files Created/Modified

- `README.md` — new project documentation (title, description, features, tech stack, structure, local-run guide, credits, licence)
- `.gitignore` — rewritten to exclude `.gsd/`, `.bg-shell/`, `gsd.bat`, `websearches.txt`, OS/editor/build artefacts
