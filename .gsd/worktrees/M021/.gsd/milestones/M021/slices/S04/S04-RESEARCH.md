# S04: Perú, Guayaquil y retiro del poder — Research

**Date:** 2026-03-25
**Slice:** S04 (depends on S03)
**Milestone:** M021

## Summary

S04 is a straightforward HTML injection task. All content is already verified and ready in `S01-CONTENT-DRAFT.md` (Entradas 11–15). The sub-period structure, injection anchor, card templates, and certeza patterns are all established by S02/S03. No new JavaScript, no new CSS, no architectural decisions remain — this is pure content integration.

The work is to inject 5 cards (Entradas 11–15) before the `</div><!-- /.events-grid rev-san-martin -->` anchor line, bringing the total from 10 to 15 cards and the global certeza count from 103 to 108.

The one nuance is that Entrada 12 (Guayaquil) and Entradas 3/4 (logias) use the same `card-opinion` + `data-certeza="debatido"` + `card-nota-historiografica` pattern — confirmed present and correct in S02. Entrada 15 (legado) uses `card-opinion` + `data-certeza="opini&#xF3;n"` (with HTML entity) + a `blockquote`-style structure (no `card-nota-historiografica`). Entrada 13 (retiro) uses `card-hecho` with an inline `<span class="card-nota-certeza">` per S01 draft notes.

## Recommendation

Single task: inject Entradas 11–15 into `#rev-san-martin` using the Edit tool anchored on the two-line closing block `</div><!-- /.events-grid rev-san-martin -->`. Reset stagger delays to 0ms for this new thematic cluster (S03 summary recommends this; 800ms+ is poor UX for a new section).

## Implementation Landscape

### Key Files

- `index.html` — the only file that changes. Inject 5 cards before line 1553 (`</div><!-- /.events-grid rev-san-martin -->`).
- `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` — verified content for Entradas 11–15 (already read; do NOT re-read).

### Injection Anchor

The exact two-line block to anchor the Edit tool on (currently lines 1553–1554):

```
          </div><!-- /.events-grid rev-san-martin -->
        </div><!-- /#rev-san-martin -->
```

Insert 5 cards BEFORE this block (same pattern used successfully in S03).

### Card Specifications

**Entrada 11 — Campaña al Perú y el Protectorado**
- Template: `card-hecho` / `data-certeza="hecho"`
- Year: `1820 – 1822`
- Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg/500px-General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg`
- Alt: `Retrato de José de San Martín por José Gil de Castro, 1818 — período del Protectorado del Perú`
- Stagger: `--reveal-delay: 0ms` (reset — new thematic cluster)
- Has expand/collapse detail section
- Certeza indicator: ✓ / `Hecho documentado`

**Entrada 12 — La entrevista de Guayaquil — el gran silencio de la historia**
- Template: `card-opinion` / `data-certeza="debatido"`
- Year: `26–27 de julio de 1822`
- Image: `https://upload.wikimedia.org/wikipedia/commons/f/ff/Encuentro_de_Guayaquil.jpg` ← DIRECT URL (image is 484px, smaller than 500px, no /thumb/ path — use as-is per KNOWLEDGE.md)
- Alt: `Encuentro de San Martín y Bolívar en Guayaquil, J. Collignon, 1843`
- Stagger: `--reveal-delay: 80ms`
- Has expand/collapse detail section
- Has `<p class="card-nota-historiografica">` after the card-detail div (matches Entradas 3 and 4 pattern exactly)
- Certeza indicator: ⚖ (`&#x2696;`) / `Debatido historiográficamente`
- Three historiographic positions: renunciamiento voluntario (Mitre), celada bolivariana (edecán Guido), acuerdo tácito de esferas (síntesis contemporánea)

**Entrada 13 — El retiro del poder — la negativa a las guerras civiles**
- Template: `card-hecho` / `data-certeza="hecho"`
- Year: `1822 – 1824`
- Image: Gil de Castro portrait (fallback, same URL as Entrada 11)
- Alt: `Retrato de José de San Martín por José Gil de Castro, 1818, óleo sobre lienzo`
- Stagger: `--reveal-delay: 160ms`
- Has expand/collapse detail section
- Contains inline `<span class="card-nota-certeza">` around the phrase about "jamás desenvainó la espada" to flag exact phrasing uncertainty
- Certeza indicator: ✓ / `Hecho documentado`

