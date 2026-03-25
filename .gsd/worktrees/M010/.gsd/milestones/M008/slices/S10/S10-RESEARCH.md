# S10: Ideas de unitarios y federales — Research

**Date:** 2026-03-22

## Summary

S10 is a straightforward content slice following the exact S09 pattern: produce a content draft first, then append cards to `#periodo-rosas` using the established append-marker mechanism. The scope is narrow and well-defined: explain the *ideas* of each bando — what unitarios actually believed and wanted, what federales actually believed and wanted, and what the economic substructure of the conflict was. This goes at least two levels deeper than SP2-2 (which names the sides in three sentences) without duplicating it.

The slice should produce **3 cards** covering: (1) the unitario program in depth — centralismo, libre comercio, modèle européen, constitución escrita; (2) the federal program in depth — autonomía provincial, proteccionismo, reparto de rentas, identidad criolla; and (3) the economic substructure — how the aduana asymmetry made the conflict intractable regardless of constitutional design. A fourth card is optional if image sourcing reveals a strong candidate, but 3 cards maintains coherence with S09's density and avoids crowding the grid before S11–S24 add their own entries.

All HTML patterns are established in S09. No CSS, no JS, no new templates needed. This is pure content work.

## Recommendation

Follow the two-task S09 pattern exactly:
- **T01:** Write `S10-CONTENT-DRAFT.md` — research content, certeza classification, image sourcing via Wikimedia API, framing notes that differentiate from SP2-2.
- **T02:** Append cards to `index.html` immediately before `<!-- S10–S24 cards will be appended here by subsequent slices -->` (currently line 1542, but use `grep -n` not a hard-coded line number).

**3 cards, certeza mix: 2 `hecho` + 1 `opinion`.** The structural/ideological facts are documented; the claim about which side had the better program is inherently interpretive. A third card framing the conflict as "más que una disputa constitucional — un conflicto de modelos económicos" uses `card-opinion` with attribution to Halperin Donghi and John Lynch.

## Implementation Landscape

### Key Files

- `index.html` — append target. Use `grep -n 'S10–S24 cards will be appended'` to find insertion line.
- `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` — structural and formatting template. Copy card skeleton verbatim; change only content.

### Card Plan

| Card | Title | Certeza | Image candidate |
|------|-------|---------|-----------------|
| S10-1 | El programa unitario: centralismo, libre comercio y modelo europeo | `hecho` | `Sarmiento_retrato.jpg` (Sarmiento as archetype of unitario intellectualism; 857×1069px, public domain) OR `Retrato_de_Sarmiento_-_Benjamín_Franklin_Rawson.jpg` (742×938px, public domain) — both verified ✅ |
| S10-2 | El programa federal: autonomía, proteccionismo y reparto de rentas | `hecho` | `Charton,_Ernest_-_Retrato_de_Esteban_Echeverría_-o.jpg` **REJECTED** — Echeverría belongs to Gen. del 37, not federal bando. Use `General_Don_Juan_LaValle.jpg` (3087×4778px, public domain, verified ✅) **ALSO REJECTED** — Lavalle is unitario, not federal. Best option: `Facundo_Quiroga_por_García_del_Molino.jpg` already used in SP2-2. Fallback: Rosas portrait (`Raymond_Monvoisin...1842.jpg`) already used in SP3-1. **RESOLUTION:** Search for Estanislao López or a period illustration of gaucho/province scene. |
| S10-3 | El conflicto real: ¿quién se queda con la aduana? | `opinion` | Mapa de 1821 already used in S09-4. Use `Aduana_de_Buenos_Aires.jpg` already used in S09-1. **RESOLUTION:** Use `General_Don_Juan_LaValle.jpg` (unitario general, public domain) for S10-3 as the economic conflict card — it completes the visual contrast: unitarios (Sarmiento portrait, S10-1) vs. federal (TBD, S10-2) vs. conflict symbol (Lavalle, S10-3). |

### Image Sourcing — Resolved

After Wikimedia verification:

| Card | File | Thumb URL | License | Status |
|------|------|-----------|---------|--------|
| S10-1 | `Retrato_de_Sarmiento_-_Benjamín_Franklin_Rawson.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Retrato_de_Sarmiento_-_Benjam%C3%ADn_Franklin_Rawson.jpg/500px-Retrato_de_Sarmiento_-_Benjam%C3%ADn_Franklin_Rawson.jpg` | Public domain | ✅ Verified, 742px orig |
| S10-2 | `Charton,_Ernest_-_Retrato_de_Esteban_Echeverría_-o.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Charton%2C_Ernest_-_Retrato_de_Esteban_Echeverr%C3%ADa_-o.jpg/500px-Charton%2C_Ernest_-_Retrato_de_Esteban_Echeverr%C3%ADa_-o.jpg` | Public domain | ✅ Verified, 550px orig — USE FOR S10-2: Echeverría represents the *federales' opponents who articulated unitario ideas from exile* — but better as S10-1 (unitarios). Reassign: use for unitario card, Echeverría as Gen. del 37 articulating the unitario-liberal intellectual position. Sarmiento shifts to S10-3. |
| S10-3 | `Sarmiento_retrato.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Sarmiento_retrato.jpg/500px-Sarmiento_retrato.jpg` | Public domain | ✅ Verified, 857px orig |

