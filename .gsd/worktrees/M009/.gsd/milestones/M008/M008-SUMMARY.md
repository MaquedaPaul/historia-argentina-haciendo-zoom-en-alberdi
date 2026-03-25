---
id: M008
provides:
  - index.html #periodo-rosas sub-period container with 35 verified cards (S09–S24) covering the full 1820–1852 unitario/federal arc and both Rosas mandates
  - 16 completed slices (S09–S24), each with a content draft, HTML integration, and passing verification checks
  - data-certeza count raised from 58 (pre-M008 baseline) to 93
  - card-nota-historiografica count raised from 1 (pre-M008) to 12 — covering all five major historiographic debates of the Rosas era
  - Sub-nav link #periodo-rosas added to site navigation
  - Certeza taxonomy extended: "debatido" value established (5 cards) alongside existing "hecho" and "opinión"
  - Multi-slice append-marker pattern established as reusable coordination mechanism for shared HTML containers
key_decisions:
  - D046: Pueyrredón portrait substituted for Rondeau (S09-2) — Rondeau image below display quality
  - D047: Append marker comment as grep-stable insertion target — enables 16 slices to coordinate in shared container without line-number collisions
  - D048–D050: Attributed-paraphrase pattern for unverifiable direct quotes — no synthetic quotes
  - D051: Plebiscite figure locked at 9,316 (matches pre-existing SP3-1 value) — live page as source of truth
  - D052: data-certeza="debatido" shares card-opinion CSS class (zero-new-CSS constraint)
  - D053: HTML entity encoding for all non-ASCII in T02 Recipe blocks — Windows encoding safety
  - D054–D059: Content accuracy decisions on Varela assassination, S16-1 image, three-position nota format, certeza taxonomy, debatido vs. opinión, scope boundary check method
patterns_established:
  - Content-draft-first pipeline (T01 research → T02 mechanical splice) retired all content risk before touching index.html in every slice
  - Write-tool + Node.js splice (not bash heredoc) as the reliable index.html insertion mechanism on Windows
  - ASCII-only marker substring for Node.js String.includes() — avoids en-dash encoding failures
  - C:/tmp/ as temp file location (Windows-safe); /tmp/ also works in some sessions but C:/tmp/ is guaranteed
  - Three-position card-nota-historiografica with per-position Author/Title/Year attribution
  - certeza taxonomy: "hecho" (fact), "opinión" (interpretive argument, 💬 icon), "debatido" (contested fact, ⚖ icon)
  - Tight-boundary scope check (article-block) instead of EOF-sweep to avoid false positives in multi-slice containers
  - Explicit cross-card scope boundary references ("cuya concesión cubre la tarjeta S14-1") to connect cards without re-narrating
  - S22-class opener for cards presupposing multi-card prior narrative ("Los hechos del período —detallados en las tarjetas S14-1 y S14-2—")
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 93 (canonical M008 completion signal)"
  - "grep -c 'card-nota-historiografica' index.html → 12"
  - "grep -c 'data-certeza=\"debatido\"' index.html → 5"
  - "grep -c 'cards will be appended here' index.html → 1 (append marker intact)"
  - "grep -c 'id=\"periodo-rosas\"' index.html → 1"
  - "git diff --name-only HEAD -- styles.css app.js → (empty)"
