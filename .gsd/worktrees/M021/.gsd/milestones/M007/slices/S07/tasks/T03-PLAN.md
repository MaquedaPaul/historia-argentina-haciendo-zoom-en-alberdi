---
estimated_steps: 4
estimated_files: 1
---

# T03: Triple gate — shell + DOM + narrative verification

**Slice:** S07 — Por qué Alberdi rechazó el viaje a EE.UU. financiado por Quiroga
**Milestone:** M007

## Description

Run the three-layer verification gate established in S01–S06. Shell checks prove structural integrity (counts, no regressions). DOM queries prove runtime registration (animation system, sub-nav, card positions). Narrative read proves coherence (BIOG-21 and BIOG-22 fulfill BIOG-18's promise, no contradictions, no fabricated sources).

This task is read-only. No modifications to `index.html`.

## Steps

1. **Capa 1 — Shell checks** (5 checks):
   ```bash
   grep -c 'data-certeza' index.html            # → 56
   grep -c 'id="BIOG-21"' index.html            # → 1
   grep -c 'id="BIOG-22"' index.html            # → 1
   grep -c 'rev-alberdi-quiroga' index.html     # → 3
   grep -c 'sub-nav__link' index.html           # → 6
   ```
   All 5 must pass before proceeding to Capa 2.

2. **Capa 2 — DOM queries** (4 checks): Open the site in browser (use a local server if available, or open `index.html` directly). Run via `browser_evaluate`:
   ```js
   document.querySelectorAll('.sub-nav .sub-nav__link').length
   // → 6
   
   document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length
   // → 6 (BIOG-17, BIOG-18, BIOG-19, BIOG-20, BIOG-21, BIOG-22)
   
   document.querySelectorAll('.reveal').length
   // → 79 (was 76; +3: h4.reveal-fade, BIOG-21.reveal-slide, BIOG-22.reveal-slide)
   
   document.querySelector('#BIOG-22').dataset.certeza
   // → "opinion" (no accent)
   ```
   Note: `console.debug` signals from app.js are NOT captured by `browser_get_console_logs` — use DOM queries directly (per KNOWLEDGE: "`console.debug` Is Not Captured by Playwright").

3. **Capa 3 — Narrative checks** (5 checks): Scroll to `#rev-alberdi-quiroga` in the browser. Read BIOG-17, BIOG-18, BIOG-19, BIOG-20, BIOG-21, BIOG-22 in sequence. Verify:
   - **BIOG-21 does not verbatim repeat the two BIOG-18 blockquotes** (the "Lo visité con repetición" and "Al día siguiente le hice una visita respetuosa" quotes). BIOG-21 must extend or contextualize — not copy.
   - **BIOG-22 names at least one historian** (Mayer and/or Halperin Donghi) in its attribution footer — motivations are never stated as facts.
   - **BIOG-22 uses `data-certeza="opinion"`** (confirmed in Capa 2; re-verify visually with the opinion badge).
   - **BIOG-18's promise is fulfilled**: reading BIOG-18's `card-nota-certeza` ("las razones del rechazo… se desarrollan en una sección posterior") and then scrolling to see BIOG-22 creates a coherent reader experience — the "posterior section" promise is visibly delivered.
   - **Sub-period closure feels complete**: after BIOG-22, the `</div><!-- /#rev-alberdi-quiroga -->` closes the period; there is no dangling narrative thread.

4. **Report results** in a table format: check name / expected / actual / pass-fail. Document the final counts and any deviations. All 14 checks (5 shell + 4 DOM + 5 narrative) must pass.

## Must-Haves

- [ ] All 5 Capa 1 shell checks pass
- [ ] All 4 Capa 2 DOM queries return expected values
- [ ] All 5 Capa 3 narrative checks pass
- [ ] No regressions on sub-nav count or sub-period count

## Verification

```bash
# Summary command — run this first:
grep -c 'data-certeza' index.html && \
grep -c 'id="BIOG-21"' index.html && \
grep -c 'id="BIOG-22"' index.html && \
grep -c 'rev-alberdi-quiroga' index.html && \
grep -c 'sub-nav__link' index.html
# Expected output: 56 / 1 / 1 / 3 / 6
```

## Inputs

- `index.html` — post-T02 state with BIOG-21 and BIOG-22 inserted
- S06 observability surfaces (from S06-SUMMARY.md Forward Intelligence): baseline values before S07 were `data-certeza=54`, `.reveal=76`, `sub-nav__link=6`, `rev-alberdi-quiroga=3`
- KNOWLEDGE.md: "Three-Layer Slice Exit Gate" — all three layers are required; none replaces the others
- KNOWLEDGE.md: "`console.debug` Is Not Captured by Playwright" — use `browser_evaluate` DOM queries instead of console log signals

## Expected Output

- Verification report: 14/14 checks pass (or documented failures with root cause)
- If any check fails: diagnosis of the root cause and fix recommendation (do NOT silently ignore failures)
- The slice is complete when all 14 checks pass

## Observability Impact

**Signals this task observes (not changes):**
- `grep -c 'data-certeza' index.html` → 56 (set by T02; T03 confirms it unchanged)
- `grep -c 'id="BIOG-21"' index.html` → 1 (set by T02; T03 confirms it)
- `grep -c 'id="BIOG-22"' index.html` → 1 (set by T02; T03 confirms it)
- `document.querySelectorAll('.reveal').length` → 79 (runtime signal; T03 confirms animation system counted the new elements)
- `document.querySelector('#BIOG-22').dataset.certeza` → `"opinion"` (runtime attribute; T03 confirms certeza normalization)

**Inspection surfaces after T03:**
- T03-SUMMARY.md — final 14-check verification report table; pass/fail rows are the human-readable record of slice exit.
- S07-PLAN.md Tasks section — T03 marked `[x]` signals the slice is complete and ready for merge.
- Browser DevTools → Elements → `#rev-alberdi-quiroga` → visual inspection of BIOG-21 + BIOG-22 side-by-side in a two-column `events-grid--certeza` grid.

**Failure state visibility:**
- If T03 finds a Capa 1 failure: the specific count deviates from expected; check T02 splice log in T02-SUMMARY.md for which line was the anchor.
- If T03 finds a Capa 2 DOM failure: `.reveal` count < 79 means the h4 or one card didn't get the class; grep for `class=".*reveal.*"` near BIOG-21/22 in the inserted block.
- If T03 finds a Capa 3 narrative failure (verbatim repeat): search for the exact BIOG-18 quote strings in BIOG-21's HTML span; any match requires editing the BIOG-21 body text in index.html.
- T03 is read-only — any fix needed goes back to a new T02-follow-up task, not within T03 itself.