**Final image assignment (simplified — avoids reuse conflicts):**
- **S10-1 (unitario ideas):** `Charton, Ernest - Retrato de Esteban Echeverría -o.jpg` — Echeverría is the best representative of the unitario intellectual program (*Dogma Socialista* 1837, Asociación de Mayo). Public domain, 500px thumb verified.
- **S10-2 (federal ideas):** `General_Don_Juan_LaValle.jpg` — Lavalle is the quintessential unitario general **BUT** the card needs a federal figure. Rosas portrait is already used in SP3-1. Quiroga is already used in SP2-2. **Need a different federal representative.** Search reveals `José_María_Paz_(retrato).png` (400×547px, CC BY-SA 4.0) — but Paz is *unitario*, not federal. No unused federal portrait found in initial searches. **RESOLUTION:** Use `Retrato_de_Sarmiento_-_Benjamín_Franklin_Rawson.jpg` for S10-1 (Sarmiento as unitario intellectual archetype — *Facundo* 1845 is the canonical unitario text); use Echeverría portrait for S10-2 (his *Dogma Socialista* articulates what the Generation of 37 opposed about federalism); use a period illustration for S10-3.

**Pragmatic final assignment (avoids all reuse conflicts):**
- **S10-1 (unitario program):** `Retrato_de_Sarmiento_-_Benjamín_Franklin_Rawson.jpg` — Sarmiento, *Facundo* 1845, canonical unitario-liberal text. Public domain, 500px verified. ✅
- **S10-2 (federal program):** `Charton, Ernest - Retrato de Esteban Echeverría -o.jpg` — Note: Echeverría is Gen. del 37, not strictly "federal" — but his *Dogma Socialista* articulated *what the federales opposed*, making him the ideal counterpoint figure for the federal-ideas card framing. Alternatively: use the Echeverría portrait for the unitario card (S10-1) since *Dogma Socialista* is more explicitly unitario-liberal, and find a different image for S10-2. **Final decision for T01 executor:** Use Echeverría for S10-1 (unitario intellectual ideas). For S10-2 (federal ideas), search Wikimedia for "color punzo federal" or "Sociedad Popular Restauradora" or a period scene showing federal iconography — if nothing found, use `General_Don_Juan_LaValle.jpg` for S10-3 and leave S10-2 with a map/document image. **The T01 executor has authority to resolve image assignment during draft production.**
- **S10-3 (economic substructure — aduana conflict):** `General_Don_Juan_LaValle.jpg` (public domain, 500px verified ✅) — Lavalle as symbol of the unitario side in the economic war (his execution of Dorrego detonated the crisis). OR find a period image of the Buenos Aires port/custom house — but `Aduana_de_Buenos_Aires.jpg` is already used in S09-1.

### Build Order

1. T01: Content draft (`S10-CONTENT-DRAFT.md`) — research content, finalize image assignments via Wikimedia API, write 3 card entries.
2. T02: HTML integration — locate append marker with `grep`, insert 3 cards before it, verify card count.

### Verification Approach

```bash
# After T02:
grep -c 'data-certeza' index.html           # Should be 65 (62 + 3 S10 cards)
grep -n 'S10–S24 cards will be appended' index.html   # Still present (not deleted)
git diff --name-only HEAD -- styles.css app.js         # Empty (no CSS/JS changes)
```

## Constraints

- **Zero CSS/JS new**: reuse all existing card templates and reveal system. S10 cards use `class="event-card card-hecho reveal reveal-slide"` (hecho) and `class="event-card card-opinion reveal reveal-slide"` (opinion) exactly as in S09.
- **No image reuse from existing cards**: `Facundo_Quiroga...jpg` (SP2-2), `Bernardino_Rivadavia.jpg` (SP2-3), `Juan_Bautista_Alberdi.jpg` (SP2-4), `Aduana_de_Buenos_Aires.jpg` (S09-1), `Juan_Martín_de_Pueyrredón.jpg` (S09-2), `Manuel_Dorrego.jpg` (S09-3), `Mapa_...1821.png` (S09-4), `Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas,_1842.jpg` (SP3-1) — all already in use.
- **Append marker discipline**: insert cards immediately BEFORE `<!-- S10–S24 cards will be appended here by subsequent slices -->`. The marker must remain in place for S11–S24.
- **Stagger delay reset**: S10 starts at 0ms, 80ms, 160ms — does NOT continue from S09's 240ms.
- **No sub-nav link**: S09 already added `<a href="#periodo-rosas">`. S10 does NOT add another.
- **SP2-2 differentiation**: SP2-2 names the sides in 3 sentences. S10 must go substantially deeper — specific policy positions, the economic logic, named intellectual sources (Echeverría's *Dogma Socialista*, Sarmiento's *Facundo*, the Pacto Federal 1831 as the federal constitutional instrument).

