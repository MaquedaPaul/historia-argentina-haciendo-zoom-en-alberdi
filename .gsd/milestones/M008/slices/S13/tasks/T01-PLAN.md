# T01: Write S13 content draft with verified card text and T02 Recipe HTML

**Slice:** S13 — El primer gobierno de Rosas — cómo llegó al poder
**Slice goal:** Two `card-hecho` articles narrating Rosas's rise (1828–1829) and first mandate (1829–1832).

## Description

Write `S13-CONTENT-DRAFT.md` with full verified card text and a complete, splice-ready HTML block for T02. This task owns all historical authorship — T02 is purely mechanical after this.

## Inputs

- `S13-CONTEXT.md` (in `.gsd/milestones/M008/slices/S13/`) — preloaded chronology and nuances
- `S13-RESEARCH.md` (same dir) — image URLs, sources, content map
- Existing card HTML pattern (see any `card-hecho` article in `index.html` near lines 1600–1682)

## Steps

1. **Read** `.gsd/milestones/M008/slices/S13/S13-CONTEXT.md` and `.gsd/milestones/M008/slices/S13/S13-RESEARCH.md` to load the verified chronology and image metadata.

2. **Read** a representative existing `card-hecho` article from `index.html` (e.g., lines 1620–1680) to confirm the exact HTML structure to replicate.

3. **Write** `.gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` with:

   **Card S13-1** — *El detonante: el fusilamiento de Dorrego y la guerra civil (1828–1829)*
   - `data-certeza="hecho"`, `--reveal-delay: 0ms`, year label `1828 – 1829`
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Juan_Manuel_de_Rosas_1829.jpg/500px-Juan_Manuel_de_Rosas_1829.jpg` (509×640px, PD, UNUSED in index.html)
   - Alt text: a concise description of the portrait and its historical context
   - Prose (4–5 sentences): Lavalle's coup (1 Dec 1828) → Dorrego's summary execution at Navarro (13 Dec 1828, without trial) → federal militias rally under Rosas → Puente de Márquez victory (April 1829) → Convenio de Cañuelas (24 June 1829) + Convenio de Barracas (24 August 1829) → Legislatura elects Rosas governor (8 December 1829)
   - Sources: Lynch (1981 cap. 3), Saldías (1892 t. I), Halperín Donghi (1972)
   - `data-id="S13-1"`

   **Card S13-2** — *El primer mandato (1829–1832): orden, milicias y la Suma rechazada*
   - `data-certeza="hecho"`, `--reveal-delay: 80ms`, year label `1829 – 1832`
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Juan_Manuel_de_Rosas_by_Descalzi_oval.png/500px-Juan_Manuel_de_Rosas_by_Descalzi_oval.png` (880×1084px, PD, UNUSED in index.html)
   - Prose (4–5 sentences): Rosas governs with ordinary powers (Legislatura refuses to grant Suma del Poder Público) → fiscal consolidation, milicia strengthening, political order → December 1832: Rosas declines renewal when Suma still not granted and retires → **explicit nuance**: the Campaña del Desierto (1833) was commanded by Rosas as military officer — but under Governor Juan Ramón Balcarce, not as governor himself. He had already left office.
   - Sources: Lynch (1981 cap. 3), Saldías (1892), Zinny (1882)
   - `data-id="S13-2"`

4. **Append a T02 Recipe HTML block** at the end of the draft, clearly delimited (e.g., `## T02 Recipe HTML`), containing the exact `<article>` elements for both cards — complete with all attributes, image tags, headings, paragraph prose, and `<footer><cite>` — ready to paste verbatim into `index.html`.

## Must-Haves

- Both cards are `data-certeza="hecho"` — no historiographic debate in this slice (that's S17–S19).
- S13-2 explicitly states that the Campaña del Desierto (1833) happened under Governor Balcarce, not under Rosas as governor.
- Neither image URL is already in `index.html` — the four existing Rosas images are at lines 1353, 1654, 1708, 1730. Do not reuse any of them.
- Stagger delays: S13-1 at `0ms`, S13-2 at `80ms` (reset per-slice, not cumulative from S12).
- ≥2 cited sources per card.
- No new CSS classes or JS introduced.

## Verification

```bash
test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK
grep -c 'S13-' .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md  # must be ≥2
grep 'Balcarce\|Campaña del Desierto' .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md  # must match (nuance present)
```

## Observability Impact

T01 is a pure authorship task — it produces a single markdown artifact (`.gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md`) with no runtime signals. A future agent inspects this task by:

1. `test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK` — confirms the artifact was written.
2. `grep -c 'S13-' .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` — must be ≥ 2 (one per card).
3. `grep 'Balcarce\|Campaña del Desierto' .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` — confirms the critical nuance is present.
4. Reading the `## T02 Recipe HTML` block at the end of the draft — if absent, T02 cannot proceed mechanically.

**Failure state:** If the draft is missing or truncated, `test -s` returns exit 1 and T02 should not start. No silent failure mode exists — the file either exists or it doesn't.

## Expected Output

- `.gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` — non-empty, contains both card prose sections and a complete T02 Recipe HTML block.
