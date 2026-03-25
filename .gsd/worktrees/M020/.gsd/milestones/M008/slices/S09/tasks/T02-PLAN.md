---
estimated_steps: 3
estimated_files: 1
---

# T02: Integrate S09 cards into index.html — create #periodo-rosas sub-period

**Slice:** S09 — Origen de unitarios y federales
**Milestone:** M008

## Description

Using the content draft from T01 (`S09-CONTENT-DRAFT.md`), make two targeted edits to `index.html`:
1. Insert a new `<div id="periodo-rosas">` sub-period container with S09's 4 cards, positioned after `</div><!-- /#rev-1820-1835 -->` and before the `<!-- CONECTOR ALBERDI — SP2 → SP3 -->` blockquote.
2. Add one sub-nav link `<a href="#periodo-rosas">` after the existing `#rev-1820-1835` link.

This sub-period container (`#periodo-rosas`) is the shared container for all 16 M008 slices (S09–S24). S09 creates it with the first 4 cards; subsequent slices will append more cards inside its `events-grid` div. No new CSS or JS is needed — all existing reveal, certeza, and grid styles apply automatically.

## Steps

1. **Read T01's content draft** at `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md`. Extract title, year display, certeza, excerpt, sources, and image URL for each of the 4 cards.

2. **Edit 1 — Insert #periodo-rosas sub-period block.** Find the exact text `</div><!-- /#rev-1820-1835 -->` in `index.html` (currently line 1438). Insert the following block immediately after it, before the `<!-- CONECTOR ALBERDI — SP2 → SP3 -->` comment:

   ```html

   <!-- ══════════════════════════════════════════════════
        SUB-PERÍODO ROSAS: Unitarios, Federales y la Era de Rosas (1820–1852)
        Inserción: M008/S09–S24 — S09 adds the first 4 cards (origen del conflicto)
        Subsequent slices (S10–S24) append inside the events-grid below.
        ══════════════════════════════════════════════════ -->
   <div id="periodo-rosas" class="sub-period reveal reveal-fade">
     <h3 class="sub-period__title">Unitarios, Federales y la Era de Rosas (1820–1852)</h3>
     <div class="events-grid events-grid--certeza" aria-label="Origen de unitarios y federales">

       <!-- S09-1: La aduana y las raíces económicas del conflicto -->
       [card-hecho HTML from draft]

       <!-- S09-2: El Directorio centralista (1816–1820) -->
       [card-hecho HTML from draft]

       <!-- S09-3: La Constitución de 1826 y el rechazo provincial -->
       [card-hecho HTML from draft]

       <!-- S09-4: ¿Cuándo nacieron las identidades unitario/federal? — OPINIÓN -->
       [card-opinion HTML from draft]

     </div><!-- /.events-grid S09 -->
   </div><!-- /#periodo-rosas -->
   ```

   For each card, use the exact HTML pattern from existing SP2 cards:
   - `card-hecho` pattern (same as SP2-1, lines 1345–1367 of `index.html`): `<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">` with `card-certeza-indicator` (✓ icon, "Hecho documentado"), `card-image` with `<img loading="lazy">`, `event-card__year`, `event-card__title`, `event-card__excerpt`, `card-source` footer with `<cite>`.
   - `card-opinion` pattern (same as SP2-4, lines 1408–1436): `<article class="event-card card-opinion reveal reveal-slide" data-certeza="opinion" style="--reveal-delay: 240ms">` with `card-certeza-indicator` (💬 icon, "Interpretación historiográfica"), `card-image`, year, title, `<blockquote class="card-opinion__quote">` containing `<p>` with the attributed interpretation and `<footer class="card-opinion__attribution">` with `<strong class="card-opinion__author">` (historian name) and `<span class="card-opinion__context">` (work, year, framing), plus `card-source` footer with `<cite>`.
   - Stagger delays: S09-1 = `0ms`, S09-2 = `80ms`, S09-3 = `160ms`, S09-4 = `240ms`.
   - `data-certeza` attribute values: `"hecho"` for the first 3 cards, `"opinion"` (no accent) for S09-4.

3. **Edit 2 — Add sub-nav link.** Find the existing line:
   ```html
   <a href="#rev-1820-1835" class="sub-nav__link">1820–1835<span class="sub-nav__link-label">Anarquía y Guerras Civiles</span></a>
   ```
   Add one new line immediately after it:
   ```html
   <a href="#periodo-rosas" class="sub-nav__link">1820–1852<span class="sub-nav__link-label">Unitarios y Federales</span></a>
   ```

4. **Verify all checks pass** (see Verification section). Do NOT touch `styles.css` or `app.js`. Do NOT edit any existing SP2 cards.

## Must-Haves

- [ ] `<div id="periodo-rosas">` exists in `index.html` exactly once
- [ ] The block is inserted between `</div><!-- /#rev-1820-1835 -->` and `<!-- CONECTOR ALBERDI — SP2 → SP3 -->`
- [ ] 4 new cards added, each with `data-certeza` attribute
- [ ] `data-certeza="opinion"` (no accent) on S09-4
- [ ] S09-4 uses `card-opinion` pattern with `<blockquote class="card-opinion__quote">` — not a `<p>` excerpt
- [ ] Sub-nav has exactly one new `<a href="#periodo-rosas">` link
- [ ] `grep -c 'data-certeza' index.html` returns 62
- [ ] `git diff --name-only HEAD -- styles.css app.js` returns empty (no changes to those files)
- [ ] Existing SP2 cards (SP2-1 through SP2-4) are unchanged

## Verification

```bash
# Card count increased by 4
grep -c 'data-certeza' index.html
# Expected: 62

# New sub-period container exists exactly once
grep -c 'id="periodo-rosas"' index.html
# Expected: 1

# Sub-nav link added
grep -c 'href="#periodo-rosas"' index.html
# Expected: 1

# SP2 sub-period still intact
grep -c 'id="rev-1820-1835"' index.html
# Expected: 1

# No CSS or JS changes
git diff --name-only HEAD -- styles.css app.js
# Expected: (empty)

# All 4 S09 cards have reveal classes
grep -c 'reveal reveal-slide' index.html
# Should be ≥ previous count + 4
```

## Inputs

- `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` — T01 output with card title, certeza, excerpt, sources, and verified image URLs for each of the 4 S09 cards
- `index.html` lines 326–332 — sub-nav where the new link is added
- `index.html` lines 1338–1450 — SP2 sub-period ending and SP2→SP3 Alberdi-quote connector showing exact insertion point
- `index.html` lines 1345–1436 — SP2 card HTML patterns to reuse (card-hecho at SP2-1; card-opinion at SP2-4)

**Critical:** The `#periodo-rosas` div is the shared container for ALL 16 M008 slices (S09–S24). Do not close the `events-grid` div in a way that prevents later slices from appending. The structure should be:
```
<div id="periodo-rosas" class="sub-period ...">
  <h3>...</h3>
  <div class="events-grid events-grid--certeza" ...>
    <!-- S09 cards -->
    <!-- S10–S24 cards will be appended here by subsequent slices -->
  </div><!-- /.events-grid -->
</div><!-- /#periodo-rosas -->
```
The comment `<!-- S10–S24 cards will be appended here by subsequent slices -->` after the last S09 card helps future executors find the append point.

## Expected Output

- `index.html` — modified with two insertions: (1) new `#periodo-rosas` sub-period div with 4 S09 cards between `/#rev-1820-1835` and the SP2→SP3 Alberdi connector; (2) new sub-nav link for `#periodo-rosas`. All 6 verification commands pass.
