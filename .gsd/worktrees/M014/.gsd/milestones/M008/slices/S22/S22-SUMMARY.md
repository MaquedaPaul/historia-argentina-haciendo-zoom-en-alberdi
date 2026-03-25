---
id: S22
parent: M008
milestone: M008
provides:
  - Card S22-1 (soberanía exterior debate, card-opinion, three-position card-nota-historiografica) spliced into #periodo-rosas before the append marker
  - data-certeza count advanced from 88 to 89
requires:
  - slice: S21
    provides: Suma del Poder Público card (S21-1/S21-2) in #periodo-rosas; baseline data-certeza count of 88; confirmed append-marker position
affects:
  - S23
  - S24
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md
  - C:/tmp/s22-cards.html
  - C:/tmp/index.html.bak-s22
key_decisions:
  - Single card-opinion with embedded card-nota-historiografica (same pattern as S17-1/S21-2) rather than two-card split — the soberanía exterior debate is a single interpretive question, not two separate facts
  - Included Alberdi thread (*La acción de la Europa en América*, 1842) as one sentence in the excerpt to complicate the clean revisionista/liberal binary — Alberdi opposed European intervention while also opposing Rosas, making sovereignty-argument a non-exclusive revisionista property
  - Lynch cap. 8 consumed for soberanía exterior synthesis (as planned in KNOWLEDGE.md Lynch Citation Chain entry); remaining Lynch caps 1–2, 9 still available for S23–S24
  - Distinct Monvoisin portrait URL confirmed: no-comma variant (`Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas.jpg`) differs from SP3 comma-variant already in index.html
  - data-certeza="opini&#xF3;n" (HTML entity for accent) used throughout, per D053 entity-encoding rule
patterns_established:
  - Scope-boundary cross-reference opener: "Los hechos del período —detallados en las tarjetas S14-1 y S14-2—" as the canonical phrase for S22-class cards that presuppose bloqueo narrative without re-narrating it
  - Three-position nota historiográfica: revisionista / liberal / síntesis contemporánea — each position with Author, Title, Year attribution; synthesis distinguishes the *logro* from the *costo* diplomatico
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 89"
  - "grep -c 'data-id=\"S22-' index.html → 1"
  - "grep -c 'cards will be appended here' index.html → 1 (marker intact)"
  - "grep -n 'data-id=\"S22-1\"' index.html → line 2008"
  - "grep -n 'cards will be appended here' index.html → line 2026"
  - "C:/tmp/index.html.bak-s22 — restore point for pre-S22 state"
drill_down_paths:
  - .gsd/milestones/M008/slices/S22/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S22/tasks/T02-SUMMARY.md
duration: ~20m total (T01 ~15m + T02 ~5m)
verification_result: passed
completed_at: 2026-03-23
---

# S22: ¿Sin Rosas la Patria hubiera caído? — Slice Summary

**Card S22-1 (soberanía exterior debate, Monvoisin portrait, three-position nota historiográfica) spliced into #periodo-rosas; data-certeza count advances from 88 to 89 with no new CSS or JS.**

## What Happened

**T01** authored `S22-CONTENT-DRAFT.md` with two sections: prose documentation of card S22-1 and a verbatim entity-encoded HTML block (`## T02 Recipe`) ready for mechanical splice. The key authoring choices were:

1. **Scope differentiation from S17:** The card explicitly frames its question as distinct from S17-1 (internal order / "¿sin Rosas Argentina sería un caos?"). S22-1 asks whether Rosas's foreign-policy intransigence was the *specific condition* that prevented loss of sovereignty over the Río de la Plata river system — a question about external actors (Britain, France), not about internal caudillo fragmentation.

2. **Cross-reference opener:** The excerpt opens with "Los hechos del período —detallados en las tarjetas S14-1 y S14-2—", establishing the canonical scope-boundary phrase for S22-class cards. This avoids re-narrating bloqueo events (those belong to S14) while giving readers a navigation pointer.

3. **Alberdi thread:** One sentence in the excerpt notes that Alberdi's 1842 *La acción de la Europa en América* opposed European intervention even while he opposed Rosas — adding an inconvenient dimension to the revisionista/liberal binary that neither camp owns the sovereignty argument exclusively.

