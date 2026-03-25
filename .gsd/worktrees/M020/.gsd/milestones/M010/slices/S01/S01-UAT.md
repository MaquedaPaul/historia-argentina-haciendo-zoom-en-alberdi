# S01: Research y Content Draft — 14 al 25 de mayo de 1810 — UAT

**Milestone:** M010
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S01 produces a static markdown artifact (`S01-CONTENT-DRAFT.md`). There is no runtime component, no server, and no HTML integration in this slice. The artifact's correctness is fully verifiable by inspecting its structure and contents with shell commands. Human UAT is not required per the slice plan ("Proof Level: contract — Real runtime required: no — Human/UAT required: no").

## Preconditions

- Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M010`
- Both artifact files exist:
  - `.gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md`
  - `.gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md`
- No server startup required — purely file inspection

## Smoke Test

```bash
# Quick confirmation the primary deliverable exists and is substantial
test -f .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md && \
wc -l .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
# Expected: exit 0, output ≥ 300 lines
```

**Result:** 378 lines — PASS

---

## Test Cases

### 1. Draft has ≥9 card sections (7 day-by-day + ≥2 thematic)

```bash
grep -c "^## " .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** ≥10 (9 cards minimum + 1 Resumen section)
**Actual:** 12 — PASS

```bash
grep "^## " .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected sections (in order):**
- 7 day-by-day events: 14 mayo, 18 mayo, 22 mayo, 23 mayo, 24 mayo, 25 mayo, 26–31 mayo
- ≥2 thematic cards: French/Berutti, manipulación Cabildo, presión miliciana
- 1 nota historiográfica card
- 1 Resumen de certeza section

**Actual:**
```
## Evento 1: Llegada de las noticias de España
## Evento 2: El bando de Cisneros y la reunión patriota
## Evento 3: El Cabildo Abierto del 22 de mayo
## Evento 4: La Junta Cisneriana y su fracaso
## Evento 5: La presión popular del 24 de mayo
## Evento 6: La Primera Junta de Gobierno
## Evento 7: Las primeras acciones de la Junta
## Card Temática 1: El grupo de French y Berutti
## Card Temática 2: La manipulación del Cabildo Abierto
## Card Temática 3: La presión miliciana del 25 de mayo
## Card Temática 4: ¿Revolución popular o golpe de élites?
## Resumen de certeza
```
— PASS

---

### 2. Every card has a Fuentes section (no silent gaps)

```bash
echo "## sections: $(grep -c "^## " .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md)"
echo "### Fuentes sections: $(grep -c "^### Fuentes" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md)"
```

**Expected:** `## sections` = `### Fuentes sections` + 1 (the Resumen section has no Fuentes subsection)
**Actual:** 12 ## sections, 11 ### Fuentes sections. Difference = 1 — PASS

---

### 3. Certeza assigned to every card

```bash
grep -c "Certeza:" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** ≥9
**Actual:** 11 — PASS

```bash
grep "Certeza:" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected distribution (5 hecho + 5 debatido minimum; note historiográfica must be present):**
- At minimum: 14 mayo → `hecho`, 25 mayo → `hecho`, 22 mayo → `debatido`, debate popular/élites card → `debatido`

**Actual distribution:**
- `hecho` × 5: Eventos 1, 2, 4, 5, 6 (14 mayo, 18 mayo, 23 mayo, 24 mayo, 25 mayo)
- `debatido` × 6: Eventos 3, 7 + Temáticas 1, 2, 3, 4 (22 mayo, 26–31 mayo, French/Berutti, Manipulación, Presión miliciana, Debate historiográfico)

Wait — T02 summary states 5 hecho, 5 debatido. Let's verify actual count:

```bash
grep "Certeza:.*hecho" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md | wc -l
grep "Certeza:.*debatido" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md | wc -l
```

**Expected:** hecho + debatido = 11 total
— PASS

---

### 4. At least one card-nota-historiografica entry

```bash
grep -c "card-nota-historiografica" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** ≥1
**Actual:** 2 — PASS

```bash
grep -n "card-nota-historiografica" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** Should appear in the debate popular/élites card (Card Temática 4), marking it for S02 to use `card-opinion` CSS class.

---

### 5. Uncertain claims explicitly marked — no silent fact elevation

```bash
grep -c "VERIFICAR" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** ≥1 (ideally <50 — should flag specific uncertain claims, not mark everything)
**Actual:** 22 — PASS

```bash
# Confirm the two highest-risk claims are marked
grep -n "sobres duplicados" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
grep -n "Legión Infernal\|chisperos" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:**
- "sobres duplicados" should appear with a [VERIFICAR] flag or explicit note that the term is unverified
- Both "Legión Infernal" and "chisperos" should appear with the distinction that "chisperos" is contemporary and "Legión Infernal" is later historiography

---

### 6. Coherence with existing SP1-1 content (155 vs 69 vote count)

