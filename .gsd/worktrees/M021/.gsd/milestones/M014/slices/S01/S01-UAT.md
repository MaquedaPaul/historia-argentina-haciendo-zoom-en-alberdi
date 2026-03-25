# S01: Investigación y borrador de contenido — UAT

**Milestone:** M014
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S01 produce un único artefacto de archivo (`S01-CONTENT-DRAFT.md`). No hay runtime, servidor, ni UI que verificar. La correctitud del artefacto es 100% observable mediante inspección de archivo y comandos grep. La verificación exhaustiva del contenido histórico requiere lectura del draft y comparación contra las fuentes documentadas en él.

## Preconditions

- El archivo `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` debe existir.
- No se requiere servidor corriendo ni dependencia de red (la verificación de imagen ya fue realizada durante T01 y está documentada en el draft).

## Smoke Test

```bash
test -f .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md && echo "PASS" || echo "FAIL"
```
Debe retornar `PASS`. Si falla, ningún test subsiguiente tiene sentido.

---

## Test Cases

### 1. Conteo exacto de cards

**Objetivo:** Confirmar que el draft contiene exactamente 6 cards (TER-1 a TER-6), ni más ni menos.

1. Ejecutar: `grep -c "^### Card" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** `6`

### 2. Clasificación de certeza en cada card

**Objetivo:** Confirmar que cada una de las 6 cards tiene atributo `data-certeza` asignado.

1. Ejecutar: `grep -c "data-certeza" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** `6`

### 3. Nota historiográfica en TER-2 (Himno Nacional)

**Objetivo:** Confirmar que exactamente una card contiene el flag `card-nota-historiografica` — debe ser TER-2, el episodio del Himno.

1. Ejecutar: `grep -c "card-nota-historiografica" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** `1`
3. Ejecutar: `grep -n "card-nota-historiografica" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
4. **Expected:** La línea encontrada debe estar dentro de la sección `### Card TER-2`.

### 4. Sección TER-3 con verificación de imagen

**Objetivo:** Confirmar que la sección TER-3 existe y que el resultado de la verificación de imagen está documentado inline.

1. Ejecutar: `grep -c "TER-3" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** valor non-zero (≥1)
3. Ejecutar: `grep "321" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
4. **Expected:** al menos una línea que mencione `321` (las dimensiones 321×410 px confirmadas por API).

### 5. Distribución correcta de certeza (hecho/rumor/opinion)

**Objetivo:** Confirmar que TER-2 tiene `data-certeza="rumor"` (el Himno es tradición oral, no hecho documentado) y TER-5 tiene `data-certeza="opinion"`.

1. Ejecutar: `grep "data-certeza" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** output contiene `"rumor"` al menos una vez y `"opinion"` al menos una vez, además de `"hecho"`.
3. Leer la línea de `data-certeza="rumor"` y confirmar que está dentro de la sección `### Card TER-2`.

### 6. Placement decision documentada

**Objetivo:** Confirmar que el draft especifica dónde insertar la sección en el HTML.

1. Ejecutar: `grep "rev-tertulias-mariquita" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** al menos una línea que mencione `rev-tertulias-mariquita`.
3. Ejecutar: `grep -i "placement\|entre.*1820\|antes.*periodo-rosas\|periodo-rosas" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
4. **Expected:** al menos una línea que documente la posición relativa en el HTML.

### 7. Stagger delays documentados

**Objetivo:** Confirmar que la tabla de stagger delays existe y cubre las 6 cards.

1. Ejecutar: `grep "reveal-delay" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** al menos 6 líneas (una por card), con valores incrementales (0ms, 80ms, 160ms, 240ms, 320ms, 400ms).

### 8. Cero duplicación con M011

**Objetivo:** Confirmar que el draft documenta el mapeo de superposición con contenido existente y concluye sin duplicación real.

1. Ejecutar: `grep -i "superposici\|duplic\|M011\|existente" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** al menos una línea que mencione M011 o la auditoría de superposición, con conclusión de cero duplicación.

### 9. Fuentes mínimas por card de tipo hecho

