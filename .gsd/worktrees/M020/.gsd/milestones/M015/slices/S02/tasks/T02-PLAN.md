---
estimated_steps: 4
estimated_files: 1
---

# T02: Add CSS for card-nota-certeza block variant and run final verification

**Slice:** S02 — Integración HTML
**Milestone:** M015

## Description

GEN37-3 contains `<aside class="card-nota-certeza">` — a block-level epistemic notice documenting the date discrepancy for the Salón Literario. No CSS rule exists for `.card-nota-certeza` as a block element; it will render with default browser paragraph typography (no visual distinction). This task adds a minimal CSS rule to `styles.css` and then confirms the full integration is correct.

The `:not(span)` qualifier is essential. Without it, every existing inline `<span class="card-nota-certeza">` in the BIOG cards (lines 381–560 of index.html) would receive `border-left` and `padding`, breaking inline text flow.

After the CSS addition, run the JS syntax check and open the browser to confirm the section renders correctly.

## Steps

1. Open `styles.css` and find the `.card-opinion` block near line 1152. Insert the following CSS rule immediately after the closing brace of the `.card-opinion` block (or its comment group), with a comment identifying M015:

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

2. Verify the CSS rule was inserted:
   ```bash
   grep -n "card-nota-certeza:not(span)" styles.css
   ```

3. Run JS syntax check:
   ```bash
   node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX ERROR:',e.message); else console.log('OK'); }"
   ```

4. Open `index.html` in the browser. Scroll to `#periodo-revolucion`, confirm the `1830–1837` sub-nav link is present, scroll to the new section, confirm 5 cards render with stagger animation on scroll-into-view, and confirm the `<aside>` on GEN37-3 has a visible left border.

## Must-Haves

- [ ] `grep -n "card-nota-certeza:not(span)" styles.css` returns exactly 1 match
- [ ] JS syntax check prints `OK`
- [ ] Browser shows 5 cards in `#rev-generacion-37` with no console errors
- [ ] `<aside class="card-nota-certeza">` on GEN37-3 has visible left border (border-left rule applied)

## Verification

```bash
# CSS rule present
grep -n "card-nota-certeza:not(span)" styles.css
# → 1 match

# JS syntax clean
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX ERROR:',e.message); else console.log('OK'); }"
# → OK

# Final data-certeza count unchanged from T01
grep -c 'data-certeza=' index.html
# → 98
```

## Inputs

- `styles.css` — insert CSS rule near line 1152 (`.card-opinion` block). Use Edit tool with anchor string from the end of the `.card-opinion` rule block.
- `index.html` — must already have the section from T01 (98 data-certeza elements).
- `app.js` — read-only; used only for syntax check.

## Expected Output

- `styles.css` — modified with `.card-nota-certeza:not(span)` rule after the `.card-opinion` block.
- Browser confirmation: 5 cards visible, `<aside>` with left border on GEN37-3, no JS errors, sub-nav link active on scroll.
