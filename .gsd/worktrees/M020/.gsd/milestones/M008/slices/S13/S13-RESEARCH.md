# S13: El primer gobierno de Rosas — cómo llegó al poder — Research

**Date:** 2026-03-23

## Summary

S13 is a straightforward content slice following the well-established two-card `card-hecho` pattern used by S12. The slice delivers two factual cards narrating (1) the crisis of December 1828 / how Rosas came to power (Dorrego's execution → civil war → Legislatura election of December 1829), and (2) what Rosas did during the first mandate (1829–1832) and why he stepped down (refused Suma del Poder Público → chose not to renew). Both cards are unambiguously `data-certeza="hecho"` — no historiographic debate belongs here; S17–S19 handle interpretation.

A pre-existing `S13-CONTEXT.md` file supplies the full chronology with key nuances (notably: the Campaña del Desierto was conducted in 1833 *after* Rosas left office, not during his mandate — Balcarce governed while Rosas led the military campaign). This nuance must appear in the content to pre-empt the common misconception.

Two unused Rosas portrait images were verified via the Wikimedia API and are ready: `Juan_Manuel_de_Rosas_1829.jpg` (500px thumb, dated to the 1829 era — ideal for S13-1) and `Juan_Manuel_de_Rosas_by_Descalzi_oval.png` (500px oval portrait, unused — ideal for S13-2). Both are distinct from the four Rosas images already in use in `index.html`.

## Recommendation

Produce two `card-hecho` articles using the Write-tool + Node.js splice pattern (not heredoc). Insert before the `<!-- S10–S24 cards will be appended here by subsequent slices -->` marker. Stagger delays reset to 0ms / 80ms (per-slice rule). No CSS or JS changes.

## Implementation Landscape

### Key Files

- `index.html` — target file; append marker confirmed at **line 1682** (verify with grep before splice, never hardcode)
- `.gsd/milestones/M008/slices/S13/S13-CONTEXT.md` — preloaded content source with verified chronology and sources; use it directly in T01 content draft
- `C:/tmp/` — temp file directory (not `/tmp/` — Windows environment)

### Content Map (2 cards)

**Card S13-1** — *El detonante: el fusilamiento de Dorrego y la guerra civil (1828–1829)*
- `data-certeza="hecho"`, `--reveal-delay: 0ms`
- Year label: `1828 – 1829`
- Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Juan_Manuel_de_Rosas_1829.jpg/500px-Juan_Manuel_de_Rosas_1829.jpg` (509×640px, 500px thumb verified, PD, UNUSED)
- Content: Lavalle's coup (1 Dec 1828) → execution of Dorrego without trial at Navarro (13 Dec 1828) → federal milicias rally under Rosas → Puente de Márquez victory (April 1829) → Convenio de Cañuelas (June 1829) + Convenio de Barracas (August 1829) → Legislatura elects Rosas governor (8 December 1829)
- Sources: Lynch (1981 cap. 3), Saldías (1892 t. I), Halperín Donghi (1972)

**Card S13-2** — *El primer mandato (1829–1832): orden, milicias y la Suma rechazada*
- `data-certeza="hecho"`, `--reveal-delay: 80ms`
- Year label: `1829 – 1832`
- Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Juan_Manuel_de_Rosas_by_Descalzi_oval.png/500px-Juan_Manuel_de_Rosas_by_Descalzi_oval.png` (880×1084px, 500px thumb verified, PD, UNUSED)
- Content: Rosas governs with ordinary powers (Suma rejected by Legislatura) → fiscal consolidation, milicia strengthening, political order → retires December 1832 when Suma still not granted → **key nuance**: Campaña del Desierto (1833) was commanded by Rosas as military officer under Governor Balcarce, not as governor himself
- Sources: Lynch (1981 cap. 3), Saldías (1892), Zinny (1882)

### Build Order

1. **T01** — Write `S13-CONTENT-DRAFT.md` with full card text and T02 Recipe HTML block
2. **T02** — Splice two cards into `index.html` before the append marker using Write + Node.js pattern

### Verification Approach

```bash
# After T02:
grep -c 'data-certeza' index.html           # Must be 71 (was 69 + 2 new cards)
grep -c 'S13-' index.html                   # Must be 2
grep -c 'cards will be appended here' index.html  # Must be 1 (marker untouched)
git diff --name-only HEAD -- styles.css app.js    # Must be empty
test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK
```

## Constraints

- **No CSS or JS new** — zero-constraint, all patterns exist
- **Windows `/tmp/` unavailable** — use `C:/tmp/` with `mkdir -p C:/tmp` before writing temp files
- **Node.js splice: ASCII-only marker substring** — use `'cards will be appended here by subsequent slices'` (no en-dash) to avoid Unicode shell encoding failures
- **Stagger delay resets to 0ms per slice** — do not continue cumulative delay from S12
- **Line number is not stable** — always grep for the marker before splicing; never hardcode line 1682

## Common Pitfalls

- **"Campaña del Desierto was during his first government"** — common misconception. Rosas left office in December 1832; the Campaña ran in 1833 under Governor Balcarce. The content must clarify this without burying it.
- **Image reuse** — four Rosas images are already in `index.html` (lines 1353, 1654, 1708, 1730). `Manuel_Dorrego.jpg` is used at line 1501. Do not reuse any of these. Use `Juan_Manuel_de_Rosas_1829.jpg` and `Juan_Manuel_de_Rosas_by_Descalzi_oval.png`.
- **Dorrego nuance** — Dorrego's image (`Manuel_Dorrego.jpg`, 349px wide) appears at line 1501 in a prior card. S13-1 should reference Dorrego in text but not reuse his image; the Rosas 1829 portrait is the right visual anchor for the card about Rosas's rise.
- **Sub-nav**: the `#periodo-rosas` sub-nav link was added by S09 — do NOT add another.

## Sources

- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 3 — primary narrative source for the first mandate
- Saldías, A., *Historia de la Confederación Argentina*, t. I, 1892 — primary source-based account of events 1828–1832
- Halperín Donghi, T., *De la revolución de independencia a la confederación rosista*, 1972 — analytical framework for Rosas's rise
- Zinny, A., *Historia de los gobernadores de las provincias argentinas*, 1882 — dates and mandate chronology
- Convenio de Cañuelas (24 June 1829) and Convenio de Barracas (24 August 1829) — primary texts establishing the political resolution of the 1829 civil war
