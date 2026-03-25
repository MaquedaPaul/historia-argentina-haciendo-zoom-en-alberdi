---
estimated_steps: 8
estimated_files: 1
---

# T04: Research and draft content for sub-period 4: Organización Nacional (1852-1860)

**Slice:** S01 — Content research, verification, and HTML integration
**Milestone:** M003

## Description

Research, verify, and draft content for 5 events covering the National Organization period (1852-1860). This is the climax of Alberdi's story — his *Bases* directly shaped the Constitution. 3 hecho and 2 opinión cards. The key opinión card for *Bases* must use a different Alberdi quote than "Gobernar es poblar" (already in the section intro).

Events:
1. "Bases y puntos de partida" — la obra cumbre de Alberdi — opinión, full card (Alberdi central)
2. Congreso Constituyente y Constitución 1853 — hecho, full detailed card (Alberdi influence)
3. Secesión de Buenos Aires — Confederación vs Estado — hecho, concise (Alberdi as diplomat)
4. Cepeda 1859 + Pacto de San José de Flores — hecho, concise
5. Reunificación 1860 — opinión (with Alberdi/others reflecting on achievement), concise

## Steps

1. Research *Bases y puntos de partida para la organización política de la República Argentina* (1852): publication in Valparaíso, Chile (May 1852). Key proposals: encouragement of European immigration, federal structure, free navigation of rivers, foreign trade liberalization, railroad development. Find a substantive Alberdi quote from *Bases* other than "Gobernar es poblar" — candidates include passages on immigration, constitutional guarantees, or the role of education. Verify the quote against the original text.
2. Research Congreso Constituyente (Santa Fe, Nov 1852 – May 1853): delegates, key debates, Alberdi's influence (he was not a delegate but his *Bases* was the intellectual framework). Constitution promulgated May 1, 1853. Note specific articles reflecting Alberdi's proposals (Art. 25 on immigration, Art. 14 on rights, commerce and navigation clauses). Buenos Aires's refusal to participate.
3. Research secession of Buenos Aires (1852-1859): reasons (Buenos Aires wanted control of customs revenue), Mitre's role, Estado de Buenos Aires vs. Confederación Argentina. Alberdi's diplomatic role in Europe representing the Confederación. Verify his appointment and missions.
4. Research Cepeda 1859: October 23, 1859, Urquiza vs. Mitre. Pacto de San José de Flores (November 11, 1859) — Buenos Aires agrees to join the Confederation subject to constitutional reforms. Verify dates.
5. Research Reunificación 1860: Constitutional reform convention, Buenos Aires's proposed amendments accepted, final incorporation. Reflect on what this meant — Alberdi's constitutional vision realized (partially) but without his direct participation in the reforms.
6. Write excerpts: full cards for *Bases* and Constitution (4-8 sentences each), concise for others (2-4 sentences). The *Bases* opinión card must include a substantive quote showing Alberdi's constitutional philosophy.
7. Document all sources and note image candidates.
8. Append all 5 entries to draft.

## Must-Haves

- [ ] 5 events with correct certeza classification (3 hecho, 2 opinión)
- [ ] *Bases* card has a verified Alberdi quote distinct from "Gobernar es poblar"
- [ ] Constitution card documents specific articles influenced by Alberdi
- [ ] Alberdi's diplomatic role documented with verifiable appointment
- [ ] Image candidates noted

## Verification

- S01-CONTENT-DRAFT.md now has 20 total entries (5+4+6+5)
- *Bases* card quote is different from "Gobernar es poblar" and traceable to original text
- Constitution card references specific article numbers

## Inputs

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — T01+T02+T03 output (15 entries)
- Existing Alberdi quote in `index.html` section intro ("Gobernar es poblar") — must not duplicate

## Expected Output

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — appended with 5 entries for sub-period 4 (1852-1860)

## Observability Impact

**Signals this task changes:**
- `grep -c "^## Evento SP" S01-CONTENT-DRAFT.md` → advances from 15 to 20; a value of 20 confirms T04 complete
- `grep -c "^## Evento SP4" S01-CONTENT-DRAFT.md` → advances from 0 to 5
- `grep -c "^## SUB-PERIOD 4" S01-CONTENT-DRAFT.md` → advances from 0 to 1

**Inspection surfaces:**
- `awk '/^## SUB-PERIOD 4/,/^## Resumen SP4/' S01-CONTENT-DRAFT.md` — full SP4 section for content review
- `grep "VERIFICACIÓN PENDIENTE" S01-CONTENT-DRAFT.md` — quotes flagged for primary-source cotejo before HTML render (expect: SP3-3 + SP4 closing connector)
- `grep "Dad al hombre del Norte" S01-CONTENT-DRAFT.md` — confirms SP4-1 *Bases* cap. XVI quote is present and distinct from «Gobernar es poblar»
- `grep "Art\. 25\|Art\. 14\|Art\. 12" S01-CONTENT-DRAFT.md` — confirms Constitution article references in SP4-2

**Failure visibility:**
- If SP4 not appended: `grep -c "^## Evento SP" S01-CONTENT-DRAFT.md` returns 15 instead of 20
- If SP4-1 duplicates «Gobernar es poblar»: `awk '/^## SUB-PERIOD 4/,/^## Resumen SP4/' S01-CONTENT-DRAFT.md | grep -i "gobernar es poblar"` returns lines other than the meta-note explaining the distinction
- If Constitution articles missing: `grep "Art\. 25\|Art\. 14\|Art\. 12" S01-CONTENT-DRAFT.md` returns 0

**No runtime signals for T04** (content-only task; runtime signals fire in T07 HTML integration: `[Reveal] Initialized with N elements`, `[Images] Fallback handlers set for N card images`).