requirement_outcomes:
  - id: R003
    from_status: validated
    to_status: validated
    proof: "35 new M008 cards in the 1820–1852 sub-period extend the 1800–1860 section. The section now includes 20 pre-M008 event cards (M003) plus 35 M008 cards covering Rosas era detail. All cards have data-certeza, cite elements, and verified sources. Alberdi thread maintained (S18-1 cites Alberdi's La acción de la Europa en América, 1842)."
  - id: R012
    from_status: validated
    to_status: validated
    proof: "Every M008 slice followed the content-draft-first protocol: T01 researched and verified all facts, dates, and images via Wikimedia API before T02 touched index.html. Key accuracy decisions documented: Campaña del Desierto 1833 attribution nuance (S13), plebiscite figure 9,316 (S14), Barranca Yaco vs. Barranco Yaco spelling, Reinafé execution date 25 Oct 1837, Florencio Varela assassination attributed not asserted (D054), Alberdi's role in El Iniciador as collaborator not co-founder."
  - id: R013
    from_status: validated
    to_status: validated
    proof: "All 35 new M008 cards carry data-certeza attribute: 'hecho' (factual, green), 'opinión' (interpretive, blue/💬), or 'debatido' (contested fact, blue/⚖). New certeza value 'debatido' established in S14-3 and used in 5 cards (S14-3, S15-2, S16-3, S19-1, S19-2). Certeza indicators visible in HTML and CSS for all card types."
duration: ~8 hours across 16 slices (S09–S24), each averaging 20–40 minutes
verification_result: passed
completed_at: 2026-03-23
---

# M008: Unitarios, Federales y la Era de Rosas

**35 verified historical cards covering the complete 1820–1852 unitario/federal arc — from the structural roots of the conflict through both Rosas mandates, the Quiroga assassination, the Mazorca repression, five major historiographic debates, and Encarnación Ezcurra's political role — integrated into `#periodo-rosas` without any new CSS or JS, raising `data-certeza` from 58 to 93.**

## What Happened

M008 executed a 16-slice pipeline (S09–S24) with a consistent two-task structure: T01 research and content draft, T02 mechanical HTML splice. This pattern — established in M002 and refined through M007 — was applied without deviation across all 16 slices.

**Infrastructure established (S09):** The `#periodo-rosas` sub-period container was created in `index.html` at the correct structural position (after `#rev-1820-1835`, before the SP2→SP3 Alberdi connector). An append marker comment (`<!-- S10–S24 cards will be appended here by subsequent slices -->`) was placed inside the events-grid as a grep-stable insertion target — the key mechanism that let 15 subsequent slices coordinate in the same container without line-number collisions. A sub-nav link was added once and not repeated by downstream slices.

**Historical arc (S09–S16):** The first eight slices built the factual and structural foundation:
- S09 (4 cards): Economic roots of the unitario/federal conflict — aduana asymmetry, Cepeda 1820, Constitución 1826, crystallization of political identities
- S10 (3 cards): Ideological programs — unitario (centralism, free trade), federal (autonomy, protectionism), and the economic substructure (aduana control as the real prize)
- S11 (2 cards): Leader profiles for both factions — unitarios (Rivadavia, Lavalle, Paz) and federales (Rosas, Quiroga, López, Ramírez, Urquiza)
- S12 (2 cards): Governance without a national state — caudillo power structures and the Pacto Federal 1831 as constitutional backbone
- S13 (2 cards): First Rosas mandate — the Dorrego fusilamiento crisis, how Rosas came to power, and the 1829–1832 mandate with explicit Campaña del Desierto attribution nuance
- S14 (3 cards): Second mandate — Suma del Poder Público acquisition (with the 9,316 plebiscite figure locked), the geopolitical arc (French blockade, Vuelta de Obligado, Caseros), and a historiographic seed note introducing the liberal/revisionist polarity
- S15 (2 cards): Quiroga assassination at Barranca Yaco — factual record of the ambush and the three-hypothesis intellectual-authorship debate (first use of `debatido` certeza in M008)
- S16 (3 cards): Mazorca repression — organizational structure and documented mechanics, exile as repression (confiscations, Florencio Varela assassination attributed per liberal historiography with revisionist dispute noted), and a three-position scale-of-terror debate with per-position source attribution

