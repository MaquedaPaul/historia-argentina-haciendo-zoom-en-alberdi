# S24: Encarnación Ezcurra antes de Rosas — ¿era conocida? — Research

**Date:** 2026-03-23

## Summary

S24 is the final slice of M008. It adds two cards to `#periodo-rosas` covering Encarnación Ezcurra's pre-Rosas biography — her family origin, education, social position, and the question of whether her political agency was structurally hers or delegated. This is straightforward content work following the established M008 multi-slice pattern (Write tool → Node.js splice before append marker).

The biographical facts are well-documented across multiple secondary sources (verified in research): born 25 March 1795 in Buenos Aires; full name María de la Encarnación Ezcurra y Arguibel; father Juan Ignacio de Ezcurra (from Pamplona, Navarra) held posts in the Cabildo and the Consulado de Comercio — an elite commercial family, not landed aristocracy; mother Teodora Arguibel (Argentine, of French origin); education in reading, writing, and basic mathematics for the family business (Museo Histórico Nacional); married 16 March 1813 at age 18. No pre-Rosas public or political activity is documented in any source — her visibility is inseparable from the rosista project.

The interpretive card (S24-2) addresses the "agencia propia vs. instrumento" question that the roadmap flags. The two-position nota historiográfica format (established in S23) is the correct approach — no three-way split is warranted for this specific question.

## Recommendation

Two cards following the S23 pattern exactly:
- **S24-1** (`card-hecho`, `data-certeza="hecho"`): biographical facts — origin, family, education, marriage date with exact day, sister's connection to Belgrano.
- **S24-2** (`card-opinion`, `data-certeza="opini&#xF3;n"`): interpretive — was her influence structurally hers or built in function of Rosas? Two-position nota. No card-image (mirrors S23-2 / S21-2 no-image pattern for interpretive companion cards).

For S24-1 image: **do NOT reuse the S23-1 portrait** (`Encarnacion_Ezcurra_1835.jpg`) — it is already on the page. Use instead the **Isola litograph** mentioned by the Museo Histórico Nacional (Averico Isola, profile portrait, Litografía de las Artes). Search Wikimedia for `File:Encarnacion_Ezcurra_Isola.jpg` or similar. If not found, fall back to a Buenos Aires colonial/early-independence era image (e.g., a view of the city ca. 1800–1815) to evoke her social world without repeating the portrait. The S24-1 card can also run without an image block if no suitable alternative is confirmed (following the no-image pattern).

## Implementation Landscape

### Key Files

- `index.html` — append target; marker at line 2062 post-S23 (use `findIndex` dynamically, not line number)
- `.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` — to be created in T01
- `C:/tmp/s24-cards.html` — temp card HTML for T02 splice (Write tool, not heredoc)
- `C:/tmp/index.html.bak-s24` — pre-splice backup

### Current State (verified)

- `grep -c 'data-certeza' index.html` → **91** (S24 will advance to **93**)
- `grep -c 'card-nota-historiografica' index.html` → **11** (S24 adds one → expect **12**)
- `grep -c 'cards will be appended here' index.html` → **1** (marker intact at line 2062)
- `grep -c 'data-id="S23-' index.html` → **2** (S23 confirmed complete)

### Build Order

1. **T01** — Author `S24-CONTENT-DRAFT.md` with full prose sections + entity-encoded T02 Recipe HTML block. Verify ENTITY_PASS and SCOPE_PASS before T02.
2. **T02** — Extract T02 Recipe HTML → `C:/tmp/s24-cards.html` → Node.js splice before append marker → verify 7 checks.

### Splice Pattern (copy from S23-T02 exactly)

```js
const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
const idx = lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'));
const cards = fs.readFileSync('C:/tmp/s24-cards.html', 'utf8').split('\n');
lines.splice(idx, 0, ...cards);
fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
```

### Verification Approach

| Check | Command | Expected |
|-------|---------|----------|
| data-certeza count | `grep -c 'data-certeza' index.html` | **93** |
| S24 cards present | `grep -c 'data-id="S24-' index.html` | **2** (or 4 if both comment + data-id used) |
| Append marker intact | `grep -c 'cards will be appended here' index.html` | **1** |
| Nota count | `grep -c 'card-nota-historiografica' index.html` | **12** |
| No CSS/JS changes | `git diff --name-only HEAD -- styles.css app.js` | **(empty)** |
| Backup exists | `test -s C:/tmp/index.html.bak-s24` | **BACKUP_OK** |
| Scope boundary | Node.js banned-string check | **SCOPE_PASS** |

