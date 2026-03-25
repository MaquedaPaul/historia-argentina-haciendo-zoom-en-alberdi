---
estimated_steps: 5
estimated_files: 1
---

# T01: Author S22-CONTENT-DRAFT.md with soberanía exterior debate and entity-encoded T02 Recipe

**Slice:** S22 — ¿Sin Rosas la Patria hubiera caído?
**Milestone:** M008

## Description

Research and write the content draft for card S22-1, which frames the soberanía exterior historiographic debate: the revisionist thesis that Rosas's resistance to the French and Anglo-French bloqueos preserved Argentine sovereignty over the Río de la Plata interior river system, and the liberal counter-thesis that this intransigence was costly and unnecessary. The draft must produce both readable prose and a fully entity-encoded T02 Recipe HTML block ready for mechanical splice.

S22-1 is a single `card-opinion` card following the S17-1 pattern: one article element with a main excerpt paragraph and an embedded `card-nota-historiografica` (three-position format). This is **distinct** from S17-1 (internal order / "was Rosas historically necessary?") and S19-1/S19-2 (tyranny debate) — S22 focuses exclusively on **foreign-policy sovereignty**: did Rosas's resistance prevent Argentina from losing control of its river navigation system to European powers?

## Steps

1. **Read S17-1 in index.html for structural reference.** Run `grep -n 'data-id="S17-1"' index.html` to find the line, then read ~40 lines from that point to study the exact HTML structure: certeza indicator block, year span, title h3, excerpt p, card-nota-historiografica p, card-source footer.

2. **Map the scope boundary.** The draft excerpt must NOT re-narrate: (a) the bloqueo francés 1838–1840 narrative (already in S14-2); (b) Vuelta de Obligado as a narrative event (S14-2); (c) the internal-order necessity argument (S17-1); (d) Caseros / fall of Rosas (S14-2/S20). Instead: open with "los hechos del período —detallados en las tarjetas S14-1 y S14-2—" as the establishing cross-reference, then immediately pivot to the interpretive question: *what was the historiographic significance of that resistance for Argentine sovereignty?*

3. **Write the draft file** at `.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` with three sections:

   **Section `## S22-1`** (prose description):
   - Card title: `¿Sin Rosas, Argentina habría perdido la soberanía sobre sus ríos?`
   - Year display: `debate historiográfico`
   - Image: Monvoisin portrait — `https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas.jpg/500px-Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas.jpg`; alt text describing Rosas; caption: `Raymond Monvoisin (1790–1870), ca. 1842. Wikimedia Commons. Dominio público.`
   - Excerpt (2–4 sentences): establishes the debate. Opens with cross-reference to S14-1/S14-2 as instructed; pivots to the interpretive question about sovereignty over ríos interiores; optionally notes Alberdi's *La acción de la Europa en América* (1842) as a unitario voice that partially converged with the revisionista foreign-policy conclusion.
   - Nota historiográfica three positions:
     - **Revisionista:** Irazusta, J. e I., *La Argentina y el imperialismo británico*, 1934; Irazusta, J., *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941. Thesis: a unitario pro-European government would have capitulated on ríos interiores navigation and consular privileges; Rosas's intransigence was what preserved economic and territorial sovereignty.
     - **Liberal:** Halperín Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972. Thesis: Rosas's intransigence was diplomatically costly and unnecessary; Urquiza's post-Caseros diplomacy (1852–1860) achieved stable international recognition without surrendering sovereignty — demonstrating that the choice was not binary between capitulation and Rosas.
     - **Síntesis contemporánea:** Lynch, J., *Argentine Dictator*, Oxford, 1981, **cap. 8**. Thesis: Rosas's resistance achieved a real sovereignty outcome (European powers did not gain free navigation rights during his government), but the diplomatic cost — prolonged isolation, trade disruption, Uruguay's effective independence — was also real; the synthesis does not vindicate either camp fully but distinguishes the sovereignty *achievement* from the diplomatic *method*.
   - Source cite: Irazusta, J. e I. (1934); Irazusta, J. (1941); Halperín Donghi (1972); Lynch (1981, cap. 8).

   **Section `## T02 Recipe`** — the verbatim HTML to splice, **fully entity-encoded** (no raw non-ASCII characters). Use these entity mappings consistently:
   - `ó` → `&#xF3;`
   - `é` → `&#xE9;`
   - `á` → `&#xE1;`
   - `í` → `&#xED;`
   - `ú` → `&#xFA;`
   - `ñ` → `&#xF1;`
   - `ü` → `&#xFC;`
   - `¿` → `&#xBF;`
   - `«` → `&#xAB;`
   - `»` → `&#xBB;`
   - `—` → `&#x2014;`
   - `–` → `&#x2013;`
   - `"` → `&#x201C;`
   - `"` → `&#x201D;`
   - `💬` → `&#x1F4AC;`
   - `📄` → `&#x1F4C4;`