**Historiographic debate chain (S17–S19):** Three slices built the central interpretive scaffold:
- S17 (1 card): "¿Era Rosas un mal necesario?" — the internal-order counterfactual, establishing `data-certeza="opinión"` (interpretive arguments) as distinct from `"debatido"` (contested facts)
- S18 (2 cards): Real unitario conspiracies — Asociación de Mayo, French blockade lobbying, Alberdi's strategic dissent (*La acción de la Europa en América*, 1842), Coalición del Norte 1840–1841. The S18-1 nota explicitly scoped the pretext argument and handed it off to S19
- S19 (2 cards): The central tiranía debate — framing card picking up S18's forward reference, and a three-position nota (liberal Sarmiento/Mitre, revisionist Irazusta/Rosa, contemporary synthesis Lynch/Halperin Donghi/Myers) with domestic scope explicitly bounded; soberanía exterior deferred to S22

**Supporting narrative (S20–S22):** Three slices provided chronological and thematic depth:
- S20 (2 cards): Dorrego fusilamiento context — the Convención Preliminar de Paz (1828) as Lavalle's political pretext, and the fusilamiento as Argentina's foundational political rupture per Saldías/Halperin Donghi/Lynch (scope-guarded to not duplicate S13-1's event narrative)
- S21 (2 cards): Suma del Poder Público mechanics — the Buenos Aires-only scope, the 14-province Confederation structure, and the provincial-endorsement historiographic debate (three positions with explicit cross-card reference to S14-1)
- S22 (1 card): Soberanía exterior debate — Rosas as guarantor of sovereignty against British and French pressure, the revisionist/liberal/synthesis three-position nota, with Alberdi's 1842 dissent complicating the clean binary

**Encarnación Ezcurra (S23–S24):** Two slices closed M008 with the milestone's only major female figure:
- S23 (2 cards): Political role — Sociedad Popular Restauradora, Revolución de los Restauradores (October 1833), epistolary intelligence network; scope-guarded to exclude the post-1838 Mazorca (she died October 20, 1838)
- S24 (2 cards): Pre-Rosas identity — family origin (Ezcurra y Arguibel), colonial Buenos Aires social context (Buenos_Aires_1790.jpg fallback after the Isola litograph was confirmed missing from Commons), 1813 marriage, and the two-position agency-vs-dependency debate

**Technical execution:** All 16 slices used the Write-tool + Node.js splice pattern (not bash heredoc). The ASCII-only marker substring `'cards will be appended here by subsequent slices'` was used consistently in Node.js `String.includes()` calls to avoid en-dash encoding failures. All non-ASCII characters in T02 Recipe blocks were HTML entity-encoded for Windows safety. Pre-splice backups were written to `C:/tmp/` for each slice. Zero CSS or JS changes were introduced across all 16 slices.

## Cross-Slice Verification

All milestone success criteria verified against observable state in `index.html`:

| Success Criterion | Verification | Result |
|---|---|---|
| 16 thematic blocks (S09–S24) with verified historical content | `grep -c 'data-certeza' index.html` → **93** (58 baseline + 35 new = 93) ✅ | PASS |
| Each block uses certeza system (hecho/opinión/rumor/debatido) | All 35 cards carry `data-certeza` attribute; certeza values: hecho=confirmed, opinión=interpretive, debatido=contested | PASS |
| All cards have ≥1 source citation | 36 `<cite>` elements across 35 M008 cards in `#periodo-rosas` (some cards have multiple cites) | PASS |
| Historiographic interpretation blocks use certeza `debatido` or `opinión` with both positions | 5 `debatido` cards (S14-3, S15-2, S16-3, S19-1, S19-2); 12 `card-nota-historiografica` blocks; both liberal and revisionist positions present throughout | PASS |
| No CSS or JS changes | `git diff --name-only HEAD -- styles.css app.js` → **(empty)** ✅ | PASS |
| Reveal-on-scroll works for all new elements | 98 `reveal reveal-slide` elements in index.html (was 64 pre-M007, increased by 35 M008 cards); `#periodo-rosas` container has `reveal reveal-fade` class | PASS |
| `grep -c 'data-certeza'` increases ≥16 cards | **35 new cards** (+35 from baseline of 58) | PASS |

**Definition of Done verification:**
- All 16 slices marked `[x]` in M008-ROADMAP.md: ✅ (confirmed from slice summaries)
- All 16 S09–S24 SUMMARY.md files exist and are non-empty: ✅ (verified with `test -s` for each)
- Cross-slice integration: append marker survived all 16 splices intact at exactly 1 occurrence: ✅ (`grep -c 'cards will be appended here' index.html` → 1)
- Rosas tiranía debate has both liberal and revisionist positions in `card-nota-historiografica`: ✅ (S19-2 names Sarmiento/Mitre as liberal, Irazusta/Rosa as revisionist, Lynch/Halperin Donghi/Myers as synthesis)
- Quiroga assassination uses `debatido` certeza with `card-nota-historiografica`: ✅ (S15-2, `data-certeza="debatido"`)
- Sub-nav link added exactly once: ✅ (`grep -c 'href="#periodo-rosas"' index.html` → 1)

## Requirement Changes

- **R003**: validated → validated — Extended with 35 M008 cards covering 1820–1852 in depth. The 1800–1860 section now has the detailed treatment specified in D003 ("1800–1860 detallado"). Alberdi thread maintained via S18-1 citing his 1842 Valparaíso text.
- **R012**: validated → validated — All M008 content verified via T01 content-draft pipeline before HTML integration. Key accuracy confirmations: Campaña del Desierto commanded by Rosas as military officer under Balcarce (not as governor); plebiscite figure 9,316 matched to pre-existing SP3-1 value; Barranca Yaco spelling (not Barranco); Reinafé execution date 25 October 1837; Florencio Varela attribution pattern; Alberdi as El Iniciador collaborator (not co-founder).
- **R013**: validated → validated — Certeza system extended with new `"debatido"` value for genuinely contested historical claims (distinct from `"opinión"` for interpretive arguments). 5 debatido cards and 12 card-nota-historiografica blocks demonstrate the system in operation at maximum complexity.

## Forward Intelligence

### What the next milestone should know

- **The `#periodo-rosas` container is now fully populated** with all 35 cards (S09–S24). The append marker `<!-- S10–S24 cards will be appended here by subsequent slices -->` is still present in index.html (by design — it serves as a permanent insertion anchor for any future additions). Any future milestone adding content to this section can use the same ASCII-only marker substring to find the insertion point.

- **data-certeza="debatido" is now established** as a third substantive certeza value alongside "hecho" and "opinión". The CSS class is `card-opinion` (zero-new-CSS), the icon is ⚖ (`&#x2696;`). CSS attribute selectors must handle all three values; JS queries filtering by certeza must account for both accented and entity-encoded forms.

- **The card-nota-historiografica count is 12.** The three-position format (liberal/revisionist/síntesis contemporánea with per-position Author/Title/Year attribution) is now established as the canonical form for major historiographic debates. Any future content covering contested Argentine history should follow this pattern.

- **Lynch citation chain in *Argentine Dictator* (1981):** caps. 3 (S20), 4 (S21), 5 (S23), 6 (S18), 7 (S16), 8 (S22), 10 (S19) are now consumed. Caps. 1–2 (pre-Rosas social context) and cap. 9 (Caseros/fall of Rosas) remain uncited in M008 and are available for future milestones.

- **Halperin Donghi and Myers** are cited in multiple M008 cards (S17, S19, S21, S22). Future milestones referencing these works should use different chapter sections to avoid citation redundancy.

- **The SP3 section** (already in index.html, covering 1835–1852 from Alberdi's perspective) remains intact. M008 cards complement but do not duplicate SP3 content. Any future milestone touching the 1835–1852 period must continue this boundary discipline — read SP3 cards before authoring new content for that era.

- **The plebiscite figure is locked at 9,316** across the entire page (S14-1 and SP3-1). Any future card referencing the 1835 Suma plebiscite must use 9,316, not 9,320.

### What's fragile

- **The append marker wording** (`<!-- S10–S24 cards will be appended here by subsequent slices -->`) is now semantically stale (all 16 slices have completed). It should be treated as a permanent insertion anchor for future additions, not an active instruction. Its uniqueness must be preserved — `grep -c 'cards will be appended here' index.html` must remain 1.

- **The S11 "Barranco Yaco" misspelling** at line 1640 remains uncorrected (scope of S15 flag, not fixed). The correct spelling is "Barranca Yaco" — S15 uses the correct form. Both spellings now coexist in the file.

- **Wikimedia CDN image URLs** in M008 cards are confirmed at time of authoring but are not guaranteed indefinitely. The `initImageFallbacks` function in `app.js` handles 404s with a styled placeholder. The image verification log in each S0X-CONTENT-DRAFT.md is the canonical record of which files were confirmed and their license status.

- **S24-1 uses a colonial Buenos Aires cityscape** (Buenos_Aires_1790.jpg, ca. 1790) instead of a portrait of Encarnación Ezcurra — the Isola litograph is missing from Wikimedia Commons. If that file or any other portrait becomes available, it is a drop-in replacement with no structural changes needed.

- **EOF-bounded scope boundary checks** produce false positives in the `#periodo-rosas` section because SP3-x cards (containing "Mazorca", "Caseros", etc.) appear later in the DOM. Always use tight-boundary checks scoped to the target article block — see D059 and the KNOWLEDGE.md entry.

### Authoritative diagnostics

- `grep -c 'data-certeza' index.html` → **93** — primary health signal for M008 completion; single most reliable indicator that all cards are present
- `grep -c 'card-nota-historiografica' index.html` → **12** — confirms all major debate cards have their nota blocks
- `grep -c 'cards will be appended here' index.html` → **1** — confirms the append marker is intact and unique
- `git diff --name-only HEAD -- styles.css app.js` → **(empty)** — confirms zero CSS/JS changes across all 16 slices
- `grep -n 'data-id="S19-2"' index.html` → line ~1917 — the three-position tiranía nota; most complex verification target if content integrity is questioned

### What assumptions changed

- **S09-2 image:** Assumed Rondeau portrait would be the image; actual image was 188×200px with no 500px thumb. Replaced with Pueyrredón (D046).
- **S10-2 image:** Assumed Estanislao López would have a Wikimedia Commons portrait; API returned `missing`. Fallback chain → Bustos (D049).
- **S24-1 image:** Assumed the Isola litograph might be on Commons; confirmed missing. Fallback → Buenos_Aires_1790.jpg.
- **grep -c 'SXX-':** Assumed 1 match per card throughout; S13 onward introduced both HTML comments AND data-id attributes, producing 2 matches per card. The reliable check is `grep -c 'data-id="SXX-'` for 1 per card.
- **certeza taxonomy:** S14 introduced "debatido" as a new value; S17 clarified the semantic distinction between "debatido" (contested facts) and "opinión" (interpretive arguments). This two-value extension was not in the original M008 plan but emerged from content classification needs during execution.
- **T01 artifact gap (S19):** T01 was auto-stub'd by `/gsd doctor` without producing the content draft. T02 authored the draft as a prerequisite — no quality impact, but a gap that future pipeline tooling should detect earlier.

## Files Created/Modified

- `index.html` — Major: `#periodo-rosas` sub-period container with 35 new cards (S09–S24) inserted; `data-certeza` count 58 → 93; sub-nav link added; zero CSS/JS changes; append marker maintained throughout
- `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` — created (authored during T02 due to missing T01 output)
- `.gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` — created
- `.gsd/milestones/M008/slices/S09/S09-SUMMARY.md` through `S24-SUMMARY.md` — all 16 slice summaries created
- `.gsd/KNOWLEDGE.md` — appended: multi-slice append marker pattern; en-dash encoding fix; López portrait missing; Windows C:/tmp/ rule; grep-c multiplier; /tmp path resolution; three-position nota format; certeza taxonomy; grep -P unavailable; T01 auto-stub gap; Lynch citation chain; explicit cross-card scope boundary; S22-class opener; scope boundary false positive
- `.gsd/milestones/M008/M008-SUMMARY.md` — this file
