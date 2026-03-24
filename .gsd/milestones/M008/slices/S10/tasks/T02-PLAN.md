---
estimated_steps: 4
estimated_files: 1
---

# T02: Append 3 S10 cards to index.html

**Slice:** S10 — Ideas de unitarios y federales
**Milestone:** M008

## Description

Mechanical HTML integration task: insert the 3 S10 content cards into `index.html` immediately before the append marker comment. All content is specified in the T01 content draft. This task is low-risk: follow the exact HTML patterns established by S09, use the marker-based insertion approach, and verify the card count.

The 3 cards go inside the `<div class="events-grid events-grid--certeza">` inside `#periodo-rosas`, immediately before `<!-- S10–S24 cards will be appended here by subsequent slices -->`.

- **S10-1**: `card-hecho` — El programa unitario: centralismo, libre comercio y modelo europeo. Stagger: `--reveal-delay: 0ms`
- **S10-2**: `card-hecho` — El programa federal: autonomía, proteccionismo y reparto de rentas. Stagger: `--reveal-delay: 80ms`
- **S10-3**: `card-opinion` — El conflicto real: ¿quién controla la aduana? Stagger: `--reveal-delay: 160ms`

## Steps

1. **Find the append marker** — run `grep -n 'S10–S24 cards will be appended' index.html` to get the current line number. Do NOT hardcode a line number — use the grep output.
2. **Read the S10 content draft** (`.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md`) to get all card content, image URLs, alt text, cite text, and blockquote content for S10-3.
3. **Write the 3 cards to a temp file** (`/tmp/s10-cards.html`) using the `Write` tool — do NOT use bash heredocs (see KNOWLEDGE.md: heredoc reliability warning). Structure each card using the exact templates from S09 cards (S09-1/S09-2 pattern for card-hecho; S09-4 pattern for card-opinion). HTML comment before each card: `<!-- S10-1: [title] -->`, `<!-- S10-2: [title] -->`, `<!-- S10-3: [title] -->`.
4. **Insert the cards** — use a Node.js one-liner to splice the content into `index.html` at the correct line: read the file, find the marker line, insert the card content before it, write back. Example: `node -e "const fs=require('fs'); const src=fs.readFileSync('/tmp/s10-cards.html','utf8'); const lines=fs.readFileSync('index.html','utf8').split('\n'); const idx=lines.findIndex(l=>l.includes('S10–S24 cards will be appended')); lines.splice(idx,0,src); fs.writeFileSync('index.html',lines.join('\n'),'utf8');"`. Then verify the result with grep.

## Must-Haves

- [ ] `grep -c 'data-certeza' index.html` = 65
- [ ] `grep -n 'S10–S24 cards will be appended' index.html` still returns a line (marker preserved)
- [ ] `git diff --name-only HEAD -- styles.css app.js` is empty (no CSS/JS changes)
- [ ] S10-1 and S10-2 use `card-hecho` with `data-certeza="hecho"`
- [ ] S10-3 uses `card-opinion` with `data-certeza="opinion"` (no accent — per KNOWLEDGE.md Certeza Attribute Accent Normalization)
- [ ] Stagger delays: S10-1=`0ms`, S10-2=`80ms`, S10-3=`160ms` (reset to 0, do NOT continue from S09's 240ms)
- [ ] Each card has `class="event-card card-hecho reveal reveal-slide"` or `class="event-card card-opinion reveal reveal-slide"` (exact format)
- [ ] No sub-nav link added (S09 already added `<a href="#periodo-rosas">` — S10 does NOT add another)

## Verification

```bash
grep -c 'data-certeza' index.html
# expected: 65

grep -n 'S10–S24 cards will be appended' index.html
# expected: still present

git diff --name-only HEAD -- styles.css app.js
# expected: empty (no output)

grep -c 'S10-' index.html
# expected: ≥3

grep -c 'reveal reveal-slide' index.html
# expected: 71 (was 68 after S09, +3 from S10)
```

## Inputs

- `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md` — all card content, image URLs, alt text, cite text, blockquote for S10-3 (produced by T01)
- `index.html` — target file; append marker currently near line 1542 but use grep to find it
- **S09 card HTML pattern for reference** — read lines around S09-1 (first card after `<!-- S09-1:`) to confirm exact HTML structure for card-hecho. Read S09-4 (the opinion card) for the card-opinion pattern including blockquote structure.
- **Card-hecho template** (from S09-1/S09-2 pattern):
  ```html
  <!-- S10-N: [Card title] -->
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
- **Card-opinion template** (from S09-4 pattern):
  ```html
  <!-- S10-3: [Card title] -->
  <article class="event-card card-opinion reveal reveal-slide" data-certeza="opinion" style="--reveal-delay: 160ms">
    <div class="card-certeza-indicator">
      <span class="card-certeza-icon" aria-hidden="true">💬</span>
      <span class="card-certeza-label">Interpretación historiográfica</span>
    </div>
    <div class="card-image">
      <img src="[verified_thumb_url]" alt="[descriptive_alt_text]" loading="lazy">
    </div>
    <span class="event-card__year">[year range]</span>
    <h3 class="event-card__title">[title]</h3>
    <blockquote class="card-opinion__quote">
      <p>[paraphrased historiographic argument]</p>
      <footer class="card-opinion__attribution">
        <strong class="card-opinion__author">[Historian name]</strong>
        <span class="card-opinion__context">— <em>[Book title]</em>, [publisher], [year].</span>
      </footer>
    </blockquote>
    <footer class="card-source">
      <span class="card-source__icon" aria-hidden="true">📄</span>
      <cite>[source citations]</cite>
    </footer>
  </article>
  ```

## Expected Output

- `index.html` — modified with 3 S10 cards inserted before the append marker. `data-certeza` count increases from 62 to 65. Marker comment preserved. No other files changed.
