# S20: Lo del 29 — el fusilamiento de Dorrego y la crisis de 1829

**Goal:** Añadir dos cards que completan el contexto del fusilamiento de Dorrego (diciembre 1828) que S13-1 no cubrió: la vulnerabilidad política que lo hizo posible (la Convención de Paz con Brasil y la cesión de la Banda Oriental) y el significado historiográfico del fusilamiento como ruptura fundacional de la política argentina.
**Demo:** `grep -c 'data-certeza' index.html` retorna 86; `grep -c 'data-id="S20-1"' index.html` retorna 1; `grep -c 'data-id="S20-2"' index.html` retorna 1; el marker `cards will be appended here` permanece intacto (1 ocurrencia); `git diff --name-only HEAD -- styles.css app.js` retorna vacío.

## Must-Haves

- **S20-1** (`card-hecho`, `data-certeza="hecho"`): narración del contexto del fusilamiento — la Guerra con Brasil (1825–1828), la Convención Preliminar de Paz (27 agosto 1828) brokered por Lord Ponsonby, la cesión de la Banda Oriental (Uruguay independiente), la impopularidad del tratado en Buenos Aires, y cómo eso le dio a Lavalle el pretexto político para el golpe del 1 diciembre 1828.
- **S20-2** (`card-opinion`, `data-certeza="opini&#xF3;n"`): interpretación historiográfica del fusilamiento como "línea de sangre" — la ruptura fundacional que transformó el conflicto faccionario en vendetta personal y estableció el template de la violencia política argentina. Atribuido a Saldías (1892), Halperín Donghi (1972) y Lynch (1981 cap. 3).
- **Scope guard activo:** S20 NO repite la narrativa de S13-1 (golpe 1 dic, fusilamiento 13 dic, movilización de Rosas, Puente de Márquez, Convenios de Cañuelas y Barracas, elección de Rosas). S20 añade el CONTEXTO PREVIO (S20-1) y el SIGNIFICADO POLÍTICO (S20-2).
- **Zero CSS/JS nuevos** — hard constraint del milestone M008.
- **Imágenes:** `Dorrego-fusilamiento.jpg` (500px thumb) para S20-1; `Juan_Lavalle.jpg` (500px thumb) para S20-2 — ambas confirmadas disponibles, ninguna duplica imágenes ya en la página.

## Verification

```bash
grep -c 'data-certeza' index.html          # → 86
grep -c 'data-id="S20-1"' index.html       # → 1
grep -c 'data-id="S20-2"' index.html       # → 1
grep -c 'cards will be appended here' index.html  # → 1 (marker intacto)
git diff --name-only HEAD -- styles.css app.js    # → vacío (zero-new-CSS)
test -s C:/tmp/index.html.bak-s20 && echo BACKUP_OK
```

## Tasks

- [x] **T01: Escribir S20-CONTENT-DRAFT.md con HTML entity-encoded para ambas cards** `est:20m`
  - Why: El draft es el artefacto fuente verificable para contenido histórico y la precondición de T02. Separar contenido de splice garantiza verificación histórica antes de tocar index.html.
  - Files: `.gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md`
  - Do: Escribir el draft con dos secciones (S20-1 y S20-2). La sección **T02 Recipe** debe contener el HTML verbatim con todos los non-ASCII como entidades HTML (`&#xF3;` para ó, `&#xE1;` para á, `&#xE9;` para é, `&#xED;` para í, `&#xFA;` para ú, `&#xF1;` para ñ, `&#xFC;` para ü). Verificar ausencia de non-ASCII en el bloque Recipe con Node.js.
  - Verify: `test -s .gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md && echo DRAFT_OK`
  - Done when: El archivo existe, tiene contenido no-vacío en ambas secciones, y el bloque T02 Recipe pasa el check Node.js de ASCII-only.

- [x] **T02: Escribir temp HTML, hacer backup, y splicear cards en index.html** `est:20m`
  - Why: Integra el contenido del draft en el sitio antes del append marker, avanzando `data-certeza` de 84 a 86.
  - Files: `index.html`, `C:/tmp/s20-cards.html`, `C:/tmp/index.html.bak-s20`
  - Do: (1) Verificar que `S20-CONTENT-DRAFT.md` existe; si no, autorarlo como prerequisito. (2) Verificar precondiciones: `grep -c 'data-certeza' index.html` = 84, marker presente exactamente 1 vez. (3) `mkdir -p C:/tmp`. (4) Usar Write tool para escribir el HTML de ambas cards en `C:/tmp/s20-cards.html` (no heredoc). (5) Backup: `cp index.html C:/tmp/index.html.bak-s20`. (6) Node.js splice: leer index.html, encontrar línea con `cards will be appended here by subsequent slices` (ASCII-only substring), insertar cards ANTES de esa línea, escribir resultado.
  - Verify: Ejecutar todos los checks del bloque Verification de la sección anterior.
  - Done when: `grep -c 'data-certeza' index.html` = 86 y los 5 checks restantes pasan.

## Observability / Diagnostics

**Runtime signals (T02 splice):**
- `grep -c 'data-certeza' index.html` is the primary health metric: should advance from 84 → 86 after T02.
- `grep -c 'data-id="S20-' index.html` should equal 2 after T02 (one per card).
- `grep -c 'cards will be appended here' index.html` must stay at 1 — if it becomes 0 the splice consumed the marker (catastrophic); if 2 the splice duplicated it.
- `test -s C:/tmp/index.html.bak-s20` verifies the backup exists before any destructive operation.

**Failure state inspection:**
- If `data-certeza` count is wrong after T02, run `grep -n 'data-id="S20-' index.html` to see whether the cards are present and where they landed relative to the marker.
- If cards are malformed (non-ASCII in HTML source), `grep -Pn '[^\x00-\x7F]' index.html | tail -20` will surface the offending lines.
- The Node.js ASCII-check in T01 provides pre-splice validation: `PASS` means the T02 Recipe block is safe to inject.

**Redaction constraints:** No sensitive data in this slice. All content is historical text with Wikipedia image URLs. No credentials, tokens, or PII.

**Failure-path check:** If T02 splice produces incorrect results, restore is: `cp C:/tmp/index.html.bak-s20 index.html` — verify with `grep -c 'data-certeza' index.html` = 84.

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md`
- `C:/tmp/s20-cards.html`
- `C:/tmp/index.html.bak-s20`
