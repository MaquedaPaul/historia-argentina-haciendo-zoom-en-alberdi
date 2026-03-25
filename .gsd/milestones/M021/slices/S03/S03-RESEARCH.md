# S03: Batallas y campañas — San Lorenzo hasta Maipú — Research

**Date:** 2026-03-25
**Slice:** S03 (depends: S02 ✅)

## Summary

This is a straightforward append operation following the exact pattern S02 established. The `#rev-san-martin` sub-period container exists at line 1336 of `index.html` with 6 cards (Entradas 1–6). S03 needs to inject 4 more cards (Entradas 7–10 from `S01-CONTENT-DRAFT.md`) inside the existing `events-grid--certeza` div, immediately before the `</div><!-- /.events-grid rev-san-martin -->` closing comment at line 1468.

All content is fully authored and verified in `S01-CONTENT-DRAFT.md`. All 4 Wikimedia image URLs are confirmed working. No new HTML patterns, no new JS, no new CSS — pure content insertion using the established card-hecho template.

After injection, `querySelectorAll('#rev-san-martin [data-certeza]').length` will be 10 (6 existing + 4 new), and the global `data-certeza` count will go from 99 to 103.

## Recommendation

Single task: write the 4 battle cards to a temp staging file, then inject via Edit into `index.html` anchored on `</div><!-- /.events-grid rev-san-martin -->`. Follow the exact same two-step Write→Edit approach S02 used (avoids heredoc/shell escaping issues on Windows).

## Implementation Landscape

### Key Files

- `index.html` — target file; append cards at line 1468, before `</div><!-- /.events-grid rev-san-martin -->`
- `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` — source content; Entradas 7–10 are the exact text to render
- `tmp-san-martin-s03.html` — staging file to write first (deleted after injection)

### Insertion Anchor

```
          </div><!-- /.events-grid rev-san-martin -->
        </div><!-- /#rev-san-martin -->
```

The Edit tool `oldText` should be that two-line block. The `newText` should be the 4 new cards + those same two closing lines.

Verify anchor is unique before editing:
```bash
grep -c "/.events-grid rev-san-martin" index.html  # → 1
```

### Cards to Inject (Entradas 7–10)

All 4 are `card-hecho` with `data-certeza="hecho"`. Stagger delays continue from S02's last card (400ms):

| Entrada | Title | Year | Stagger delay | Image |
|---------|-------|------|---------------|-------|
| 7 — Cuyo | Cuyo y la preparación del Ejército de los Andes | 1814 – 1816 | 480ms | `San_Mart%C3%ADn_en_los_Andes%2C_1817_%281908%29.jpg` — 500px thumb |
| 8 — Cruce | El cruce de los Andes | Enero de 1817 | 560ms | `Cruce_de_los_Andes.jpg` — 500px thumb |
| 9 — Chacabuco | Batalla de Chacabuco | 12 de febrero de 1817 | 640ms | `Battle_of_Chacabuco.jpg` — 500px thumb |
| 10 — Maipú | Cancha Rayada y Maipú — derrota y victoria definitiva | 19 mar – 5 abr 1818 | 720ms | `Batalla_de_Maipu.jpg` — 500px thumb |

### Verified Image URLs (from S01-CONTENT-DRAFT.md)

- Entrada 7: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/San_Mart%C3%ADn_en_los_Andes%2C_1817_%281908%29.jpg/500px-San_Mart%C3%ADn_en_los_Andes%2C_1817_%281908%29.jpg`
- Entrada 8: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cruce_de_los_Andes.jpg/500px-Cruce_de_los_Andes.jpg`
- Entrada 9: `https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Battle_of_Chacabuco.jpg/500px-Battle_of_Chacabuco.jpg`
- Entrada 10: `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Batalla_de_Maipu.jpg/500px-Batalla_de_Maipu.jpg`

