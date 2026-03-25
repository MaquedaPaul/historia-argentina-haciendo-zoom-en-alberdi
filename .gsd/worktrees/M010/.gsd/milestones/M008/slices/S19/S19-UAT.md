# S19: ¿Rosas fue un tirano? — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S19 is a pure static-content splice — no logic, no API, no new CSS/JS. The artifact (index.html) is the complete deliverable. DOM-level checks and visual inspection of the rendered cards are sufficient to prove all acceptance criteria.

## Preconditions

1. Working directory is `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`
2. `index.html` has been modified by the S19 splice (data-certeza=84, card-nota-historiografica=8)
3. A browser or DOM-level inspection tool is available
4. No local server required — `index.html` can be opened directly as `file://` or served via any static server

## Smoke Test

Run in shell:
```sh
grep -c 'data-certeza' index.html
```
**Expected:** `84` — confirms both S19 cards are present in the DOM.

---

## Test Cases

### 1. S19-1 card is present and correctly classified

1. Run: `grep -c 'data-id="S19-1"' index.html`
2. **Expected:** `1`
3. Run: `grep 'data-certeza' index.html | grep 'S19-1'`
4. **Expected:** Line contains `data-certeza="debatido"`
5. Run: `grep -A 3 'data-id="S19-1"' index.html | grep 'card-opinion'`
6. **Expected:** Line found (confirms `card-opinion` CSS class)

### 2. S19-2 card is present and correctly classified

1. Run: `grep -c 'data-id="S19-2"' index.html`
2. **Expected:** `1`
3. Run: `grep -A 3 'data-id="S19-2"' index.html | grep 'reveal-slide'`
4. **Expected:** Line found (confirms reveal animation class)
5. Run: `grep -A 5 'data-id="S19-2"' index.html | grep 'reveal-delay: 80ms'`
6. **Expected:** Line found (confirms stagger delay)

### 3. Three-position card-nota-historiografica is present

1. Run: `grep -c 'card-nota-historiografica' index.html`
2. **Expected:** `8`
3. Run: `grep -A 2 'card-nota-historiografica' index.html | grep -c 'Nota historiogr'`
4. **Expected:** `8` (all 8 notas have the bold label)
5. Verify that the S19-2 nota contains all three positions:
   - Run: `grep 'card-nota-historiografica' index.html | grep -c 'Irazusta'` → Expected `1`
   - Run: `grep 'card-nota-historiografica' index.html | grep -c 'Lynch'` → Expected (≥1 somewhere on the page; for S19-2 specifically): `grep -A 1 'data-id="S19-2"' index.html | grep -c 'Lynch'` → may need broader context; alternatively open in browser and search for "Lynch" in the S19-2 card text

### 4. S19-1 picks up S18 forward reference (narrative continuity)

1. Open `index.html` in a browser and navigate to the `#periodo-rosas` section
2. Scroll to find the card with heading "¿Rosas fue un tirano? La pregunta central de la historiografía argentina"
3. Read the excerpt
4. **Expected:** The text references S18's conspiracy documentation ("La sección S18 demostró que la oposición conspiraba") and then poses the follow-on question about deliberate political control
5. Alternatively, via DOM: `grep -A 20 'data-id="S19-1"' index.html | grep 'S18'` → **Expected:** line containing S18 reference found

### 5. S19 nota is scoped to domestic tiranía only (scope boundary)

1. Open `index.html` in a browser
2. Locate S19-2 card ("Tres posiciones sobre el carácter del régimen rosista")
3. Read the nota historiográfica paragraph
4. **Expected:** The nota explicitly states the debate is confined to "ámbito doméstico — represión, libertades civiles, personalismo" AND explicitly defers the soberanía exterior argument to a later section
5. Via DOM: `grep 'circunscribe' index.html` → **Expected:** Line found containing "circunscribe el debate al ámbito doméstico"

### 6. Append marker remains intact (inter-slice coordination)

1. Run: `grep -c 'cards will be appended here' index.html`
2. **Expected:** `1` (exactly one — not deleted, not duplicated)

### 7. No CSS or JS regressions

1. Run: `git diff --name-only HEAD -- styles.css app.js`
2. **Expected:** Empty output (no changes to either file)

### 8. Reveal-on-scroll works for both S19 cards

1. Open `index.html` in a browser
2. Scroll to the bottom of `#periodo-rosas` (the Rosas section)
3. **Expected:** S19-1 appears first with no delay; S19-2 appears ~80ms later as the cards enter viewport
4. Both cards should have the `reveal reveal-slide` CSS classes:
   - Run: `grep 'data-id="S19-' index.html | grep 'reveal-slide'` → **Expected:** 2 lines found

