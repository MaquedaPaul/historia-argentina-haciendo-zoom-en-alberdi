---
estimated_steps: 8
estimated_files: 1
---

# T01: Research and draft content for sub-period 1: Revolución e Independencia (1800-1820)

**Slice:** S01 — Content research, verification, and HTML integration
**Milestone:** M003

## Description

Research, verify, and draft content for 5 events covering the revolutionary and independence period (1800-1820). All events are hecho (documented facts). This is the first batch of the content draft — the intermediate artifact that catches errors before HTML integration.

Events:
1. Revolución de Mayo 1810 (Cabildo Abierto, Primera Junta) — full detailed card
2. Primeros gobiernos patrios (Junta Grande, Triunviratos) — concise card
3. Campañas de Belgrano (Norte) y San Martín (Cuyo) — full detailed card
4. Congreso de Tucumán e Independencia 1816 — full detailed card
5. San Martín: cruce de los Andes, Chile, Perú — full detailed card

## Steps

1. Research Revolución de Mayo: Cabildo Abierto events of May 22-25, key protagonists (Saavedra, Moreno, Belgrano, Castelli, French, Beruti), role of Cisneros, the Acta Capitular. Verify against ≥2 sources.
2. Research Primeros gobiernos: Junta Grande (Dec 1810), First Triumvirate (1811), Second Triumvirate (1812), Assembly of Year XIII. Key figures and timeline.
3. Research Belgrano's northern campaigns (Tucumán 1812, Salta 1813, defeats at Vilcapugio and Ayohúma 1813) and San Martín's preparation in Cuyo (1814-1816).
4. Research Congreso de Tucumán: delegates, declaration of July 9, 1816, context of Spanish restoration in Europe. Note: Alberdi born in Tucumán on August 29, 1810 — same city, same year as revolution.
5. Research San Martín's continental campaign: crossing the Andes (Jan 1817), Chacabuco (Feb 1817), Maipú (Apr 1818), Lima campaign (1820-1821).
6. Write detailed excerpts for each event (4-8 sentences for full cards, 2-4 for concise). Include sources, cite references, and image candidate notes.
7. Note Alberdi connections: born in Tucumán 1810, lost parents young, grew up during the wars of independence — contextual presence only for this sub-period.
8. Format all entries in the content draft following M002's structure: Title → Date → Certeza → Excerpt → Sources → Cite → Image notes.

## Must-Haves

- [ ] 5 events with title, date, certeza type (all hecho), and detailed excerpt
- [ ] Each event has ≥2 verified historical sources with full citation
- [ ] Alberdi's birth context noted for connecting narrative
- [ ] Image candidates noted for each event (Wikimedia Commons)

## Verification

- Content draft file exists at `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md`
- File contains 5 entries for the 1800-1820 sub-period
- Each entry has title, date, certeza (hecho), excerpt, ≥2 sources, and image notes

## Observability Impact

- **Artifact created:** `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — the intermediate research artifact that downstream tasks (T02-T07) depend on. Its existence and structure are inspectable by checking the file's heading count and entry format.
- **Inspection:** `grep -c "^## Evento" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` returns the event count (should be 5 after T01).
- **Failure visibility:** If a source cannot be verified or an event has insufficient documentation, the entry's "Fuentes y verificación" section will contain explicit `[UNVERIFIED]` markers that downstream tasks can grep for.

## Inputs

- M002 content draft pattern: `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — structure template
- KNOWLEDGE.md entry on "Content Draft as Intermediate Artifact" — workflow guidance

## Expected Output

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — created with 5 entries for sub-period 1 (1800-1820)
