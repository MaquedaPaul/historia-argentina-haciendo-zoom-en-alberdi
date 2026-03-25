# S23: Encarnación Ezcurra — influencia sobre mujeres y apoyo a Rosas

**Date:** 2026-03-23

## Summary

S23 is a straightforward two-card content splice following the established M008 pattern (T01: content draft → T02: Node.js array-splice into `index.html`). The slice covers the documented political role of Encarnación Ezcurra (1833–1838) — her organisation of the Sociedad Popular Restauradora, her intelligence network, her cross-class mobilisation, and the certeza boundary between documented fact and interpretive scale.

The historical evidence base is solid and multi-sourced: the letters to Rosas (1833–1834, published 1923, AGN Sala X) are documented primary sources cited in Lynch, Saldías, Ramos Mejía, and multiple institutional sources. The S23-CONTEXT.md plan is factually sound and requires no material corrections. The two-card structure — `card-hecho` (S23-1: Sociedad Popular Restauradora and the correspondence) + `card-opinion` (S23-2: scale/agency debate) — maps precisely onto the certeza rule: "hecho para las cartas y la organización; opinión para la evaluación de la escala de su influencia."

A high-quality, public-domain 1835 portrait of Encarnación (`Encarnacion_Ezcurra_1835.jpg`) is confirmed available at 834×1000px on Wikimedia Commons (Fernando García de Molino / Carlos Morel, ca. 1835–36, PD). A second high-quality option (Averico Isola litografía, 1534×2048px, PD) is available for S24 if needed. Both have confirmed 500px thumburls.

**This is a light-research slice** — established two-card pattern, confirmed image source, solid historical content, known insertion mechanism.

## Recommendation

Two cards. Same two-task structure (T01 draft + T02 splice) as S20, S21, S22.

