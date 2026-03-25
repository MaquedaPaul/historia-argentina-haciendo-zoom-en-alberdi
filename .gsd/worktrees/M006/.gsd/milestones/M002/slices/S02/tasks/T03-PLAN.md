---
estimated_steps: 7
estimated_files: 1
---

# T03: Final verification against all M002 acceptance criteria

**Slice:** S02 — Multimedia, imágenes reales y pulido visual
**Milestone:** M002

## Description

Final integration verification pass: open the completed colonial section in a browser and systematically verify every M002 acceptance criterion. Document any issues and fix them. This is the milestone's closing gate.

## Steps

1. Open `index.html` in browser at desktop viewport (~1200px). Verify colonial section displays 6-7 event cards.
2. Check acceptance criterion: "5 eventos clave con texto + imagen mínimo" — count cards with both text and image.
3. Check acceptance criterion: "Flujo narrativo coherente de 300 años en formato resumido" — read through all cards in order, verify chronological flow and concise excerpts.
4. Check acceptance criterion: "Al menos 1 video o animación en la sección" — verify multimedia element is present and functional.
5. Check acceptance criterion: "TODOS los hechos verificados contra fuentes" — verify every hecho card has a `<cite>` source. Check acceptance criteria: "Cada contenido clasificado por nivel de certeza" — verify all cards have `data-certeza` attributes and correct visual styling.
6. Check acceptance criteria: "Opiniones con atribución completa (quién, cuándo, dónde)" — verify the opinión card(s) have author, date, and context. "Rumores marcados explícitamente" — verify rumor card(s) have origin footer.
7. Test at mobile viewport (~375px): verify cards stack properly, images scale, video adapts, all text is readable. Fix any issues found.

## Must-Haves

- [ ] All 7 acceptance criteria from M002-CONTEXT.md pass
- [ ] No visual bugs at desktop or mobile viewports
- [ ] No remaining placeholder cards from original 3
- [ ] All certeza types (hecho, opinión, rumor) present with correct visual treatment

## Verification

- All 7 acceptance criteria documented as passing
- Browser visual check at 1200px and 375px viewports — no layout issues
- DOM inspection confirms all `data-certeza` attributes present and correct

## Inputs

- `index.html` — Complete colonial section after T01 and T02
- `.gsd/milestones/M002/M002-CONTEXT.md` — Acceptance criteria checklist

## Expected Output

- `index.html` — Any final fixes applied (minor adjustments only; if major issues found, they indicate an upstream problem)