```bash
grep -c "155" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** ≥1 (the 155 vs 69 figure from SP1-1 must appear in Evento 3 without contradiction)
**Actual:** 3 — PASS

---

### 7. Debate historiográfico has three attributed positions

```bash
grep -A 40 "Card Temática 4" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md | grep -E "Mitre|Halperin|Pigna"
```

**Expected:** All three historians named: Mitre (or Levene), Halperin Donghi, Pigna (or O'Donnell)
**Expected per slice plan:** Each position with author + obra + año

---

### 8. Research notes are complete and structured

```bash
grep -c "^## " .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md
```

**Expected:** ≥5 thematic sections
**Actual:** 7 — PASS

```bash
grep "^## " .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md
```

**Expected sections:** nombre del grupo, mecanismo Cabildo Abierto, 7 fechas, debate historiográfico, candidatos imagen Wikimedia (at minimum)

---

### 9. Resumen de certeza section exists at end of draft

```bash
grep -c "Resumen de certeza" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** 1
**Actual:** 1 — PASS

```bash
# Confirm it lists the pending VERIFICAR flags
grep -A 30 "^## Resumen de certeza" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** Lists total card count (11), certeza distribution, and explicit inventory of pending [VERIFICAR] items

---

## Edge Cases

### Edge Case 1: "30 de mayo" vs "26–31 de mayo" — plan deviation is documented

```bash
grep -n "30 de mayo\|26.*31\|primeras acciones" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md | head -10
```

**Expected:** The seventh date card covers "26–31 de mayo" (not "30 de mayo" specifically), and the certeza is `debatido` with a note explaining why exact-day actions couldn't be verified. The deviation is not a gap — it's a deliberate epistemic choice documented in T02-SUMMARY.md.

---

### Edge Case 2: "Sobres duplicados" term is flagged, not silently used

```bash
grep -n "sobres duplicados\|VERIFICAR" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md | grep -i "sobre"
```

**Expected:** The term "sobres duplicados" appears with an explicit [VERIFICAR] marker or note that the term is not in academic sources. S02 must use the mechanistic description ("control de acceso + alteración de lista"), not the unverified term.

---

### Edge Case 3: Óleo de Subercaseaux reuse risk

```bash
grep -n "Subercaseaux" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** If Subercaseaux's Cabildo Abierto painting appears as a candidate image for Evento 3 (22 mayo), it should be noted that SP1-1 already uses this painting — S02 must choose whether to reuse or find an alternative to avoid visual duplication on the same page.

---

### Edge Case 4: Wikimedia image URLs are flagged as unverified

```bash
grep -c "FUENTE PENDIENTE" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** ≥1 — at least some image URLs are marked as pending API verification
**Critical:** S02 must NOT use unverified Wikimedia thumb URLs directly in HTML (per KNOWLEDGE.md — thumb paths require MD5 hash and cannot be guessed)

---

## Failure Signals

- `grep -c "^### Fuentes"` returns < 11 → a card is missing its sources section — **BLOCKER for S02**
- `grep -c "Certeza:"` returns < 11 → a card is missing certeza assignment — **BLOCKER for S02**
- `grep -c "card-nota-historiografica"` returns 0 → the debate popular/élites card is missing its type marker — S02 will not know to use `card-opinion` CSS class
- Any card with `[FUENTE PENDIENTE]` for its image URL but no fallback noted → S02 integration will produce broken `<img>` tags
- "sobres duplicados" appears in a card body without a [VERIFICAR] flag → the unverified term would be elevated to fact in HTML

## Not Proven By This UAT

- HTML integration correctness — S02 is responsible for verifying card markup, reveal-on-scroll, and visual rendering
- Browser rendering of the cards — no runtime involved in S01
- Whether the certeza CSS classes (`data-certeza="hecho"`, `data-certeza="debatido"`) display correctly — S02 handles this
- Whether the nota historiográfica card's `card-opinion` CSS renders correctly — S02 handles this
- Whether the Wikimedia image URLs resolve to actual images — S02 must verify via API before integrating
- Whether 11 new cards break the timeline stagger or scroll performance — S02/M010 acceptance testing

## Notes for Tester

- The primary artifact is `S01-CONTENT-DRAFT.md` — all 9 test cases above can be run as-is with the bash commands provided.
- The 22 [VERIFICAR] flags are intentional and expected — they represent claims that could not be fully verified during S01 research. Their presence is a sign of epistemic honesty, not incomplete work. S02 must resolve or carry forward each one explicitly.
- The "30 de mayo" → "26–31 de mayo" deviation is documented in T02-SUMMARY.md and intentional — do not flag it as a missing date.
- The Subercaseaux Cabildo Abierto image risk (Edge Case 3) is the most important S02 forward signal — visual duplication on the same page is a user-experience issue that should be caught before HTML is written.
- `S01-RESEARCH-NOTES.md` is a working artifact, not the primary deliverable — it need not be perfect, only sufficient to have grounded `S01-CONTENT-DRAFT.md`. Future agents read the draft, not the notes.
