# S05: Sub-nav, timeline y verificación final — Research

**Date:** 2026-03-25
**Slice:** S05 (risk: low)
**Depends on:** S04 ✅ complete

## Summary

S05 is light integration work on known patterns. Two concrete changes are needed in `index.html`: (1) add one `<a>` tag to the sub-nav, and (2) insert four new markers into `revolucion-timeline`. Both follow established patterns already in the codebase. A third change is required in `styles.css`: extend the stagger nth-child animation selectors from nth-child(11) to nth-child(15) to cover the 4 new markers. Without the CSS extension, new markers will render but their dots and labels will stay invisible (opacity:0, scale(0)) — they never animate in.

The sub-nav currently has 7 links (lines 327–333). `#rev-san-martin` is absent. D073 specifies the label: `1812–1822` with sublabel `San Martín Libertador`. The current sub-nav pattern uses `<a href="#id" class="sub-nav__link">YEAR<span class="sub-nav__link-label">Sublabel</span></a>` — a single-line copy-paste.

The `revolucion-timeline` (line 2747) has 10 markers (nth-child 2–11 relative to the progress div at nth-child 1). D072 specifies 4 new markers: 1812 (below), 1813 (above), 1817 (above), 1818 (below). These must be inserted in chronological order between the existing 1810 and 1816/1820 markers. After insertion the total rises to 14 markers (nth-child 2–15).

S04 flagged one risk: `data-certeza="debatido"` badge style. Inspection confirms this is not a problem — debatido cards use `class="event-card card-opinion"` and inherit all `card-opinion` CSS including the blue-tinted indicator block. The `card-certeza-label` text is hardcoded per-card ("Debatido historiográficamente") so no CSS coverage for the literal string "debatido" is needed.

## Recommendation

Single task (T01): make all three targeted edits in sequence, then run full verification (DOM count, sub-nav link, timeline markers, JS syntax, responsive checks). No new JS. No new HTML structures beyond the established patterns.

**Insertion order for timeline markers:** Insert chronologically. The new markers fall between existing ones:
- 1812 (20.00%) and 1813 (21.67%) go between the 1810 marker and the 1816 marker
- 1817 (28.33%) and 1818 (30.00%) go between the 1816 marker and the 1820 marker

**above/below assignment (D072):** 1812 below, 1813 above, 1817 above, 1818 below. This alternating pattern prevents overlap in the dense 1810–1820 cluster (four new markers in 6 years), consistent with KNOWLEDGE.md: "Alternating Above/Below Labels for Dense Timelines".

**CSS stagger extension:** Append nth-child(12) through nth-child(15) rules for both `.revolucion-timeline__dot` and `.revolucion-timeline__label` in `styles.css`. Continue the existing delay progression (dots at ~0.15s intervals; labels ~0.2s after their dot).

## Implementation Landscape

### Key Files

- `index.html` line 327–333 — sub-nav `<nav class="sub-nav">` block; add one `<a>` for `#rev-san-martin` after the `#rev-1800-1820` link (chronologically adjacent)
- `index.html` lines 2754–2817 — `revolucion-timeline__track`; insert 4 marker divs in two batches: after 1810 marker (1812+1813) and after 1816 marker (1817+1818)
- `styles.css` lines 1691–1720 — dot stagger selectors (nth-child 2–11); extend to nth-child(15)
- `styles.css` lines 1761–1792 — label stagger selectors (nth-child 2–11); extend to nth-child(15)

### Exact Positions and Markup

**Sub-nav link to add** (after the `#rev-1800-1820` link at line 329):
```html
<a href="#rev-san-martin" class="sub-nav__link">1812–1822<span class="sub-nav__link-label">San Martín Libertador</span></a>
```

**Timeline markers — batch 1** (insert after `<!-- Marker 1: 1810 -->` block, before `<!-- Marker 2: 1816 -->`):
```html
<!-- Marker N: 1812 — Regimiento de Granaderos a Caballo -->
<div class="revolucion-timeline__marker" style="--marker-pos: 20.00%">
  <span class="revolucion-timeline__dot"></span>
  <span class="revolucion-timeline__label">1812<small>Granaderos</small></span>
</div>

<!-- Marker N+1: 1813 — Combate de San Lorenzo -->
<div class="revolucion-timeline__marker revolucion-timeline__marker--above" style="--marker-pos: 21.67%">
  <span class="revolucion-timeline__dot"></span>
  <span class="revolucion-timeline__label">1813<small>San Lorenzo</small></span>
</div>
```

**Timeline markers — batch 2** (insert after `<!-- Marker 2: 1816 -->` block, before `<!-- Marker 3: 1820 -->`):
```html
<!-- Marker N+2: 1817 — Cruce de los Andes / Chacabuco -->
<div class="revolucion-timeline__marker revolucion-timeline__marker--above" style="--marker-pos: 28.33%">
  <span class="revolucion-timeline__dot"></span>
  <span class="revolucion-timeline__label">1817<small>Cruce Andes</small></span>
</div>

<!-- Marker N+3: 1818 — Maipú -->
<div class="revolucion-timeline__marker" style="--marker-pos: 30.00%">
  <span class="revolucion-timeline__dot"></span>
  <span class="revolucion-timeline__label">1818<small>Maipú</small></span>
</div>
```

