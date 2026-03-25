# S19: ¿Rosas fue un tirano? — Research

**Date:** 2026-03-23

## Summary

S19 is the central historiographic debate card of the entire M008 milestone — the question every visitor has been building toward since S09. It sits immediately after S18 (which documented real unitario conspiracies and explicitly deferred the tiranía judgment here). This is well-understood, pattern-driven work: one or two cards following the `debatido` + `card-nota-historiografica` pattern established in S14-3, S15-2, and S16-3. No novel architecture, no new CSS/JS, no unfamiliar APIs.

The key editorial challenge is not technical — it is maintaining the historiographic balance required by the milestone constraints (neither Sarmiento's demonization nor Irazusta's apology), while picking up the thread S18 explicitly handed off ("la pregunta de si ese uso fue deliberado como instrumento de control político corresponde a S19"). The three-position nota format (liberal / revisionista / síntesis contemporánea) established in S16-3 is the correct model.

**Recommended scope: two cards.** Card S19-1 presents the framing — what "tiranía" meant in the 19th-century context and why the question is contested. Card S19-2 is the `card-nota-historiografica` card proper — the three-position debate. This mirrors the S15 pattern (S15-1 hecho facts → S15-2 debatido nota) and gives the debate room to breathe without cramming all three positions into a single excerpt.

## Recommendation

