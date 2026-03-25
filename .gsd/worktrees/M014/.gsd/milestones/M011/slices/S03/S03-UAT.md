# S03: Integración HTML — UAT

**Milestone:** M011
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: El slice no requiere runtime — todo el estado observable está en el DOM de `index.html`. Las clases `reveal reveal-slide` y los atributos `data-certeza` son el contrato completo entre el HTML y el sistema de reveal (`app.js`). Los grep/diff son señales deterministas que no pueden producir falsos positivos. No se añadió CSS ni JS nuevo, por lo que no hay comportamiento dinámico nuevo que requiera live-runtime para verificar.

## Preconditions

- Estar en el directorio `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M011`
- `index.html` es el archivo generado por T01 + T02 (commit `bdd6cf8` o posterior)
- `git status` muestra árbol limpio (o solo archivos del slice summary)

## Smoke Test

```bash
grep -c 'data-id="M011-' index.html
```
**Expected:** `8` — confirma que las 8 cards M011 están presentes en el DOM. Si este número es diferente, el slice no está completo.

---

## Test Cases

### 1. Conteo total de articles con certeza

```bash
grep -c 'data-certeza' index.html
```
**Expected:** `101`
**Rationale:** 93 articles baseline (pre-M011) + 8 articles M011 = 101. Cualquier desviación indica una card duplicada (>101) o una card faltante (<101).

---

### 2. Conteo total de elementos reveal-on-scroll

```bash
grep -c 'reveal reveal-slide' index.html
```
**Expected:** `106`
**Rationale:** 98 elementos baseline + 8 cards M011 = 106. El sistema IntersectionObserver en `app.js` detecta estas clases automáticamente al DOMContentLoaded — si el count es correcto, el reveal funciona sin wiring adicional.

---

### 3. Breakdown de certeza por nivel

```bash
grep -c 'data-certeza="hecho"' index.html
grep -c 'data-certeza="debatido"' index.html
grep -c 'data-certeza="rumor"' index.html
```
**Expected:**
- `hecho` → `71` (baseline 66 + CANE-1, MARIQ-1, RED37-1, RED37-2, ROM-1)
- `debatido` → `7` (baseline 5 + ENC-1, CANE-2)
- `rumor` → `4` (baseline 3 + ROM-2)

---

### 4. Presencia individual de las 8 cards M011

```bash
grep 'data-id="M011-' index.html | grep -o 'data-id="[^"]*"'
```
**Expected:** exactamente estas 8 líneas (en cualquier orden):
```
data-id="M011-CANE-1"
data-id="M011-CANE-2"
data-id="M011-MARIQ-1"
data-id="M011-RED37-1"
data-id="M011-RED37-2"
data-id="M011-ROM-1"
data-id="M011-ROM-2"
data-id="M011-ENC-1"
```

---

### 5. ENC-2 integrado como nota inline (no como article separado)

```bash
grep -n 'card-nota-historiografica' index.html
```
**Expected:** exactamente 1 resultado, dentro del article `M011-ENC-1`, en la sección `#periodo-rosas`.

```bash
grep -c 'data-id="M011-ENC-2"' index.html
```
**Expected:** `0` — ENC-2 es una `<p class="card-nota-historiografica">`, no un article independiente. Si retorna 1, ENC-2 fue integrado incorrectamente como article.

---

### 6. Spans card-nota-certeza preservados verbatim

```bash
grep -c 'card-nota-certeza' index.html
```
**Expected:** `26` (baseline 23 + MARIQ-1 + CANE-2 + ROM-2)

```bash
grep -n 'card-nota-certeza' index.html
```
**Expected:** 26 líneas. Verificar que existen menciones de:
- Tradición del Himno Nacional (MARIQ-1)
- "cielo/cielito" y Vicente Fidel López (CANE-2)
- Medeiros/Laguna y Mayer 1963 (ROM-2)

---

### 7. CSS y JS sin modificar

```bash
git diff --name-only HEAD -- styles.css app.js
```
**Expected:** salida vacía (sin output). Cualquier nombre de archivo en la salida indica una modificación no autorizada.

---

### 8. Sin flags activos [VERIFICAR] en el HTML renderable

```bash
grep -n '\[VERIFICAR\]' index.html
```
**Expected:** sin resultados (exit code 1). La presencia de cualquier `[VERIFICAR]` indica texto de borrador que escapó al HTML público.

---

### 9. Marker de append preservado para slices futuros

```bash
grep -n 'S10.*S24 cards will be appended' index.html
```
**Expected:** exactamente 1 resultado, en línea ~2222 (puede variar ligeramente si se añadieron otras ediciones). Si no aparece, el marker fue sobrescrito y futuras slices no podrán localizar el punto de inserción.

---

### 10. Certeza correcta por card individual

