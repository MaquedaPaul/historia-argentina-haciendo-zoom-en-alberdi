# S12 — Research: La gobernación en un país dividido — caudillos y Buenos Aires

**Date:** 2026-03-23

## Summary

S12 is light, well-bounded work applying the established multi-slice append pattern to two new `card-hecho` cards. The content covers a single historiographic theme: how Argentina was actually governed between 1820 and 1852 in the absence of a national government — through caudillos in the provinces and the Buenos Aires governor controlling the aduana and foreign relations, all formally articulated through the Pacto Federal of 1831.

The slice produces **2 cards** (both `card-hecho`, `data-certeza="hecho"`): one explaining the fragmented power structure (caudillos + Buenos Aires), one on the Pacto Federal as its legal instrument. Both images have been API-confirmed as available with 500px thumbs and usable licenses, and neither is already in use in the file. The Node.js ASCII-marker splice pattern from prior slices applies without modification. No CSS, JS, or structural HTML changes are needed.

The `data-certeza` count stands at **67** post-S11. S12 will raise it to **69**. The append marker is at **line 1647** (confirmed live).

## Recommendation

Two-task execution: T01 writes `S12-CONTENT-DRAFT.md` (historical facts, image API results, HTML recipe); T02 splices the cards into `index.html` before the append marker using the Node.js one-liner pattern. This separation is the established M008 pattern — it isolates fact-checking (T01) from mechanical HTML integration (T02).

## Implementation Landscape

### Key Files

- `index.html` — append target; the S10–S24 marker is at **line 1647** (`grep -n 'cards will be appended here by subsequent slices' index.html` to confirm before T02 runs). S12 cards insert immediately BEFORE this comment.
- `.gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md` — to be created by T01 with content, image URLs, and T02 Recipe section for mechanical copy-paste.
- `.gsd/milestones/M008/slices/S12/S12-CONTEXT.md` — already exists; provides the structural framework and source list for T01.

### Card Plan

| Card ID | Title | Certeza | Image | Stagger |
|---------|-------|---------|-------|---------|
| S12-1 | Un país sin gobierno nacional — el poder real en manos de los caudillos (1820–1852) | hecho | `Retrato_del_General_Juan_Manuel_de_Rosas.jpg` (PD, 500px ✅) | `--reveal-delay: 0ms` |
| S12-2 | El Pacto Federal de 1831 — la Confederación sin Estado central | hecho | `Flag-map_of_Argentine_Confederation_(1836).png` (CC0, 500px ✅) | `--reveal-delay: 80ms` |

**S12-1** explains the power structure: 14 provinces acting as sovereign states, caudillos with armies and judicial power in the interior, the Buenos Aires governor controlling the aduana (80% of national revenue) and managing foreign relations by provincial delegation — but with no legal authority over other provinces.

**S12-2** explains the Pacto Federal (January 4, 1831): signed by Buenos Aires, Santa Fe, and Entre Ríos (Corrientes adhered shortly after), it formalized the Confederation without a central government. The Comisión Representativa created by the Pacto was dissolved in 1832. The Pacto became the constitutional backbone of the Confederation until 1853.

### Confirmed Image URLs (API-verified)

| Card | File | Thumb URL | License |
|------|------|-----------|---------|
| S12-1 | `Retrato_del_General_Juan_Manuel_de_Rosas.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Retrato_del_General_Juan_Manuel_de_Rosas.jpg/500px-Retrato_del_General_Juan_Manuel_de_Rosas.jpg` | Public domain |
| S12-2 | `Flag-map_of_Argentine_Confederation_(1836).png` | `https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Flag-map_of_Argentine_Confederation_%281836%29.png/500px-Flag-map_of_Argentine_Confederation_%281836%29.png` | CC0 |

Neither image is currently used in `index.html` (confirmed via `grep`). Both have 500px thumbs (confirmed via Wikimedia API).

### Key Sources for T01

