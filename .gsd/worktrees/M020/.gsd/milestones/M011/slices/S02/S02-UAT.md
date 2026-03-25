---
id: S02-UAT
parent: S02
milestone: M011
uat_mode: artifact-driven
written: 2026-03-24
---

# S02: Research — Alberdi y Cané, la escena del "Cielo..." y los romances — UAT

**Milestone:** M011
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S02 is a pure research/drafting slice — it produces no HTML, no CSS, no JS, and no runtime behavior. The deliverable is a markdown content draft (`S02-CONTENT-DRAFT.md`). All slice goals (card presence, certeza coverage, 0 VERIFICAR flags, source coverage, HTML insertion notes) are fully verifiable by inspecting that file. No browser or live-runtime testing applies.

## Preconditions

- `S02-CONTENT-DRAFT.md` must exist at `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md`
- No other files are required to run this UAT

## Smoke Test

```bash
cd "C:/Users/gabri/Desktop/historia/.gsd/worktrees/M011"
test -f .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && grep -c "^## M011-" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && echo "SMOKE PASS: draft exists with cards"
```
Expected output: `4` followed by `SMOKE PASS: draft exists with cards`

---

## Test Cases

### 1. Draft file exists and is non-empty

```bash
test -f .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && [ "$(wc -c < .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md)" -gt 1000 ] \
  && echo "PASS" || echo "FAIL"
```
**Expected:** `PASS` — file exists and has substantial content (>1000 bytes)

---

### 2. CANE-1 card present with expected metadata

```bash
DRAFT=.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
grep -q "## M011-CANE-1" "$DRAFT" && echo "CANE-1 heading: PASS" || echo "CANE-1 heading: FAIL"
grep -q "M011-CANE-1" "$DRAFT" && echo "CANE-1 id: PASS" || echo "CANE-1 id: FAIL"
grep -A5 "## M011-CANE-1" "$DRAFT" | grep -q "Certeza: hecho" && echo "CANE-1 certeza hecho: PASS" || echo "CANE-1 certeza hecho: FAIL"
grep -A20 "## M011-CANE-1" "$DRAFT" | grep -q "San Bernardo" && echo "CANE-1 Gutiérrez quote present: PASS" || echo "CANE-1 Gutiérrez quote: FAIL"
```
**Expected:** All four lines print PASS

**Rationale:** CANE-1 must have certeza `hecho` (arco de la amistad con fuentes verificadas) and the Gutiérrez letter quote which is the strongest independent evidence for depth of the friendship.

---

### 3. CANE-2 card present with "cielo" and certeza debatido

```bash
DRAFT=.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
grep -q "## M011-CANE-2" "$DRAFT" && echo "CANE-2 heading: PASS" || echo "CANE-2 heading: FAIL"
grep -A5 "## M011-CANE-2" "$DRAFT" | grep -q "Certeza: debatido" && echo "CANE-2 certeza debatido: PASS" || echo "CANE-2 certeza debatido: FAIL"
grep -i -q "cielo" "$DRAFT" && echo "cielo reference: PASS" || echo "cielo reference: FAIL"
grep -q "cielito" "$DRAFT" && echo "cielito reference: PASS" || echo "cielito reference: FAIL"
grep -q "género" "$DRAFT" && echo "genre clarification: PASS" || echo "genre clarification: FAIL"
```
**Expected:** All five lines print PASS

**Rationale:** The central research finding of T01 is that "cielo" is a genre (cielito), not a specific song. The card must reflect this with both "cielo" and "cielito" referenced, and must be `debatido` because the exact scene couldn't be verified against a paginated edition.

---

### 4. Vicente Fidel López distinction is present in CANE-2

```bash
DRAFT=.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
grep -q "Vicente Fidel López" "$DRAFT" && echo "VFL name: PASS" || echo "VFL name: FAIL"
grep -q "1815" "$DRAFT" && echo "VFL birth year: PASS" || echo "VFL birth year: FAIL"
grep -q "Vicente López y Planes" "$DRAFT" && echo "VLP disambiguation: PASS" || echo "VLP disambiguation: FAIL"
```
**Expected:** All three lines print PASS

**Rationale:** The distinction between father (Himno Nacional author) and son (Gen. del 37 historian) is a critical factual finding of S02, documented in KNOWLEDGE.md. S03 must have this information clearly in the draft to avoid a historical error in the HTML.