```bash
grep -A2 'data-id="M011-CANE-1"' index.html | grep 'data-certeza'
grep -A2 'data-id="M011-CANE-2"' index.html | grep 'data-certeza'
grep -A2 'data-id="M011-MARIQ-1"' index.html | grep 'data-certeza'
grep -A2 'data-id="M011-RED37-1"' index.html | grep 'data-certeza'
grep -A2 'data-id="M011-RED37-2"' index.html | grep 'data-certeza'
grep -A2 'data-id="M011-ROM-1"' index.html | grep 'data-certeza'
grep -A2 'data-id="M011-ROM-2"' index.html | grep 'data-certeza'
grep -A2 'data-id="M011-ENC-1"' index.html | grep 'data-certeza'
```
**Expected por card:**
| Card | data-certeza esperado |
|---|---|
| CANE-1 | `hecho` |
| CANE-2 | `debatido` |
| MARIQ-1 | `hecho` |
| RED37-1 | `hecho` |
| RED37-2 | `hecho` |
| ROM-1 | `hecho` |
| ROM-2 | `rumor` |
| ENC-1 | `debatido` |

---

### 11. Stagger delays presentes en cada card M011

```bash
grep -A5 'data-id="M011-' index.html | grep 'reveal-delay'
```
**Expected:** 8 líneas con `--reveal-delay:` — confirma que cada card tiene el CSS custom property que el sistema de stagger usa para escalonar las animaciones de entrada.

---

## Edge Cases

### Cards M011 en posición DOM correcta

```bash
grep -n 'data-id="BIOG-5"\|data-id="M011-CANE\|data-id="BIOG-7"\|data-id="M011-MARIQ\|data-id="BIOG-11"\|data-id="M011-RED37"' index.html
```
**Expected:** los números de línea deben mostrar el orden correcto en el DOM:
- BIOG-5 → CANE-1 → CANE-2 → ... → BIOG-7 → MARIQ-1 → ... → BIOG-11 → RED37-1 → RED37-2

Si el orden es inverso o intercalado incorrectamente, el stagger visual será incorrecto (las cards aparecerán en orden inesperado al hacer scroll).

### ENC-1 aparece ANTES del marker (no después)

```bash
grep -n 'data-id="M011-ENC-1"\|S10.*S24 cards will be appended' index.html
```
**Expected:** el número de línea de ENC-1 es **menor** que el del marker. Si ENC-1 aparece después del marker, fue insertado en la posición incorrecta.

### ROM-2 usa template complejo (no template simple)

```bash
grep -A10 'data-id="M011-ROM-2"' index.html | grep 'event-card__body\|event-card__header\|event-card__content\|card-rumor__origin'
```
**Expected:** las 4 clases deben estar presentes. Si falta alguna, ROM-2 fue integrado con el template simple colonial en lugar del template biográfico complejo.

---

## Failure Signals

- `grep -c 'data-id="M011-' index.html` retorna valor ≠ 8 → integración incompleta o duplicada
- `grep -c 'data-certeza' index.html` retorna valor ≠ 101 → article duplicado o faltante
- `git diff --name-only HEAD -- styles.css app.js` retorna nombre de archivo → CSS o JS modificado involuntariamente
- `grep -n '\[VERIFICAR\]' index.html` retorna resultados → texto de borrador en HTML público
- `grep -n 'S10.*S24 cards will be appended' index.html` retorna vacío → marker sobrescrito, futuras slices afectadas
- `grep -c 'card-nota-historiografica' index.html` retorna 0 → ENC-2 perdido
- `grep -c 'data-id="M011-ENC-2"' index.html` retorna 1 → ENC-2 integrado como article separado (incorrecto)

---

## Not Proven By This UAT

- **Render visual en browser:** El UAT no verifica que las cards se vean correctamente en un navegador. Los estilos dependen de clases CSS existentes (card-hecho, card-opinion, card-rumor) que fueron validadas en milestones anteriores.
- **Animación reveal-on-scroll en runtime:** Se verifica que las clases `reveal reveal-slide` y los `--reveal-delay` estén presentes, pero no que el IntersectionObserver los active al hacer scroll. Esto está implícito en que el sistema app.js no fue modificado y las clases coinciden con el contrato esperado.
- **Responsividad mobile de las nuevas cards:** No se verificó el layout en 375px. Las cards usan las mismas clases y templates que cards existentes — el CSS mobile existente aplica automáticamente.
- **Corrección histórica del contenido:** El rigor de los drafts fue responsabilidad de S01 y S02. S03 solo verifica que el contenido se integró sin modificaciones (el uso de contenido verbatim del draft + HTML entities es la garantía).

## Notes for Tester

- El check de `data-certeza="debatido"` incluye `ENC-1` y `CANE-2`. La sección donde cada una aparece puede verificarse con: `grep -n 'data-certeza="debatido"' index.html` — CANE-2 estará en las líneas bajas ~400–600 (sección formación), ENC-1 en líneas altas ~2180–2220 (sección Rosas).
- El artículo de CANE-2 incluye un `⚖` como certeza indicator y la etiqueta "Debatido historiogr&#xE1;ficamente" — en el browser se verá como "Debatido historiográficamente" (HTML entity decodificada).
- Si se quiere verificar visualmente el stagger, abrir el HTML en un browser y navegar a "Formación y exilio" — las cards CANE-1, CANE-2 deben aparecer escalonadas con 80ms de diferencia entre sí.
- El marker `S10–S24 cards will be appended` es un comment HTML, no texto visible — solo detectable con grep, no con inspección visual del browser.
