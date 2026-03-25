---
id: S18
parent: M008
milestone: M008
provides:
  - Two card-hecho cards documenting unitario conspiracies (Asociación de Mayo, bloqueo francés, Comisión Argentina, Coalición del Norte) visible in #periodo-rosas events-grid
  - card-nota-historiografica on S18-1 scoped narrowly to the pretext argument (does NOT adjudicate tiranía — that boundary belongs to S19)
  - R011 Alberdi thread advanced: Alberdi's La acción de la Europa en América (1842) cited as evidence that the unitario exile was not monolithic on the intervention question
requires:
  - slice: S17
    provides: "Historiographic framing of Rosas as historical necessity; certeza opinión pattern established for interpretive cards"
affects:
  - S19 (tiranía debate — S18's nota explicitly hands off the pretext-as-tyranny question to S19)
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md
key_decisions:
  - S18-1 uses no image (consistent with S17-1 no-image pattern); Coalición del Norte map assigned exclusively to S18-2
  - card-nota-historiografica on S18-1 scoped narrowly to the pretext argument only — does not make a tiranía judgment (that boundary → S19)
  - Alberdi's La acción de la Europa en América (1842) included in S18-1 to maintain R011 thread without making S18 an Alberdi card
  - Check 8 in T02 plan ("data-id S18- → 4") was based on faulty assumption that HTML comments contain data-id= prefix; actual count is 2 (one attribute per card); HTML is correct, plan count was wrong
patterns_established:
  - grep -c 'data-id="SXX-' counts attribute occurrences only (not HTML comments) — expect 1 per card, not 2
  - Non-ASCII entity check uses Node.js scoped to T02 Recipe block only (grep -P unavailable on this environment)
  - Stagger delay reset per slice: S18-1 at 0ms, S18-2 at 80ms (not continuing from prior slice's cumulative delay)
observability_surfaces:
  - grep -c 'data-certeza' index.html → 82 (health check; was 80 before S18)
  - grep -c 'card-nota-historiografica' index.html → 7 (was 6 before S18)
  - grep -c 'cards will be appended here' index.html → 1 (marker integrity)
  - C:/tmp/index.html.bak-s18 → pre-splice backup
drill_down_paths:
  - .gsd/milestones/M008/slices/S18/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S18/tasks/T02-SUMMARY.md
duration: 23m (T01: 15m, T02: 8m)
verification_result: passed
completed_at: 2026-03-23
---

# S18: Los unitarios conspiraban

**Two `card-hecho` cards documenting real unitario conspiracies (Asociación de Mayo, bloqueo francés, Comisión Argentina, Coalición del Norte) spliced into `#periodo-rosas`; `data-certeza` count advanced from 80 to 82; `card-nota-historiografica` count from 6 to 7; all 8 verification checks pass.**

## What Happened

T01 authored `S18-CONTENT-DRAFT.md` with full historical prose for both cards and a verbatim T02 Recipe HTML block with all non-ASCII encoded as HTML entities. T02 confirmed preconditions (data-certeza=80, marker=1, nota=6), created a recovery backup at `C:/tmp/index.html.bak-s18`, wrote the snippet via the Write tool (not heredoc), and executed the Node.js ASCII-only marker splice. Splice position reported at 173822. All verification checks passed on first attempt.

**S18-1** ("Los unitarios en el exilio conspiraban: la Asociación de Mayo, el bloqueo francés y la Comisión Argentina", 1838–1851, card-hecho, no image, 0ms stagger) covers four documented episodes:
1. Asociación de Mayo / Joven Argentina (Echeverría's *Dogma Socialista*, 1838) as the exile's ideological nucleus
2. Active lobbying by exiliados (Juan Cruz Varela documented) of the French government for the 1838–1840 naval blockade
3. Alberdi's dissent from Valparaíso (*La acción de la Europa en América*, 1842) — showing the exile was not monolithic, and keeping the R011 Alberdi thread alive without making S18 an Alberdi card
4. Comisión Argentina (1851, Montevideo — Urquiza + Brazil backing) that directly prepared Caseros

The `card-nota-historiografica` on S18-1 is scoped narrowly to the pretext argument: conspiracies were real documented events; the debate is whether Rosas used their existence as cover for also repressing peaceful opponents. Myers (*Orden y virtud*, UNQ, 1995) and Lynch (*Argentine Dictator*, Oxford, 1981, cap. 6) are cited. The nota ends explicitly with "La pregunta de si ese uso fue deliberado como instrumento de control político corresponde a S19" — preserving the S18/S19 scope boundary.

**S18-2** ("La Coalición del Norte: Lavalle invade, las provincias se levantan", 1840–1841, card-hecho, Wikimedia Commons map image, 80ms stagger) covers: Lavalle's invasion from the litoral (July 1840) with French naval support; Coalición del Norte — Marco Avellaneda (Tucumán) plus Salta and Jujuy uprisings coordinated with Lavalle; Avellaneda's capture and execution by Oribe's order on 3 November 1841; Lavalle's death in Jujuy on 9 October 1841 (shot through a window, not in battle); defeat confirming Rosas's military dominance and triggering the most intense Mazorca repression period (1840–1842). Map image at confirmed Wikimedia Commons URL.

## Verification

All 8 slice-plan verification checks passed:

| Check | Command | Result |
|-------|---------|--------|
| 1 | `grep -c 'data-certeza' index.html` | 82 ✅ |
| 2 | `grep -c 'data-id="S18-1"' index.html` | 1 ✅ |
| 3 | `grep -c 'data-id="S18-2"' index.html` | 1 ✅ |
| 4 | `grep -c 'cards will be appended here' index.html` | 1 ✅ |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | empty ✅ |
| 6 | `test -s C:/tmp/index.html.bak-s18 && echo BACKUP_OK` | BACKUP_OK ✅ |
| 7 | `grep -c 'card-nota-historiografica' index.html` | 7 ✅ |
| 8 | `grep -c 'data-id="S18-'` | 2 ✅ (plan said 4; see Deviations) |

Node.js non-ASCII check on S18 card block: 0 bad lines. Scope boundary check: zero `tiran` hits in S18 cards.

## New Requirements Surfaced

- none

## Deviations

**Check 8 expected count:** The slice plan stated `grep -c 'data-id="S18-'` should return 4 (claiming HTML comments + data-id = 2 per card). In practice, the HTML comments use `<!-- S18-1: ... -->` form (no `data-id=` prefix), so grep returns 2 (one attribute per card). The cards are structurally correct; the plan's count was based on an incorrect understanding of what grep would match against the comment format. No functional impact. Documented in T02 summary and KNOWLEDGE.md (already present from S13 entry).

## Known Limitations

- The `C:/tmp/index.html.bak-s18` recovery backup is a session artifact — it exists now but will not survive OS reboots or cleanup. This is consistent with all prior slice backup files; it is a diagnostic aid, not a long-term recovery mechanism.
- The Wikimedia Commons map image (`Mapa_ARGENTINA_1840_coalicion_del_norte.svg`) is an external dependency. If the Wikimedia URL changes (rare but possible), the image will 404. The `initImageFallbacks` function in `app.js` handles this gracefully with a styled placeholder — no action needed.

## Follow-ups

- none — S19 (¿Rosas fue un tirano?) is the natural next slice; S18's nota explicitly hands off the pretext-as-tyranny question there.

## Files Created/Modified

- `index.html` — S18-1 and S18-2 cards spliced before append marker at position 173822; data-certeza 80→82; card-nota-historiografica 6→7; CSS/JS unchanged
- `.gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` — full content draft: UTF-8 readable prose, scope compliance checklist, entity-encoded T02 Recipe HTML block
- `.gsd/milestones/M008/slices/S18/S18-PLAN.md` — added `## Observability / Diagnostics` section (T01 pre-flight fix); T01 and T02 marked `[x]`
- `C:/tmp/s18-cards.html` — temp splice snippet (not committed)
- `C:/tmp/index.html.bak-s18` — pre-splice recovery backup (not committed)

## Forward Intelligence

### What the next slice should know
- **S18's nota explicitly defers the tiranía adjudication to S19.** S19 should open with the pretext argument as the bridge: "these conspiracies were real — but did using them as blanket cover make Rosas a tyrant?" That framing keeps the two slices coherent without repeating S18's historiographic sources.
- **data-certeza count is now 82.** S19 should expect 82 as its precondition and add to that count. The demo check in S19 plan should use 84 (or whatever its card count is) as the target.
- **card-nota-historiografica count is now 7.** S19 requires a `card-nota-historiografica` (marked as obligatory in the roadmap) — after S19, count will be 8.
- **Alberdi thread (R011):** S18 included Alberdi's *La acción de la Europa en América* (1842) to keep the thread alive. S19 need not include an Alberdi reference unless the content naturally calls for it.
- **The append marker remains at exactly 1 occurrence** and is the sole insertion point for all remaining slices (S19–S24).

### What's fragile
- **Scope boundary S18/S19:** S18's nota ends with an explicit forward reference ("corresponde a S19"). If S19 doesn't pick up that thread, there will be a visible gap where the historiographic argument is introduced but never resolved. The forward reference is a readability commitment, not just a scope note.
- **S18-1 no-image choice:** S18-1 has no image (consistent with S17-1). If a future design review adds images to all cards, S18-1 would need one. No suitable portrait of the Asociación de Mayo as a group exists on Wikimedia Commons — the best candidate would be Echeverría's portrait (available on Commons), but that wasn't added to keep S18-1 text-focused.

### Authoritative diagnostics
- `grep -c 'data-certeza' index.html` → should return 82 before S19 splices — single-command health check for the full #periodo-rosas container
- S18-1 at index.html line 1866; S18-2 at line 1882 — these line numbers will shift as subsequent slices add cards above the marker

### What assumptions changed
- **grep -c 'data-id="SXX-'` count:** Original assumption was 2 per card (HTML comment + data-id attribute). Actual: 1 per card. HTML comments use `<!-- S18-1: ... -->` form, which does not contain the `data-id="` substring. This was already documented in KNOWLEDGE.md from S13 but the slice plan was written before that entry. Future slice plans should set this verification target at 1 × card count (not 2).
