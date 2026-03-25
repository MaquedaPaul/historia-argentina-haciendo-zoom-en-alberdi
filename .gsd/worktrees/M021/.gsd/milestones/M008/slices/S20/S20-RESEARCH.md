# S20: Lo del 29 — el fusilamiento de Dorrego y la crisis de 1829 — Research

**Date:** 2026-03-23

## Summary

S20 is light work. All the patterns needed are already established; the main risk is scope duplication with S13-1, which must be explicitly avoided.

**S13-1 already covers the factual narrative of the fusilamiento.** Its title is "El detonante: el fusilamiento de Dorrego y la guerra civil (1828–1829)" and its excerpt describes the golpe (1 Dec 1828), the fusilamiento (13 Dec 1828), Rosas's mobilization, the Puente de Márquez victory, the Convenios de Cañuelas and Barracas, and the Legislatura election of 8 Dec 1829. S20 must approach the same period from a **different, complementary angle** — not repeat what S13-1 already narrates.

**S20's distinctive value-add** is the CONTEXT and CONSEQUENCES layer that S13-1 did not cover:
- **Card 1 (S20-1):** The WHY before: Dorrego's vulnerability — the Preliminary Convention of 1828 that ended the Brazil war, ceded the Banda Oriental (Uruguay), and was deeply unpopular in Buenos Aires. Without understanding that Dorrego signed an "unpopular peace," the fusilamiento looks arbitrary. With it, Lavalle's coup makes political sense — and his catastrophic miscalculation becomes visible.
- **Card 2 (S20-2):** The POLITICAL MEANING: why this specific killing became the foundational political rupture of Argentine history — the "línea de sangre" that crystallized unitario/federal enmity into personal vendetta, legitimized Rosas's revenge, and set the template for Argentine political violence for decades. This is an opinion/interpretation card, not a repeat of the factual narrative.

Both cards use established HTML patterns (card-hecho for S20-1, card-opinion for S20-2). No new CSS or JS. Certeza: `hecho` for S20-1, `opinión` (accented, entity-encoded) for S20-2 following the D057 pattern established in S17.

**Current state going into S20:** `data-certeza=84`, `card-nota-historiografica=8`, append marker at line 1933. After S20: `data-certeza=86`, `card-nota-historiografica=8` (no new nota for S20 — the event is `hecho`, the interpretation is `opinión`, neither requires a multi-position nota).

## Recommendation

Two cards following the Write-tool + Node.js-splice pattern. T01 authors `S20-CONTENT-DRAFT.md`; T02 splices the cards into index.html before the append marker. No image-sourcing surprises — two images are confirmed available and neither duplicates anything already in the page.

## Implementation Landscape

### Key Files

- `index.html` — splice target; append marker at line 1933 (grep-stable: `cards will be appended here by subsequent slices`). S20 cards go immediately BEFORE this comment.
- `.gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md` — must be authored in T01 (does not exist yet; tasks dir is empty).
- `C:/tmp/s20-cards.html` — temp splice snippet (Write tool, not heredoc).
- `C:/tmp/index.html.bak-s20` — pre-splice recovery backup.

### HTML Pattern

Use the same structure as S18 (two-card hecho+opinion sequence) and S17 (opinion card with `data-certeza="opini&#xF3;n"`).

**S20-1:** `card-hecho`, `data-certeza="hecho"`, `--reveal-delay: 0ms`, with image `Dorrego-fusilamiento.jpg` (confirmed 500px thumb available).

```html
<!-- S20-1: El contexto del fusilamiento: la paz con Brasil y la vulnerabilidad de Dorrego -->
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S20-1" style="--reveal-delay: 0ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Dorrego-fusilamiento.jpg/500px-Dorrego-fusilamiento.jpg"
         alt="..."
         loading="lazy">
  </div>
  <span class="event-card__year">1828</span>
  <h3 class="event-card__title">...</h3>
  <p class="event-card__excerpt">...</p>
  <footer class="card-source">...</footer>
</article>
```

