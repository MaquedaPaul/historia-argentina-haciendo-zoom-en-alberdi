---
verdict: pass
remediation_round: 0
---

# Milestone Validation: M017

## Success Criteria Checklist

- [x] **Cards documentadas sobre el perfil y trayectoria de Urquiza** — evidence: 6 cards (URQ-1–URQ-6) inserted into `#rev-urquiza-perfil` in `index.html`. Verified: `grep -c 'data-id="URQ-' index.html` → 6. Cards cover origen entrerriano (URQ-1), formación caudillo/alianza Rosas (URQ-2), gobernador Entre Ríos (URQ-3), Pronunciamiento 1851 (URQ-4), debate historiográfico (URQ-5), y interpretación convergencia (URQ-6). Each hecho card has ≥1 `<cite>` element; 6 cite elements confirmed in the URQ section.

- [x] **El Pronunciamiento de 1851 tiene card-hecho con fecha y fuente** — evidence: URQ-4 carries `data-certeza="hecho"`, contains "Pronunciamiento", "1851", and `<cite>` elements. Node check: `URQ-4 has 1851: YES`, `URQ-4 has cite: YES`, `URQ-4 has Pronunciamiento: YES`.

- [x] **El debate historiográfico (¿traición o decisión?) está explícito** — evidence: URQ-5 is `data-certeza="debatido"` with `class="event-card card-opinion"` and the ⚖ icon (`&#x2696;`). Node check confirms Irazusta (revisionist "traición federal") and Lynch/Halperin (liberal synthesis "decisión soberana") both present. S01 summary documents both positions as attributed paraphrases per the no-fabricated-quote protocol.

- [x] **No duplica menciones existentes** — evidence: S01 and S02 summaries explicitly document avoidance of duplicating the existing Alberdi blockquote (already at ~line 2274) and the existing Urquiza portrait already in use. URQ-6 uses no new blockquote per D070. The 55 total "Urquiza" mentions in the file include the pre-existing ones plus the new section — no duplicate card-level content was created. S02 summary confirms: "No new blockquote was added."

## Slice Delivery Audit

| Slice | Claimed | Delivered | Status |
|-------|---------|-----------|--------|
| S01 | `S01-CONTENT-DRAFT.md` con 6 cards (URQ-1–URQ-6), certezas, ≥2 fuentes por card-hecho, 4 imágenes confirmadas vía Wikimedia Commons API, 0 URLs pendientes | S01-SUMMARY confirms: 6 cards, 10 data-certeza annotations, 4 CONFIRMADO image entries, 0 `[URL-PENDIENTE-VERIFICAR]` markers. All 5 slice-level observability checks passed (exit 0 / correct counts). Content draft also includes "Notas de inserción HTML para S02" forward intelligence. | **pass** |
| S02 | 6 cards URQ-1–URQ-6 in `#rev-urquiza-perfil`, 8th sub-nav link, visible in browser | S02-SUMMARY confirms all 8 checks passed: `sub-nav__link` → 8, `id="rev-urquiza-perfil"` → 1, `data-id="URQ-"` → 6, URQ-5 debatido → 1, URQ-6 `opini&#xF3;n` entity → verified via node, `card-nota-certeza` in URQ-3 → 1, `/#rev-1835-1852` anchor intact → 1, app.js syntax → OK. Live node checks against actual index.html confirm all counts. | **pass** |

## Cross-Slice Integration

**S01 → S02 boundary:** S01 produced `S01-CONTENT-DRAFT.md` (the contracted artifact). S02 consumed it to drive the two surgical edits to `index.html`. S01's "Forward Intelligence" section documented the exact splice anchor (`<!-- /#rev-1835-1852 -->`), the sub-nav link count target (8), URQ-5/URQ-6 certeza values, image URL details, and the `card-nota-certeza` span — all correctly consumed by S02.

**No boundary mismatches found.** Every `provides` artifact from S01 was consumed by S02 as specified. The anchor `<!-- /#rev-1835-1852 -->` was used correctly (confirmed: `grep -c '/#rev-1835-1852' index.html` → 1, intact).

**Deviations that were handled within slices (not cross-slice gaps):**
- Palacio San José filename corrected from `Palacio_San_José_(Entre_Ríos).jpg` to `Palacio_San_José_Fachada.JPG` within S01/T02 before handoff — S02 consumed the already-corrected URL.
- Wikimedia API `iiprop` pipe-encoding issue discovered and resolved within T02 — transparent to S02.
- Windows grep metacharacter issue for HTML entity strings: documented in KNOWLEDGE.md; S02 used node.js workaround successfully.

## Requirement Coverage

M017 covers R001 and R002 per the roadmap.

| Requirement | Status | Evidence |
|-------------|--------|----------|
| R001 — Página web single-page con scroll vertical | active (ongoing) | M017 adds to the existing page without breaking structure. app.js syntax OK. `#rev-urquiza-perfil` follows the established sub-period pattern. No JS errors introduced. |
| R002 — Sección 1800–1860: contenido detallado | validated (previously) | M017 extends coverage within `#periodo-revolucion / #rev-1835-1852` with 6 additional cards on Urquiza — a figure explicitly named in R002 scope (guerras civiles, Rosas period). R002 was already validated; M017 deepens it. |
| R012 — Verificación de rigurosidad histórica | active (per-milestone obligation) | S01 research verified facts against Lynch, Halperin Donghi, Irazusta, and other academic sources. URQ-5 paraphrases are explicitly marked `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]` per protocol. Dates, sources, and certeza classifications verified before HTML integration. |
| R013 — Sistema de niveles de certeza | validated (ongoing) | All 6 URQ cards have `data-certeza` attributes. Certeza distribution: 4× hecho, 1× debatido, 1× opinión (HTML entity). Confirmed via node: `certeza values: hecho, hecho, hecho, hecho, debatido, opini&#xF3;n`. |

No active requirements were left unaddressed by this milestone's scope.

## Verdict Rationale

**Verdict: pass**

All four success criteria are substantiated by slice summary evidence and confirmed by live file checks against the actual `index.html`. Both slices delivered their contracted outputs with all observability checks passing. The S01→S02 boundary was clean — the draft artifact was correctly produced and consumed. No content gaps, no structural regressions (parent anchor intact, app.js syntax clean, sub-nav count correct). Deviations encountered during execution (Wikimedia API behavior, filename correction, Windows shell metacharacters) were handled within their respective slices and do not represent missing deliverables. Requirements R001, R002, R012, and R013 are addressed.

## Remediation Plan

*(not applicable — verdict is pass)*
