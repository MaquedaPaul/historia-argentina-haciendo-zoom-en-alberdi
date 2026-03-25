---
estimated_steps: 5
estimated_files: 1
---

# T01: Write S14-CONTENT-DRAFT.md with verified prose and T02 Recipe HTML block

**Slice:** S14 — El segundo gobierno de Rosas — el Restaurador
**Milestone:** M008

## Description

Write the content draft for S14's 3 cards covering the second Rosas mandate (1835–1852). This is the authorship and verification task — all historical research, source checking, image selection, and prose writing happens here. T02 will copy the HTML verbatim from this file without any authorship.

The draft must produce 3 cards:
- **S14-1 (card-hecho):** El retorno y la Suma del Poder Público (1835) — how Rosas returned, the plebiscite mechanics, the title "Restaurador de las Leyes", the Suma as legal instrument. Explicitly links to the S13-2 narrative thread: "denied in 1832, demanded as condition in 1835."
- **S14-2 (card-hecho):** Diecisiete años de Confederación — French blockade, Vuelta de Obligado, Caseros (1835–1852). Covers events NOT already in SP3 cards (which cover the Mazorca and Caseros detail from Alberdi's perspective).
- **S14-3 (card-opinion, data-certeza="debatido"):** Brief historiographic note with `card-nota-historiografica` paragraph seeding the S15–S19 debate. No image.

## Steps

1. **Read existing SP3 cards in index.html** (lines ~1736–1889) to confirm exactly what the SP3 sub-period covers. Do NOT duplicate SP3-1 (Suma overview), SP3-2 (Mazorca), or SP3-6 (Caseros detail). S14-2 should cover the French blockade and Vuelta de Obligado — events absent from SP3.

2. **Write S14-CONTENT-DRAFT.md** at `.gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md`. Use Write tool. Structure each of the 3 card entries with: `## Card S14-X`, title, year display, certeza type, excerpt prose (3–5 sentences), sources, image URL and attribution.

   Key facts to include:
   - **S14-1:** Quiroga assassination (Feb 1835) → political crisis → Legislatura called Rosas back. This time he demanded Suma del Poder Público as condition. Plebiscite: **9,316 votes for, 4 against** (use this figure — matches SP3-1 already in index.html; do NOT use 9,320). Date: 13 April 1835 (Legislatura grant); plebiscite held March 1835. Title "Restaurador de las Leyes": self-designated to contrast with unitarios who had "violated the federal constitution." The Suma concentrated executive, legislative, and judicial power in the governor of Buenos Aires. Image: `Divisas_de_la_%C3%A9poca_de_Rosas.jpg` — CC BY 2.5 ar, attribution required.
   - **S14-2:** French blockade (1838–1840): French ships blockaded Buenos Aires over treatment of French citizens; Rosas refused humiliating terms; ended with Convention Mackau (Oct 1840). Anglo-French blockade and Vuelta de Obligado (20 Nov 1845): British and French forced passage up the Paraná; Argentine batteries at Vuelta de Obligado fought back and were defeated militarily, but the action became a symbol of sovereign resistance; blockade lifted by 1850. Fall at Caseros (3 Feb 1852): Urquiza's Ejército Grande defeated Rosas; Rosas fled to England, died in exile in Southampton, 1877. Image: `Batalla_de_la_Vuelta_de_Obligado.jpg` (Public domain).
   - **S14-3:** Brief card-opinion with data-certeza="debatido". Include `<p class="card-nota-historiografica">` noting the nature of the regime is historiographically contested — the debate will be developed in S15–S19. No image needed.

3. **Write the T02 Recipe HTML block** at the end of S14-CONTENT-DRAFT.md. This is the verbatim HTML for all 3 articles, ready for copy-paste into C:/tmp/s14-cards.html. Use:
   - `data-id="S14-1"`, `data-id="S14-2"`, `data-id="S14-3"` on each article
   - HTML comments `<!-- S14-1: ... -->`, `<!-- S14-2: ... -->`, `<!-- S14-3: ... -->`
   - Stagger delays: `--reveal-delay: 0ms`, `--reveal-delay: 80ms`, `--reveal-delay: 160ms`
   - CC BY 2.5 ar attribution for S14-1 image: `<p class="img-attribution">` inside `.card-image` immediately after `<img>` (per KNOWLEDGE.md pattern)
   - card-hecho pattern: `<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S14-X" style="--reveal-delay: Xms">`
   - card-opinion/debatido pattern: `<article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" data-id="S14-3" style="--reveal-delay: 160ms">`

4. **Verify** the draft is non-empty and contains all 3 card data-id references.

## Must-Haves

- [ ] Draft file written at `.gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` (non-empty)
- [ ] Plebiscite figure is **9,316** (not 9,320) to match SP3-1 already in index.html
- [ ] S14-1 includes CC BY 2.5 ar attribution for `Divisas_de_la_%C3%A9poca_de_Rosas.jpg`
- [ ] S14-2 covers French blockade and Vuelta de Obligado — NOT repeating Caseros detail from SP3-6
- [ ] S14-3 has `data-certeza="debatido"` and a `card-nota-historiografica` paragraph
- [ ] T02 Recipe HTML block at end of draft contains verbatim HTML for all 3 articles with correct data-id attributes and stagger delays (0ms/80ms/160ms)
- [ ] No `data-certeza="hecho debatido"` or any invalid certeza value — each card has exactly one certeza value

## Verification

- `test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK`
- `grep -c 'data-id="S14-' .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` returns 3

## Inputs

- `index.html` (lines ~1736–1889) — Read the SP3 cards to know what NOT to duplicate. Read S13 cards (lines ~1682–1717) to pick up the S13-2 thread about the Suma being denied in 1832.
- `.gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` — Reference for content draft format (card structure, T02 Recipe HTML block format).
- S14-RESEARCH.md — Inlined above; provides image URLs, source list, and content coverage for all 3 cards.
- KNOWLEDGE.md — CC BY-SA Attribution Block Placement pattern (img-attribution inside .card-image), en-dash ASCII-only Node.js rule.

## Expected Output

- `.gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` — Full content draft with 3 card entries (prose, sources, image notes) and a complete T02 Recipe HTML block ready for verbatim splice.