## Constraints

- **Zero new CSS/JS** — hard constraint (D001). Reuse `card-hecho` and `card-opinion` templates exactly.
- **Entity-encode all non-ASCII** in T02 Recipe HTML block — confirmed required for Windows shell round-trips (D053, KNOWLEDGE.md).
- **ASCII-only marker substring** for `findIndex` — use `'cards will be appended here by subsequent slices'` (avoids en-dash Unicode issue, KNOWLEDGE.md).
- **Stagger delay reset**: S24-1 at `--reveal-delay: 0ms`, S24-2 at `--reveal-delay: 80ms` — per-slice reset, not cumulative.
- **Do not reuse `Encarnacion_Ezcurra_1835.jpg`** — already present in S23-1 on the same page.

## Verified Biographical Facts for T01

All confirmed across ≥2 sources (todo-argentina.net, mujeresbonaerenses.gba.gob.ar, museohistoriconacional.cultura.gob.ar, revisionistas.com.ar, encyclopedia.com, Wikipedia EN):

- **Full name:** María de la Encarnación Ezcurra y Arguibel
- **Birth:** 25 March 1795, Buenos Aires
- **Father:** Juan Ignacio de Ezcurra (born Pamplona, Navarra) — held posts in the Cabildo and the Consulado de Comercio; elite commercial family
- **Mother:** Teodora Arguibel (Argentine, of French descent)
- **Family position:** elite de comerciantes, not landed gentry; respected but not first-rank aristocracy
- **Education:** reading, writing, basic mathematics — standard for daughters of merchants, to assist in family business (Museo Histórico Nacional)
- **Marriage date:** 16 March 1813 (exact day confirmed by multiple sources — safe to use, unlike the S23 year-only constraint which was due to uncertainty that does NOT apply here)
- **Ages at marriage:** she 18, he 20
- **Marriage circumstances:** Rosas's mother Agustina López de Osornio initially opposed; couple used a ruse (false pregnancy letter) to accelerate consent
- **Sister connection:** María Josefa Ezcurra had an illegitimate child with Manuel Belgrano in 1813 (Pedro Rosas y Belgrano); Encarnación and Rosas adopted him — notable family detail linking her to the Independence era
- **Pre-Rosas public activity:** none documented — her political visibility begins ca. 1828–1829 with the rise of Rosas

## Scope Boundary — Banned Terms for SCOPE_PASS Check

The T02 Recipe HTML must not contain:
- `Mazorca` (belongs to post-1839 period, after her death)
- `Caseros` (1852, out of scope)
- `Barranco Yaco` (S15 scope)
- `bloqueo franc` (S22 scope)
- `Vuelta de Obligado` (S22 scope)
- `Restauradores` (S23 scope — belongs to her political role card)
- `Sociedad Popular Restauradora` (S23 scope)

S24's scope is strictly: family origin, education, social position before Rosas's political career, marriage, and the historiographic question of autonomous agency vs. structural dependence.

## Sources

- Museo Histórico Nacional, "Encarnación: una mujer con gran poder político": father's Cabildo/Consulado role; education details. (museohistoriconacional.cultura.gob.ar)
- todo-argentina.net / revisionistas.com.ar / institutorosasdegralsanmartin: birth date, parents, bisabuelo Domingo de Ezcurra from Larraun (Navarra), marriage date 16 March 1813
- mujeresbonaerenses.gba.gob.ar: childhood character (Lucio Mansilla anecdote), María Josefa / Belgrano connection
- encyclopedia.com: confirms upper-class family, marriage despite mother-in-law opposition
- Wikipedia EN (Encarnación Ezcurra): birth/death dates, marriage date, children (Juan Bautista, Manuela), 25,000 at funeral
- Lynch, J., *Argentine Dictator*, Oxford, 1981, caps. 1–2 — available for pre-Rosas context (not yet cited in M008)
- Ramos Mejía, J. M., *Rosas y su tiempo*, 1907 — secondary source for early biography