---

### 5. Romance card M011-ROM-1 present with certeza hecho

```bash
DRAFT=.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
grep -q "## M011-ROM-1" "$DRAFT" && echo "ROM-1 heading: PASS" || echo "ROM-1 heading: FAIL"
grep -A5 "## M011-ROM-1" "$DRAFT" | grep -q "Certeza: hecho" && echo "ROM-1 certeza hecho: PASS" || echo "ROM-1 certeza hecho: FAIL"
grep -A30 "## M011-ROM-1" "$DRAFT" | grep -q "Martino" && echo "ROM-1 Martino source: PASS" || echo "ROM-1 Martino source: FAIL"
grep -A30 "## M011-ROM-1" "$DRAFT" | grep -q "nunca se casó" && echo "ROM-1 célibe fact: PASS" || echo "ROM-1 célibe fact: FAIL"
```
**Expected:** All four lines print PASS

**Rationale:** The biographical pattern of discretion (no marriage, no documented children, structural omission in *Mi vida privada*) qualifies as certeza `hecho` because it's confirmed by multiple independent academic sources (Martino 2016, Terán 2004, primary text inspection). The card must have the Martino citation as it's the most rigorous academic source.

---

### 6. Romance card M011-ROM-2 present with certeza rumor and verification route

```bash
DRAFT=.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
grep -q "## M011-ROM-2" "$DRAFT" && echo "ROM-2 heading: PASS" || echo "ROM-2 heading: FAIL"
grep -A5 "## M011-ROM-2" "$DRAFT" | grep -q "Certeza: rumor" && echo "ROM-2 certeza rumor: PASS" || echo "ROM-2 certeza rumor: FAIL"
grep -q "Ana María Medeiros" "$DRAFT" && echo "ROM-2 candidate named: PASS" || echo "ROM-2 candidate named: FAIL"
grep -q "Mayer" "$DRAFT" && echo "ROM-2 verification route to Mayer: PASS" || echo "ROM-2 verification route to Mayer: FAIL"
grep -A50 "## M011-ROM-2" "$DRAFT" | grep -q "card-nota-certeza" && echo "ROM-2 nota inline: PASS" || echo "ROM-2 nota inline: FAIL"
```
**Expected:** All five lines print PASS

**Rationale:** The card must be explicit that this is `rumor` with zero verified sources, must name the candidate, must point to Mayer (1963) as the verification path, and must include the inline `card-nota-certeza` span that surfaces the epistemics to readers.

---

### 7. Zero unresolved VERIFICAR flags

```bash
VERIFY_COUNT=$(grep -c '\[VERIFICAR\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md 2>/dev/null || echo "0")
[ "$VERIFY_COUNT" = "0" ] && echo "PASS: 0 VERIFICAR flags" || echo "FAIL: $VERIFY_COUNT flags remain"
```
**Expected:** `PASS: 0 VERIFICAR flags`

**Rationale:** The slice plan explicitly requires 0 VERIFICAR flags before S03 can consume the draft. Any non-zero result is a hard blocker for HTML integration.

---

### 8. Every card has exactly one Certeza line (coverage check)

```bash
DRAFT=.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
CARD_COUNT=$(grep -c "^## M011-" "$DRAFT")
CERTEZA_COUNT=$(grep -c "^- Certeza:" "$DRAFT")
echo "Cards: $CARD_COUNT  Certeza lines: $CERTEZA_COUNT"
[ "$CARD_COUNT" = "$CERTEZA_COUNT" ] && echo "PASS: certeza coverage complete" || echo "FAIL: mismatch"
```
**Expected:** `Cards: 4  Certeza lines: 4` followed by `PASS: certeza coverage complete`

---

### 9. All four cards have HTML insertion notes

```bash
DRAFT=.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
NOTE_COUNT=$(grep -c "Nota de inserción HTML" "$DRAFT")
[ "$NOTE_COUNT" = "4" ] && echo "PASS: 4 HTML insertion notes" || echo "FAIL: expected 4, found $NOTE_COUNT"
```
**Expected:** `PASS: 4 HTML insertion notes`

**Rationale:** S03 requires actionable insertion specs for each card. Each card must have its own HTML insertion note.

---

