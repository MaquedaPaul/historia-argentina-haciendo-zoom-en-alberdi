# S22: ¿Sin Rosas la Patria hubiera caído? — Research

**Date:** 2026-03-23

## Summary

S22 is a **light-research slice** — it follows the established card pattern precisely. The slice produces two cards: one `card-opinion` (data-certeza="opinión") framing the soberanía exterior debate, and one `card-nota-historiografica` inside it (three-position format per D056/D058). The slice inserts before the append marker at line 2007. All HTML patterns, certeza classifications, and splice mechanics are identical to S21 (the immediately prior slice).

The key design challenge is **scope boundary discipline**: S14-2 already narrates the bloqueo francés, Vuelta de Obligado, and Caseros as documented facts. S22 must NOT re-narrate those events — it must presuppose them as shared context and shift to the historiographic question: *what was the significance of Rosas's resistance?* S17-1 already covers the internal-order necessity argument. S22's distinct angle is **soberanía exterior**: would a non-Rosas government have capitulated to European powers and lost control of the river system?

**Two cards are the right scope.** The S22-CONTEXT recommends one opinion/debate card, but the three-position nota historiográfica is long enough to warrant its own card — parallel to how S19 split into S19-1 (question framing) and S19-2 (nota). However, given S22 is simpler in scope than S19, a single card with an embedded nota (matching the S17-1 pattern, which includes both framing and nota in one article element) is also valid and cleaner. The S17-1 pattern is preferred: **one card, card-opinion, data-certeza="opinión", with card-nota-historiografica embedded after the excerpt paragraph.**

The Monvoisin portrait of Rosas (Raymond Monvoisin, PD, 2600×3244px, available at `thumb/9/94/Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas.jpg/500px-...`) is the ideal image: unused in M008, distinctly different from S13-1 and S14-1 Rosas portraits, and painted by a French artist — a subtle editorial relevance for a card about French and Anglo-French intervention.

## Recommendation

Produce **one card: S22-1**, following the S17-1 one-card-with-embedded-nota pattern:
- `card-opinion`, `data-certeza="opinión"` (entity: `opini&#xF3;n`), `reveal reveal-slide`, `--reveal-delay: 0ms`
- Title: something like *¿Sin Rosas, Argentina habría perdido la soberanía sobre sus ríos?*
- Year display: `debate historiográfico`
- Image: Monvoisin portrait (500px thumb, PD)
- Excerpt: frames the debate without re-narrating S14-2 facts — references them as prior context, then poses the interpretive question
- Embedded `card-nota-historiografica`: three-position format (revisionista / liberal / síntesis contemporánea), each with Author, Title, Year attribution
- Lynch cap. 8 as the synthesis source (reserved by S21 specifically for S22)

If the nota grows too long for a single card, split into S22-1 (framing + image) and S22-2 (nota), matching S19's two-card split. But attempt the S17-1 single-card pattern first.

## Implementation Landscape

### Key Files

- `index.html` — insert S22-1 (and optionally S22-2) before the append marker comment at **line 2007** (confirmed by `grep -n 'cards will be appended here by subsequent slices' index.html`)
- `C:/tmp/s22-cards.html` — temp file for card HTML before splice (Write tool, not heredoc)
- `C:/tmp/index.html.bak-s22` — backup before splice (per established pattern)
- `.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` — T01 output (must exist before T02)

### Build Order

1. **T01:** Author `S22-CONTENT-DRAFT.md` — research the soberanía exterior debate, write card prose, produce entity-encoded T02 Recipe HTML block. Verify scope boundary (no re-narration of S14-2 events).
2. **T02:** Splice card(s) into `index.html` using the Node.js Array.splice pattern with the ASCII-only marker substring `cards will be appended here by subsequent slices`. Verify `data-certeza` count advances by 1 (or 2 if two cards).

### Verification Approach

Post-splice checks (all must pass before marking done):
```
grep -c 'data-certeza' index.html           # expect 89 (if 1 card) or 90 (if 2 cards)
grep -c 'data-id="S22-' index.html          # expect 1 or 2
grep -c 'cards will be appended here' index.html  # expect 1 (marker intact)
git diff --name-only HEAD -- styles.css app.js    # expect empty (no CSS/JS changes)
test -s C:/tmp/index.html.bak-s22 && echo BACKUP_OK
```

Scope-boundary check (Node.js, per KNOWLEDGE.md):
```js
node -e "const f=require('fs').readFileSync('S22-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['Vuelta de Obligado','Convención Mackau','octubre de 1840','bloqueo francés','1838 y 1840','Caseros','3 de febrero de 1852']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"
```

## Scope Boundary Map

### What S14-2 already covered (DO NOT repeat in S22 HTML)
- The bloqueo francés 1838–1840 narrative (Convención Mackau, October 1840)
- The Vuelta de Obligado battle (20 November 1845) as a narrative event
- The bloqueo anglo-francés ending in 1850 as a timeline event
- Caseros (3 February 1852) and Rosas's exile

