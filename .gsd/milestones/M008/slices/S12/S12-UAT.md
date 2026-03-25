# S12: La gobernación en un país dividido — caudillos y Buenos Aires — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S12 is a static-HTML content slice. The deliverable is two `card-hecho` articles spliced into `index.html`. All correctness signals are fully observable via `grep` on the file — card count, slice markers, append marker uniqueness, and CSS/JS immutability. No server, no runtime JS changes, no user interaction changes were introduced.

## Preconditions

- Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`
- `index.html` must exist and be readable.
- `styles.css` and `app.js` are the CSS/JS guard — must not have been modified.
- The S12-CONTENT-DRAFT.md must exist (confirms research artifact is present).

## Smoke Test

```bash
grep -c 'data-certeza' index.html
```
**Expected:** `69` — confirms both S12 cards landed in the file and no prior cards were removed.

---

## Test Cases

### 1. Card count is exactly 69

```bash
grep -c 'data-certeza' index.html
```
1. Run the command from the working directory.
2. **Expected:** `69` (was 67 before S12; +2 = 69). Any other value indicates a splice failure or unintended modification.

---

### 2. Both S12 slice identifiers are present

```bash
grep -c 'S12-' index.html
```
1. Run the command.
2. **Expected:** `2` — exactly one occurrence for S12-1 and one for S12-2. A value of `0` means the splice didn't execute. A value of `4+` means the cards were inserted twice (duplicate splice).

---

### 3. Append marker is unique and intact

```bash
grep -c 'cards will be appended here' index.html
```
1. Run the command.
2. **Expected:** `1` — the marker must remain present (S13–S24 depend on it) and must not be duplicated.

---

### 4. Card S12-1 content is correct

```bash
grep -A 5 'S12-1' index.html | head -10
```
1. Run the command.
2. **Expected:** Output contains `data-certeza="hecho"`, `--reveal-delay: 0ms`, and text referencing caudillos or governance. Confirms the first card has the right certeza and stagger.

---

### 5. Card S12-2 content is correct

```bash
grep -A 5 'S12-2' index.html | head -10
```
1. Run the command.
2. **Expected:** Output contains `data-certeza="hecho"`, `--reveal-delay: 80ms`, and text referencing Pacto Federal or 1831. Confirms the second card has the right certeza and stagger.

---

### 6. No CSS or JS was modified

```bash
git diff --name-only HEAD -- styles.css app.js
```
1. Run the command.
2. **Expected:** Empty output. Any filename listed means a prohibited modification occurred outside slice scope.

---

### 7. Research draft exists and is non-empty

```bash
test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md && echo "DRAFT OK"
```
1. Run the command.
2. **Expected:** `DRAFT OK` — confirms the intermediate research artifact is present.

---

### 8. S13 insertion point is at line 1682

```bash
grep -n 'cards will be appended here by subsequent slices' index.html
```
1. Run the command.
2. **Expected:** Output shows line **1682** (or close — exact line may vary slightly if the file was touched). This is the authoritative insertion point for the S13 executor. A substantially different line number would require S13 planning to re-anchor.

---

### 9. Cards are positioned before the closing div of #periodo-rosas grid

```bash
grep -n 'S12-\|cards will be appended\|/div' index.html | grep -A3 'S12-2'
```
1. Run the command.
2. **Expected:** The append marker comment and closing `</div>` appear after the S12-2 card's closing `</article>` tag. Confirms insertion order: S12-1 → S12-2 → marker → `</div>`.

---

### 10. Both cards have ≥2 cited sources in the HTML

```bash
grep -c 'Halperin\|Lynch\|Pacto Federal\|Goldman' index.html
```
1. Run the command.
2. **Expected:** `≥4` — each card cites at least 2 named sources. Halperin Donghi and Lynch appear in both cards; Goldman appears in S12-1; Pacto Federal primary text cited in S12-2.

---

## Edge Cases

### Duplicate-insertion check

```bash
grep -c 'S12-1\|S12-2' index.html
```
1. **Expected:** Each pattern returns `1`. If `S12-1` returns `2`, the Node.js splice ran twice — diagnose by reading lines around both occurrences; restore from `C:/tmp/index.html.bak-s12` if needed.

---

### Marker destruction check

If `grep -c 'cards will be appended here' index.html` returns `0`:
1. The marker was accidentally deleted — future slices (S13–S24) cannot find their insertion point.
2. **Recovery:** Check `C:/tmp/index.html.bak-s12` for the marker's original position; restore the marker manually at the correct location before S13 executes.

---

### CSS/JS contamination check

If `git diff --name-only HEAD -- styles.css app.js` is non-empty:
1. Inspect `git diff HEAD -- styles.css` and `git diff HEAD -- app.js` to identify what changed.
2. Revert the file(s) with `git checkout HEAD -- styles.css app.js`.
3. Re-run all slice verifications.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns `67` → T02 splice did not execute; re-run T02.
- `grep -c 'data-certeza' index.html` returns `71+` → Duplicate insertion; restore from backup and re-splice once.
- `grep -c 'cards will be appended here' index.html` returns `0` → Marker destroyed; S13–S24 blocked until restored.
- `grep -c 'cards will be appended here' index.html` returns `2` → Marker duplicated; remove the extra occurrence.
- `git diff --name-only HEAD -- styles.css app.js` is non-empty → Scope violation; revert immediately.
- `grep -c 'S12-' index.html` returns `0` → Cards not present; T02 needs re-run.
- `grep -c 'S12-' index.html` returns `4+` → Cards duplicated; restore from backup.

## Not Proven By This UAT

- Visual rendering: This UAT does not open a browser to confirm the cards render correctly with the reveal-on-scroll animation. (The reveal system is tested end-to-end in the M008 milestone UAT; S12 cards use the same pattern established in S09–S11.)
- Image load success: Wikimedia Commons image URLs are API-verified in the content draft, but actual HTTP availability is not checked here. Browser verification of the full site would confirm image rendering.
- Mobile responsiveness: Not tested per-slice — the card template is the same used in all prior slices and verified responsive at the milestone level.

## Notes for Tester

- All verification commands are idempotent — safe to run multiple times.
- The authoritative S13 insertion point is **line 1682** — record this before S13 executes, as the splice will move the marker again.
- If any check fails unexpectedly, start with `cp C:/tmp/index.html.bak-s12 index.html` to restore the pre-S12 state (67 cards), then investigate what went wrong before re-running T02.
- The two S12 cards are factual-only. If a reviewer notices missing historiographic nuance about caudillismo or the Pacto Federal, that debate content is intentionally reserved for S17–S19 per the slice plan.
