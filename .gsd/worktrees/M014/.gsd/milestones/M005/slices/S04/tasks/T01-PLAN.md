---
estimated_steps: 4
estimated_files: 2
---

# T01: Create README.md and prepare git commit

**Slice:** S04 — Optimization and Deploy
**Milestone:** M005

## Description

Write a project README and make the initial git commit with all source files and audio assets.

## Steps

1. Write `README.md` with: project title ("Historia Argentina 1500–1900"), brief description (interactive single-page site covering 400 years of Argentine history), tech stack (vanilla HTML/CSS/JS, no build step), features (34 event cards across 3 periods, certeza classification system, animated timelines, ambient sound, responsive with hamburger menu), credits section (Wikimedia Commons for images, Freesound.org for audio, Google Fonts).
2. Verify `.gitignore` excludes `.gsd/`, `.bg-shell/`, `node_modules/`, OS files (`.DS_Store`, `Thumbs.db`), temp files.
3. Stage all source files: `git add index.html styles.css app.js audio/ README.md .gitignore websearches.txt`.
4. Commit: `git commit -m "Complete site: 34 event cards, 3 animated timelines, ambient sound, responsive design"`.

## Must-Haves

- [ ] `README.md` exists with project description and credits
- [ ] `.gitignore` excludes non-source files
- [ ] Git commit includes all source + audio files

## Verification

- `git log --oneline` shows at least 1 commit
- `git status` shows clean working tree (or only `.gsd/` untracked)
- `cat README.md` shows project description

## Inputs

- All project source files (`index.html`, `styles.css`, `app.js`, `audio/*.mp3`)
- `.gitignore` — existing file

## Expected Output

- `README.md` — project documentation
- Git commit with all source files

## Observability Impact

**Signals that change after this task**
- `git log --oneline` goes from "fatal: no commits" to showing 1 commit — this is the primary observable proof of completion
- `git status` transitions from "No commits yet / changes to be committed" to "nothing to commit, working tree clean"
- `git show --stat HEAD` lists every committed file; a future agent can verify audio assets are present without checking the filesystem

**How a future agent inspects this task**
- `git log --oneline` — confirms the commit exists and its message is descriptive
- `git show HEAD:README.md | head -20` — spot-check README content without checking out files
- `git ls-tree -r HEAD --name-only` — enumerate every file in the commit tree

**Failure state visibility**
- If the commit is missing audio: `git ls-tree -r HEAD --name-only | grep audio` returns nothing
- If `.gitignore` is wrong: `git status` will show `.gsd/` or `.bg-shell/` as untracked (acceptable) or worse, tracked (bad — fix with `git rm -r --cached`)
- If junk files from broken shell commands were committed: `git show --stat HEAD` will reveal unexpected filenames
