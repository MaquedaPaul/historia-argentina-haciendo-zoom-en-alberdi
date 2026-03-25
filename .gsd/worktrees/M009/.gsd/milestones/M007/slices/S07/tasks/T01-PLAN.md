---
estimated_steps: 5
estimated_files: 1
---

# T01: Write S07-CONTENT-DRAFT.md with verified content for BIOG-21 and BIOG-22

**Slice:** S07 — Por qué Alberdi rechazó el viaje a EE.UU. financiado por Quiroga
**Milestone:** M007

## Description

Draft the complete HTML content for two new cards before touching `index.html`. This is the high-risk intellectual task for S07: deciding exactly what BIOG-21 says (the documented episode of returning the libranza, expanded from BIOG-18's preview without verbatim repetition), and what BIOG-22 says (the historiographic reading of motivations, attributed to named historians). The draft establishes certeza classification, source attribution, and the exact prose — making T02's HTML integration mechanical.

**Context:** BIOG-18 (already in `index.html`) narrates the episode of the libranza and its return, ending with an explicit `card-nota-certeza` promising that "las razones del rechazo… se desarrollan en una sección posterior de este sitio." S07 must deliver on that promise. BIOG-21 expands the documented episode; BIOG-22 provides the historiographic analysis of the motivations.

**Critical constraint:** The two blockquotes already used in BIOG-18 must NOT be repeated verbatim in BIOG-21. BIOG-18 contains:
1. «Lo visité con repetición y muchas veces se entretuvo en largas conversaciones conmigo, ajenas del todo a la política. Yo no me cansaba en estudiar, de paso, a ese hombre extraordinario.»
2. «Al día siguiente le hice una visita respetuosa, en que tuve el gusto de restituirle su orden contra el Banco, renunciando al proyecto de viaje para los Estados Unidos.»

BIOG-21 must provide new context or narrative framing around the same episode — either from *Mi vida privada* (if a different passage exists), or by contextualizing within the political situation of late 1834 Buenos Aires, or by narrating what the devolution meant symbolically. If no new primary-source quote is available, BIOG-21 narrates with paraphrase and cites *Obras Completas* for the documented facts.

## Steps

1. **Verify the BIOG-18 content** already in `index.html` — re-read lines ~800–850 to confirm exactly which quotes and claims are already there, so BIOG-21 can extend, not repeat.

2. **Draft BIOG-21 as `card-hecho`**: The documented episode, expanded. Frame: the devolution the next morning is the documented fact; add narrative context (late 1834, Buenos Aires, the political meaning of the gesture — Alberdi returning money to the most powerful man in the interior). Certeza: `data-certeza="hecho"`, stagger `0ms`. No image. Year: `1834`. Title: "La devolución de la libranza: el gesto de independencia". Text: narrate the episode from the perspective of what the devolution *meant* — Alberdi chose autonomy over patronage. Cite *Obras Completas* (La Tribuna Nacional, 1886–1887) as primary source. If *Mi vida privada* contains a different passage about this episode, use it. Add `card-nota-certeza` if any specific claim needs qualification.

3. **Draft BIOG-22 as `card-opinion`**: The historiographic analysis of the inferred motivations. Frame: the reasons are NOT in *Obras Completas* (this is confirmed by BIOG-18's `card-nota-certeza`) — they are inferred by biographers. Attribution: Mayer, J. M., *Alberdi y su tiempo*, EUDEBA, 1963 (and/or 2nd ed. Academia Nacional de Derecho, 1973); Halperin Donghi, T., *Letrados & pensadores*, Emecé, 2013. Four inferred reasons:
   - Political independence: accepting Quiroga's money would have politically compromised Alberdi (unitario-aligned) as a client of a federal caudillo
   - Buenos Aires intellectual acceleration: Echeverría returned from Europe in 1830; the Asociación de Mayo / Salón Literario was forming; the intellectual environment Alberdi needed was right there
   - Europe, not the US, was Alberdi's real intellectual destination (his actual 1838 exile went to Montevideo, then Chile/Europe — never the US)
   - Practical timing: the *Fragmento preliminar* (1837) and Salón Literario participation required physical presence in Buenos Aires
   Use `card-opinion` structure: `card-certeza-indicator` + blockquote `card-opinion__quote` + attribution footer. Data-certeza: `opinion` (no accent). Stagger: `80ms`. Add `card-nota-certeza` if the Mayer attribution is from secondary sources only. Close with a brief forward reference to what Alberdi chose instead (Salón Literario 1837) without going into deep detail (that's S08's territory).

4. **Write the full draft** to `.gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` with: (a) prose justification of certeza classification for each card, (b) complete HTML excerpts for BIOG-21 and BIOG-22 ready for insertion, (c) insertion anchor confirmation (`grep -n 'rev-alberdi-quiroga' index.html` to confirm the closing div is still at the expected location ~line 967).

5. **Self-check the draft**: Confirm BIOG-21 doesn't use verbatim BIOG-18 quotes. Confirm BIOG-22 uses `data-certeza="opinion"` (no accent). Confirm at least one named historian is attributed in BIOG-22's blockquote footer. Confirm the `card-nota-certeza` in BIOG-22 (if needed) is honest about what Mayer actually says vs. what is paraphrased.

## Must-Haves

- [ ] BIOG-21 HTML uses `card-hecho`, `data-certeza="hecho"`, no verbatim BIOG-18 blockquotes
- [ ] BIOG-22 HTML uses `card-opinion`, `data-certeza="opinion"` (no accent)
- [ ] BIOG-22 attributes motivational analysis to at least one named historian (Mayer and/or Halperin Donghi) in the `card-opinion__attribution` footer
- [ ] Both card excerpts are complete HTML (article open+close, all divs, header, content, footer) ready for copy-paste insertion
- [ ] Insertion anchor confirmed (grep for closing div line)

## Verification

- `test -f .gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md`
- `grep -c 'BIOG-21\|BIOG-22' .gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` → ≥ 2
- `grep -c 'data-certeza="opinion"' .gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` → ≥ 1
- `grep -c 'Mayer\|Halperin' .gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` → ≥ 1

## Inputs

- `index.html` lines ~800–850 — BIOG-18's existing quotes (verbatim check before drafting BIOG-21)
- `index.html` lines ~697–715 — BIOG-16 card-opinion template (structure to follow for BIOG-22)
- `.gsd/milestones/M007/slices/S07/S07-RESEARCH.md` — pre-existing research with four inferred reasons and source recommendations
- S06 forward intelligence: perfil de Quiroga is established; S07 must not repeat it; the `card-nota-certeza` in BIOG-20 establishes the epistemic pattern to follow

## Expected Output

- `.gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` — complete draft with certeza justification and full HTML excerpts for BIOG-21 and BIOG-22, ready for T02 integration