### 10. Each card specifies a data-certeza value compatible with the certeza system

```bash
DRAFT=.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
grep "data-certeza value:" "$DRAFT"
```
**Expected output (exact values):**
```
- data-certeza value: hecho
- data-certeza value: debatido
- data-certeza value: hecho
- data-certeza value: rumor
```

**Rationale:** The HTML certeza system accepts `hecho`, `debatido`, and `rumor`. All four values used here are valid. This check confirms S03 can use these values directly in `data-certeza` attributes without transformation.

---

## Edge Cases

### Edge Case 1: "cielo" reference is about the genre, not a song title

```bash
DRAFT=.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
grep -i "cielo" "$DRAFT" | grep -v "género\|genre\|cielito\|musical\|danza\|patriótico\|canción" | head -5
```
**Expected:** The lines returned should not treat "cielo" as if it were a named song. Any line that calls it a "canción" without the context of "género musical" would indicate the research finding was not correctly applied.

---

### Edge Case 2: CANE-2 does not have certeza hecho (it must remain debatido)

```bash
grep -A3 "## M011-CANE-2" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md | grep "Certeza:"
```
**Expected:** `- Certeza: debatido`

**If it shows `hecho`:** This would mean verification was falsely claimed. The slice plan requires that certeza only be upgraded when the paginated source is consulted directly.

---

### Edge Case 3: No card has been given certeza hecho based solely on secondary sources about a specific quote

```bash
grep -B2 "Certeza: hecho" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
```
**Expected:** The two `hecho` cards are CANE-1 (arco biográfico con múltiples fuentes independientes) and ROM-1 (patrón de silencio documentado por académicos). Neither is a specific unverified direct quote.

---

### Edge Case 4: ROM-2 does not silently omit the absence-of-sources disclosure

```bash
grep -A10 "## M011-ROM-2" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md | grep -i "sin fuente\|no aparece\|no tiene fuente\|ninguna fuente"
```
**Expected:** At least one match — ROM-2 must explicitly state the absence of sources, not just silently assert the content.

---

## Failure Signals

- `test -f S02-CONTENT-DRAFT.md` returns non-zero → draft was never created or was deleted
- `grep -c "^## M011-" S02-CONTENT-DRAFT.md` returns fewer than 4 → T01 or T02 cards are missing
- `grep -c '\[VERIFICAR\]' S02-CONTENT-DRAFT.md` returns non-zero → unresolved flags block S03 integration
- `CARD_COUNT != CERTEZA_COUNT` → at least one card lacks certeza assignment; S03 cannot use incomplete cards
- CANE-2 certeza is `hecho` instead of `debatido` → certeza was falsely promoted without source verification
- ROM-2 certeza is `debatido` or higher → certeza was elevated without bibliographic support (Ana María Medeiros has no verified source)
- `grep "Nota de inserción HTML" S02-CONTENT-DRAFT.md | wc -l` returns fewer than 4 → S03 lacks insertion specs for at least one card

## Not Proven By This UAT

- The factual accuracy of the biographical claims about Alberdi and Cané against print editions of *Mi vida privada* — this requires library access to Mayer (1963) and the FNA (1999) edition
- The exact passage in *Mi vida privada* that describes the "cielo" farewell scene — intentionally deferred and flagged; S03 must verify before integrating M011-CANE-2
- Whether "Ana María Medeiros" appears anywhere in Mayer (1963) — intentionally deferred; S03 should check before integrating M011-ROM-2 into public HTML
- Runtime behavior of the reveal-on-scroll system for the new cards — deferred to S03 UAT
- Visual rendering of the cards and `card-nota-certeza` spans — deferred to S03 UAT

## Notes for Tester

- The most important check is Test Case 7 (zero VERIFICAR flags) — any non-zero result is a hard blocker.
- The most important nuance is Test Cases 2 and 3 together: CANE-2 references "cielo" as a genre/cielito, AND has certeza `debatido`. If either fails, the core research finding of T01 was not applied correctly.
- M011-ROM-2 at certeza `rumor` is intentional and correct — do not treat it as an error. The card documents a gap in the historical record, which is a valid and useful contribution to S03.
- Test Case 4 (Vicente Fidel López) is easy to skip but important for S03: if the HTML integrator doesn't see the disambiguation, they may write "Vicente López" ambiguously in the public page.
