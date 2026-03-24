# S18: Los unitarios conspiraban — Research

**Date:** 2026-03-23

## Summary

S18 is straightforward content work using fully established patterns. The slice adds factual cards documenting the real unitario conspiracies (Asociación de Mayo, the bloqueo francés connection, the Coalición del Norte, and the Comisión Argentina) with a `card-nota-historiografica` distinguishing documented fact from Rosas's pretextual use of those facts to justify repression.

The conspiraciones unitarias are documented historical events, not interpretive claims — the correct certeza is `data-certeza="hecho"` for the primary card. A second card with `data-certeza="opini&#xF3;n"` (or a `card-nota-historiografica` appended to the hecho card) addresses the proportionality argument: that Rosas used real conspiracies as blanket cover for repressing peaceful opponents. This keeps S18 distinct from S17 (order-necessity counterfactual) and S19 (the general tiranía/caudillo debate).

The recommended structure is **2 cards**: (1) `S18-1` `card-hecho` covering the four documented conspiracies with an embedded `card-nota-historiografica` on the pretext argument; (2) `S18-2` `card-hecho` focused specifically on Lavalle's 1840 invasion (Coalición del Norte) — the most dramatic and best-documented conspiratorial act — with a map image from Wikimedia Commons. This is consistent with the S16 pattern (2 hecho + 1 debatido/opinion) and provides the `data-certeza` count increase of +2 that unblocks S19.

## Recommendation

**Two `card-hecho` cards with `reveal reveal-slide` animation**, stagger 0ms / 80ms, inserted before the append marker via the established Node.js splice pattern.

- **S18-1** (0ms): Comprehensive hecho card covering the Asociación de Mayo (1838), the bloqueo francés support, and the Comisión Argentina (1851) — with a `card-nota-historiografica` on the pretext argument (Rosas used real conspiracies to also target peaceful opponents). No image needed (consistent with S17-1 which also had no image; the prior S16-1 already used the Facundo cover image for the repression system).
- **S18-2** (80ms): Focused hecho card on the Coalición del Norte (1840) — Lavalle's invasion as the most dramatic conspiratorial act — with the Wikimedia Commons map `Mapa_ARGENTINA_1840_coalicion_del_norte.svg` (500px PNG thumb, confirmed available).

The `card-nota-historiografica` goes on S18-1 (the overview conspiracies card) because that's where the pretext claim sits. S18-2 is pure factual narrative of a documented military campaign — no nota needed.

**Total new `data-certeza` count: 80 → 82.**

## Implementation Landscape

### Key Files

- `index.html` — the only file modified. Cards splice before line containing `cards will be appended here by subsequent slices`. Current state: 80 data-certeza, marker at 1 occurrence, card-nota-historiografica at 6.
- `C:/tmp/s18-cards.html` — temp file for the splice snippet (Write tool, not heredoc).
- `C:/tmp/index.html.bak-s18` — pre-splice backup.

### Established Patterns to Follow Exactly

**Card structure** (card-hecho with image, from S16-1 as model):
```html
<!-- S18-N: [title] -->
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S18-N" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image">
    <img src="[URL]" alt="[alt]" loading="lazy">
  </div>
  <span class="event-card__year">[year range]</span>
  <h3 class="event-card__title">[title]</h3>
  <p class="event-card__excerpt">[prose]</p>
  [optional: <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> ...</p>]
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
    <cite>[sources]</cite>
  </footer>
</article>
```

**Card-hecho without image** (from S17-1 as model — no `<div class="card-image">`): S18-1 may omit the image block if no non-reused image is available. S18-2 uses the Coalición del Norte map.

**card-nota-historiografica** (inline `<p>` in body, NOT collapsible — per KNOWLEDGE.md): `<p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> ...</p>`. Place after the excerpt paragraph and before the footer.

### Image for S18-2

**Confirmed available:** `https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Mapa_ARGENTINA_1840_coalicion_del_norte.svg/500px-Mapa_ARGENTINA_1840_coalicion_del_norte.svg.png`