4. **Run entity check** on the T02 Recipe block:
   ```
   node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const lines=r.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(lines.length===0?'ENTITY_PASS':'ENTITY_FAIL:'+lines.length+' lines with non-ASCII');"
   ```
   If FAIL, find and encode the offending characters before proceeding.

5. **Run scope-boundary check** on the T02 Recipe block:
   ```
   node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['Vuelta de Obligado','Convenci\u00f3n Mackau','octubre de 1840','bloqueo franc\u00e9s','1838 y 1840','Caseros','3 de febrero de 1852']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"
   ```
   If SCOPE_FAIL, revise the T02 Recipe HTML to remove re-narrations of S14-2 events.

## Must-Haves

- [ ] Draft file exists and is non-empty at `.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md`
- [ ] Exactly one `## S22-1` section and one `## T02 Recipe` section
- [ ] T02 Recipe HTML uses `card-opinion` class, `data-certeza="opini&#xF3;n"`, `data-id="S22-1"`, `reveal reveal-slide`, `--reveal-delay: 0ms`
- [ ] Three-position `card-nota-historiografica` with explicit Author/Title/Year for each position
- [ ] Lynch cap. 8 cited (not any other Lynch chapter)
- [ ] Monvoisin portrait URL included
- [ ] Entity check returns ENTITY_PASS
- [ ] Scope-boundary check returns SCOPE_PASS
- [ ] No re-narration of bloqueo events from S14-2; no repetition of internal-order argument from S17-1

## Verification

- `test -s .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md`
- `grep -c "^## S22-" .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` returns 1
- `grep -c "^## T02 Recipe" .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` returns 1
- Node.js entity check on T02 Recipe block returns ENTITY_PASS
- Node.js scope-boundary check returns SCOPE_PASS

## Inputs

- `index.html` — read S17-1 card (line ~1851) for HTML structure reference; confirm S14-2 card scope (data-id="S14-2") to understand what bloqueo content is already present
- `S22-RESEARCH.md` — fully resolved: one card, S17-1 pattern, Monvoisin image, Lynch cap. 8, three-position nota, Alberdi angle optional
- S21-SUMMARY.md forward intelligence: Lynch cap. 8 reserved for S22; data-certeza baseline = 88

## Expected Output

- `.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` — complete draft with S22-1 prose section and entity-encoded T02 Recipe HTML block, verified ENTITY_PASS and SCOPE_PASS

## Observability Impact

**What changes after T01:**
- `.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` is created (did not exist before T01)
- `index.html` is NOT modified by T01 — it remains at data-certeza=88

**How a future agent inspects T01's output:**
- `test -s .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md && echo EXISTS` — confirms the file was created and is non-empty
- `grep -c "^## S22-" .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` — must return 1 (one card section)
- `grep -c "^## T02 Recipe" .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` — must return 1
- Node.js entity check: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const lines=r.split('\\n').filter(l=>/[^\\x00-\\x7F]/.test(l)); console.log(lines.length===0?'ENTITY_PASS':'ENTITY_FAIL:'+lines.length+' lines with non-ASCII');"` — must output ENTITY_PASS

**Failure state visibility:**
- ENTITY_FAIL with N lines means the T02 Recipe block contains N lines of unencoded non-ASCII; inspect those lines and apply entity mappings from the T01 plan
- SCOPE_FAIL with banned terms means re-narration of S14-2 events leaked into the Recipe block; remove the offending text and replace with cross-reference wording
- If T02 fails to splice, the cause is almost always an ENTITY_FAIL or SCOPE_FAIL that was not fixed in T01 — check T01 verification outputs first

**No runtime signals beyond file existence.** T01 is a content-authoring task with no server processes, background jobs, or network calls.