- **S23-1:** `card-hecho` — "La Sociedad Popular Restauradora y las cartas a Rosas (1833–1838)". Image: `Encarnacion_Ezcurra_1835.jpg` (500px thumb, PD, García de Molino/Morel). Year: `1833–1838`. Documents the factual record: Encarnación as political operator while Rosas was away on the desert campaign, intelligence-gathering letters, cross-class mobilisation, Revolución de los Restauradores (October 1833), death 20 October 1838.
- **S23-2:** `card-opinion`, `data-certeza="opini&#xF3;n"` — "¿Cuánto poder propio tenía Encarnación?". No image (mirrors S21-2 no-image pattern for the interpretive companion card). Year: `debate historiográfico`. Two-position nota historiográfica: revisionista (Irazusta: she was a co-architect of rosismo, comparable to great women rulers) vs. liberal synthesis (Lynch, *Argentine Dictator*, cap. 5: her role was essential but deployed *in function of* Rosas's project, not a parallel or autonomous political agenda).

**Stagger delays:** S23-1 at `0ms`, S23-2 at `80ms` — each slice resets to 0ms per KNOWLEDGE.md stagger-reset rule.

**certeza indicators:**
- S23-1: `✓` / `Hecho documentado` (HTML entity `&#x2713;`)
- S23-2: `💬` / `Interpretación historiográfica` (HTML entity `&#x1F4AC;`)

## Implementation Landscape

### Key Files

- `index.html` — append S23-1 and S23-2 before the `<!-- S10–S24 cards will be appended here by subsequent slices -->` marker, currently at line 2026. Use Node.js array-splice with ASCII-only marker substring `cards will be appended here by subsequent slices`.
- `C:/tmp/s23-cards.html` — temp file for T02 Recipe HTML (use `mkdir -p C:/tmp` first).
- `C:/tmp/index.html.bak-s23` — backup before splice.
- `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md` — T01 output; must be written before T02.

### Baseline state (as of S22 completion)

- `grep -c 'data-certeza' index.html` → **89** (S23 will bring it to **91**)
- `grep -n 'cards will be appended here' index.html` → **line 2026**
- `grep -c 'card-nota-historiografica' index.html` → **10** (S23-2 adds one → **11**)

### Build Order

1. **T01:** Author `S23-CONTENT-DRAFT.md` with two entries: prose metadata block + entity-encoded `## T02 Recipe` HTML block.
2. **T02:** Write Recipe HTML to `C:/tmp/s23-cards.html` → backup `index.html` → splice before marker → verify.

T01 is the only risk (content accuracy, certeza classification, entity encoding). T02 is mechanical given a correct T01.

### Verification Approach

After T02 splice:
```
grep -c 'data-certeza' index.html              → 91
grep -c 'data-id="S23-' index.html             → 2
grep -c 'cards will be appended here' index.html → 1
grep -c 'card-nota-historiografica' index.html  → 11
test -s C:/tmp/index.html.bak-s23 && echo BACKUP_OK
```

Scope-boundary check (Node.js, ASCII-only — no `grep -P`):
```js
node -e "const f=require('fs').readFileSync('S23-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['Barranco Yaco','Mazorca','bloqueo franc','bloqueo anglo','Vuelta de Obligado','Convenci\u00f3n Preliminar','Caseros']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"
```

## Historical Content Verified

### S23-1 factual scaffold (all verified across ≥2 sources)

| Claim | Verified | Source |
|-------|----------|--------|
| Born 25 March 1795, Buenos Aires | ✓ | Museo Histórico Nacional; mujeresbonaerenses.gba.gob.ar |
| Married Rosas 16 March 1813 | ✓ | Infobae (16 marzo 1813); radiokermes.com (16 mayo 1813 at church of Monserrat — slight variant) |
| Active as political operator from August 1833 during desert campaign | ✓ | todo-argentina.net; revisionistas.com.ar; todo-argentina.net/historia |
| Letters to Rosas (1833–1834), published 1923, AGN Sala X | ✓ | mujeresbonaerenses.gba.gob.ar; S23-CONTEXT.md |
| Organised the Revolución de los Restauradores, October 1833, toppling Balcarce | ✓ | museohistoriconacional.cultura.gob.ar; mujeresbonaerenses.gba.gob.ar; institutorosas.cultura.gob.ar |
| Cross-class network: elite + pardos, mulatos, negros, orilleros | ✓ | todo-argentina.net; revisionistas.com.ar; mujeresbonaerenses.gba.gob.ar |
| Sociedad Popular Restauradora, ca. 1833; brazo armado = La Mazorca | ✓ | todo-argentina.net; museohistoriconacional; institutorosas |
| Died 20 October 1838 (disease, aged 43) | ✓ | Multiple sources consistent |
| Funeral was the most solemn given to a woman in 19C Río de la Plata | ✓ | 4 independent sources |

**Marriage date discrepancy:** Sources split between 16 March 1813 (Infobae) and 16 May 1813 at church of Monserrat (radiokermes). Use the month-agnostic year 1813 and avoid asserting exact date in the card to sidestep the discrepancy.

**Quote from Encarnación (1 September 1833):** "Tus amigos, la mayoría de casaca, a quienes oigo y gradúo según lo que valen, tienen miedo." — cited in todo-argentina.net and revisionistas.com.ar as originating from AGN correspondence. Use as inline prose paraphrase context rather than blockquote (per KNOWLEDGE.md: never synthesize a direct quote from secondary sources — the quote appears consistently but we don't have verified pagination of the AGN originals).

**Lynch attribution:** S23-CONTEXT.md cites Lynch cap. 5 "Encarnación Ezcurra and the Restoration". This is the correct chapter. The phrase "la más hábil operadora política de su tiempo en Buenos Aires" appears consistently attributed to Lynch in secondary literature. Use it in the card-opinion with `[atribuida a Lynch]` note rather than blockquote format, per the verified-paraphrase pattern (D048).

### S23-2 interpretive framework

Two positions for the nota historiográfica:

1. **Revisionista (Irazusta, J., *Vida política de Juan Manuel de Rosas*, 1941):** Irazusta placed Encarnación among the great political women of history — equal in temperament to Isabel de Inglaterra or Catalina la Grande. Her role was *co-constitutive* of the rosista project, not auxiliary.
2. **Síntesis contemporánea (Lynch, J., *Argentine Dictator*, Oxford, 1981, cap. 5):** Encarnación was the essential political operator during Rosas's absence (1833–1835) and her intelligence and mobilisation work created the conditions for the second mandate — but her political activity was *deployed in function of* Rosas's project. The question of autonomous agency is unresolvable from the surviving correspondence, which was always framed as reports *to him*.

No strict liberal counter-position needed for this card — the debate is about *degree of independent agency* within acknowledged effectiveness, not about whether she was effective (all sides agree she was). A two-position nota is appropriate (as established in S14-3, S15-2 for two-position cases; three positions only required when the synthesis is genuinely distinct — here Lynch IS the synthesis).

## Image Decision

**S23-1:** `Encarnacion_Ezcurra_1835.jpg`
- URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Encarnacion_Ezcurra_1835.jpg/500px-Encarnacion_Ezcurra_1835.jpg`
- Artists: Fernando García de Molino (1813–1899); Carlos Morel (1813–1894)
- Caption: `Fernando García de Molino y Carlos Morel, ca. 1835–36. Wikimedia Commons. Dominio público.`
- License: Public domain
- This is the standard canonical Encarnación portrait — used in the Museo Histórico Nacional litografía entry and most institutional sources

**S24 reserve:** `Encarnación Ezcurra por Averico Isola.jpg` (1534×2048px, PD) is an excellent alternative for S24 if S24 needs a distinct visual from S23.

## Constraints

- Zero new CSS or JS (D001 hard constraint) — all card classes already exist.
- `data-certeza="opini&#xF3;n"` (HTML entity) for S23-2 — per D053 entity encoding rule.
- `card-opinion` CSS class for both `debatido` and `opinión` certeza values (D052).
- No Lynch cap. 5 direct quote — attributed paraphrase only (per KNOWLEDGE.md Alberdi Quote Verification Protocol, generalised to all sources where paginated primary text is unavailable).
- Scope boundary: S23 must NOT re-narrate: the Mazorca repression period (S16), the bloqueos (S14-2/S22-1), Barranco Yaco/Quiroga (S15). Encarnación died in 1838, *before* the worst of the Mazorca; her role with the SPR preceded the repressive period — this boundary is inherent in the historical timeline and should be stated in the excerpt.
- ASCII-only Node.js marker search (per KNOWLEDGE.md grep-P entry) — use `cards will be appended here by subsequent slices`.

## Common Pitfalls

- **"mazorqueras" framing risk** — The roadmap mentions "mazorqueras" but Encarnación died in October 1838, before the Mazorca became the main instrument of repression (1839–1842). The card should note she organised the *Sociedad Popular Restauradora* (the precursor institution), not the fully-developed Mazorca. The brazo armado *became* the Mazorca after her death.
- **Conflating S23 and S24 content** — S24 covers Encarnación's pre-Rosas identity and biographical profile. S23 focuses exclusively on the 1833–1838 political-operator period. Do not introduce biographical data from before 1813 in S23.
- **Stagger delay reset** — S23-1 starts at `0ms`, S23-2 at `80ms`. Do NOT continue the cumulative delay from S22 (which also used `0ms` but as a single-card slice).
- **Marriage date** — exact day disputed between sources. Use year only (`en 1813`) to avoid a verifiable error.
