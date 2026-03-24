# S22: ¿Sin Rosas la Patria hubiera caído?

**Goal:** Add one card to `#periodo-rosas` framing the soberanía exterior debate — the revisionist thesis that Rosas's resistance to European bloqueos preserved Argentine sovereignty over the Río de la Plata river system, and the liberal counter-thesis that his intransigence was unnecessary. Distinct from S17 (internal order) by focusing on foreign-policy sovereignty.
**Demo:** `grep -c 'data-id="S22-' index.html` returns 1; `grep -c 'data-certeza' index.html` returns 89; `grep -c 'cards will be appended here' index.html` returns 1; `git diff --name-only HEAD -- styles.css app.js` is empty.

## Must-Haves

- One card `S22-1` spliced before the append marker in `#periodo-rosas`
- `card-opinion`, `data-certeza="opini&#xF3;n"`, `reveal reveal-slide`, `--reveal-delay: 0ms`
- Embedded `card-nota-historiografica` with three-position format (revisionista / liberal / síntesis contemporánea), each with Author, Title, Year attribution
- Monvoisin portrait of Rosas (500px Wikimedia thumb, PD) as card image
- Lynch cap. 8 cited as synthesis source
- Scope boundary: no re-narration of S14-2 bloqueo events or S17-1 internal-order argument
- Zero new CSS or JS

## Verification

```bash
grep -c 'data-certeza' index.html          # expect 89
grep -c 'data-id="S22-' index.html         # expect 1
grep -c 'cards will be appended here' index.html  # expect 1 (marker intact)
git diff --name-only HEAD -- styles.css app.js    # expect empty
test -s C:/tmp/index.html.bak-s22 && echo BACKUP_OK
```

Scope-boundary check (run against T02 Recipe block only):
```js
node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['Vuelta de Obligado','Convenci\u00f3n Mackau','octubre de 1840','bloqueo franc\u00e9s','1838 y 1840','Caseros','3 de febrero de 1852']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"
```

## Tasks

- [x] **T01: Author S22-CONTENT-DRAFT.md with soberanía exterior debate and entity-encoded T02 Recipe** `est:20m`
  - Why: Produces the verified prose and entity-encoded HTML that T02 will splice; the high-risk creative and research work must be proven before touching index.html.
  - Files: `.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md`
  - Do: Write the content draft with three sections — S22-1 card prose, and the T02 Recipe HTML block. S22-1 is a single `card-opinion` card with an embedded `card-nota-historiografica`. The excerpt must open with an explicit cross-reference to S14-2 ("los hechos del período —detallados en las tarjetas S14-1 y S14-2—") to avoid re-narrating the bloqueo events. The nota historiográfica uses the three-position format: (1) revisionista — Irazusta & Irazusta, *La Argentina y el imperialismo británico*, 1934 + Irazusta, *Vida política de Juan Manuel de Rosas*, 1941; (2) liberal/postestructuralista — Halperin Donghi, *De la revolución de independencia a la confederación rosista*, Paidós, 1972; (3) síntesis contemporánea — Lynch, *Argentine Dictator*, Oxford, 1981, cap. 8. The Alberdi angle (*La acción de la Europa en América*, 1842) may appear as a brief additional note in the excerpt if space allows — it is optional. All non-ASCII characters in the T02 Recipe block must be HTML entities (per D053). Run Node.js entity check after writing.
  - Verify: `test -s .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md && grep -c "^## S22-" .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` returns 1; `grep -c "^## T02 Recipe" .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` returns 1; Node.js entity check on T02 Recipe block returns PASS.
  - Done when: Draft file exists, has one `## S22-` section and one `## T02 Recipe` section, entity check passes, scope-boundary logic is clearly enforced in the prose.

- [x] **T02: Splice S22-1 into index.html before the append marker** `est:15m`
  - Why: Delivers the card to the live page; completes the slice.
  - Files: `index.html`, `C:/tmp/s22-cards.html`, `C:/tmp/index.html.bak-s22`
  - Do: (1) Verify preconditions: `test -s .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` — if missing, author it first per T01 steps before proceeding. (2) Confirm baseline: `grep -c 'data-certeza' index.html` = 88. (3) Write the T02 Recipe HTML block from the content draft to `C:/tmp/s22-cards.html` using the Write tool (not heredoc). (4) Backup: `cp index.html C:/tmp/index.html.bak-s22`. (5) Splice using Node.js: read `index.html`, find insertion index with `lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'))`, read `C:/tmp/s22-cards.html`, splice before that index, write back. Use the ASCII-only marker substring (per KNOWLEDGE.md). (6) Run all five verification checks. If any fail, restore from backup and diagnose.
  - Verify: `grep -c 'data-certeza' index.html` = 89; `grep -c 'data-id="S22-' index.html` = 1; `grep -c 'cards will be appended here' index.html` = 1; `git diff --name-only HEAD -- styles.css app.js` empty; `test -s C:/tmp/index.html.bak-s22 && echo BACKUP_OK`.
  - Done when: All five checks pass and the scope-boundary Node.js check returns SCOPE_PASS.

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md`
- `C:/tmp/s22-cards.html` (temp, not committed)
- `C:/tmp/index.html.bak-s22` (temp, not committed)

## Observability / Diagnostics

**Runtime signals after T02 completes:**
- `grep -c 'data-certeza' index.html` — must return 89 (was 88 before S22); a wrong count indicates a duplicate or missing splice
- `grep -c 'data-id="S22-' index.html` — must return 1; if 0, card was not inserted; if >1, duplicate splice occurred
- `grep -c 'cards will be appended here' index.html` — must return 1; if 0, the append marker was accidentally overwritten or deleted

**Inspection surfaces:**
- `C:/tmp/index.html.bak-s22` — restore point; if post-splice checks fail, `cp C:/tmp/index.html.bak-s22 index.html` recovers the pre-S22 state
- `C:/tmp/s22-cards.html` — isolated card HTML; inspect directly to debug entity or structure issues without touching index.html
- `grep -n 'data-id="S22-1"' index.html` — locates the exact line number of the spliced card for visual inspection

**Failure visibility:**
- Entity-encoding failures surface via the Node.js byte check (lines with non-ASCII after `## T02 Recipe`); fix before T02
- Scope boundary violations surface via the Node.js banned-string check; fix before T02
- If the splice inserts at the wrong position, `grep -n 'data-id="S22-1"' index.html` will show a line number outside the `#periodo-rosas` section (lines 1784–2006 as of M008 baseline)

**Redaction:** No user data, no secrets. All content is public-domain historiographic text. No redaction constraints apply.
