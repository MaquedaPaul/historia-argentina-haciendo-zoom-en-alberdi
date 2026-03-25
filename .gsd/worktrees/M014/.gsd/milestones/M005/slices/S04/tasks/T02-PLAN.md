---
estimated_steps: 4
estimated_files: 0
---

# T02: Deploy to GitHub Pages or Netlify

**Slice:** S04 — Optimization and Deploy
**Milestone:** M005

## Description

Push the committed code to a remote repository and enable a static hosting service (GitHub Pages or Netlify) to get a live public HTTPS URL.

## Steps

1. If using GitHub Pages: create a new GitHub repository, add as remote (`git remote add origin <url>`), push (`git push -u origin main`). Go to repo Settings → Pages → Source: Deploy from branch → `main` → `/ (root)` → Save.
2. If using Netlify: go to app.netlify.com → "Add new site" → "Deploy manually" → drag and drop the project folder. Netlify assigns a random subdomain URL.
3. Wait for deployment to complete (GitHub Pages: ~1-2 minutes; Netlify: instant).
4. Visit the live URL. Verify: page loads, all CSS/JS applied, images render, audio files accessible.

## Must-Haves

- [ ] Live public HTTPS URL
- [ ] All source files (`index.html`, `styles.css`, `app.js`) load correctly
- [ ] Audio files accessible at `<url>/audio/*.mp3`
- [ ] No mixed content warnings

## Verification

- Visit live URL → full page renders correctly
- Network tab: all resources return 200, no 404s
- No mixed content (all HTTPS)

## Inputs

- Git repository with initial commit (from T01)

## Expected Output

- Public HTTPS URL where the site is accessible