**Objetivo:** Confirmar que las cards de tipo `hecho` tienen al menos 2 fuentes documentadas (requisito del sistema de certeza).

1. Leer las secciones `### Card TER-1`, `### Card TER-3`, `### Card TER-4`, `### Card TER-6` en el draft.
2. **Expected:** cada una lista 2 o más entradas bajo la sección `Fuentes` o equivalente.

### 10. Cite HTML en cada card

**Objetivo:** Confirmar que cada card tiene un bloque `cite` HTML listo para copy-paste en S02.

1. Ejecutar: `grep -c "<cite>" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** valor ≥ 6 (al menos un `<cite>` por card).

---

## Edge Cases

### TER-2: certeza "rumor" no debe ser "hecho"

1. Ejecutar: `grep -A5 "TER-2" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md | grep "data-certeza"`
2. **Expected:** `data-certeza="rumor"` — NO `"hecho"`. Si aparece `"hecho"`, el episodio del Himno está mal clasificado, lo cual es un error historiográfico visible.

### Imagen TER-3: advertencia de tamaño presente

1. Ejecutar: `grep -i "pequeña\|321\|410\|sin.*thumb\|width.*100" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** al menos una línea que indique que la imagen es pequeña y/o que debe usarse con `width="100%"` o URL directa.
3. Si esta advertencia está ausente, S02 podría intentar construir un path de thumb que no existe → imagen rota.

### Sección de referencia HTML no contamina greps

1. Ejecutar los checks 1 y 2 (Test Cases 1 y 2) nuevamente después de leer la sección "HTML Patterns Reference" o equivalente del draft.
2. **Expected:** los contadores siguen siendo exactamente 6 y 6, respectivamente.
3. Si algún contador es >6, la sección de referencia contiene strings de verificación sin el patrón soft-hyphen aplicado.

---

## Failure Signals

- `grep -c "^### Card"` retorna distinto de 6 → draft malformado o incompleto; S02 no debe iniciar.
- `grep -c "card-nota-historiografica"` retorna 0 → TER-2 no tiene flag historiográfico; error de certeza visible.
- `grep -c "card-nota-historiografica"` retorna >1 → flag aplicado en más de una card; posible contaminación de grep.
- `grep -c "data-certeza"` retorna distinto de 6 → al menos una card sin clasificación de certeza.
- Ausencia de advertencia de imagen pequeña en TER-3 → riesgo de imagen rota en integración HTML.
- Ausencia de `rev-tertulias-mariquita` en el draft → S02 no tiene placement decision y debe inferir dónde insertar la sección.

## Not Proven By This UAT

- Que las cards rendericen correctamente en el navegador (requiere S02).
- Que el reveal/stagger/lightbox funcionen con las nuevas cards (requiere S02).
- Que el placement entre `#rev-1820-1835` y `#periodo-rosas` no rompa el scroll spy (requiere verificación live en S02).
- Que la imagen TER-3 sea visualmente aceptable a pantalla completa (requiere S02 con evaluación visual).
- Que el contenido histórico sea completo o que no existan fuentes adicionales relevantes (la investigación se da por completa desde S01-RESEARCH.md, pero no se re-verificó contra nuevas fuentes en este slice).

## Notes for Tester

- El artefacto principal es un archivo markdown — toda la verificación es por inspección de archivo y grep. No se necesita levantar ningún servidor.
- La sección "HTML Patterns Reference" (o equivalente) al final del draft usa caracteres soft-hyphen (U+00AD) en los nombres de clase y atributos HTML para evitar contaminar los contadores grep. Visualmente se ven idénticos a guiones normales. Esto es intencional y correcto.
- TER-2 con `data-certeza="rumor"` puede parecer extraño para el episodio más famoso (primera interpretación del Himno), pero es la clasificación historiográficamente correcta: no existe documentación contemporánea directa del evento. La nota historiográfica en la card lo explica para el usuario final.
- Si se desea re-verificar la imagen de TER-3 directamente: `curl "https://commons.wikimedia.org/w/api.php?action=query&titles=File:Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg&prop=imageinfo&iiprop=url%7Csize&format=json"` debe retornar `"width":321,"height":410`.
