---
estimated_steps: 6
estimated_files: 1
---

# T05: Write Alberdi connecting narrative between sub-periods

**Slice:** S01 — Content research, verification, and HTML integration
**Milestone:** M003

## Description

Write 3-4 connecting passages that use Alberdi as the narrative thread binding the 4 sub-periods together. Each passage is a standalone `.alberdi-quote` blockquote with a verified quote plus 2-3 sentences of biographical/intellectual context. These go between sub-period card groups in the final HTML.

The arc:
- After sub-period 1 (1800-1820): Alberdi born in Tucumán (1810), orphaned young, growing up in a newborn nation at war
- After sub-period 2 (1820-1835): Alberdi as intellectual — from Buenos Aires student to exile
- After sub-period 3 (1835-1852): Alberdi the constitutional thinker — from exile writings to the vision that would shape a nation

## Steps

1. Research Alberdi's biographical arc 1810-1860 for the three transition points. Key sources: *Mi vida privada* (autobiography), *Escritos póstumos*, secondary biographies by Mayer, Canal Feijóo.
2. For transition 1 (after 1820 sub-period): Find a quote or documented fact about Alberdi's childhood in Tucumán. He was born August 29, 1810, lost his mother shortly after birth and his father in 1822. Moved to Buenos Aires ~1824. Context: the child of revolution growing up during the wars.
3. For transition 2 (after 1835 sub-period): Find a quote from Alberdi about his intellectual formation or the state of the country during his student years. His *Fragmento preliminar al estudio del derecho* (1837) contains reflections on Argentine society. The forced exile (1838) marks the transition.
4. For transition 3 (after 1852 sub-period): Find a quote showing Alberdi's transition from critic in exile to constitutional architect. His letters from Chile or early passages of *Bases* (1852) leading to the constitutional moment.
5. Write each passage: verified quote in `<blockquote>` with `<cite>` attribution, plus 2-3 sentences of connecting narrative. Each must cite the original work/letter.
6. Append connecting narrative section to S01-CONTENT-DRAFT.md.

## Must-Haves

- [ ] 3 connecting passages, one for each sub-period transition
- [ ] Each passage has a verified Alberdi quote with original work citation
- [ ] No quote duplicates any quote already used in cards or section intro
- [ ] Passages trace a coherent biographical/intellectual arc

## Verification

- S01-CONTENT-DRAFT.md has a "Connecting Narrative" section with 3 passages
- Each passage has a distinct, verified Alberdi quote with work/letter/date attribution
- None of the quotes repeat "Gobernar es poblar" or other quotes used in cards

## Inputs

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — T01-T04 output (20 event entries to check for quote duplication)

## Expected Output

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — appended with connecting narrative section (3 passages)