4. **Three-position nota historiográfica:** Revisionista (Irazusta & Irazusta 1934; Irazusta 1941) → liberal response (Halperín Donghi 1972: Urquiza's diplomacy proved the choice wasn't binary) → contemporary synthesis (Lynch 1981, cap. 8: distinguishes the *logro* — Europeans didn't get free river navigation — from the *costo* — prolonged isolation, commercial disruption, effective Uruguayan independence).

Entity and scope-boundary checks passed on first attempt.

**T02** spliced the Recipe HTML into `index.html` using the Node.js Array.splice pattern with the ASCII-only marker substring `cards will be appended here by subsequent slices`. The card was inserted at line 2006 (now occupies lines 2007–2025); the append marker moved to line 2026, immediately after the card's closing `</article>` tag. All six verification checks passed on first attempt with no restoration required.

## Verification

All slice-level checks passed:

| Check | Command | Result |
|-------|---------|--------|
| data-certeza count | `grep -c 'data-certeza' index.html` | 89 ✅ |
| S22 card count | `grep -c 'data-id="S22-' index.html` | 1 ✅ |
| Append marker intact | `grep -c 'cards will be appended here' index.html` | 1 ✅ |
| No CSS/JS changes | `git diff --name-only HEAD -- styles.css app.js` | (empty) ✅ |
| Backup exists | `test -s C:/tmp/index.html.bak-s22 && echo BACKUP_OK` | BACKUP_OK ✅ |
| Scope boundary | Node.js banned-string check on T02 Recipe block | SCOPE_PASS ✅ |

Positional: card at line 2008, marker at line 2026 (18-line card immediately before marker). ✅

## New Requirements Surfaced

None.

## Deviations

None. Both tasks followed their plans exactly.

## Known Limitations

- The Monvoisin portrait is the same subject (Rosas) used in other S14-era cards. There is no distinct image representing the foreign-policy / bloqueos dimension (Vuelta de Obligado paintings, Anglo-French fleet images) because the scope boundary explicitly forbids re-narrating those events — a neutral Rosas portrait is the correct choice for an interpretive card.
- The Alberdi thread in the excerpt is one sentence and does not cite *La acción de la Europa en América* with page/chapter detail — the source was written in exile and precise paginations vary by edition. This is noted as intentional brevity, not an accuracy gap.

## Follow-ups

- S23 may wish to note whether Encarnación Ezcurra had any documented role in the diplomatic correspondence of the bloqueo period — this is unlikely but would create a cross-card thread.
- Lynch caps. 1–2 and cap. 9 remain uncited in M008. S23–S24 can draw on these if Lynch's Encarnación sections are found in the early chapters.

## Files Created/Modified

- `index.html` — modified: S22-1 (`card-opinion`, `data-certeza="opini&#xF3;n"`) spliced before append marker at line 2006; data-certeza count 88 → 89; card-nota-historiografica count 9 → 10
- `.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` — created: prose S22-1 metadata + entity-encoded T02 Recipe HTML
- `C:/tmp/s22-cards.html` — created (temp, not committed): isolated card HTML used in splice
- `C:/tmp/index.html.bak-s22` — created (temp, not committed): pre-splice restore point

## Forward Intelligence

### What the next slice should know

- **S23 appends to the same #periodo-rosas container.** The append marker is now at line 2026. Use the same ASCII-only substring `cards will be appended here by subsequent slices` to locate it — do not hardcode line numbers.
- **The card-nota-historiografica count is now 10.** If S23 adds a nota, expect 11.
- **Lynch cap. 8 is consumed.** S23–S24 should use caps. 1–2 (pre-Rosas / early life, relevant for Encarnación's social context) or cap. 9 (Caseros / fall of Rosas) as Lynch citation sources.
- **Alberdi's *La acción de la Europa en América* (1842) has been mentioned in S22-1** — S23/S24 can cross-reference it if relevant, but should not introduce it as if it were new.
- **The scope-boundary check pattern** (`node -e "... const r=f.slice(f.indexOf('## T02 Recipe')); ... banned.filter(b=>r.includes(b))..."`) should be adapted for S23/S24 with their own banned strings. The ASCII-only Node.js approach is mandatory on Windows (no `grep -P`).

### What's fragile

- **Line numbers shift with each splice.** The T02-SUMMARY records lines 2008 and 2026 as of S22-completion. By S24-completion, these will have shifted by the number of lines S23 adds. Never hardcode these line numbers in future splice scripts — always find the marker dynamically.
- **The Monvoisin portrait URL** uses the no-comma filename variant. If Wikimedia renames or moves the file, the image will 404. The `initImageFallbacks` function in `app.js` will catch this and substitute the placeholder, but the alt text will then be the only content for that card image.

### Authoritative diagnostics

- `grep -c 'data-certeza' index.html` — cumulative card counter; should be 89 until S23 adds cards
- `grep -n 'data-id="S22-1"' index.html` — confirms card position within #periodo-rosas
- `grep -n 'cards will be appended here' index.html` — confirms marker is intact and gives current line number for next splice
- `C:/tmp/index.html.bak-s22` — restore point for pre-S22 state (not committed; exists only in current session)

### What assumptions changed

- No assumptions changed. The two-task structure (T01 draft → T02 splice) performed exactly as designed; both tasks passed verification on first attempt with zero backup-restores.
