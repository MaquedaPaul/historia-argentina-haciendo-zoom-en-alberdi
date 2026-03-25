# S02: Integración HTML — Research

**Date:** 2026-03-24
**Status:** Ready

## Summary

S02 is a pure splice task. S01 produced a complete, verified HTML block in `S01-CONTENT-DRAFT.md`. The block includes 5 cards (GEN37-1 to GEN37-5), a section wrapper (`#rev-generacion-37`), and a sub-nav link. No new HTML needs to be written; no new research or decisions remain. The entire slice is mechanical insertion + one small CSS addition.

Two splice operations are needed: (1) insert the section block after `</div><!-- /#rev-1820-1835 -->` at line 1439, and (2) insert the sub-nav link after the `#rev-1820-1835` link at line 330. One CSS fix is needed: add a few lines for `.card-nota-certeza` as a block-level `<aside>` — no such rule exists in `styles.css`.

One correction to the draft's sub-nav HTML: existing sub-nav links use `<span class="sub-nav__link-label">` for the sublabel; the draft uses a bare `<span>`. The inserted link must use the correct class to render consistently with all other sub-nav links.

## Recommendation

Execute as two tasks: T01 splices the HTML (section block + sub-nav link), T02 adds CSS for the `<aside class="card-nota-certeza">` element and runs verification (data-certeza count, JS syntax, browser check).

## Implementation Landscape

### Key Files

- `index.html` — target; two splice points confirmed at current line numbers (see below)
- `styles.css` — one addition needed: block-level `.card-nota-certeza` rule (~5 lines)
- `.gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` — the complete HTML to splice; no rewriting required

### Confirmed Splice Points

Both anchor strings are verified against the live file:

| Splice | Anchor string | Current line | Insert after |
|--------|--------------|--------------|--------------|
| Section block | `</div><!-- /#rev-1820-1835 -->` | 1439 | Yes — insert `<div id="rev-generacion-37" …>` block |
| Sub-nav link | `<a href="#rev-1820-1835" class="sub-nav__link">` | 330 | Yes — insert the new `<a href="#rev-generacion-37" …>` link |

Use the Edit tool with these exact anchor strings (not raw line numbers) to survive any prior-line drift.

### Sub-nav Link Correction

The draft sub-nav HTML uses a bare `<span>`:
```html
<a href="#rev-generacion-37" class="sub-nav__link">1830–1837<span>Generación del 37</span></a>
```

All existing sub-nav links use `<span class="sub-nav__link-label">`. The correct HTML to insert is:
```html
              <a href="#rev-generacion-37" class="sub-nav__link">1830–1837<span class="sub-nav__link-label">Generación del 37</span></a>
```

### CSS Addition for `<aside class="card-nota-certeza">`

No CSS rule for `.card-nota-certeza` exists in `styles.css`. The inline `<span>` variant (used in BIOG cards) inherits text styling naturally and needs no rule. The new `<aside>` (block element) will render with default browser paragraph typography — functional but visually flat: no visual distinction from the surrounding prose.

Add ~5 lines to `styles.css` near existing card-specific rules (around line 1152 where `.card-opinion` is defined, or in a comment-grouped block for card utilities). Pattern:

```css
/* card-nota-certeza block variant (aside) — date-dispute and epistemic notices — M015 */
.card-nota-certeza:not(span) {
  border-left: 3px solid var(--color-accent, #b08a4a);
  padding: 0.5rem 0.75rem;
  margin: 0.75rem 0;
  font-size: 0.875rem;
  color: var(--color-text-muted, #5a5a5a);
}
```

Using `:not(span)` avoids disturbing the existing inline `<span class="card-nota-certeza">` elements in BIOG-1 through BIOG-11 cards (lines 381–560 of index.html). Alternatively, add a distinct class `.card-nota-certeza--block` to the `<aside>` in GEN37-3 — but that would require editing the draft HTML. The `:not(span)` approach is simpler and non-breaking.

### Sub-nav JS Wiring

No JS changes are needed. The sub-nav observer (`initSubNav`) already queries `#periodo-revolucion .sub-period` — the new `#rev-generacion-37` div has `class="sub-period reveal reveal-fade"`, so it will be auto-observed. The link matching is by `href` attribute (`.getAttribute('href').slice(1)` vs `entry.target.id`) — adding a link with `href="#rev-generacion-37"` and a section with `id="rev-generacion-37"` is sufficient.

### Build Order

1. **T01 — HTML splice**: Insert section block + sub-nav link using Edit tool with anchor-string matching. Verify with `grep -n "rev-generacion-37" index.html` (expect ≥2 matches) and `grep -c 'data-certeza=' index.html` (expect 98).
2. **T02 — CSS + verification**: Add `.card-nota-certeza:not(span)` rule to styles.css. Run JS syntax check (`node -e "new Function(...)"`). Open browser, confirm section renders, confirm no JS errors.

### Verification Approach

Post-splice diagnostics (all from the working directory):

```bash
# Section inserted
grep -n "rev-generacion-37" index.html
# → should return ≥2 lines (opening div + close comment)

# data-certeza count rose from 93 to 98
grep -c 'data-certeza=' index.html
# → should return 98

# Sub-nav link present
grep -n "rev-generacion-37" index.html | grep "sub-nav"
# → should return 1 line

# No JS syntax errors
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX ERROR:',e.message); else console.log('OK'); }"
# → should print OK

# No flag literals in draft (regression guard)
! grep -qi "\[VERIFICAR\]\|\[PENDIENTE\]\|TBD" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md
# → exit 0
```

Browser check: navigate to `index.html`, scroll to `#periodo-revolucion`, confirm the new sub-section appears between the "Anarquía y guerras civiles" block and the "Unitarios, Federales y la Era de Rosas" block. Confirm the 5 cards render with stagger animation on scroll-into-view. Confirm `<aside class="card-nota-certeza">` on GEN37-3 has visible visual distinction (left border) after the CSS rule is added.

## Constraints

- **Edit tool only for splicing** — do NOT use heredocs or cat-append for HTML changes (KNOWLEDGE.md: bash heredocs are unreliable for large blocks; use Write to a temp file then verify, or use Edit with exact anchor strings).
- **data-certeza accent normalization** — GEN37-4 uses `data-certeza="opinión"` (with accent). This is consistent with the established pattern (KNOWLEDGE.md). CSS attribute selectors for verification must query both `[data-certeza="opinion"]` and `[data-certeza="opinión"]`.
- **Line number drift** — always use anchor strings, not raw line numbers, in Edit calls. Confirmed anchors are the exact strings listed in the table above.

## Common Pitfalls

- **Sub-nav `<span>` class mismatch** — the draft uses a bare `<span>`; existing links use `<span class="sub-nav__link-label">`. Inserting the bare-span version will render with different typography (the CSS rule `.sub-nav__link span` or `.sub-nav__link-label` controls sizing). Use the class version.
- **`.card-nota-certeza:not(span)` scope** — the `:not(span)` qualifier is essential. Without it, every existing inline `<span class="card-nota-certeza">` in the BIOG cards (lines 381–560) would get a border-left and padding, breaking the inline text flow.
- **`reveal--no-anim` vs `reveal--visible` for new cards** — if the user lands directly scrolled to the new section, the IntersectionObserver gives it `reveal--no-anim` (not `reveal--visible`). This is correct behavior (KNOWLEDGE.md) — cards appear without animation because they're already in viewport. No action needed.
