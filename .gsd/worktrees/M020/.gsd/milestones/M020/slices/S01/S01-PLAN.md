# S01: Research y content draft verificado — 1806–1807

**Goal:** Producir un content draft con 14–18 entradas históricas verificadas, certeza clasificada, imágenes Wikimedia identificadas y fuentes documentadas — listo para integración HTML sin trabajo editorial adicional.

**Demo:** Archivo `S01-CONTENT-DRAFT.md` con todas las entradas estructuradas: cada actor clave cubierto, cada claim verificado contra ≥2 fuentes, certeza asignada, imágenes identificadas, debates historiográficos señalados.

## Must-Haves

- 14+ entradas en el draft con estructura consistente: título, año/período, certeza, excerpt, detalle expandible, fuentes, imagen
- Todos los actores clave cubiertos: Sobremonte, Liniers, Álzaga, Beresford, Popham, Whitelocke, Belgrano, Saavedra, Pueyrredón
- El tesoro real (~1.086.000 pesos fuertes) documentado con fuente primaria o secundaria confiable
- La formación de regimientos criollos y su sistema de elección documentados
- La estrategia de Whitelocke (por qué no bombardeó) presentada con ≥2 hipótesis historiográficas y nivel de certeza evaluado
- El contexto europeo (Napoleón/Bayona/José Bonaparte) documentado con su conexión a Mayo 1810
- Cards `card-nota-historiografica` marcadas donde hay debate real (Álzaga como coordinador, estrategia Whitelocke)
- Cards `card-rumor` marcadas para claims con evidencia parcial (Ana Périchon/Beresford)
- Salvador María Alberdi: incluir o excluir con justificación basada en evidencia encontrada
- Imágenes Wikimedia verificadas via API (no URLs construidas a mano)

## Tasks

- [x] **T01: Research bloque 1 — caída de Buenos Aires, Sobremonte y el tesoro**
  Research y redacción de las entradas: expedición Popham/Beresford (sin autorización), defensa mínima en Quilmes y Riachuelo, toma en dos días, fuga de Sobremonte, el tesoro real, Pedro de Cevallos / contexto del virreinato, Cisneros como último virrey.

- [x] **T02: Research bloque 2 — Reconquista, regimientos y figuras criollas**
  Research y redacción de las entradas: Liniers organiza desde Montevideo, Álzaga en el Cabildo (debate historiográfico), la rendición de Beresford, la destitución de Sobremonte, los regimientos criollos (formación, líderes, sistema de elección), Belgrano/Saavedra/Pueyrredón como actores emergentes.

- [x] **T03: Research bloque 3 — segunda invasión, Whitelocke y nexo napoleónico**
  Research y redacción de las entradas: destino de Beresford (prisionero→fuga→Ana Périchon), Popham con la flota y la cadena de información a Londres, las oleadas de refuerzos (Auchmuty→Montevideo, Whitelocke), la Defensa de Buenos Aires 1807 (combate casa por casa), por qué Whitelocke no bombardeó, la rendición y sus términos, contexto europeo Napoleón/Bayona, conexión causal invasiones→Mayo 1810.

## Files Likely Touched

- `.gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` — artefacto principal de S01

## Verification

**Must-pass checks (all tasks complete before marking slice done):**

1. `grep -c "^## Evento INV-" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` → ≥ 14
2. `grep -c "\\*\\*Certeza:\\*\\*" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` → ≥ 14
3. `grep -c "\\*\\*Fuentes:\\*\\*" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` → ≥ 14
4. `grep -c "\[PLACEHOLDER" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` → 0 (or document known exceptions)
5. All actors covered: grep for Sobremonte, Liniers, Beresford, Popham, Whitelocke → each ≥ 1 entry
6. `grep -c "card-nota-historiografica" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` → ≥ 1
7. `grep -c "card-rumor" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` → ≥ 1
8. Diagnostic failure check: `grep -c "⚠️ imagen-no-verificada" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` → 0 (or document)

## Observability / Diagnostics

**Inspection surfaces:**
- `T01-DRAFT-PARTIAL.md` — partial draft after T01; inspect to verify entry format, certeza labels, and source coverage before proceeding to T02
- `S01-CONTENT-DRAFT.md` — final assembled draft; grep for `[PLACEHOLDER` to find missing images; grep for `**Certeza:**` to audit certeza coverage; count `## Evento INV-` headings to verify entry count (target 14–18)

**Runtime signals:**
- Entry count: `grep -c "^## Evento INV-" S01-CONTENT-DRAFT.md` → should return 14–18
- Missing images: `grep -c "\[PLACEHOLDER" S01-CONTENT-DRAFT.md` → should return 0 (all images verified via API)
- Source coverage: `grep -c "**Fuentes:**" S01-CONTENT-DRAFT.md` → should equal entry count

**Failure state visibility:**
- If a Wikimedia API check returns `"missing":""` for a file, the entry's image field is marked `[PLACEHOLDER: descripción]` and flagged with `⚠️ imagen-no-verificada` in Notes
- If a historical claim has only 1 source, the entry's Certeza is downgraded to `incierto` and a note added explaining the gap
- Partial drafts from each task (T01-DRAFT-PARTIAL.md, T02-DRAFT-PARTIAL.md, T03-DRAFT-PARTIAL.md) persist on disk as checkpoints — if a task fails, the prior partial is still readable

**Redaction constraints:** No personally sensitive information in this slice. All sources are public historical record.