- SVG map of Argentina 1840 showing the Coalición del Norte military movements
- Available as 500px PNG thumbnail (confirmed via Commons API)
- PD (SVG map created from public domain historical data)
- Alt text: "Mapa de Argentina hacia 1840 que muestra los movimientos militares de la Coalición del Norte: la invasión de Lavalle desde el litoral, los levantamientos provinciales en Tucumán, Salta y Jujuy liderados por Marco Avellaneda, y el apoyo francés desde Montevideo."

**Do NOT reuse:**
- Echeverría portrait (line 1936, used in SP3-3 card)
- LaValle portrait (line 1593, used in S10-3)
- Facundo cover (line 1808, used in S16-1)
- Any Rosas portrait (multiple uses in S13-S14 and SP3)

### Build Order

1. **T01** — author `S18-CONTENT-DRAFT.md` with full prose, entity-encoded T02 Recipe HTML block. Verify all non-ASCII are entities. Write scope compliance checklist.
2. **T02** — mechanical splice: confirm preconditions (80 data-certeza, marker at 1), write backup, write snippet file, run Node.js one-liner with ASCII-only marker substring, run 8 verification checks.

### Verification Approach

Post-splice checks (same pattern as S17):

| # | Command | Expected |
|---|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 82 (+2 from S18-1 and S18-2) |
| 2 | `grep -c 'data-id="S18-' index.html` | 4 (2 data-id attributes × 2 cards — see KNOWLEDGE.md S13 entry on 2× multiplier when both comment AND data-id are present) |
| 3 | `grep -c 'data-id="S18-1"' index.html` | 1 |
| 4 | `grep -c 'data-id="S18-2"' index.html` | 1 |
| 5 | `grep -c 'cards will be appended here' index.html` | 1 (marker still intact) |
| 6 | `git diff --name-only HEAD -- styles.css app.js` | (empty — no CSS/JS changes) |
| 7 | `test -s C:/tmp/index.html.bak-s18 && echo BACKUP_OK` | BACKUP_OK |
| 8 | `grep -c 'card-nota-historiografica' index.html` | 7 (+1: S18-1's nota) |

Note on check #2: if T01 includes `<!-- S18-N: ... -->` HTML comment AND `data-id="S18-N"` attribute on each card, grep for `'S18-'` returns 4 (2 per card). Use `grep -c 'data-id="S18-'` for unambiguous 2-card confirmation per the KNOWLEDGE.md S13 multiplier rule.

## Constraints

- **Zero new CSS/JS** — hard constraint. card-hecho + card-nota-historiografica already exist. No new classes needed.
- **Entity-encoding for all non-ASCII in Recipe HTML block** — Windows shell/Node.js round-trip safety. All ñ, á, é, í, ó, ú, ¿, «, »  must be HTML entities in the T02 Recipe block.
- **ASCII-only Node.js marker search substring** — use `'cards will be appended here by subsequent slices'` (no en-dash). Per KNOWLEDGE.md S10 entry.
- **`/tmp/` vs `C:/tmp/`** — use `C:/tmp/` per KNOWLEDGE.md S12 entry. At execution, `/tmp/` may also work; `C:/tmp/` is safer.
- **Echeverría portrait already used** in SP3-3. S18-1 should not include an image (or use the Coalición del Norte map if one image is desired for S18-1 instead). Cleanest approach: S18-1 no image, S18-2 gets the map.

## Common Pitfalls

- **Scope bleed into S19**: S18 documents that conspiracies *existed* and that Rosas *used them as pretext*. It does NOT adjudicate whether Rosas was therefore a tyrant — that's S19. The `card-nota-historiografica` on S18-1 should be narrow: "las conspiraciones eran reales; el uso como pretexto para atacar opositores pacíficos es lo que debates S19." Do not let S18-1 become a general tiranía card.
- **Scope bleed into S22**: S18 covers the bloqueo francés *from the unitario side* (unitarios alentaron el bloqueo). S22 covers it from Rosas's resistance side. Be explicit: S18 says "los exiliados apoyaron el bloqueo" — not "el bloqueo fue una agresión imperialista" (that's S22's frame).
- **Alberdi in S18**: Alberdi is documented to have *questioned* the strategy of supporting foreign intervention (*La acción de la Europa en América*, 1842). Mentioning this adds nuance and avoids painting all exiliados as pro-bloqueo. It also keeps the Alberdi-as-hilo-conductor thread alive (R011).
- **Lavalle's death**: Lavalle died in Jujuy on 9 October 1841, not in battle — he was fleeing after the Coalición's defeat. This should be accurate in the prose.

## Content Notes for T01

### S18-1: Las conspiraciones unitarias — hecho documentado

**Year label:** `1838 &#x2013; 1851`
**Title:** `Los unitarios en el exilio conspiraban: la Asociaci&#xF3;n de Mayo, el bloqueo franc&#xE9;s y la Comisi&#xF3;n Argentina`
**certeza:** `data-certeza="hecho"` / `card-hecho`
**Sources:** Myers (1995), Lynch (1981 cap. 6), Echeverría *Dogma Socialista* (1838), Alberdi *La acción de la Europa en América* (1842)

**Key facts to include in prose:**
- Asociación de Mayo (1837–1838): Echeverría's *Dogma Socialista* was its manifesto; it was a Buenos Aires intellectual circle that became the exile network
- Apoyo al bloqueo francés (1838–1840): exiliados in Montevideo and Paris actively lobbied the French government — Juan Cruz Varela and others documented this
- Alberdi's dissent: in *La acción de la Europa en América* (Valparaíso, 1842) he argued that relying on European intervention was a strategic and ethical error — showing the exile was not monolithic
- Comisión Argentina (1851): organized in Montevideo with Urquiza's and Brazil's backing; directly prepared Caseros

**card-nota-historiografica content (narrow — only the pretext argument):**
- These conspiracies were real. The historiographic question is whether Rosas used *the existence of real conspiracies* as a blanket justification to also target *pacifist* opponents who were not conspiring. Myers (*Orden y virtud*, 1995) documents how the "conspirador unitario" label was applied beyond actual conspirators. Lynch (*Argentine Dictator*, 1981, cap. 6) distinguishes between documented plotters and those swept up in mass intimidation. This is the specific question S19 addresses as the broader tiranía debate.

### S18-2: La Coalición del Norte (1840) — hecho documentado

**Year label:** `1840 &#x2013; 1841`
**Title:** `La Coalici&#xF3;n del Norte: Lavalle invade, las provincias se levantan`
**certeza:** `data-certeza="hecho"` / `card-hecho`
**Image:** Coalición del Norte map (confirmed URL above)
**Sources:** Lynch (1981 cap. 6), Beverina *Las campañas de los ejércitos libertadores* (1838–1852), Zinny (1882)

**Key facts to include in prose:**
- Lavalle launched the invasion from the litoral in July 1840 with French naval support and Uruguayan government backing
- The Coalición del Norte comprised provincial uprisings coordinated with Lavalle: Marco Avellaneda (governor of Tucumán), plus Salta and Jujuy
- The coalition was defeated. Avellaneda was captured and executed by order of Oribe (Rosas ally) in Tucumán on 3 November 1841
- Lavalle retreated northward and died in Jujuy on 9 October 1841 (shot through the window of the house where he sheltered)
- The defeat of the Coalición confirmed Rosas's military dominance and was followed by the most intense period of Mazorca repression (1840–1842)

## Sources

- Myers, J., *Orden y virtud: el discurso republicano en el régimen rosista*, UNQ, 1995 — key source for how the "conspirador" label functioned politically
- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 6 — detailed account of bloqueo francés, unitario exile politics, and the Coalición
- Echeverría, E., *Dogma Socialista*, Montevideo, 1838 — primary source
- Alberdi, J. B., *La acción de la Europa en América*, Valparaíso, 1842 — primary source (Alberdi's dissent from pro-intervention strategy)
- Beverina, J., *Las campañas de los ejércitos libertadores 1838–1852*, Buenos Aires, 1923 — military history of the Coalición del Norte
- Zinny, A., *Historia de los gobernadores de las provincias argentinas*, t. IV, 1882 — for Avellaneda's execution date