**S20-2:** `card-opinion`, `data-certeza="opini&#xF3;n"`, `--reveal-delay: 80ms`, with image `Juan_Lavalle.jpg` (confirmed 500px thumb, different from `General_Don_Juan_LaValle.jpg` already used in S10-3).

```html
<!-- S20-2: La línea de sangre: el significado político del fusilamiento -->
<article class="event-card card-opinion reveal reveal-slide" data-certeza="opini&#xF3;n" data-id="S20-2" style="--reveal-delay: 80ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">&#x1F4AC;</span>
    <span class="card-certeza-label">Interpretaci&#xF3;n historiogr&#xE1;fica</span>
  </div>
  ...
</article>
```

### Images Confirmed Available

| File | Size | 500px Thumb | Used elsewhere? |
|------|------|-------------|-----------------|
| `Dorrego-fusilamiento.jpg` | 4641×7488 | ✅ `thumb/f/fa/Dorrego-fusilamiento.jpg/500px-...` | No |
| `Juan_Lavalle.jpg` | 578×775 | ✅ `thumb/b/b6/Juan_Lavalle.jpg/500px-...` | No (different from `General_Don_Juan_LaValle.jpg` used in S10-3) |

### Content for S20-1 (hecho): El contexto del fusilamiento

**Topic:** Why Dorrego was politically vulnerable when Lavalle struck.

Key facts (all verifiable, all hecho):
- The Cisplatine Province (Banda Oriental) had been part of the Provincias Unidas since 1821. Brazil occupied it in 1825, triggering the Argentina-Brazil War (1825–1828).
- The war ended with the **Preliminary Convention of Peace (27 August 1828)**, brokered by British diplomat Lord Ponsonby. Terms: both parties withdrew; the Banda Oriental became the independent state of Uruguay.
- Dorrego, as governor of Buenos Aires and de facto head of foreign policy, signed the treaty. It was deeply unpopular: Buenos Aires had fought and spent money — and now ceded territory.
- This gave Lavalle a political pretext: Dorrego was "guilty" of national humiliation.
- **Date of fusilamiento:** 13 December 1828 (not December 1 — that was the golpe; the execution was 12 days later).
- **Sources:** Lynch, *Argentine Dictator*, cap. 3; Saldías, *Historia de la Confederación Argentina*, t. I, 1892; Goldman, N. y Salvatore, R. (comps.), *Caudillismos rioplatenses*, EUDEBA, 1998.

### Content for S20-2 (opinión): La línea de sangre

**Topic:** Why this fusilamiento became the foundational political rupture.

Key interpretation (opinión — attributed to historians):
- Saldías (1892) was the first to frame the fusilamiento as the inaugural act of a new kind of Argentine politics — the elimination of a legitimate governor without trial as a political weapon.
- Halperín Donghi (1972) argues the fusilamiento "cerró el ciclo de las guerras civiles de transición y abrió el de las guerras civiles permanentes" — it transformed factional conflict into blood feud.
- Lynch (1981) notes that Lavalle's error was not military but political: he destroyed the legitimacy of his own cause. By killing an elected governor without trial, he validated every subsequent act of violence in the name of "federal revenge."
- The S10-3 card already notes (in its opinion card): "El fusilamiento de Dorrego por Lavalle (dic. 1828) y la primera gobernación de Rosas fijaron la línea de sangre." S20-2 unpacks what that phrase means.
- **Certeza:** `opinión` (accented) — this is historical interpretation, not a disputed fact. Follows D057.
- **Lynch chapters available for S20:** caps. 1–5, 8, 9 (cap. 10 consumed by S19, cap. 6 by S18, cap. 7 by S16). Cap. 3 is the correct chapter for the 1828–1829 period.

### Scope Guard: What S20 must NOT repeat

S13-1 already covers:
- The golpe of 1 December 1828
- The fusilamiento of 13 December 1828 "sin juicio, sin proceso, sin sentencia"
- Rosas's mobilization of rural militias
- The Puente de Márquez victory (April 1829)
- The Convenios de Cañuelas (24 June 1829) and Barracas (24 August 1829)
- Rosas elected governor 8 December 1829

