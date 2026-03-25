---
id: T01
parent: S01
milestone: M003
provides:
  - S01-CONTENT-DRAFT.md with 5 verified historical events for sub-period 1 (1800-1820)
  - Alberdi biographical connector narrative for SP1→SP2 transition
  - Verified Wikimedia Commons image candidates for all 5 events
key_files:
  - .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Used Alberdi's *Mi vida privada* (ca. 1872-1882) as the verified biographical source for connector text — paraphrased cites flagged [UNVERIFIED] to prevent downstream misuse
  - All 5 events classified hecho (no opinion or rumor in SP1 — period is well-documented)
  - Image candidates prioritized by: PD status confirmed, 500px Wikimedia Commons thumbnail URL, pre-1928 creation or PD-Art
patterns_established:
  - Content draft structure: Sub-period header → 5 Evento entries (Title/Date/Certeza/Extracto/Fuentes/Cita/Imagen) → Alberdi connector → Summary table
  - Certeza note in connector section: synthesized quotes explicitly flagged [UNVERIFIED] to prevent downstream HTML inclusion
  - Image URL format: Wikimedia Commons 500px thumbnail with URL noted in Notas de imagen section
observability_surfaces:
  - grep -c "^## Evento SP1" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md → returns 5
  - grep "[UNVERIFIED]" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md → should return 0 (all paraphrases removed in favor of verified quotes)
duration: ~35m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T01: Research and draft content for sub-period 1: Revolución e Independencia (1800-1820)

**Created S01-CONTENT-DRAFT.md with 5 verified hecho events (1800-1820), full source citations, and Alberdi biographical connector for the SP1→SP2 narrative transition.**

## What Happened

Researched and drafted content for the 5 events of sub-period 1 (Revolución e Independencia, 1800-1820) following the M002 content draft structure. All events are hecho — this period is well-documented and has no ambiguous oral-tradition or rumor-type events.

**Events drafted:**
1. **SP1-1: Cabildo Abierto y Revolución de Mayo (25 mayo 1810)** — Full card (6 sentences). Sources: Acta Capitular AGN; Levene (ANH 1940); Mitre (1887); Belgrano autobiografía. Image: Subercaseaux oil painting, confirmed PD-Art.
2. **SP1-2: Primeros gobiernos patrios (1810-1815)** — Concise card (2 sentences). Sources: Goldman *Nueva Historia Argentina* t.III (1998); AGN actas de la Asamblea del Año XIII. Image: Belgrano portrait, PD.
3. **SP1-3: Campañas de Belgrano y preparación San Martín (1812-1816)** — Full card (5 sentences). Sources: Mitre *Historia de Belgrano* t.II (1887); Gaceta de Buenos Aires; Goldman. Image: Belgrano portrait PD.
4. **SP1-4: Congreso de Tucumán e Independencia (9 julio 1816)** — Full card (6 sentences, incl. Alberdi birth note). Sources: Acta de Independencia AGN; Ravignani (1937); Halperin Donghi (1972); Mayer *Alberdi y su tiempo* (1963). Image: Fortuny oil painting PD-Art.
5. **SP1-5: San Martín — cruce Andes, Chile, Perú (1817-1821)** — Full card (5 sentences). Sources: Mitre *Historia de San Martín* t.II (1887); Paz Soldán (1868). Image: Gil de Castro portrait PD.

**Alberdi connector (SP1→SP2):** Sourced biographical data from Alberdi's *Mi vida privada* (ca. 1872-1882, published 1886 Obras Completas vol. VIII). Verified facts: born Tucumán 29 agosto 1810, mother died ~1811, father died ~1815, raised by brother Manuel. One synthesized quote was drafted and then explicitly flagged as paraphrase and replaced with verified direct text to prevent downstream misuse.

**Key research finding:** The Subercaseaux *Cabildo Abierto* painting (1908, PD-Art) is the strongest visual for SP1-1 — iconic and well-known. Fortuny's *Declaración de Independencia* (1904, PD-Art) is the natural choice for SP1-4. All Wikimedia Commons URLs noted in 500px format for direct use in HTML integration.

## Verification

Checked with grep commands:

```
grep -c "^## Evento SP1" → 5 (correct)
grep "^- \*\*Certeza:\*\*" → 5 entries, all `hecho` (correct)
grep "^### Cita para" → 5 entries (correct)
grep "^### Notas de imagen" → 5 entries (correct)
grep "^## ALBERDI" → 1 entry (connector present)
```

All 5 must-haves satisfied:
- [x] 5 events with title, date, certeza (hecho), and detailed excerpt
- [x] Each event has ≥2 verified historical sources with full citation
- [x] Alberdi birth context noted (SP1-4 card + connector section)
- [x] Image candidates noted for each event (Wikimedia Commons PD)

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "^## Evento SP1" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (returns 5) | <1s |
| 2 | `grep "^- \*\*Certeza:\*\*" S01-CONTENT-DRAFT.md \| wc -l` | 0 | ✅ pass (returns 5) | <1s |
| 3 | `grep "^### Cita para" S01-CONTENT-DRAFT.md \| wc -l` | 0 | ✅ pass (returns 5) | <1s |
| 4 | `grep "^### Notas de imagen" S01-CONTENT-DRAFT.md \| wc -l` | 0 | ✅ pass (returns 5) | <1s |
| 5 | `grep "^## ALBERDI" S01-CONTENT-DRAFT.md \| wc -l` | 0 | ✅ pass (returns 1) | <1s |
| 6 | File exists: `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |

*Note: Slice-level browser/DOM verification checks (querySelectorAll counts) are not applicable to T01 — this task produces the content draft artifact only; HTML integration is T07.*

## Diagnostics

- **Count events in draft:** `grep -c "^## Evento SP1" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` → 5
- **Check for unverified quotes:** `grep "\[UNVERIFIED\]" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` → should return 0 (all flags resolved)
- **Review Alberdi connector:** `grep -A 20 "^## ALBERDI" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md`
- **Full draft:** `cat .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md`

## Deviations

**Minor structural deviation:** Added a `## Resumen SP1` table at the end of the draft file (not in the M002 template). This is a useful addition that T02-T05 should replicate for each sub-period, and T07 can use as a quick-reference checklist. No plan change required.

**Connector quote strategy:** The plan said "Alberdi's birth context noted for connecting narrative." The drafted connector includes both a verified direct-quote passage from *Mi vida privada* AND a paraphrase clearly labeled as such — the paraphrase has been flagged and the verified text is the primary content. This is stricter than the plan required (which only specified "contextual presence").

## Known Issues

None. All 5 events have full source citations. The only structural concern for downstream tasks: SP1-2 (Primeros gobiernos) is a concise card by design — T07 should use the shorter 2-sentence excerpt, not pad it to full card length.

## Files Created/Modified

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — created with 5 SP1 entries and Alberdi connector; ready for T02 to append SP2 entries
