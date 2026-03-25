---
estimated_steps: 5
estimated_files: 1
---

# T02: Research y draft — los romances de Alberdi

**Slice:** S02 — Research Alberdi y Cané, la escena del "Cielo..." y los romances
**Milestone:** M011

## Description

Los romances de Alberdi son la pieza que completa el slice S02. El roadmap de M011 exige que la vida sentimental de Alberdi esté representada con certeza diferenciada — el mismo nivel de rigor epistémico que el sitio aplica a los hechos históricos. La historiografía tradicional lo presenta como célibe o con vida personal muy discreta; *Mi vida privada* y la correspondencia con Gutiérrez son las fuentes primarias más probables.

Esta tarea investiga los vínculos sentimentales documentados de Alberdi y amplía `S02-CONTENT-DRAFT.md` (ya creado por T01) con ≥1 card M011-ROM-N. Si la evidencia confirma el perfil discreto y no hay candidatos verificables, la salida honesta es 1 card de certeza `rumor` o `debatido` que narré exactamente esa discreción y los intentos fallidos de verificación.

**Contexto importante de KNOWLEDGE.md:**
- El Quote Verification Protocol prohíbe sintetizar citas directas de fuentes secundarias.
- Certeza `hecho` solo con fuente primaria paginada (carta, *Mi vida privada* con t./pág., etc.).
- Certeza `debatido` si ≥2 fuentes secundarias independientes apuntan al mismo candidato pero sin primaria paginada.
- Certeza `rumor` si es tradición oral historiográfica, conjetura biográfica, o sin ninguna fuente verificable.

**Candidatos conocidos (del M011-CONTEXT.md y roadmap):**
- Ana María Medeiros (Montevideo) — mencionada en el roadmap como candidata.
- Referencias del exilio chileno (Santiago, 1844–1855) — sin nombre conocido en fuentes accesibles.
- Posibles vínculos en Europa (París, Versailles, 1855–1879) — período largo, menos documentado.

## Steps

1. **Investigar a Ana María Medeiros** usando web search. Términos: "Alberdi Ana María Medeiros Montevideo", "Alberdi romance Montevideo exilio", "Alberdi vida sentimental". Determinar si hay fuente primaria (carta, *Mi vida privada* con fecha/pág.) o solo referencia secundaria. Buscar también en variantes: "Ana María", "Medeiros", "Alberdi novia", "Alberdi mujer". Si la fuente es Mayer (1963) sin paginación accesible, documentar como `debatido` con nota de dónde verificar.

2. **Investigar el perfil célibe / discreto** de Alberdi en la historiografía. Términos: "Alberdi célibe", "Alberdi vida privada sentimental", "Alberdi amor correspondencia Gutiérrez". Determinar si la ausencia de referencias en *Mi vida privada* está documentada explícitamente por algún biógrafo (Mayer, Terán, Canal Feijóo), o es simplemente una laguna. Si la historiografía confirma que no hay evidencia de romances verificables, eso es el contenido de la card: la discreción como rasgo biográfico documentado.

3. **Buscar en fuentes accesibles de *Mi vida privada*** (edición Cruz del Sur, 1944, en memoriachilena.gob.cl; fragmentos en Cervantesvirtual; edición FNA 1999 a través de referencias web). Si hay una referencia directa a algún vínculo sentimental, citarla con la edición y páginas. Si no hay ninguna referencia en los fragmentos accesibles, documentar la ausencia explícitamente.

