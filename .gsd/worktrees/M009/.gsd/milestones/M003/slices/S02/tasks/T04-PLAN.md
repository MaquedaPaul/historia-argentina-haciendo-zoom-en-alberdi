---
estimated_steps: 5
estimated_files: 1
---

# T04: Final verification of all M003 acceptance criteria

**Slice:** S02 — Sub-navigation, animated timeline, expand/collapse interactivity, and responsive verification
**Milestone:** M003

## Description

Systematic walkthrough of all M003 acceptance criteria from M003-CONTEXT.md, verified in browser at both desktop (1200px) and mobile (375px). Any failures are fixed before marking done. This task produces the slice summary documenting results.

## Steps

1. Open `index.html` in browser at 1200px desktop viewport. Navigate to `#periodo-revolucion`.
2. Walk through each of the 10 acceptance criteria from M003-CONTEXT.md:
   - (1) "Mínimo 12 eventos con contenido detallado" → count cards with `querySelectorAll`
   - (2) "Cada evento tiene texto extenso + multimedia" → spot-check 3+ cards for text length and image presence
   - (3) "Alberdi presente como hilo conductor sin eclipsar a otros próceres" → count Alberdi-connected cards vs total, verify other próceres have dedicated cards
   - (4) "Narrativa fluida que conecta los eventos" → read through connecting passages between sub-periods
   - (5) "Sub-navegación funcional dentro del período" → click all 4 sub-nav links, verify scroll and active tracking
   - (6) "Al menos 2 mapas/animaciones interactivas" → verify animated timeline + expand/collapse count as 2 interactive elements
   - (7) "TODOS los hechos verificados contra fuentes históricas" → verify `<cite>` elements on hecho cards (content verification was done in S01)
   - (8) "Cada contenido clasificado: hecho / opinión / rumor con tratamiento visual" → verify all cards have `data-certeza` and correct visual styling
   - (9) "Opiniones atribuidas con cita exacta, autor, fecha, contexto" → check opinión cards have full attribution
   - (10) "Fuentes documentadas" → verify cite/source elements present
3. Switch to 375px mobile viewport. Re-check: cards stack correctly, sub-nav is usable, timeline is readable, images scale, text is legible.
4. If any criterion fails: fix the issue (likely minor CSS/HTML adjustments), then re-verify.
5. Document results in S02-SUMMARY.md with PASS/FAIL per criterion and evidence.

## Must-Haves

- [ ] All 10 acceptance criteria verified at desktop (1200px)
- [ ] All 10 acceptance criteria verified at mobile (375px)
- [ ] Any failures fixed and re-verified
- [ ] Results documented

## Verification

- All 10 acceptance criteria show PASS with evidence
- Browser screenshots at desktop and mobile confirm visual correctness
- No broken images, no layout issues, no JS errors in console

## Inputs

- `index.html`, `styles.css`, `app.js` — complete after S02 T01-T03
- M003-CONTEXT.md acceptance criteria list

## Expected Output

- `.gsd/milestones/M003/slices/S02/S02-SUMMARY.md` — verification results with PASS/FAIL per criterion
