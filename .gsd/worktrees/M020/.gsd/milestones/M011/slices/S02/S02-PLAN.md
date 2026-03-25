# S02: Research — Alberdi y Cané, la escena del "Cielo..." y los romances

**Goal:** Producir un `S02-CONTENT-DRAFT.md` verificado con fuentes para: (1) la amistad Alberdi–Miguel Cané (padre) desde 1824 hasta el exilio; (2) la escena de la despedida con el "cielo" y la presencia de Vicente Fidel López; y (3) cada romance documentado o plausiblemente reconstruido de Alberdi, con certeza diferenciada por grado de evidencia.

**Demo:** `S02-CONTENT-DRAFT.md` contiene ≥4 cards (CANE-1, CANE-2, más ≥1 card de romances), todas con certeza asignada, fuente identificada, y 0 flags `[VERIFICAR]` activos. El draft puede ser consumido directamente por S03 sin pasos de investigación adicionales.

## Must-Haves

- Draft con cards M011-CANE-1 y M011-CANE-2 (amistad y escena del "Cielo...") con certeza honesta
- Al menos 1 card de romances de Alberdi con certeza diferenciada por grado de documentación (hecho / debatido / rumor)
- 0 flags `[VERIFICAR]` activos en el draft al finalizar el slice
- Quote Verification Protocol respetado: ninguna cita directa sintetizada de fuentes secundarias
- Toda card con ≥1 fuente identificada (aunque no sea primaria verificada — se documenta la cadena y su nivel de confianza)

## Verification

```bash
# Artifact exists
test -f .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && echo "PASS: draft exists"

# Cané cards present (T01 deliverable)
grep -q "M011-CANE-1" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && grep -q "M011-CANE-2" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && grep -q -i "cielo" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && echo "PASS: CANE cards and cielo reference present"

# Romance cards present (T02 deliverable)
grep -q "M011-ROM" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && echo "PASS: romance card(s) present"

# No unresolved verification flags (failure-path check)
VERIFY_COUNT=$(grep -c '\[VERIFICAR\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md 2>/dev/null || echo "0")
[ "$VERIFY_COUNT" = "0" ] && echo "PASS: 0 VERIFICAR flags" || echo "FAIL: $VERIFY_COUNT unresolved VERIFICAR flags remain"

# Certeza coverage — every ## card section has a Certeza line
CARD_COUNT=$(grep -c "^## M011-" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md)
CERTEZA_COUNT=$(grep -c "^- Certeza:" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md)
echo "Cards: $CARD_COUNT  Certeza lines: $CERTEZA_COUNT"
[ "$CARD_COUNT" = "$CERTEZA_COUNT" ] && echo "PASS: every card has certeza" || echo "FAIL: certeza count mismatch"
```

## Observability / Diagnostics

- **Primary artifact:** `S02-CONTENT-DRAFT.md` — inspectable at any time with `test -f` and `grep`.
- **Certeza audit:** `grep -E "^- Certeza:" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` lists all certeza assignments; count should match the number of `## M011-` sections.
- **Unresolved flags:** `grep -c '\[VERIFICAR\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` → must be 0 before S03. Any non-zero result blocks HTML integration.
- **Card inventory:** `grep "^## M011-" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` lists all authored cards for S03 to consume.
- **Failure visibility:** If `S02-CONTENT-DRAFT.md` is absent or missing `M011-ROM` entries, S03-T01 will fail at its first verification step. The certeza count mismatch check above surfaces incomplete cards before integration begins.
- **Redaction constraints:** None — draft is an internal planning artifact. Sensitive personal information (romances) is treated with the same certeza discipline as any historical claim: no speculation presented as fact.

## Integration Closure

- Upstream surfaces consumed: `index.html` (to identify insertion points and existing card IDs), `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` (format reference)
- New wiring introduced in this slice: `S02-CONTENT-DRAFT.md` becomes the direct input specification for S03 HTML integration
- What remains before the milestone is truly usable end-to-end: S03 HTML integration (which splices all M011 cards into `index.html` with reveal-on-scroll and sources)

## Tasks

- [x] **T01: Research y draft — Alberdi–Cané y la escena del "Cielo..."** `est:45m`
  - Why: Establece las dos cards fundacionales del slice — el arco de la amistad (CANE-1) y la escena de la despedida (CANE-2) — y crea `S02-CONTENT-DRAFT.md` desde cero con el formato que T02 luego amplía.
  - Files: `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md`
  - Do: Investigar la amistad Alberdi–Cané con foco en *Mi vida privada* y Mayer (1963); identificar si "cielo" es género o canción específica (género musical rioplatense); confirmar que "Vicente López" en la escena = Vicente Fidel López (no el padre, autor del Himno Nacional); redactar CANE-1 (certeza hecho) y CANE-2 (certeza debatido si no se verifica edición paginada).
  - Verify: `grep -q "M011-CANE-1" S02-CONTENT-DRAFT.md && grep -q "M011-CANE-2" S02-CONTENT-DRAFT.md && grep -q -i "cielo" S02-CONTENT-DRAFT.md && [ "$(grep -c '\[VERIFICAR\]' S02-CONTENT-DRAFT.md)" = "0" ]`
  - Done when: CANE-1 y CANE-2 están en `S02-CONTENT-DRAFT.md`, cada una con certeza asignada y ≥1 fuente, sin flags `[VERIFICAR]` activos.

- [x] **T02: Research y draft — los romances de Alberdi** `est:45m`
  - Why: Completa el slice: el roadmap de M011 exige que los romances de Alberdi aparezcan con certeza diferenciada. Sin este task, el draft está incompleto y S03 no puede integrar la sección de vida personal de Alberdi.
  - Files: `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md`
  - Do: Investigar vínculos sentimentales documentados de Alberdi usando *Mi vida privada*, correspondencia con Gutiérrez, y bibliografía secundaria (Mayer 1963, Terán 1988, serargentino.com). Para cada candidato (Ana María Medeiros, posibles referencias del exilio chileno, etc.): asignar certeza honesta (hecho solo con fuente primaria paginada; debatido si evidencia secundaria convergente; rumor si es tradición sin fuente). Redactar ≥1 card M011-ROM-N con excerpt, fuentes, certeza-justificación y nota de inserción HTML. Si la historiografía confirma el perfil célibe y no hay evidencia para cards, redactar 1 card de certeza-rumor que narre exactamente esa discreción.
  - Verify: `grep -q "M011-ROM" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md && [ "$(grep -c '\[VERIFICAR\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md)" = "0" ]`
  - Done when: ≥1 card M011-ROM-N está en `S02-CONTENT-DRAFT.md`, con certeza asignada, fuente identificada, nota de inserción HTML, y 0 flags `[VERIFICAR]` activos en todo el draft.

## Files Likely Touched

- `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md`