**Entrada 14 — El exilio y los últimos años en Europa**
- Template: `card-hecho` / `data-certeza="hecho"`
- Year: `1824 – 1850`
- Image: Gil de Castro portrait (same fallback URL)
- Alt: `Retrato de José de San Martín por José Gil de Castro, 1818, óleo sobre lienzo`
- Stagger: `--reveal-delay: 240ms`
- Has expand/collapse detail section
- Certeza indicator: ✓ / `Hecho documentado`

**Entrada 15 — El legado — el general que no quiso el poder**
- Template: `card-opinion` / `data-certeza="opini&#xF3;n"` (with HTML entity — matches existing pattern in codebase)
- Year: `1850 – hoy`
- Image: Gil de Castro portrait (same fallback URL)
- Alt: `Retrato de José de San Martín por José Gil de Castro, 1818, óleo sobre lienzo`
- Stagger: `--reveal-delay: 320ms`
- Structure: NO `blockquote`-style quote (no first-person quote available). Use `card-opinion` CSS class but with `card-nota-historiografica` paragraph inline (same pattern as Entradas 3/4, not the blockquote pattern used in Alberdi opinion cards)
- Has expand/collapse detail section
- Certeza indicator: 💬 / `Interpretación historiográfica`
- Sources: Lynch (Yale, 2009), Rojas (1933), Mitre (1887)

### Build Order

Single injection task. No sequencing decisions needed. All 5 cards can be written in one Edit operation.

Write the 5-card HTML block to a temp file first, then use Edit to anchor it before the closing two-line block. This avoids heredoc issues (KNOWLEDGE.md: bash heredocs unreliable on Windows/Git Bash).

### Verification Approach

After injection, run these checks in sequence:

```bash
# 1. Authoritative card count in #rev-san-martin (must be 15)
node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);"

# 2. Global certeza count (must be 108 = 103 + 5)
grep -c 'data-certeza' index.html

# 3. Guayaquil image URL present (direct, no /thumb/)
grep -c 'Encuentro_de_Guayaquil.jpg' index.html

# 4. JS syntax check
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('syntax OK (runtime-only error)'); }"

# 5. card-nota-certeza present for Entrada 13
grep -c 'card-nota-certeza' index.html
```

Success criteria: cards=15, global certeza=108, Guayaquil URL=1, JS syntax OK, card-nota-certeza≥1.

## Constraints

- **Zero new JavaScript** — expand/collapse and reveal auto-discover new cards. No wiring needed.
- **Guayaquil image is a direct URL** (not a /thumb/ path). The image is 484px wide, below the 500px threshold — use `https://upload.wikimedia.org/wikipedia/commons/f/ff/Encuentro_de_Guayaquil.jpg` directly with `width="100%"` on the img tag (KNOWLEDGE.md: "Small Wikimedia images have no 500px thumb").
- **Stagger reset to 0ms** for Entrada 11 — S03 summary's explicit recommendation. The Peru/retiro section is a new thematic cluster; continuing at 800ms+ creates unacceptably long delays.
- **Entrada 15 uses `data-certeza="opini&#xF3;n"`** (with HTML entity for ó) — consistent with the S01 content draft and the existing pattern for Rosas-era opinion cards that use the accented form.
- **Entrada 15 does NOT use a blockquote** — there is no verified first-person quote from San Martín or a historian suitable for the blockquote pattern. Use the `card-nota-historiografica` paragraph pattern (same as Entradas 3/4) with historiographic positions attributed by name.

## Common Pitfalls

- **Guayaquil image /thumb/ path** — do NOT construct `500px-Encuentro_de_Guayaquil.jpg` thumb URL; the image is 484px and has no 500px thumb. Use the direct URL from the S01 draft.
- **grep -A N card counting** — unreliable when N < section length. Only use the Node.js boundary-scoped count as authoritative (KNOWLEDGE.md confirmed this in S03).
- **Stagger delay continuation** — do NOT continue at 800ms+; reset to 0ms for this new thematic block.
- **Entrada 15 card-opinion pattern** — Entrada 15 is `card-opinion` CSS class but NOT a blockquote card. The `card-opinion` class signals "interpretive/opinion content" and shares CSS styling. The `blockquote` sub-pattern is only for cards with a verified direct quote. Entradas 3 and 4 in the same sub-period already demonstrate the correct mixed pattern (`card-opinion` class + `card-nota-historiografica` paragraph).