### 9. Sources are cited and complete for both cards

1. Open `index.html` in a browser
2. Navigate to S19-1 card footer
3. **Expected:** Footer `<cite>` contains: Sarmiento (Facundo, 1845), Mitre (Historia de Belgrano, 1857), Myers (Orden y virtud, UNQ, 1995)
4. Navigate to S19-2 card footer
5. **Expected:** Footer `<cite>` contains: Lynch (Argentine Dictator, Oxford, 1981, cap. 10), Halperín Donghi (De la revolución de independencia, Paidós, 1972), Myers (Orden y virtud, UNQ, 1995), Irazusta (Vida política de Juan Manuel de Rosas, 1941)

---

## Edge Cases

### Edge Case 1: Lynch chapter citation is cap. 10 (not cap. 7 or cap. 6)

1. Run: `grep 'Lynch' index.html | grep 'S19-2\|cap\. 10'` — or inspect the S19-2 card source
2. **Expected:** S19-2's Lynch citation reads "cap. 10" specifically — not cap. 7 (used in S16) and not cap. 6 (used in S18)
3. **Why:** Confirms the Lynch citation chain integrity — each slice uses a distinct chapter

### Edge Case 2: S19 nota does NOT mention bloqueos or soberanía exterior

1. Run: `grep -A 50 'data-id="S19-2"' index.html | grep -c 'bloqueo\|soberan'`
2. **Expected:** `0` — the S19-2 nota text should not contain "bloqueo" or "soberan"
3. **Why:** Proves that the scope boundary between S19 (domestic) and S22 (exterior sovereignty) was respected

### Edge Case 3: data-certeza="debatido" (not "opinión") on both S19 cards

1. Run: `grep 'data-id="S19-' index.html | grep 'data-certeza'`
2. **Expected:** Both lines show `data-certeza="debatido"` — not `data-certeza="opini&#xF3;n"` (the S17+ interpretive pattern)
3. **Why:** S19 follows the S14–S16 nota pattern (debatido) not the S17 counterfactual pattern (opinión). Both are valid; the distinction matters for downstream CSS selectors and analytics.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns **82** (not 84) → one or both S19 cards are missing; check `C:/tmp/s19-cards.html` for completeness
- `grep -c 'card-nota-historiografica' index.html` returns **7** (not 8) → S19-2's nota paragraph was dropped during splice; compare `C:/tmp/s19-cards.html` against live index.html
- `grep -c 'cards will be appended here' index.html` returns **0** → marker was deleted; this breaks all subsequent slices (S20–S24); restore from `C:/tmp/index.html.bak-s19`
- `grep -c 'cards will be appended here' index.html` returns **2** → marker was duplicated; splice ran twice; restore from backup
- `git diff --name-only HEAD -- styles.css app.js` returns non-empty output → unauthorized CSS/JS change; investigate and revert
- S19-2 nota text contains "bloqueo" or "soberan" → scope boundary was breached; the soberanía exterior argument leaked into S19

## Not Proven By This UAT

- Visual rendering quality and typography at mobile/desktop breakpoints (requires browser viewport testing)
- Reveal animation timing under real scroll conditions (requires live browser interaction)
- Cross-browser compatibility (Chrome/Firefox/Safari differences in animation rendering)
- Historical accuracy of the three positions described in the nota (content verification is a human/historian task)
- That the Lynch cap. 10 citation corresponds to the actual chapter on historiographic debate in the 1981 Oxford edition (primary source verification required)

## Notes for Tester

- Both S19 cards use `data-certeza="debatido"` with the ⚖ icon — this is intentional and correct (they are part of the nota historiográfica pattern, not the counterfactual/interpretive S17+ pattern). If the icon appears as 💬 instead of ⚖, there is a certeza value mismatch.
- The S19-2 nota is long by design — it contains three fully sourced positions. On mobile, the card will be taller than surrounding cards; this is acceptable per the zero-new-CSS constraint.
- The S18→S19 narrative link is in S19-1's excerpt text, not in any structural HTML element. To verify it, read the card text — it should feel like a natural continuation of S18's conspiracy documentation.
- S22 is the next debate card on soberanía exterior. If testing the full narrative flow, read S19-2's scope boundary note then jump ahead to S22 (when implemented) to verify the deferred argument is fulfilled.
