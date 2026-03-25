# S07: Por qué Alberdi rechazó el viaje a EE.UU. financiado por Quiroga — Research

**Date:** 2026-03-22

## Summary

This is **light research** — the primary source material already exists in the codebase and the historical pattern is well-established. BIOG-18 (already integrated in `index.html`) contains the full narrative of the US trip offer and Alberdi's rejection, complete with two verified primary-source quotes from *Obras Completas*. Crucially, BIOG-18 ends with an explicit `card-nota-certeza` promising that "las razones del rechazo… se desarrollan en una sección posterior de este sitio." S07 must deliver on that promise.

The core historical fact is documented: Quiroga offered a *libranza bancaria* (bank draft) to fund a US study trip; Alberdi returned it the next day. The *reasons* for the rejection are **not stated in *Obras Completas*** — that passage narrates the gesture (returning the money) without explaining the motivation. S07 must clearly distinguish what is documented (the rejection happened) from what is historiographically inferred (why it happened), using `card-opinion` for the motivational analysis with proper attribution to Mayer, Halperin Donghi, or Alberdi's own later writings.

The slice needs **2 new cards**: one `card-hecho` narrating the documented episode of the rejection (the libranza, the return visit, the devolution), and one `card-opinion` analyzing the inferred reasons — which biographers attribute to a mix of political distrust of Quiroga's patronage, commitment to the Buenos Aires intellectual environment (Salón Literario forming), and his conviction that Europe rather than the US was the right intellectual destination. A third card for "what Alberdi chose instead" (Salón Literario 1837, Fragmento preliminar) may be warranted but could overlap with already-existing cards — check before creating.

## Recommendation

**Create 2 new cards (BIOG-21, BIOG-22) inside the existing `#rev-alberdi-quiroga` sub-period, continuing after BIOG-20.** Do not create a new sub-period — the `#rev-alberdi-quiroga` sub-period already covers 1834–1835 and both new cards fit within it. This avoids adding a new sub-nav link and preserves the SubNav invariant (`sub-nav__link count = 6`).

- **BIOG-21** (`card-hecho`): "La devolución de la libranza" — the documented facts of Alberdi returning the bank draft. The text from BIOG-18 already introduces this; BIOG-21 expands it with the context of the decision. Both primary-source quotes used in BIOG-18 about this episode can be re-used in extended form here. Add any additional quotes from *Obras Completas* if available.
- **BIOG-22** (`card-opinion`): "Por qué rechazó: el análisis historiográfico" — the inferred reasons, attributed explicitly to Mayer (*Alberdi y su tiempo*, 1963) and/or Halperin Donghi. Possible reasons documented in biographies: (1) independence from federal patronage — Alberdi was unitario-aligned and accepting Quiroga's money would have compromised him politically; (2) the Buenos Aires intellectual scene was accelerating (Esteban Echeverría had arrived from Europe in 1830 and the Asociación de Mayo was forming); (3) Alberdi may have preferred Europe over the US as a study destination — his actual exile (1838) went to Montevideo then Chile, not the US; (4) practical timing — his *Fragmento preliminar* (1837) and Salón Literario were imminent and required Buenos Aires presence.

No image is needed for either card (follows the image-free pattern of BIOG-18 and BIOG-20).

## Implementation Landscape

### Key Files

- `index.html` — the only file to modify. BIOG-21 and BIOG-22 insert after BIOG-20 (currently ending at ~line 965) and before `</div><!-- /#rev-alberdi-quiroga -->` (currently line 967).
- `.gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` — create this first (T01); HTML integration is T02.

### State of `#rev-alberdi-quiroga` before S07

Current contents of `#rev-alberdi-quiroga` (2 primary cards + 1 thematic block):
- `BIOG-17` — La carta de Heredia y el encuentro (card-hecho, stagger 0ms)
- `BIOG-18` — Las conversaciones + propuesta del viaje + devolución preview (card-hecho, stagger 80ms)
- `<h4>Facundo Quiroga: el hombre que conoció Alberdi</h4>` (thematic block header)
- `BIOG-19` — Perfil biográfico de Quiroga (card-hecho, stagger 0ms)
- `BIOG-20` — El círculo de Quiroga en Buenos Aires (card-hecho, stagger 80ms)
- `</div><!-- /#rev-alberdi-quiroga -->`

The two new S07 cards should insert between BIOG-20 and `</div><!-- /#rev-alberdi-quiroga -->`. They belong to the narrative arc of the sub-period, not to the Quiroga thematic block — so they go directly after BIOG-20, NOT inside the `<div class="events-grid">` of the Quiroga thematic block.