## Common Pitfalls

- **Image reuse**: Quiroga and Rosas portraits are already used in SP2-2 and SP3-1 respectively. Rivadavia is in SP2-3. The T01 executor must verify against the full used-image list above.
- **SP2-2 overlap**: The key risk. S10's cards must explain *what* each side believed (their actual program), not just *that* the division existed. The framing note in the content draft must explicitly document the differentiation angle.
- **Certeza for "program" cards**: The programs are documented historical facts (both sides published manifestos, constitutions, and polemical texts). Certeza `hecho` is correct for cards describing those programs. Only the card making the interpretive claim "the real conflict was economic" uses `opinion`.
- **Quote verification**: If citing *Facundo* (1845) or *Dogma Socialista* (1837), these are digitized and safe to cite at work-level. Chapter-level citations are sufficient. Do NOT synthesize a direct quote from secondary sources.

## Content Notes for T01

### S10-1: El programa unitario

Key elements to cover:
- Gobierno centralizado con sede en Buenos Aires, con facultad de intervenir en las provincias
- Libre comercio: mercados abiertos, preferencia por capitales y mercancías europeas
- Constitución escrita de tipo republicana-representativa (modelo norteamericano/francés)
- Educación pública como mecanismo de «civilización»
- Representantes intelectuales: Rivadavia (praxis política), Echeverría (*Dogma Socialista*, 1837), Sarmiento (*Facundo*, 1845)
- Certeza: **hecho** — estas posiciones están documentadas en textos primarios

### S10-2: El programa federal

Key elements to cover:
- Autonomía provincial como punto no negociable: cada provincia conserva sus leyes, ejército y fiscalidad
- Proteccionismo: aranceles para proteger las industrias del interior (vinos de Cuyo, tejidos de Tucumán, cueros de Corrientes) frente a la competencia europea
- Reparto de las rentas aduaneras: las provincias exigían una porción de los ingresos del puerto de Buenos Aires
- Identidad criolla y gaucha frente al «extranjerismo» unitario
- El Pacto Federal de 1831 como instrumento jurídico del federalismo: articuló la confederación sin gobierno central
- Representantes: Rosas (Buenos Aires), Quiroga (La Rioja), López (Santa Fe), Ramírez (Entre Ríos)
- Certeza: **hecho** — documentado en el Pacto Federal, la correspondencia de Rosas, y los decretos provinciales

### S10-3: El conflicto real — ¿quién controla la aduana?

Key elements to cover:
- La aduana de Buenos Aires: ~80% de los ingresos nacionales. Quien la controlaba financiaba su ejército y su política. Las provincias dependían de subsidios discrecionales.
- El libre comercio como arma unitaria: importaciones baratas destruían la manufactura del interior (vinos mendocinos vs. vinos europeos; telas tucumanas vs. telas inglesas)
- El proteccionismo como demanda federal: no era ideológico puro, era supervivencia de las economías provinciales
- La paradoja: los federales querían *autonomía* pero también *redistribución* — dos demandas difíciles de reconciliar con cualquier constitución
- Halperin Donghi: el conflicto no era entre "civilización" y "barbarie" (Sarmiento's frame) sino entre dos proyectos de inserción en la economía atlántica
- Certeza: **opinion** — el encuadre como "conflicto de modelos económicos" es interpretación historiográfica (Halperin Donghi, Lynch), aunque los datos económicos son hechos

## Sources for T01 to Verify

- Sarmiento, D.F., *Facundo: Civilización y Barbarie*, 1845 — the canonical unitario framing
- Echeverría, E., *Dogma Socialista de la Asociación de Mayo*, 1837/1846 — the Gen. del 37 program
- Halperin Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972 — the economic reframing
- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981 — balanced account
- Goldman, N. (dir.), *Nueva Historia Argentina*, t. III, Sudamericana, 1998 — modern synthesis
- Pacto Federal del Litoral, 4 de enero de 1831 — primary source for the federal constitutional framework

## Observability Targets

After T02 completes:
- `grep -c 'data-certeza' index.html` → **65** (62 + 3)
- `grep -c 'S10' index.html` → ≥6 (3 HTML comments + stagger delays reference)
- `grep -n 'S10–S24 cards will be appended' index.html` → still present (marker not deleted)
- `git diff --name-only HEAD -- styles.css app.js` → empty
