# S09 — Research: Origen de unitarios y federales

**Date:** 2026-03-22

## Summary

S09 is **light research** — this is straightforward application of established patterns to known code. The content scope (origin of unitario/federal division) is historically well-documented and partially covered by existing cards in the `rev-1820-1835` sub-period. The main architectural question is resolved by the M008-CONTEXT integration point: M008 creates a **new** `<div id="periodo-rosas" class="sub-period">`, separate from the existing `rev-1820-1835` sub-period.

**Key finding:** The existing `rev-1820-1835` sub-period (SP2) already contains 4 cards that partially cover S09's topic:
- SP2-1: Cepeda 1820 (`card-hecho`) — covers the Cepeda rupture
- SP2-2: "Unitarios contra federales" (`card-hecho`) — overview 1820–1852
- SP2-3: Rivadavia y la presidencia de 1826 (`card-hecho`)
- SP2-4: Rosas y la Generación del 37 (`card-opinion`)

S09 does NOT modify those existing cards. Instead, it creates a **content draft** (`S09-CONTENT-DRAFT.md`) and the **opening HTML cards** for the new `#periodo-rosas` sub-period. The S09 cards go deeper than the existing SP2 cards: they explain the *origin* of the division (pre-1820 tensions, aduana economics, why "unitario/federal" crystallized as identities only around 1826–1829), while SP2's cards are Alberdi-era overview cards.

The M008-CONTEXT section "S09: Origen de unitarios y federales" (certeza: **hecho**) maps to 3 thematic beats:
1. Post-1810 tension: Buenos Aires vs. provincias, aduana control
2. Cepeda 1820: el eje de quiebre
3. Rivadavia (1821–1827): el proyecto unitario más articulado, su colapso, y la cristalización de identidades

Recommendation: produce 3 `card-hecho` cards + 1 `card-opinion` (the "cuándo exactamente surgieron como identidades es gradual" beat from S09-CONTEXT). 4 cards total.

## Recommendation

**Produce S09-CONTENT-DRAFT.md first**, then a corresponding HTML snippet with 4 cards. The HTML snippet will be the opening block of the new `#periodo-rosas` sub-period. The planner should decompose into:
1. T01 — Content draft with verified historical facts and sources
2. T02 — HTML integration: add the new sub-period div with S09's 4 opening cards

The new `#periodo-rosas` sub-period will eventually hold cards from all 16 slices (S09–S24). S09 just creates the sub-period container and its first 4 cards. Later slices will append inside it.

The sub-nav (`<nav class="sub-nav">`) will need a new link added for `#periodo-rosas`. This is a small one-line edit.

## Implementation Landscape

### Key Files

- `index.html` (line 1438–1451) — insertion point: the new `#periodo-rosas` sub-period div should be inserted **between** `</div><!-- /#rev-1820-1835 -->` (line 1438) and the existing `<!-- CONECTOR ALBERDI — SP2 → SP3 -->` alberdi-quote (line 1440). The Alberdi quote connector then continues to `#rev-1835-1852`.
- `index.html` (lines 326–332) — sub-nav: add one `<a href="#periodo-rosas">` entry between the `1820–1835` and `1835–1852` links.
- `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` — content draft to be created (does not exist yet).

### Card Templates to Reuse

All templates are stable and already in the codebase. The pattern is at lines 1344–1437 of `index.html`:
```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image">
    <img src="..." alt="..." loading="lazy">
  </div>
  <span class="event-card__year">FECHA</span>
  <h3 class="event-card__title">TÍTULO</h3>
  <p class="event-card__excerpt">TEXTO</p>
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">📄</span>
    <cite>FUENTES</cite>
  </footer>
</article>
```
For `card-opinion`, the pattern is at lines 1408–1436: blockquote with `card-opinion__quote`, `card-opinion__author`, `card-opinion__context`, and `card-source` footer.

### New Sub-Period Structure (what T02 creates)

```html
<!-- ══════════════════════════════════════════════════
     SUB-PERÍODO ROSAS: Unitarios, Federales y la Era de Rosas (1820–1852)
     Inserción: M008/S09–S24
     ══════════════════════════════════════════════════ -->
<div id="periodo-rosas" class="sub-period reveal reveal-fade">
  <h3 class="sub-period__title">Unitarios, Federales y la Era de Rosas (1820–1852)</h3>
  <div class="events-grid events-grid--certeza" aria-label="Origen de unitarios y federales">
    <!-- S09 cards here — 4 cards -->
  </div>
</div>
```

### Sub-Nav Edit (what T02 also does)

Add one line at `index.html` line 331 (after the `1820–1835` link):
```html
<a href="#periodo-rosas" class="sub-nav__link">1820–1852<span class="sub-nav__link-label">Unitarios y Federales</span></a>
```

### Content for the 4 S09 Cards

Based on M008-CONTEXT S09 content map:

**Card S09-1** (`card-hecho`, delay 0ms): "La Revolución sin resolver: Buenos Aires y el control de la aduana (1810–1820)"
- Core fact: la aduana de Buenos Aires generaba ~80% de los ingresos del país. Quien la controlaba controlaba la política.  
- Tensión inmediata post-1810: las provincias enviaron representantes pero Buenos Aires retuvo la aduana.
- Sources: Halperin Donghi (1972); Goldman, *Nueva Historia Argentina* t. III (1998).