### What S17-1 already covered (DO NOT repeat in S22 HTML)
- The internal-order necessity argument ("sin Rosas, ¿habría guerra civil?")
- The Urquiza-post-Caseros counter-argument (Constitution in 18 months)
- The Irazusta / Halperin Donghi positions on internal order

### What S22 owns (new ground)
- The soberanía exterior interpretive debate: did Rosas's resistance to European pressure *specifically* prevent a loss of Argentine sovereignty over the Río de la Plata system?
- The revisionist thesis that a pro-European unitario government would have ceded the ríos interiores (free navigation) and consular privileges under pressure
- The liberal counter-thesis: Rosas's intransigence was costly and unnecessary; Urquiza's post-Caseros diplomacy shows there were better paths
- The contemporary synthesis (Lynch cap. 8): distinguishes the soberanía achievement (real) from the diplomatic cost (also real) — a nuanced position that neither revisionists nor liberals fully acknowledge
- The Alberdi angle (optional, as a connecting thread): Alberdi's *La acción de la Europa en América* (1842) explicitly opposed European intervention even while opposing Rosas — a rare unitario voice that partially supports the revisionista foreign-policy conclusion

### Cross-reference pattern (from S21 precedent)
S22-1 excerpt should reference S14-2 explicitly: "los hechos del período —detallados en la tarjeta S14-2—" rather than re-narrating them.

## Certeza Classification

- **S22-1:** `card-opinion`, `data-certeza="opini&#xF3;n"` (entity-encoded). This is a historiographic interpretation question (what would have happened without Rosas), not a contested-fact dispute → "opinión" not "debatido", following D057/D058.
- The certeza indicator: `&#x1F4AC;` (💬) with label "Opinión / debate interpretativo" — matching S17-1's indicator exactly.

## Image

**Monvoisin portrait of Rosas (ca. 1842)**
- File: `Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas.jpg`
- Thumb URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas.jpg/500px-Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas.jpg`
- License: Public domain (PD-Art, pre-1900 oil painting)
- Artist: Raymond Monvoisin (French painter, 1790–1870)
- Size: 2600×3244px source → 500px thumb available
- Attribution note: "Raymond Monvoisin (1790–1870), ca. 1842. Wikimedia Commons. Dominio público."
- **Not used elsewhere in M008** — distinct from S13-1 (`Juan_Manuel_de_Rosas_1829.jpg`) and S14-1 (`Divisas_de_la_época_de_Rosas.jpg`) and the Descalzi oval (`Juan_Manuel_de_Rosas_by_Descalzi_oval.png`)

## Sources for T01

Per KNOWLEDGE.md Lynch Citation Chain Management entry:
- **Lynch, J., *Argentine Dictator*, 1981, cap. 8** — diplomacy, bloqueos, soberanía exterior. RESERVED for S22 by S21. Primary synthesis source.
- **Irazusta, J., *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941** — revisionista position on soberanía
- **Irazusta, J. e I., *La Argentina y el imperialismo británico*, 1934** — foundational revisionist text on European imperialism and the Rosas resistance
- **Halperín Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972** — synthesis, already cited in S17-1 for internal argument; can be cited again for the distinct foreign-policy dimension
- **Rosa, J. M., *La guerra del Brasil y el Pacto Federal*, Oriente, 1973** (listed in S22-CONTEXT) — additional revisionista source if needed
- **Alberdi, J. B., *La acción de la Europa en América*, Valparaíso, 1842** — optional Alberdi connector: the exile who opposed both Rosas AND European intervention

## State Entering S22

- **data-certeza running total:** 88 (confirmed)
- **card-nota-historiografica count:** 9 (confirmed)
- **Append marker:** line 2007 (confirmed, use ASCII-only substring for Node.js findIndex)
- **S21 backup:** `C:/tmp/index.html.bak-s21` (available as prior restore point)
- **Lynch chapter consumed:** cap. 8 reserved for S22 (S21 consumed cap. 4)

## Common Pitfalls

- **Do not re-narrate S14-2.** The Vuelta de Obligado painting is already used in S14-2; do NOT reuse that image. The Monvoisin portrait is the correct choice for S22.
- **Entity-encoding in Recipe block.** All non-ASCII characters in the T02 Recipe HTML must be entity-encoded (per D053). Use `opini&#xF3;n` not `opinión`, `hist&#xF3;rica` not `histórica`, etc. Run the Node.js byte check before T02.
- **ASCII-only marker substring.** Use `lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'))` in Node.js — the en-dash in the comment is problematic (per KNOWLEDGE.md S10 entry).
- **Stagger reset.** S22 cards start at `--reveal-delay: 0ms`. Do NOT continue from S21's 80ms.
- **No sub-nav addition.** The sub-nav link for `#periodo-rosas` was added by S09. S22 does NOT add another link.
- **grep -c 'data-id="S22-'** is the unambiguous card count (1 per card regardless of HTML comments). Target: 1 (if one card) or 2 (if split).
