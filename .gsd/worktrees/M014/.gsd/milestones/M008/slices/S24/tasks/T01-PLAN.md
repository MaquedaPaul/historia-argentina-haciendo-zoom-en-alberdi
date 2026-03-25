---
estimated_steps: 6
estimated_files: 1
---

# T01: Author S24-CONTENT-DRAFT.md with entity-encoded T02 Recipe HTML

**Slice:** S24 — Encarnación Ezcurra antes de Rosas — ¿era conocida?
**Milestone:** M008

## Description

Write `S24-CONTENT-DRAFT.md` containing:
1. A prose section with all verified biographical facts for S24-1.
2. A prose section with the two-position nota content for S24-2.
3. A `## T02 Recipe` section containing the verbatim, fully entity-encoded HTML for both cards (this is what T02 will extract and splice).

Image decision: query the Wikimedia API for `Encarnacion_Ezcurra_Isola.jpg` or `Encarnación_Ezcurra_Isola.jpg` (the Averico Isola litograph mentioned by the Museo Histórico Nacional). If found and ≥500px, use it. If missing, fall back to a Buenos Aires colonial/early-independence era cityscape (ca. 1800–1815) that evokes her social world without repeating the S23-1 portrait. If no suitable alternative is confirmed, S24-1 runs without an image block (following the no-image pattern). **Do NOT use `Encarnacion_Ezcurra_1835.jpg` — already in S23-1.**

Before writing the T02 Recipe block, verify all facts against the S24-RESEARCH.md source summary. After writing, run two quality gates before T02 may proceed:
- **ENTITY_PASS**: Node.js byte check confirms no raw non-ASCII bytes in the `## T02 Recipe` section.
- **SCOPE_PASS**: Node.js banned-string check confirms none of the banned terms appear in the `## T02 Recipe` section.

## Steps

1. **Read** `.gsd/milestones/M008/slices/S24/S24-RESEARCH.md` to load all verified biographical facts and the exact scope boundary rules.
2. **Query Wikimedia API** for the Isola litograph: `https://en.wikipedia.org/w/api.php?action=query&titles=File:Encarnacion_Ezcurra_Isola.jpg&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`. If the API returns a `thumburl` field (not `missing`), use it. If missing, search for alternative Buenos Aires ca. 1800–1815 cityscape images. If nothing suitable is confirmed, run S24-1 without a card-image block.
3. **Write the prose sections** of the draft — two sections (`## S24-1 Content` and `## S24-2 Content`) with all historical claims, certeza classification, sources, and notes. Use native UTF-8 in prose for readability.
4. **Write the `## T02 Recipe` section** — the verbatim HTML for both cards following the S23 splice pattern exactly:
   - S24-1: `card-hecho` with `data-certeza="hecho"`, `data-id="S24-1"`, `--reveal-delay: 0ms`. Certeza indicator: `&#x2713;` / `Hecho documentado`. If an image block is included, use the Isola litograph URL or the selected fallback. Year span: `1795&#x2013;1813`. Title and excerpt entity-encoded. Biography content: full name, birth, parents (father's Cabildo/Consulado role, mother's French descent), merchant-class social position (not landed aristocracy), education (reading/writing/math for family business), marriage date 16 March 1813, ages at marriage (she 18, he 20), Rosas's mother's opposition and the ruse, sister María Josefa / Belgrano / Pedro Rosas y Belgrano adoption. Close with: no pre-Rosas public political activity is documented. Source footer: Museo Histórico Nacional; Lynch, J., *Argentine Dictator*, Oxford, 1981, caps. 1–2; Ramos Mejía, J. M., *Rosas y su tiempo*, 1907. Entity-encode all special characters (`&#xF3;` for ó, `&#xED;` for í, `&#xE9;` for é, `&#xF1;` for ñ, etc.).
   - S24-2: `card-opinion` with `data-certeza="opini&#xF3;n"`, `data-id="S24-2"`, `--reveal-delay: 80ms`. No card-image block. Certeza indicator: `&#x1F4AC;` / `Interpretaci&#xF3;n historiogr&#xE1;fica`. Year span: `debate historiogr&#xE1;fico`. Title: `&#xBF;Era Encarnaci&#xF3;n una figura aut&#xF3;noma o construida junto a Rosas?` (or similar). Two-position `card-nota-historiografica`: (1) position asserting her pre-Rosas social capital was her own (family networks, education, personal character documented by Lucio Mansilla's anecdote) — cite Ramos Mejía or mujeresbonaerenses.gba.gob.ar; (2) Lynch synthesis: her social capital only became *political* visibility in function of Rosas's project — without the rosista framework her influence would have remained domestic. Source footer: Ramos Mejía, J. M., *Rosas y su tiempo*, 1907; Lynch, J., *Argentine Dictator*, Oxford, 1981, cap. 2.
5. **Run ENTITY_PASS check**: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md','utf8'); const recipe=f.slice(f.indexOf('## T02 Recipe')); const n=recipe.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(n.length===0?'ENTITY_PASS':'ENTITY_FAIL:'+n.length+' lines with non-ASCII');"`
6. **Run SCOPE_PASS check**: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md','utf8'); const recipe=f.slice(f.indexOf('## T02 Recipe')); const banned=['Mazorca','Caseros','Barranco Yaco','bloqueo franc','Vuelta de Obligado','Restauradores','Sociedad Popular Restauradora']; const found=banned.filter(b=>recipe.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"`

## Must-Haves

- [ ] Draft file exists and is non-empty at `.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md`
- [ ] Contains `## T02 Recipe` section with both S24-1 and S24-2 HTML
- [ ] All non-ASCII characters in the `## T02 Recipe` section are HTML-entity-encoded (ENTITY_PASS)
- [ ] No banned terms appear in the `## T02 Recipe` section (SCOPE_PASS)
- [ ] S24-1 does NOT use `Encarnacion_Ezcurra_1835.jpg` (already in S23-1)
- [ ] S24-1 marriage date is 16 March 1813 (exact day confirmed in research — not year-only as in S23)
- [ ] S24-2 has no card-image block and uses two-position nota historiográfica format

## Verification

- `test -s .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` — exits 0
- `grep -c '## T02 Recipe' .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` — returns 1
- Node.js ENTITY_PASS check (step 5) — outputs `ENTITY_PASS`
- Node.js SCOPE_PASS check (step 6) — outputs `SCOPE_PASS`

## Inputs

- `.gsd/milestones/M008/slices/S24/S24-RESEARCH.md` — all verified biographical facts, image guidance, scope boundary rules, banned terms list
- `index.html` lines 2027–2062 — S23 card HTML as structural reference for the T02 Recipe format
- `.gsd/DECISIONS.md` D053 (entity encoding), D001 (zero new CSS/JS), D057/D058 (certeza taxonomy)

## Expected Output

- `.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` — complete draft with prose sections and fully entity-encoded T02 Recipe HTML block, ENTITY_PASS and SCOPE_PASS both confirmed.