**Card S09-2** (`card-hecho`, delay 80ms): "La Batalla de Cepeda y el fin del primer centralismo (1820)"
- Core fact: 1 feb. 1820 — López y Ramírez derrotan a Rondeau en Cepeda. **(NOTE: SP2-1 already covers this.** S09's card should cover the pre-Cepeda context — the Directorio years 1816–1820 — as a distinct card that contextualizes why Cepeda happened, not just what happened. This avoids content duplication.)
- Revised framing: "El Directorio unitario (1816–1820): el primer intento centralista y su colapso"
- Sources: Levene (1940); Halperin Donghi (1972).

**Card S09-3** (`card-hecho`, delay 160ms): "El proyecto unitario de Rivadavia: la Constitución de 1826 y su rechazo"
- Core fact: constitución centralista de 1826, rechazo provincial, renuncia de Rivadavia 27 jun. 1827.
- **(NOTE: SP2-3 also covers this.** Again, S09's approach should go DEEPER: why the provinces rejected it — the ley de capitalización que convertía Buenos Aires en capital federal, eliminando la provincia de Buenos Aires, y quitando los ingresos aduaneros a los porteños. The provincial rejection was about economic power, not just constitutional theory.)
- Sources: Piccirilli (1960); Ravignani (1937); Botana, *La tradición republicana* (1984).

**Card S09-4** (`card-opinion`, delay 240ms): "¿Cuándo nacieron 'unitarios' y 'federales' como identidades? La cristalización ca. 1826–1829"
- Core argument: los términos se usaban antes, pero se consolidan como identidades políticas enfrentadas en el ciclo 1826–1829: la derrota de Rivadavia → el gobierno de Dorrego → su fusilamiento por Lavalle → la primera gobernación de Rosas. El proceso es gradual.
- Attribution: Botana, *La tradición republicana* (1984); Goldman, *Nueva Historia Argentina* t. III (1998).
- Certeza: `opinión` — el exacto momento de cristalización es interpretación historiográfica.

### On Content Overlap with Existing SP2 Cards

The existing SP2 cards (Cepeda, Unitarios vs. Federales, Rivadavia) cover the same period but from the **Alberdi-era "anarquía y guerras civiles"** narrative perspective. The S09 cards in `#periodo-rosas` cover the same events from the **"origen del conflicto"** perspective — deeper causality, economic roots, why identities crystallized. The framing difference is sufficient to justify both. The planner should ensure S09 cards don't literally duplicate the same excerpts from SP2.

### Build Order

1. **T01 (Content Draft)**: Write `S09-CONTENT-DRAFT.md` with 4 card entries, each with: title, date, certeza, excerpt, 2+ sources, cite references, image notes. Verify all dates and facts.
2. **T02 (HTML Integration)**: 
   - Insert the new `#periodo-rosas` sub-period div with S09's 4 cards at line 1438 (after `</div><!-- /#rev-1820-1835 -->`).
   - Add sub-nav link at line 331.
   - Verify with `grep -c 'data-certeza' index.html` (should increase by 4).

### Verification Approach

```bash
# Count new cards added
grep -c 'data-certeza' index.html
# Should be 58 + 4 = 62 (currently 58 per grep above)

# Confirm new sub-period exists
grep -c 'id="periodo-rosas"' index.html
# Expected: 1

# Confirm sub-nav updated
grep -c 'href="#periodo-rosas"' index.html
# Expected: 1

# No new CSS or JS
git diff --stat HEAD -- styles.css app.js
# Expected: no changes to these files
```

### Wikimedia Images for S09 Cards

Based on the cards planned, appropriate images:
- **S09-1 (aduana)**: `Aduana_de_Buenos_Aires.jpg` or a map of the Río de la Plata region showing Buenos Aires's position. Fallback: portrait of Bernardino Rivadavia (already used in SP2-3 — avoid duplication; use a different image).
- **S09-2 (Directorio 1816–1820)**: Portrait of José Rondeau, last Supreme Director, or period illustration of the Congress of Tucumán (1816). File: `Jose_Rondeau.jpg` on Wikimedia.
- **S09-3 (Constitución 1826)**: The Bernardino Rivadavia portrait is already used in SP2-3 (`Bernardino_Rivadavia.jpg`). Use an alternative — portrait of Manuel Dorrego (governor who replaced Rivadavia's system) or a period document image. Candidate: `Manuel_Dorrego.jpg`.
- **S09-4 (cristalización de identidades)**: Could use a period map of Argentina showing provincial divisions, or a composite. Candidate: `Argentina_1821.svg` or similar.

The image lookup (Wikimedia API verification) should happen during T01 content draft, not assumed.

## Constraints

- **Zero CSS/JS new** (D001, constraint confirmed): all card patterns, sub-period CSS, reveal system, and sub-nav behavior already exist and apply to new elements automatically.
- **data-certeza both `"opinion"` and `"opinión"` exist** in the codebase (D-KNOWLEDGE). Use `"opinion"` (no accent) for consistency with the most recent additions in M007.
- **Existing SP2 cards must not be modified** — S09 only adds new content; it does not edit or remove existing cards.
- **The new `#periodo-rosas` sub-period is the container for all 16 M008 slices** (S09–S24). S09 creates the container and its first 4 cards. The `events-grid` div will have cards appended by subsequent slices. The planner should document this so S10–S24 executors know to append inside `#periodo-rosas`.
- **Sub-nav can receive more links** from subsequent slices (e.g., `#periodo-rosas-referentes` for S11, etc.) — but that's a later decision. S09 adds only one link for the top-level container.
