# S15 — El asesinato de Facundo Quiroga — ¿fue Rosas? — Research

**Date:** 2026-03-23

## Summary

S15 is targeted research — the historical content and card structure are both well-established. The CONTEXT.md for this slice already documents the three historiographic hypotheses with sources and certeza guidance. The codebase pattern is the same Node.js marker-splice used by S09–S14. The main decisions are (a) card count and composition, and (b) image selection.

**Two cards are the right scope.** S15-1 is a `card-hecho` narrating the documented facts of the ambush (date, place, material executors, trial), and S15-2 is a `card-opinion` with `data-certeza="debatido"` covering the three hypotheses about the intellectual author — with a `card-nota-historiografica` embedded. A two-card structure keeps the historiographic debate visible without redundancy with the existing S14-3 seed note.

One important context note: the page already spells the location **"Barranca Yaco"** (with an "a") in multiple places — S14-1, BIOG-19, BIOG-20, and the S11 federal referents card all use "Barranca Yaco". Use that spelling for consistency with the live page, even though "Barranco Yaco" (with an "o") also appears in sources and in the CONTEXT.md. The variant "Barranco" should be noted in content but the main form must match the existing page.

A strong public-domain image exists for this slice: **`Barranca_Yaco_2.jpeg`** on Wikimedia Commons — a 19th-century painting by Cayetano Descalzi (1809–1886) depicting the ambush scene. 500px thumb available. Public domain. Description: "Libre interpretación del artista C. Descalzi sobre la emboscada de Barranca Yaco en la que fue asesinado el caudillo norteño."

## Recommendation

Implement two cards following the pattern from S14:

- **S15-1** (`card-hecho`, `data-certeza="hecho"`, 0ms stagger): The documented facts — Quiroga's return mission, the ambush at Barranca Yaco (16 Feb 1835), Santos Pérez as executor, the Reinafé brothers as the convicts, their execution in Buenos Aires in 1837. Image: `Barranca_Yaco_2.jpeg` (Public domain, Descalzi).
- **S15-2** (`card-opinion`, `data-certeza="debatido"`, 80ms stagger): The three hypotheses on intellectual authorship — Reinafé solos, Rosas as mastermind, Heredia as possible accomplice — with a `card-nota-historiografica` presenting the liberal vs. revisionista positions. No image (consistent with S14-3, which also has no image for the historiographic note card).

Use HTML entities for all non-ASCII characters in the T02 Recipe block (Windows encoding safety, confirmed reliable per KNOWLEDGE.md).

Use the ASCII-only marker substring `cards will be appended here by subsequent slices` for the Node.js splice (no en-dash, confirmed reliable per KNOWLEDGE.md).

## Implementation Landscape

### Key Files

- `index.html` — insert 2 new cards before `<!-- S10–S24 cards will be appended here by subsequent slices -->` (currently line 1768, but use grep not line number). Current `data-certeza` count = 74 → should become 76.
- `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` — create in T01 with prose, sources, image notes, and verbatim T02 Recipe HTML block (HTML entities form).
- `C:/tmp/s15-cards.html` — temp file for Node.js splice input (Write tool, not heredoc).
- `C:/tmp/index.html.bak-s15` — pre-splice recovery backup.

### Key Facts to Include (Verified)