Author **two cards** for S19:
- **S19-1**: `card-opinion`, `data-certeza="debatido"`, `reveal-slide`, `--reveal-delay: 0ms`. Framing card — what the word "tirano" meant in the 1840s–1850s Argentine context, why the charge was politically loaded, and the core factual dispute (represión real + instituciones ausentes). No image (consistent with S17-1's no-image choice for text-heavy debate cards; avoids re-using Rosas portraits already used in S13/S14). Picks up the S18 pretext thread explicitly.
- **S19-2**: `card-opinion`, `data-certeza="debatido"`, `reveal-slide`, `--reveal-delay: 80ms`. Three-position `card-nota-historiografica` card using the S16-3 format: (1) liberal position — Sarmiento/Mitre, (2) revisionista — Irazusta/Rosa, (3) síntesis contemporánea — Halperín Donghi/Lynch/Myers. Optionally include a Mitre portrait image (see Implementation Landscape).

Both cards use `card-opinion` CSS class (no `card-debatido` class exists — zero-new-CSS constraint, per D052). Both use `&#x2696;` certeza icon and "Debatido historiográficamente" label, matching S14-3/S15-2/S16-3.

## Implementation Landscape

### Key Files

- `index.html` — sole file to modify. Insertion point: line 1900 (`<!-- S10–S24 cards will be appended here by subsequent slices -->`). Current state: `data-certeza` count = **82**, `card-nota-historiografica` count = **7**. After S19: expect **84** and **8** respectively (two cards, one nota).
- `.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` — to be created by T01 with full prose and entity-encoded T02 Recipe HTML block.
- `C:/tmp/s19-cards.html` — temp splice file for T02 (Write tool, not heredoc — per KNOWLEDGE.md pattern).
- `C:/tmp/index.html.bak-s19` — pre-splice recovery backup.

### Exact Insertion Pattern

```
grep -n 'cards will be appended here by subsequent slices' index.html
# → returns current line number (was 1900 before S19; shifts as priors added cards)
```

Node.js splice (ASCII-only marker substring, per KNOWLEDGE.md D53/S10 entry):

```javascript
const fs = require('fs');
const idx = fs.readFileSync('index.html', 'utf8');
const lines = idx.split('\n');
const markerIdx = lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'));
const snippet = fs.readFileSync('C:/tmp/s19-cards.html', 'utf8').split('\n');
lines.splice(markerIdx, 0, ...snippet);
fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
```

### HTML Card Structure

**S19-1** (framing, no image):
```html
<!-- S19-1: ¿Rosas fue un tirano? — el debate central -->
<article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" data-id="S19-1" style="--reveal-delay: 0ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">&#x2696;</span>
    <span class="card-certeza-label">Debatido historiogr&#xE1;ficamente</span>
  </div>
  <span class="event-card__year">debate abierto</span>
  <h3 class="event-card__title">&#xBF;Fue Rosas un tirano? El debate m&#xE1;s polarizado de la historiograf&#xED;a argentina</h3>
  <p class="event-card__excerpt">...</p>
  <footer class="card-source">...</footer>
</article>
```

**S19-2** (three-position nota):
```html
<!-- S19-2: Las tres posiciones historiogr&#xE1;ficas -->
<article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" data-id="S19-2" style="--reveal-delay: 80ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">&#x2696;</span>
    <span class="card-certeza-label">Debatido historiogr&#xE1;ficamente</span>
  </div>
  ...
  <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> ...</p>
  <footer class="card-source">...</footer>
</article>
```

### Image Consideration for S19-2

**Candidate:** Bartolomé Mitre portrait — `File:Bartolome_Mitre_Retrato.jpg`
- Confirmed available: `https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Bartolome_Mitre_Retrato.jpg/500px-Bartolome_Mitre_Retrato.jpg` (500×564px)
- License: CC BY-SA 4.0 — usable with attribution (per KNOWLEDGE.md CC BY-SA 4.0 is usable)
- Rationale: Mitre is the primary author of the liberal "tirano" thesis (*Historia de Belgrano*, 1858) and the founder of the historiographic tradition that S19-2's nota directly names. Using his portrait signals "this is the historiographic debate about what Mitre's tradition said."
- **Risk:** CC BY-SA 4.0 attribution block needed inside `.card-image` (per KNOWLEDGE.md CC BY-SA Attribution Block Placement pattern — `<p class="img-attribution">` inside `.card-image`).
- **Alternative:** No image on both cards (S17-1 precedent — clean text-only debate card). More conservative, avoids attribution overhead.
- **Recommendation:** Include Mitre portrait on S19-2 (the nota card), since S19-2 is explicitly a historiographic debate card and Mitre is the named protagonist of one of its three positions. Omit image on S19-1.

### Content Requirements for card-nota-historiografica (S19-2)

Per the three-position format (D056/KNOWLEDGE.md):

1. **Posición liberal** (Sarmiento, Mitre): Rosas = tiranía sin atenuantes. Cite: Sarmiento, *Facundo*, 1845; Mitre, *Historia de Belgrano*, 1858. Note: Sarmiento's *Facundo* cover image already used in S16-1 — no image reuse needed in the nota text, just citation.

2. **Posición revisionista** (Irazusta, Rosa): Rosas = estadista soberanista, "tirano" es propaganda mitrista. Cite: Irazusta, J., *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941; Rosa, J. M., *Historia Argentina*, t. IV–V, Oriente, 1964.

3. **Síntesis contemporánea** (Halperín Donghi, Lynch, Myers): régimen autoritario personalista en contexto de ausencia institucional; el término "tiranía" es anacrónico pero el autoritarismo es real; "régimen personalista con represión selectiva" es más preciso. Cite: Halperín Donghi, *De la revolución de independencia a la confederación rosista*, Paidós, 1972; Lynch, *Argentine Dictator*, Oxford, 1981, cap. 10; Myers, *Orden y virtud*, UNQ, 1995.

**Scope boundary:** S19 must NOT duplicate S22's soberanía exterior argument. S19 focuses on the domestic tiranía question (represión, libertades, personalismo). S22 will handle the soberanía nacional / bloqueos angle. This distinction must be explicit in the nota to avoid S22 feeling redundant.

### Non-ASCII Encoding Protocol (T02)

All non-ASCII in the T02 Recipe HTML block must be entity-encoded (per D053):
- `ó` → `&#xF3;`
- `á` → `&#xE1;`
- `í` → `&#xED;`
- `ú` → `&#xFA;`
- `é` → `&#xE9;`
- `ñ` → `&#xF1;`
- `¿` → `&#xBF;`
- `—` → `&#x2014;`
- `–` → `&#x2013;`
- `«»` → `&#xAB;` / `&#xBB;`
- `'` → `&#x2019;` (only if used in quotes)

Non-ASCII check before splice: use Node.js scoped to S19 card block (grep -P unavailable on Windows, per KNOWLEDGE.md):
```javascript
node -e "const f=require('fs').readFileSync('C:/tmp/s19-cards.html','utf8'); const bad=f.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(bad.length===0?'PASS':'FAIL:'+bad.length);"
```

### Build Order

1. **T01** — Author `S19-CONTENT-DRAFT.md`: historical prose (UTF-8) + entity-encoded T02 Recipe HTML block. Include scope-boundary note distinguishing S19 (domestic tiranía) from S22 (soberanía exterior).
2. **T02** — Splice cards into `index.html`: backup → Write temp file → non-ASCII check → Node.js marker splice → verify counts.

### Verification Approach

| Check | Command | Expected |
|-------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 84 |
| 2 | `grep -c 'data-id="S19-1"' index.html` | 1 |
| 3 | `grep -c 'data-id="S19-2"' index.html` | 1 |
| 4 | `grep -c 'cards will be appended here' index.html` | 1 |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | empty |
| 6 | `test -s C:/tmp/index.html.bak-s19 && echo BACKUP_OK` | BACKUP_OK |
| 7 | `grep -c 'card-nota-historiografica' index.html` | 8 |
| 8 | `grep -c 'data-id="S19-'` | 2 |

## Constraints

- Zero new CSS/JS — `card-opinion` class for both debatido cards (per D052).
- `data-certeza="debatido"` (no accent) — matching S14-3/S15-2/S16-3 pattern exactly.
- Certeza icon: `&#x2696;` (⚖), label: "Debatido historiogr&#xE1;ficamente" — as in S14-3.
- Reveal animation: `reveal-slide` (not `reveal-fade` — `reveal-fade` is the S17 opinión pattern; debatido cards use `reveal-slide`).
- Stagger delay resets per slice: S19-1 at 0ms, S19-2 at 80ms.
- No image reuse: Rosas portraits (S13-1, S13-2, S14-1), Sarmiento portrait (S09), Facundo cover (S16-1) all already used.
- S19 must NOT adjudicate the soberanía exterior argument — that belongs to S22.
- S18's forward reference ("La pregunta de si ese uso fue deliberado como instrumento de control político corresponde a S19") must be picked up at the opening of S19-1's excerpt.

## Common Pitfalls

- **Certeza confusion (debatido vs opinión):** S19 is `debatido` (contested fact-value claim about regime nature), NOT `opinión` (which S17 used for the purely counterfactual "was Rosas necessary?" question). Use `data-certeza="debatido"` and `&#x2696;` icon.
- **Three-position nota scope creep:** S19-2's nota covers domestic tiranía. If the nota drifts into the soberanía/bloqueos argument, it will duplicate S22. Keep the nota bounded to: represión, libertades, personalismo, uso del término "tiranía."
- **Source repetition:** Lynch and Halperín Donghi appear heavily in S14–S18. S19 should cite these with specific chapters that are distinct from prior cards. Lynch cap. 10 (on Rosas's legacy and the historiographic debate) is the right chapter for S19; cap. 7 (terror/victims) was used in S16.
- **Mitre portrait CC BY-SA 4.0 attribution:** If using `Bartolome_Mitre_Retrato.jpg`, include `<p class="img-attribution">` inside `.card-image` (per KNOWLEDGE.md CC BY-SA Attribution Block Placement pattern). The attribution text: "Retrato de Bartolomé Mitre. Pedro Cayetano J Vera / Wikimedia Commons, CC BY-SA 4.0."
- **grep -c 'data-id="S19-' count:** Expected 2 (one per card). HTML comments use `<!-- S19-1: ... -->` form (not `data-id=` prefix) — so grep returns 1 per card for the attribute. Set target at 2 = 1 × 2 cards (per KNOWLEDGE.md S13 grep-c pattern clarification).
- **Marker ASCII-only search:** Use `lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'))` — not the full en-dash version (per KNOWLEDGE.md Node.js en-dash issue).

## Sources

Key sources for T01 content authoring:

| Source | Use in S19 |
|--------|-----------|
| Sarmiento, *Facundo*, 1845 | Liberal position: "civilización vs. barbarie", explicit tiranía charge |
| Mitre, *Historia de Belgrano*, 1858, t. I, cap. proem. | Liberal historiographic tradition, "tiranía" as organizing concept |
| Irazusta, J., *Vida política de Juan Manuel de Rosas*, 1941 | Revisionista position: soberanía, pueblo, difamación mitrista |
| Rosa, J. M., *Historia Argentina*, t. IV–V, 1964 | Revisionista: "tirano" = propaganda de los vencedores |
| Halperín Donghi, *De la revolución*, Paidós, 1972 | Síntesis: regime personalista, anacronismo del término |
| Lynch, *Argentine Dictator*, Oxford, 1981, **cap. 10** | Síntesis: authoritarian regime, historiographic balance |
| Myers, *Orden y virtud*, UNQ, 1995 | Síntesis: proyecto político coherente, ni barbarie ni heroísmo |
