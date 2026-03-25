---
estimated_steps: 9
estimated_files: 1
---

# T03: Research and draft content for sub-period 3: Época de Rosas (1835-1852)

**Slice:** S01 — Content research, verification, and HTML integration
**Milestone:** M003

## Description

Research, verify, and draft content for 6 events covering the Rosas era (1835-1852). This is the densest sub-period with the most certeza diversity: 3 hecho, 2 opinión, 1 rumor. Alberdi is central to 3 events (Gen. del 37 exile, debate with Sarmiento, Caseros context). The existing Moreno death rumor placeholder must be expanded with more origin detail.

Events:
1. Segundo gobierno de Rosas — Suma del poder público — hecho, full card
2. La Mazorca — terror y control — hecho (with rumor elements noted in text)
3. Generación del 37: exilio e ideas — opinión, full card (Alberdi central)
4. Debate Alberdi-Sarmiento: Civilización y Barbarie — opinión, full card (Alberdi central)
5. El supuesto envenenamiento de Moreno — rumor (expanding existing placeholder)
6. Batalla de Caseros (1852) — hecho, full card (Alberdi context)

## Steps

1. Research Rosas's second government (1835-1852): plebiscite granting Suma del poder público, economic policies, foreign relations, ideological control. Verify date of investiture (April 13, 1835) and scope of powers.
2. Research La Mazorca: Sociedad Popular Restauradora, documented acts of political terror, documented victims, role in enforcing Rosas's regime. Distinguish verified facts from exaggerated accounts. Note which specific claims are contested by historians.
3. Research Generación del 37 exile: Echeverría (*Dogma Socialista*, 1838), Alberdi's exile to Montevideo (1838), then Chile and Europe. Find verified Alberdi quote from exile period — from *Acción de la Europa en América* (1842) or *Memoria sobre la conveniencia y objetos de un Congreso General Americano* (1844), or letters from the period. Verify Echeverría's *El Matadero* (written ~1840, published posthumously 1871).
4. Research the Alberdi-Sarmiento intellectual debate: Sarmiento's *Facundo: Civilización y Barbarie* (1845), Alberdi's responses. Find specific quotes from both authors that capture their opposing visions. Verify publication dates and contexts. Note: the debate intensified after Caseros, not during the Rosas period — place this card thoughtfully in the timeline.
5. Research Moreno death: expand beyond existing placeholder. Document the specific sources (Manuel Moreno's biography 1812, Tomás Guido's account), the emetic story, historiographic debate (Norberto Galasso, Boleslao Lewin, other historians who've weighed in). Keep classified as rumor.
6. Research Caseros: February 3, 1852, Urquiza's Ejército Grande vs. Rosas, Brazilian and Uruguayan participation, Rosas's exile to England. Alberdi's position: supporter of Urquiza's campaign from Chile, saw it as opportunity for constitutional organization.
7. Write detailed excerpts for all 6 events. Opinion cards need verified quotes with work/letter/speech citation. Rumor card needs expanded origin documentation.
8. Document all sources (≥2 per hecho).
9. Note Wikimedia Commons image candidates and append all entries to draft.

## Must-Haves

- [ ] 6 events with correct certeza classification (3 hecho, 2 opinión, 1 rumor)
- [ ] Alberdi quotes for Gen37 exile and debate cards traced to original works
- [ ] Sarmiento counter-quote for debate card with *Facundo* citation
- [ ] Moreno rumor expanded with multiple historiographic sources
- [ ] Image candidates noted

## Verification

- S01-CONTENT-DRAFT.md now has 15 total entries (5+4+6)
- Opinion cards have verified quotes with original work citations
- Rumor card has expanded origin documentation citing specific historians

## Inputs

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — T01+T02 output (9 entries)
- Existing Moreno placeholder in `index.html` (lines ~370-393) — content to expand upon

## Expected Output

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — appended with 6 entries for sub-period 3 (1835-1852)

## Observability Impact

**Signals after T03 runs:**
- `grep -c "^## Evento SP3" S01-CONTENT-DRAFT.md` → 6 (diagnostic for SP3 event count)
- `grep -c "^## Evento SP" S01-CONTENT-DRAFT.md` → 15 (running total across T01+T02+T03)
- `grep "^\- \*\*Certeza:\*\* \`opinion\`" S01-CONTENT-DRAFT.md | wc -l` → 3 (2 SP2 + 2 SP3, but SP2 has 1 and SP3 has 2 = 3 total)
- `grep "^\- \*\*Certeza:\*\* \`rumor\`" S01-CONTENT-DRAFT.md | wc -l` → 1 (the Moreno card)

**Inspection surfaces:**
- `awk '/^## SUB-PERIOD 3/,/^## Resumen SP3/' S01-CONTENT-DRAFT.md` — full SP3 section
- `grep "Cita verificada" S01-CONTENT-DRAFT.md` — all verified quotes (must appear in SP3-3, SP3-4)
- `grep "Origen del rumor" S01-CONTENT-DRAFT.md` — expanded Moreno rumor documentation

**Failure visibility:**
- If event count ≠ 15, T03 content was not appended or was appended twice (deduplication needed)
- If certeza rumor count > 1, a non-rumor card was mis-classified
- The `[VERIFICACIÓN PENDIENTE]` flag in SP3-3 marks a quote that needs primary-source cotejo before HTML render