- **Halperin Donghi, T.**, *De la revolución de independencia a la confederación rosista*, Paidós, 1972 (2000), caps. II–IV — the authoritative structural analysis of the 1820–1852 power vacuum.
- **Goldman, N. y Salvatore, R. (comps.)**, *Caudillismos rioplatenses*, EUDEBA, 1998 — the most rigorous academic treatment of caudillo power structures.
- **Lynch, J.**, *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 2 ("The Structure of Power") — specific to the mechanics of Buenos Aires hegemony within the Confederation.
- **Pacto Federal, 4 de enero de 1831** — primary source; the legal text articulating the inter-provincial confederation. Its three original signatories and the Comisión Representativa are documented facts.
- **Zinny, A.**, *Historia de los gobernadores de las provincias argentinas*, 1882 — for province-by-province factual grounding.

### Build Order

1. **T01** — Write `S12-CONTENT-DRAFT.md`: biographical excerpts, structural facts about the 1820–1852 governance vacuum, Pacto Federal details (date, signatories, Comisión Representativa, dissolution 1832), image API confirmations, full T02 Recipe with exact HTML attributes.
2. **T02** — Splice: `grep -n 'cards will be appended here by subsequent slices' index.html` to get live marker line → write card block to `/tmp/s12-cards.html` → Node.js splice using ASCII-only marker substring `'cards will be appended here by subsequent slices'` → verify `grep -c 'data-certeza' index.html` = 69.

### Verification Approach

```bash
# After T02:
grep -c 'data-certeza' index.html                          # must be 69
grep -c 'S12-' index.html                                  # must be 2
grep -n 'cards will be appended here by subsequent slices' index.html  # marker must remain (1 result)
git diff --name-only HEAD -- styles.css app.js             # must be empty
test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md && echo OK
```

## Constraints

- **Zero CSS/JS new**: S12 is purely card content. The `card-hecho` template from prior slices is the only pattern needed.
- **Stagger resets to 0ms**: S12-1 gets `--reveal-delay: 0ms`, S12-2 gets `--reveal-delay: 80ms`. Do NOT continue S11's cumulative delay.
- **Marker line**: Always re-grep before splicing. The marker was at line 1647 post-S11 — it may shift if any prior edit has run since then.
- **Node.js one-liner**: Use ASCII-only substring `'cards will be appended here by subsequent slices'` in `findIndex`. Do NOT include the en-dash (`–`) from the comment — it causes encoding failures (per KNOWLEDGE.md).
- **No direct quotes synthesized**: The S12 content is structural/factual (no contested attributions). If a blockquote from Lynch or Halperin Donghi is included, use the `card-opinion__context` paraphrase pattern with explicit attribution, not an invented direct quote.

## Common Pitfalls

- **Marker uniqueness check**: After splice, `grep -c 'cards will be appended here' index.html` must return 1. If it returns 2, a duplicate was accidentally inserted — use Node.js to remove the spurious copy.
- **Image 1 is a portrait (portrait aspect ratio)**: `Retrato_del_General_Juan_Manuel_de_Rosas.jpg` is a portrait-orientation painting. The `.card-image` container uses `object-fit: cover` — this is fine, but the alt text should describe the painting's historical context, not just "portrait of Rosas".
- **Image 2 is a map (CC0)**: The Flag-map is CC0 — no attribution required, but include it in the `<cite>` footer for consistency with the site's source-citation pattern.
- **S12 is factual — no `card-nota-historiografica`**: The governance structure and Pacto Federal are documented facts. The contested interpretations (tiranía, soberanía) belong to S17–S19. Do not introduce historiographic debate here.
- **The 14-province count (1835)**: S12-CONTEXT.md lists 14 provinces for the 1835 period (matching S21's content map). S12 covers 1820–1852 broadly — use "las provincias" without enumerating all 14, to avoid duplicating what S21 will cover in detail.
- **Write tool, not heredoc**: Do NOT use bash heredoc to write the card block. Write to `/tmp/s12-cards.html` using the Write tool, then `cat /tmp/s12-cards.html` to verify before splicing (per KNOWLEDGE.md).

## Forward Intelligence for Planner

- After S12, the append marker will shift ~40 lines further (two card articles ≈ 35–40 lines each). S13 must re-grep.
- S12-1 establishes the "no national government" framing — S13 (Rosas's first government) picks up directly from this context; the planner should note that S13 does NOT need to re-explain the power vacuum.
- The `data-certeza` count target post-S12 is **69**. S13's planner should start from this baseline.
- Both images verified unused as of S11 completion — no reuse conflict.