S20 must NOT repeat this narrative. S20 must ADD:
- S20-1: The treaty context that made Dorrego politically vulnerable (the Brazil war, the Ponsonby peace, the unpopularity of the treaty)
- S20-2: The political/historiographic interpretation of the fusilamiento as foundational rupture

### Build Order

1. **T01:** Author `S20-CONTENT-DRAFT.md` with entity-encoded HTML for both cards. Verify no non-ASCII in the T02 Recipe block (Node.js check). Note: the content draft is the primary deliverable of T01; if T01 is auto-stubbed by /gsd doctor (as happened in S19), T02 must check for the file and author it as prerequisite.
2. **T02:** Write temp file `C:/tmp/s20-cards.html`, backup `C:/tmp/index.html.bak-s20`, Node.js splice before marker `cards will be appended here by subsequent slices`. Verify `data-certeza=86`.

### Verification Approach

```bash
grep -c 'data-certeza' index.html          # → 86
grep -c 'data-id="S20-1"' index.html       # → 1
grep -c 'data-id="S20-2"' index.html       # → 1
grep -c 'cards will be appended here' index.html  # → 1 (marker intact)
git diff --name-only HEAD -- styles.css app.js    # → empty (zero-new-CSS)
test -s C:/tmp/index.html.bak-s20 && echo BACKUP_OK
```

## Constraints

- **Zero CSS/JS new** (hard constraint from M008 milestone definition).
- **S13-1 scope guard:** S20's content must not duplicate S13-1's narrative. Focus on the treaty context (S20-1) and the political-rupture interpretation (S20-2).
- **`opinión` (accented, entity-encoded)** for S20-2 per D057. Use `data-certeza="opini&#xF3;n"` in HTML and `💬` icon (`&#x1F4AC;`).
- **No new `card-nota-historiografica`** for S20 — the fusilamiento itself is `hecho` (undisputed); the interpretation is `opinión` attributed to named historians. No multi-position debate is needed.
- **Lynch cap. 3** is the correct chapter for the 1828–1829 period (caps. 6, 7, 10 already consumed in S18, S16, S19).
- **Dorrego portrait (`Manuel_Dorrego.jpg`)** is already used in S09-3 (line 1501). Use `Dorrego-fusilamiento.jpg` (the execution painting) instead for S20-1 — visually and editorially stronger, and not a reuse.
- **`General_Don_Juan_LaValle.jpg`** already used in S10-3 (line 1593). Use `Juan_Lavalle.jpg` instead for S20-2 — confirmed different file, same person.
- **Windows `/tmp` path:** Use `C:/tmp/` if `/tmp/` fails; create with `mkdir -p C:/tmp` first.
- **Node.js ASCII-only marker string:** Use `cards will be appended here by subsequent slices` (no en-dash) as the splice search substring per KNOWLEDGE.md.

## Common Pitfalls

- **Duplicating S13-1** — The fusilamiento narrative is already in S13-1. If S20 re-narrates the same sequence of events, the two cards will look redundant to readers. S20 must start from a DIFFERENT premise (the treaty context, the political meaning) not the event timeline.
- **Using wrong Lavalle portrait** — `General_Don_Juan_LaValle.jpg` is already on line 1593. The confirmed alternative is `Juan_Lavalle.jpg` (different file, confirmed 500px thumb).
- **data-certeza accent:** S20-2 must use `opini&#xF3;n` (entity-encoded) in HTML source, consistent with S17-1's pattern and D057.

## Sources

Key references for content authoring:

- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, **cap. 3** (the 1828–1829 crisis — available, not yet used in M008).
- Saldías, A., *Historia de la Confederación Argentina*, t. I, Buenos Aires, 1892 (already cited in S13-1; cite different chapter or specific context for S20).
- Halperín Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972 — use a different section from what was cited in S13/S19.
- Goldman, N. y Salvatore, R. (comps.), *Caudillismos rioplatenses*, EUDEBA, 1998 — useful for the political-rupture interpretation in S20-2.
- La Convención Preliminar de Paz (27 de agosto de 1828) — primary source for the Brazil treaty context in S20-1.