**Pattern decision:** S07 needs a new thematic block header (like S04's "Las múltiples dimensiones de Alberdi" pattern) titled something like "El rechazo del viaje: análisis" with a fresh `<h4 class="sub-period__subtitle reveal reveal-fade">` + new `<div class="events-grid events-grid--certeza">` containing BIOG-21 and BIOG-22. This mirrors the S04/S06 pattern exactly.

### Insertion anchor

```
grep -n '</div><!-- /#rev-alberdi-quiroga -->' index.html
```
Currently line 967 (0-indexed: 966). Insert the new block at line 966 (before that closing div comment).

### Baseline metrics before S07

- `data-certeza` count: **54**
- `.reveal` elements: **76**
- `sub-nav__link` count: **6** (must remain 6 — no new sub-nav link)
- `rev-alberdi-quiroga` mentions: **3** (must remain 3 — no new sub-period)
- BIOG-20 is the last card in `#rev-alberdi-quiroga` before the closing comment.

### Expected metrics after S07

- `data-certeza`: **56** (+2: BIOG-21 hecho, BIOG-22 opinion)
- `.reveal` elements: **79** (+3: h4.reveal-fade + BIOG-21.reveal-slide + BIOG-22.reveal-slide)
- `sub-nav__link` count: **6** (unchanged)
- `rev-alberdi-quiroga` mentions: **3** (unchanged)

### Build Order

1. **T01: Content Draft** — Write `S07-CONTENT-DRAFT.md` with verified text for BIOG-21 and BIOG-22. This is the high-risk task: nailing the certeza classification and sourcing the historiographic reasons. Verify: does *Obras Completas* contain any more text about the rejection reasons beyond the "restituirle su orden contra el Banco" quote already in BIOG-18? The BIOG-18 `card-nota-certeza` says explicitly that reasons are NOT in that passage — trust this; no new Obras Completas quote will appear for the reasons. BIOG-22 must cite Mayer or another secondary historian.
2. **T02: HTML Integration** — CRLF-safe Node.js splice. Write temp file with the two-card block, read index.html with `split('\r\n')`, splice before closing div, rejoin with `\r\n`.
3. **T03: Triple Gate** — Shell checks + browser DOM queries + narrative coherence.

### Verification Approach

**Shell checks (Capa 1):**
```bash
grep -c 'data-certeza' index.html          # → 56
grep -c 'id="BIOG-21"' index.html          # → 1
grep -c 'id="BIOG-22"' index.html          # → 1
grep -c 'rev-alberdi-quiroga' index.html   # → 3 (no new sub-period)
grep -c 'sub-nav__link' index.html         # → 6 (no new sub-nav link)
```

**DOM queries (Capa 2):**
```js
document.querySelectorAll('.sub-nav .sub-nav__link').length  // → 6
document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length  // → 6 (was 4, +BIOG-21 +BIOG-22)
document.querySelectorAll('.reveal').length  // → 79
document.querySelector('#BIOG-22').dataset.certeza  // → "opinion" or "opinión"
```

**Narrative check (Capa 3):**
- BIOG-21 does not repeat the quotes already used in BIOG-18 verbatim (extend or complement them instead).
- BIOG-22 clearly attributes the motivational analysis to named historians — never presents inferences as facts.
- The two new cards follow coherently from BIOG-18's promise: "Las razones del rechazo… se desarrollan en una sección posterior de este sitio."
- The closure of the sub-period still feels narratively complete after the new cards.

## Constraints

- **Zero new CSS/JS** — reuse all existing classes. `card-hecho`, `card-opinion`, `events-grid`, `events-grid--certeza`, `sub-period__subtitle`, `card-nota-certeza` are all pre-existing.
- **CRLF-safe insertion** — use Node.js `split('\r\n')` / `splice` / `join('\r\n')` pattern (documented in KNOWLEDGE.md).
- **No new sub-period, no new sub-nav link** — insert within `#rev-alberdi-quiroga`, not as a new `<div id="...">` sub-period.
- **Pre-flight check** before insertion: `grep -c 'id="BIOG-21"' index.html` must return 0; if it already returns 1, skip insertion.
- The `card-opinion` for BIOG-22 must use `data-certeza="opinion"` (no accent) to match the normalized form used since M004 (see KNOWLEDGE: "Certeza Attribute Accent Normalization").

## Common Pitfalls

- **BIOG-18 already contains content about the rejection** — BIOG-21 must not duplicate the same quotes or the same narrative beat. BIOG-21 expands and completes the episode; BIOG-18 introduces it as a preview.
- **The reasons are NOT in *Obras Completas*** — this is explicitly flagged in BIOG-18's `card-nota-certeza`. BIOG-22 must cite secondary historians (Mayer, Halperin Donghi) for the motivational analysis, never claim the reasons come from Alberdi's own text.
- **`card-opinion` stagger pattern** — BIOG-22 as a `card-opinion` uses `blockquote` + `card-opinion__author` + `card-opinion__context`. Use the established pattern from existing opinión cards in the site (e.g., search for `card-opinion__author` in index.html for the template).
- **Inserting inside the thematic block vs. after it** — BIOG-21 and BIOG-22 must go in their OWN thematic block (`<h4>` + new `events-grid`), NOT appended to the Quiroga thematic block's grid (which contains BIOG-19 and BIOG-20). The Quiroga block is visually complete; adding the rejection cards there would break its thematic coherence.

## Open Risks

- **BIOG-22 historiographic sourcing** — Mayer *Alberdi y su tiempo* (1963) is the canonical source for this kind of motivational analysis, but it was not directly consulted. The content draft must rely on secondary sources that cite or paraphrase Mayer, and must flag this with `card-nota-certeza` if the Mayer attribution cannot be verified directly. Alternative: attribute the analysis to Alberdi's own subsequent behavior (choosing Europe, specifically Montevideo/Chile, over the US) as circumstantial evidence. This is weaker but avoids false attribution.
- **Overlap with S08** — S07 should NOT address "what Alberdi chose instead" in deep detail if S08 is about the writings that connected him to Quiroga intellectually. Closing S07 with a brief forward pointer is sufficient.

## Sources

- BIOG-18 `card-nota-certeza` (already in `index.html`): explicitly confirms reasons are not in the *Obras Completas* passage that narrates the rejection.
- Alberdi, J. B., *Obras Completas*, La Tribuna Nacional, Buenos Aires, 1886–1887: primary source for the documented facts (the libranza, the return visit, the devolution quote).
- Mayer, Jorge M., *Alberdi y su tiempo*, EUDEBA/Academia Nacional de Derecho, Buenos Aires, 1963/1973: canonical secondary source for motivational analysis of Alberdi's early decisions.
- Halperin Donghi, Tulio, *Letrados & pensadores* (Emecé, 2013): cited in S06 and S04 for Alberdi's intellectual trajectory readings.
