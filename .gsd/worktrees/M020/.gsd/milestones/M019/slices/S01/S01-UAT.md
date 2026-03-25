# S01: Investigación y borrador — UAT

**Milestone:** M019
**Written:** 2026-03-25

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S01 produce un único artefacto de texto estructurado (`S01-CONTENT-DRAFT.md`) sin runtime, servidor ni interfaz de usuario. La completitud y corrección del draft se verifica íntegramente mediante inspección del archivo. No hay ejecución de código que probar.

## Preconditions

- El archivo `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` debe existir en el worktree M019.
- No se requiere servidor ni navegador — toda la verificación es sobre el contenido del archivo.

## Smoke Test

```bash
grep -c "^## Card" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
# Expected output: 4
```
Si devuelve 4, el draft tiene las 4 secciones principales y S01 básicamente funcionó.

---

## Test Cases

### 1. Existencia del artefacto

```bash
test -f .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
```
**Expected:** `PASS`

---

### 2. Cuatro cards presentes

```bash
grep -c "^## Card" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** `4`

Verifica que las 4 secciones de card (Caseros, Acuerdo San Nicolás, Disolución Legislatura, Revolución 11 Sep) existen y tienen encabezado `## Card` correcto.

---

### 3. Cuatro marcadores de certeza `hecho`

```bash
grep -c 'data-certeza="hecho"' .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** `4`

Verifica que cada card tiene el comentario HTML inline `<!-- data-certeza="hecho" -->` que sirve como gancho de verificación para S02 y para futuros greps.

---

### 4. Veredicto sobre la "escena Mitre-Urquiza" documentado

```bash
grep -q "escena" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
```
**Expected:** `PASS`

Verifica que la sección de veredicto existe. Para una inspección más profunda:
```bash
grep -n "escena\|Borrador\|Elizalde" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** Al menos 3 líneas que mencionan "escena", "Borrador Elizalde" y el veredicto de no-evidencia.

---

### 5. Cita verificada de Mitre (21 jun 1852)

```bash
grep -q "en una mano el dinero" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
```
**Expected:** `PASS`

La cita de Mitre en la Legislatura de Buenos Aires el 21 de junio de 1852 debe estar presente en Card 2, con atribución a autor, fecha y fuente secundaria (Halperin Donghi).

---

### 6. Cita verificada de Urquiza (24 jun 1852)

```bash
grep -q "completamente anárquico" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
```
**Expected:** `PASS`

La cita de Urquiza en su nota al coronel Pinto el 24 de junio de 1852 debe estar presente en Card 3, con atribución a autor, fecha y fuente.

---

### 7. Sin marcadores de contenido pendiente

```bash
grep -q "TBD\|TODO\|VERIFICACIÓN PENDIENTE" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md && echo FAIL || echo PASS
```
**Expected:** `PASS`

Ninguna sección del draft debe contener marcadores de trabajo incompleto.

---

### 8. Instrucciones de integración presentes para S02

```bash
grep -q "Instrucciones de integración" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
```
**Expected:** `PASS`

Para verificación más detallada de las instrucciones:
```bash
grep -n "reveal-delay\|SP4-1\|events-grid" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md | head -20
```
**Expected:** Líneas mostrando la tabla de `--reveal-delay` (0ms, 80ms, 160ms, 240ms), el punto de inserción `SP4-1`, y la confirmación de `events-grid--certeza`.

---

### 9. Las 4 cards cubren el período correcto (orden cronológico)

```bash
grep -n "^## Card\|Fecha display\|febrero 1852\|mayo\|junio 1852\|septiembre 1852" \
  .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md | head -20
```
**Expected:** Cards en orden: 3 feb 1852 → 31 may–23 jun 1852 → 24 jun 1852 → 11 sep 1852.

---

### 10. Fuentes históricas presentes (≥2 por card)

```bash
grep -c "Halperin Donghi\|Scobie\|Ravignani\|Saldías" \
  .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** ≥8 (las cuatro fuentes clave aparecen al menos en 2 cards cada una, y algunas aparecen en más).

---

## Edge Cases

### El draft existe pero está truncado (< 4 cards)

```bash
grep -c "^## Card" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** exactamente `4`. Si devuelve menos, S01 está incompleto — no proceder con S02.

---

### El veredicto menciona la "escena" pero la incluye como card

```bash
grep -c "^## Card.*escena\|^## Card.*Mitre-Urquiza" \
  .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** `0`. La "escena" no debe aparecer como card — solo como veredicto de no-evidencia en la sección inicial.

---

### Las citas textuales están presentes pero sin atribución

Para Card 2:
```bash
grep -A 5 "en una mano el dinero" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** Las líneas inmediatamente siguientes deben contener "Mitre", "21 de junio de 1852", y una fuente (Halperin Donghi o equivalente).

Para Card 3:
```bash
grep -A 5 "completamente anárquico" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** Las líneas inmediatamente siguientes deben contener "Urquiza", "24 de junio de 1852", y una fuente.

---

## Failure Signals

- `grep -c "^## Card"` devuelve menos de 4 → draft truncado o cards malformadas.
- `grep -c 'data-certeza="hecho"'` devuelve menos de 4 → alguna card no tiene el comentario HTML inline de verificación; S02 podría omitir el `data-certeza` en el HTML.
- `grep -q "escena"` falla → la sección de veredicto sobre la "escena Mitre-Urquiza" fue omitida; la decisión editorial no está documentada para S02.
- `grep -q "en una mano el dinero"` o `grep -q "completamente anárquico"` falla → las citas verificadas no están en el draft; S02 podría inventar una paráfrasis en lugar de usar la cita exacta.
- `grep -q "TBD\|TODO\|VERIFICACIÓN PENDIENTE"` tiene salida → hay contenido incompleto que S02 no puede resolver.
- `grep -q "Instrucciones de integración"` falla → S02 no tiene el punto de inserción exacto y tendrá que inferirlo (riesgo de integración incorrecta).

---

## Not Proven By This UAT

- Que el HTML generado por S02 sea visualmente correcto en el navegador — eso se verifica en S02-UAT con browser.
- Que las imágenes sugeridas estén disponibles en Wikimedia Commons — S02 debe verificar URLs antes de integrar.
- Que los stagger delays produzcan el efecto visual deseado — verificación visual en S02.
- Que las citas de Mitre y Urquiza provengan de manuscritos originales — están verificadas en fuentes secundarias académicas reconocidas, que es el estándar del protocolo del proyecto.
- Que el Borrador Elizalde (indicio tangencial) tenga la atribución precisa de Cassagne (2023) en una edición específica — la referencia en el veredicto es suficiente para el propósito del veredicto, no para una nota al pie de citación académica formal.

---

## Notes for Tester

- Todos los checks anteriores se ejecutan desde la raíz del worktree M019 (`C:/Users/gabri/Desktop/historia/.gsd/worktrees/M019`).
- El draft usa `<!-- data-certeza="hecho" -->` (comentario HTML dentro de markdown) como gancho de verificación — esto es intencional y no un artefacto de formato.
- El ejemplo de estructura HTML en las instrucciones de integración usa `data-certeza=[hecho]` (sin comillas) — esto también es intencional para no interferir con el grep de verificación. S02 debe escribir `data-certeza="hecho"` en el HTML real.
- La sección de "Veredicto" al inicio del draft es la respuesta definitiva a la pregunta sobre la "escena Mitre-Urquiza" — es texto narrativo, no una card, y no debe verse como contenido faltante.