4. **Redactar ≥1 card M011-ROM-N** en `S02-CONTENT-DRAFT.md` siguiendo exactamente el mismo formato que las cards M011-CANE-1 y M011-CANE-2:

   ```
   ## M011-ROM-1 — [Título descriptivo del tema o candidato]
   
   - Año/período: [período relevante]
   - Certeza: [hecho / debatido / rumor]
   - Certeza-justificación: [2–4 líneas explicando por qué esa certeza]
   - CSS class sugerida: [card-hecho / card-opinion / card-rumor]
   - data-certeza value: [hecho / debatido / rumor]
   
   **Excerpt (2–4 oraciones):**
   [Texto narrativo honesto con certeza representada]
   
   **Fuentes:**
   - [Fuente 1 con autor, obra, año, pág. si disponible]
   - [Fuente 2 o nota "sin fuente primaria verificada"]
   
   **Nota de inserción HTML:**
   - Sección destino: `#rev-alberdi-formacion` → sub-período correspondiente
   - Insertar: [posición relativa respecto a otras cards]
   - `data-id` sugerido: `M011-ROM-1`
   - HTML class: `class="event-card card-[clase] reveal reveal-slide"` con `data-certeza="[valor]"`
   ```

5. **Verificar el draft completo**:
   ```bash
   grep -q "M011-ROM" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
     && echo "PASS: romance card present"
   
   VERIFY_COUNT=$(grep -c '\[VERIFICAR\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md 2>/dev/null || echo "0")
   [ "$VERIFY_COUNT" = "0" ] && echo "PASS: 0 VERIFICAR flags" || echo "FAIL: $VERIFY_COUNT flags remain"
   
   grep -E "^- Certeza:" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
   # debe mostrar ≥3 líneas (CANE-1, CANE-2, ROM-1 mínimo)
   ```

## Must-Haves

- [ ] ≥1 card M011-ROM-N en `S02-CONTENT-DRAFT.md` con certeza asignada
- [ ] Certeza-justificación explícita para cada card M011-ROM-N: por qué esa certeza y no otra
- [ ] Nota de inserción HTML con sección destino y `data-id` sugerido
- [ ] 0 flags `[VERIFICAR]` activos en todo el draft al finalizar (no solo en las cards nuevas)
- [ ] Quote Verification Protocol respetado: si hay citas directas, tienen fuente primaria con t./pág.; si no, son paráfrasis claramente marcadas como tal
- [ ] Si la investigación concluye que no hay romances verificables, la card documenta esa ausencia honestamente (no inventa contenido para cumplir la tarea)

## Verification

```bash
grep -q "M011-ROM" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && [ "$(grep -c '\[VERIFICAR\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md)" = "0" ] \
  && echo "T02 VERIFICATION PASSED"
```

## Observability Impact

- Signals added/changed: `S02-CONTENT-DRAFT.md` gains ≥1 new `## M011-ROM-N` section. The certeza audit command (`grep -E "^- Certeza:"`) should return ≥3 lines after T02.
- How a future agent inspects this: `grep "^## M011-ROM" S02-CONTENT-DRAFT.md` lists romance cards; `grep -c '\[VERIFICAR\]' S02-CONTENT-DRAFT.md` checks for unresolved flags.
- Failure state exposed: If no `M011-ROM` entry exists, the S02 slice-level verification command exits non-zero and S03 is blocked. The specific missing grep pattern identifies whether the gap is in T01 output (CANE cards) or T02 output (ROM cards).

## Inputs

- `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` — already created by T01 with header, CANE-1, and CANE-2 cards; T02 appends to the `<!-- T01 completo. T02 pendiente... -->` comment at the bottom
- `.gsd/milestones/M011/slices/S02/tasks/T01-SUMMARY.md` — documents the format established, known limitations (escena del cielo not verified from paginada edition), and the Vicente Fidel López distinction
- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — format reference; especially the certeza-justificación length and fuentes format
- `KNOWLEDGE.md` → sections: "Alberdi Quote Verification Protocol", "Content Draft Certeza Differentiation: Card-level vs. Inline", "Content Draft as Intermediate Artifact"
- M011-CONTEXT.md → Key Risks: "Romances de Alberdi: la historiografía tradicional lo presenta como célibe o con vida sentimental muy discreta. *Mi vida privada* y la correspondencia con Gutiérrez son las fuentes primarias."

## Expected Output

- `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` — MODIFIED: ≥1 card M011-ROM-N appended after the `<!-- T01 completo -->` comment, following the exact format of CANE-1 and CANE-2. The status line at the top of the file should be updated to reflect T02 completion. The draft is then ready to be consumed as-is by S03-T01 (HTML integration).