**After insertion, nth-child mapping (progress div = nth-child(1)):**
| nth-child | Year | New? |
|-----------|------|------|
| 2 | 1810 | — |
| 3 | 1812 | ✅ |
| 4 | 1813 | ✅ |
| 5 | 1816 | — |
| 6 | 1817 | ✅ |
| 7 | 1818 | ✅ |
| 8 | 1820 | — |
| 9 | 1826 | — |
| 10 | 1829 | — |
| 11 | 1835 | — |
| 12 | 1838 | — |
| 13 | 1845 | — |
| 14 | 1852 | — |
| 15 | 1860 | — |

**CSS stagger rules to add** (4 new nth-child blocks for dots, 4 for labels):

Dots (append after existing nth-child(11) dot rule at ~line 1720):
```css
.revolucion-timeline.reveal--visible .revolucion-timeline__marker:nth-child(12) .revolucion-timeline__dot {
  animation: rev-marker-pop 400ms var(--ease-out) 2.50s forwards;
}
.revolucion-timeline.reveal--visible .revolucion-timeline__marker:nth-child(13) .revolucion-timeline__dot {
  animation: rev-marker-pop 400ms var(--ease-out) 2.65s forwards;
}
.revolucion-timeline.reveal--visible .revolucion-timeline__marker:nth-child(14) .revolucion-timeline__dot {
  animation: rev-marker-pop 400ms var(--ease-out) 2.80s forwards;
}
.revolucion-timeline.reveal--visible .revolucion-timeline__marker:nth-child(15) .revolucion-timeline__dot {
  animation: rev-marker-pop 400ms var(--ease-out) 2.95s forwards;
}
```

Labels (append after existing nth-child(11) label rule at ~line 1792):
```css
.revolucion-timeline.reveal--visible .revolucion-timeline__marker:nth-child(12) .revolucion-timeline__label {
  animation: rev-label-fade 400ms var(--ease-out) 2.70s forwards;
}
.revolucion-timeline.reveal--visible .revolucion-timeline__marker:nth-child(13) .revolucion-timeline__label {
  animation: rev-label-fade 400ms var(--ease-out) 2.85s forwards;
}
.revolucion-timeline.reveal--visible .revolucion-timeline__marker:nth-child(14) .revolucion-timeline__label {
  animation: rev-label-fade 400ms var(--ease-out) 3.00s forwards;
}
.revolucion-timeline.reveal--visible .revolucion-timeline__marker:nth-child(15) .revolucion-timeline__label {
  animation: rev-label-fade 400ms var(--ease-out) 3.15s forwards;
}
```

Note: the `--above` override at line ~1803 (`.revolucion-timeline.reveal--visible .revolucion-timeline__marker--above .revolucion-timeline__label { animation-name: rev-label-fade-above; }`) already applies globally — no changes needed for the above-modifier labels (1813 and 1817). The rule overrides `animation-name` for any `--above` marker regardless of nth-child.

### Build Order

1. **Edit index.html sub-nav** — one-line addition, lowest risk
2. **Edit index.html timeline** — two batches of 2 markers each; insert in chronological order relative to existing HTML structure
3. **Edit styles.css** — extend stagger selectors (4+4 rules); without this step new markers are invisible
4. **Verify** — DOM queries + JS syntax + browser checks at 320px and 1920px+

### Verification Approach

**DOM queries (browser console or Node.js):**
```js
// Cards count — should be 15
document.querySelectorAll('#rev-san-martin [data-certeza]').length

// Sub-nav link present
document.querySelector('a[href="#rev-san-martin"]') !== null

// Timeline markers — should be 14 total
document.querySelectorAll('.revolucion-timeline__marker').length

// 1812 and 1817 markers specifically
document.querySelector('.revolucion-timeline__marker[style*="20.00"]') !== null
document.querySelector('.revolucion-timeline__marker[style*="28.33"]') !== null
```

**Shell verification:**
```bash
# Sub-nav link
grep -c 'href="#rev-san-martin"' index.html  # → 1

# Timeline markers count in HTML
grep -c "revolucion-timeline__marker" index.html  # → 14 after insertion

# JS syntax
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('syntax OK (runtime-only error)'); }"

# Global data-certeza unchanged (no new cards added in S05)
grep -c 'data-certeza' index.html  # → 108
```

**Browser UAT:**
- Open at 320px: sub-nav scrollable, no overflow; timeline track visible; cards 1-column
- Open at 1920px+: sub-nav centered, all links visible; timeline markers not overlapping; cards multi-column grid
- `data-certeza="debatido"` badge renders with blue tint (card-opinion class) and "Debatido historiográficamente" label
- No JS console errors

## Common Pitfalls

- **CSS stagger selectors not extended** — existing selectors stop at nth-child(11). After inserting 4 new markers the total becomes 15. nth-child(12–15) rules must be added or those markers stay hidden (opacity:0, scale:0 never transitions to 1). This is the only non-obvious step in this slice.
- **Inserting markers out of order** — HTML position determines nth-child. 1812/1813 must come before 1816 in HTML; 1817/1818 must come before 1820. If inserted at the wrong position the stagger timing assignments will be off (visually harmless but factually wrong).
- **nth-child offset** — the `<div class="revolucion-timeline__progress">` is nth-child(1) in the track; markers start at nth-child(2). This offset is already established in the existing CSS and must be maintained.
- **above-modifier labels** — the `rev-label-fade-above` animation override (line ~1803 in styles.css) already applies to ALL `--above` markers globally. No per-nth-child override needed for 1813 and 1817 — they inherit the correct animation automatically.
