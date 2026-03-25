---
estimated_steps: 4
estimated_files: 1
---

# T02: Append 2 S11 cards to index.html

**Slice:** S11 — Referentes de cada bando
**Milestone:** M008

## Description

Mechanical HTML integration task: insert the 2 S11 content cards into `index.html` immediately before the append marker comment. All content is specified in the T01 content draft. This task is low-risk: follow the exact HTML patterns established by S09 and S10, use the marker-based insertion approach, and verify the card count.

The 2 cards go inside the `<div class="events-grid events-grid--certeza">` inside `#periodo-rosas`, immediately before `<!-- S10–S24 cards will be appended here by subsequent slices -->`.

- **S11-1**: `card-hecho` — Los líderes unitarios. Stagger: `--reveal-delay: 0ms`
- **S11-2**: `card-hecho` — Los líderes federales. Stagger: `--reveal-delay: 80ms`

## Steps

1. **Find the append marker** — run `grep -n 'cards will be appended here by subsequent slices' index.html` to get the current line number. Do NOT hardcode a line number — use the grep output. The marker was at line 1612 after S10 completed, but use grep to confirm.
2. **Read the T02 Recipe section** of `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` (produced by T01) for all card attributes, image URLs, alt text, and cite text.
3. **Write the 2 cards to a temp file** (`/tmp/s11-cards.html`) using the `Write` tool — do NOT use bash heredocs (see KNOWLEDGE.md: heredoc reliability warning on Windows/Git Bash). HTML comment before each card: `<!-- S11-1: Los líderes unitarios -->` and `<!-- S11-2: Los líderes federales -->`. Both cards use the `card-hecho` template (see Inputs section).
4. **Insert the cards** using a Node.js one-liner: `node -e "const fs=require('fs'); const src=fs.readFileSync('/tmp/s11-cards.html','utf8'); const lines=fs.readFileSync('index.html','utf8').split('\n'); const idx=lines.findIndex(l=>l.includes('cards will be appended here by subsequent slices')); lines.splice(idx,0,src); fs.writeFileSync('index.html',lines.join('\n'),'utf8');"` — use the ASCII-only substring (no en-dash `–`) per KNOWLEDGE.md. Verify success with the verification commands below.

## Must-Haves

- [ ] `grep -c 'data-certeza' index.html` = 67
- [ ] `grep -n 'cards will be appended here by subsequent slices' index.html` still returns a line (marker preserved)
- [ ] `git diff --name-only HEAD -- styles.css app.js` is empty (no CSS/JS changes)
- [ ] S11-1 and S11-2 both use `card-hecho` with `data-certeza="hecho"`
- [ ] Stagger delays: S11-1=`0ms`, S11-2=`80ms` (reset to 0 — do NOT continue from S10's 160ms)
- [ ] Each card has `class="event-card card-hecho reveal reveal-slide"` (exact format)
- [ ] No sub-nav link added (S09 already added `<a href="#periodo-rosas">`)

## Verification

```bash
grep -c 'data-certeza' index.html
# expected: 67

grep -n 'cards will be appended here by subsequent slices' index.html
# expected: still present (line number will have increased by the length of the inserted block)

git diff --name-only HEAD -- styles.css app.js
# expected: empty (no output)

grep -c 'S11-' index.html
# expected: 2
```

## Inputs

- `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` — all card content, image URLs, alt text, cite text (produced by T01)
- `index.html` — target file; use `grep -n 'cards will be appended here by subsequent slices' index.html` to find the current marker line
- **Card-hecho template** (from S09/S10 pattern):
  ```html
  <!-- S11-N: [Card title] -->
  <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">
    <div class="card-certeza-indicator">
      <span class="card-certeza-icon" aria-hidden="true">✓</span>
      <span class="card-certeza-label">Hecho documentado</span>
    </div>
    <div class="card-image">
      <img src="[verified_thumb_url]" alt="[descriptive_alt_text]" loading="lazy">
    </div>
    <span class="event-card__year">[year range]</span>
    <h3 class="event-card__title">[title]</h3>
    <p class="event-card__excerpt">[excerpt text]</p>
    <footer class="card-source">
      <span class="card-source__icon" aria-hidden="true">📄</span>
      <cite>[source citations]</cite>
    </footer>
  </article>
  ```
- **Node.js en-dash warning (KNOWLEDGE.md):** The marker comment contains an en-dash (`–`, U+2013). When searching with `findIndex`, use the ASCII-only substring `'cards will be appended here by subsequent slices'` — NOT `'S11–S24 cards will be appended'`. The ASCII form is unique enough and avoids shell/encoding failures.

## Expected Output

- `index.html` — modified with 2 S11 cards inserted before the append marker. `data-certeza` count increases from 65 to 67. Marker comment preserved. No other files changed.