All are 500px thumbs (source images > 500px width, thumb paths work). All are pre-1900 PD artworks or period-appropriate paintings. No `<p class="img-attribution">` needed — PD images, no CC attribution required.

### Card Template

All 4 cards are `card-hecho`. The pattern (from S02/existing cards in index.html):

```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Xms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image"><img src="URL" alt="ALT" loading="lazy"></div>
  <span class="event-card__year">YEAR</span>
  <h3 class="event-card__title">TITLE</h3>
  <p class="event-card__excerpt">EXCERPT</p>
  <button class="card-expand-toggle" aria-expanded="false">
    <span class="card-expand-toggle__text">Ver más</span>
    <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
  </button>
  <div class="card-detail" hidden>
    <p>DETAIL_P1</p>
    <p>DETAIL_P2</p>
  </div>
  <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>SOURCES</cite></footer>
</article>
```

No `card-nota-historiografica` on any of these 4 cards — Entradas 7–10 are all straightforward `hecho` cards per the content draft.

### Build Order

1. Verify anchor: `grep -c "/.events-grid rev-san-martin" index.html` → must be 1
2. Write 4 cards HTML to `tmp-san-martin-s03.html`
3. Inject via Edit: oldText = two-line closing block; newText = 4 cards + closing block
4. Delete temp file
5. Run verification checks

### Verification Approach

```bash
# Card count in sub-period
grep -c 'event-card' index.html | # cumulative; count cards in #rev-san-martin specifically:
grep -A 200 'id="rev-san-martin"' index.html | grep -c 'event-card'  # → 10

# Global data-certeza count (was 99; +4 new hecho cards = 103)
grep -c 'data-certeza' index.html  # → 103

# S03 slice criterion
grep -A 200 'id="rev-san-martin"' index.html | grep -c 'data-certeza'  # → 10

# JS syntax still OK
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"

# All 4 new image URLs present
grep -c "San_Mart%C3%ADn_en_los_Andes" index.html   # → 1
grep -c "Cruce_de_los_Andes.jpg" index.html          # → 1
grep -c "Battle_of_Chacabuco" index.html             # → 1
grep -c "Batalla_de_Maipu.jpg" index.html            # → 1
```

The S03 slice success criterion from the roadmap — `querySelectorAll('#rev-san-martin [data-certeza]').length >= 10` — maps directly to `grep -A 200 'id="rev-san-martin"' index.html | grep -c 'data-certeza'` returning 10.

## Constraints

- **Windows/Git Bash**: No heredocs. Use Write tool to write HTML to temp file, then Edit to inject. This is the S02-proven approach.
- **Anchor uniqueness**: `</div><!-- /.events-grid rev-san-martin -->` appears exactly once (verified). Use this as the Edit anchor — it's more specific than the closing `/#rev-san-martin` line.
- **No new JS/CSS**: Zero new code required. expand/collapse, reveal-on-scroll, image fallbacks all auto-discover new cards.
- **Stagger continuity**: Must start at 480ms (continuation of 0/80/160/240/320/400ms sequence from S02's 6 cards). Increment by 80ms per card: 480, 560, 640, 720ms.
- **data-certeza="hecho"** (no accent, lowercase) — all 4 cards. Consistent with S02 hecho cards and KNOWLEDGE.md normalization note.

## Common Pitfalls

- **Edit anchor must include exactly the right whitespace** — the closing block uses 10-space indent for the inner div and 8-space for the outer. Copy the anchor exactly from the read output at line 1468–1469.
- **Stagger delay off-by-one** — S02 ended at 400ms. S03 starts at 480ms (not 400ms again). Double-check the sequence.
- **Image URL for Cruce de los Andes** — S01 draft has `Cruce_de_los_Andes.jpg` (a distinct file from `San_Martín_en_los_Andes_1817.jpg`). Both are verified; don't confuse them. Entrada 7 (Cuyo) uses the 1908 Ballerini painting; Entrada 8 (Cruce) uses the classic Cruce painting.