**S15-1 — The documented facts:**
- Quiroga was returning from a pacification mission in the northwest (dispatched by Governor Maza of Buenos Aires, at Rosas's behest) when he was ambushed.
- Date: **16 de febrero de 1835**.
- Location: **Barranca Yaco**, camino de Córdoba, provincia de Córdoba.
- Executor: **Santos Pérez**, al mando de una partida organizada por los Reinafé.
- Victims: Quiroga and his entire escort (~12 persons), including secretary Santos Ortiz (already mentioned in BIOG-20).
- The Reinafé brothers — **José Vicente Reinafé** (gobernador de Córdoba) and his brothers — were arrested, tried in Buenos Aires before a court, and **executed on 25 October 1837**.
- Year card: `16 de febrero de 1835`
- Source: Lynch, J., *Argentine Dictator*, 1981, cap. 4; Saldías, A., *Historia de la Confederación Argentina*, t. I, 1892.

**S15-2 — The three hypotheses:**
1. **Los Reinafé solos**: Had personal motives (Quiroga had intervened politically in Córdoba and was a rival federal power). Their confessions and trial did not directly implicate Rosas.
2. **Rosas como autor intelectual** (hypothesis liberal): Rosas was the sole beneficiary of Quiroga's death — the only federal caudillo who rivaled him for national leadership. Sarmiento accused Rosas in *Facundo* (1845). The mission itself placed Quiroga on the road through Córdoba. Circumstantial but strong.
3. **Alejandro Heredia** (Gobernador de Tucumán): Also had conflicts with Quiroga. Cited by some historians as possible accomplice; no conclusive evidence.

**Historiographic positions:**
- **Liberal** (Sarmiento, Mitre, López): Rosas was the intellectual author.
- **Revisionista** (José María Rosa, *Historia Argentina*, t. IV, 1964): The Reinafé acted alone; the accusation against Rosas was fabricated by his enemies.
- **Contemporary synthesis** (Lynch, *Argentine Dictator*, 1981): The evidence is circumstantial. Rosas clearly benefited; he was never proven guilty.

### Image

- **S15-1 image**: `Barranca_Yaco_2.jpeg` by Cayetano Descalzi (Argentine artist, 1809–1886), 19th century. Public domain. 720×490px original. 500px thumb URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Barranca_Yaco_2.jpeg/500px-Barranca_Yaco_2.jpeg`
- Alt text suggestion: "«La emboscada de Barranca Yaco» (ca. mediados del siglo XIX), pintura de Cayetano Descalzi. Interpretación artística del asesinato de Facundo Quiroga el 16 de febrero de 1835."
- No separate attribution needed (public domain).
- **S15-2**: no image (historiographic debate card — consistent with S14-3).

### Build Order

1. **T01**: Author `S15-CONTENT-DRAFT.md` with prose for both cards, sources, image notes, and the verbatim HTML block in HTML-entity form ready for T02 splice.
2. **T02**: Splice the two cards before the append marker using Node.js. Verify `grep -c 'data-certeza' index.html` = 76 and `grep -c 'data-id="S15-' index.html` = 2.

### Verification Approach

```bash
grep -c 'data-certeza' index.html           # expect 76
grep -c 'data-id="S15-' index.html          # expect 2
grep -c 'cards will be appended here' index.html  # expect 1 (marker not consumed)
git diff --name-only HEAD -- styles.css app.js    # expect empty
test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md && echo OK
```

## Constraints

- **Zero new CSS/JS**: cards use existing `card-hecho`, `card-opinion`, `card-certeza-indicator`, `card-nota-historiografica` classes.
- **data-certeza="debatido"** on S15-2 (same as S14-3 — no `card-debatido` class exists).
- **Spelling**: use "Barranca Yaco" (with "a") throughout to match all existing occurrences in index.html; only mention "Barranco Yaco" as a variant in a parenthetical if needed.
- **No duplication**: BIOG-19 (Quiroga profile) and BIOG-20 (entorno de Quiroga, Santos Ortiz) already established the biographical facts. S15-1 need not re-introduce Quiroga's background; it should focus narrowly on the ambush event and the trial of the Reinafé.
- **Santos Ortiz already mentioned** as dying in the ambush (BIOG-20, line 947–948). S15-1 can reference him with "incluyendo a su secretario Santos Ortiz" without full re-introduction.
- **S14-1 already mentions the assassination** briefly in its excerpt ("la noticia del asesinato de Juan Facundo Quiroga en Barranca Yaco"). S15 deepens the event; S14-1 treats it as context. No conflict, but the planner should be aware.
- **HTML entities**: all non-ASCII Spanish characters in the T02 Recipe block must use HTML entities (&#xF3; for ó, &#xE9; for é, &#xED; for í, &#xFA; for ú, &#xF1; for ñ, &#xE1; for á, &#x2014; for em-dash, &#x2013; for en-dash, &#xBF; for ¿, &#xAB; for «, &#xBB; for »).

## Common Pitfalls

- **"Barranco" vs "Barranca"**: the location has both spellings in different sources. The live page uses "Barranca Yaco" exclusively. Do NOT introduce "Barranco Yaco" as the primary form.
- **Date of Reinafé execution**: 25 October 1837 (not 1836 or 1838). Lynch cap. 4 and Saldías t. I agree on 1837.
- **Santos Pérez**: the executor (material author) — not one of the Reinafé brothers. Clarify: Santos Pérez was the gunman; the Reinafé brothers ordered and organized the ambush.
- **Quiroga portrait already used**: `Facundo_Quiroga_por_García_del_Molino.jpg` is used in BIOG-19. For S15 use `Barranca_Yaco_2.jpeg` (the ambush scene painting) — more contextually appropriate and avoids visual repetition.
- **grep -c 'data-id="S15-'** should return 2 (one per card). If both cards also use `<!-- S15-N: ... -->` HTML comments, `grep -c 'S15-'` will return 4 (2 × card count) — set verification target accordingly (see KNOWLEDGE.md grep-c multiplier note).

## Sources

- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 4 (Quiroga murder, Reinafé trial).
- Saldías, A., *Historia de la Confederación Argentina*, t. I, 1892 (documentary account of the event).
- Sarmiento, D. F., *Facundo: Civilización y Barbarie*, 1845, Segunda Parte (liberal accusation against Rosas).
- Rosa, J. M., *Historia Argentina*, t. IV, Oriente, 1964 (revisionist defense: Reinafé acted alone).
- Goldman, N. y Salvatore, R. (comps.), *Caudillismos rioplatenses*, EUDEBA, 1998 (contemporary scholarship).
