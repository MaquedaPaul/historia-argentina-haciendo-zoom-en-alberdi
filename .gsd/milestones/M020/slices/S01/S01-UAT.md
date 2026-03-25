# S01: Research y content draft verificado — UAT

**Milestone:** M020
**Written:** 2026-03-25

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S01 produce un archivo markdown estructurado (S01-CONTENT-DRAFT.md). La correctitud del artefacto es verificable mecánicamente (grep counts, actor presence, flag consistency) y editorialmente (lectura de coherencia y rigor histórico). No hay componente de runtime ni interfaz de usuario — el artefacto es el output completo.

## Preconditions

- `S01-CONTENT-DRAFT.md` existe en `.gsd/milestones/M020/slices/S01/`
- Herramienta disponible: `grep` en shell desde `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M020`

## Smoke Test

```bash
grep -c "^## Evento INV-" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** 18 (o cualquier número ≥14)

---

## Test Cases

### 1. Entry count dentro del rango objetivo

```bash
grep -c "^## Evento INV-" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** 18 — confirma que el draft tiene exactamente 18 entradas, dentro del rango 14–18 especificado en el plan.

---

### 2. Certeza y Fuentes presentes en cada entry

```bash
grep -c "\*\*Certeza:\*\*" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
grep -c "\*\*Fuentes:\*\*" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** Ambos retornan 18 — cada entry tiene campo de certeza y campo de fuentes.

---

### 3. Todos los actores clave cubiertos

```bash
for actor in "Sobremonte" "Liniers" "Beresford" "Popham" "Whitelocke" "Álzaga" "Belgrano" "Saavedra" "Pueyrredón"; do
  count=$(grep -c "$actor" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md)
  echo "$actor: $count"
done
```
**Expected:** Cada actor devuelve ≥1 (en la práctica: Sobremonte 39, Liniers 61, Beresford 62, Popham 30, Whitelocke 32, Álzaga 35, Belgrano 23, Saavedra 25, Pueyrredón 18).

---

### 4. El tesoro real está documentado con cifra específica

```bash
grep "1.086.208" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** ≥1 línea mencionando "1.086.208 pesos fuertes" — la cifra canónica de Beresford a Castlereagh. La cifra alternativa (1.438.514) debe también aparecer:

```bash
grep "1.438.514" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** ≥1 línea — documenta el total de cajas fiscales intervenidas (scope diferente al anterior).

---

### 5. Debates historiográficos marcados

```bash
grep -c "card-nota-historiografica" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** ≥1 (en la práctica: 6) — el debate sobre Sobremonte, Álzaga, Belgrano/juramento, Whitelocke/bombardeo, nexo causal 1806→1810 están todos marcados.

---

### 6. Claims con evidencia parcial marcados como rumor

```bash
grep -c "card-rumor" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** ≥1 (en la práctica: 4) — incluye el rol de Ana Périchon en la fuga de Beresford.

---

### 7. Sistema de elección democrática de líderes documentado

```bash
grep -i "pluralidad de votos\|elección popular\|electos\|votaron" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** ≥1 línea — el sistema de elección de líderes en los regimientos criollos es un must-have del slice plan.

---

### 8. Estrategia de Whitelocke con ≥2 hipótesis documentadas

```bash
grep -A30 "INV-16" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md | grep "hipótesis\|(a)\|(b)\|(c)\|(d)"
```
**Expected:** Al menos 2 marcadores de hipótesis — confirma que el debate "por qué Whitelocke no bombardeó" tiene múltiples perspectivas historiográficas documentadas.

---

### 9. Contexto europeo (Napoleón/Bayona) integrado

```bash
grep -c "Bayona\|Bonaparte\|Napoleón" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** ≥3 (en la práctica: 18) — INV-17 cubre las Abdicaciones de Bayona; INV-18 conecta el contexto napoleónico con la crisis de legitimidad que abrió el camino a 1810.

---

### 10. Nexo causal invasiones → Mayo 1810 explícito

```bash
grep -A5 "^## Evento INV-18" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** El encabezado de INV-18 menciona "nexo causal" y el año 1810 — confirma que la conexión explícita 1806→1810 está documentada como entry standalone.

---

### 11. Salvador María Alberdi: decisión documentada

```bash
grep "Salvador María Alberdi" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** ≥1 línea — confirma que la decisión de exclusión está documentada (no silenciada). Debe incluir justificación ("ausencia de evidencia", "comerciante tucumano" o similar).

---

### 12. PLACEHOLDERs limitados a excepciones conocidas

```bash
grep -c "\[PLACEHOLDER" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** 3 — exactamente los 3 PLACEHOLDERs documentados (INV-03, INV-05, INV-09). Si el número es 0: verificar que las imágenes alternativas están especificadas. Si el número es >3: hay nuevos PLACEHOLDERs no documentados — investigar.

Verificar que cada PLACEHOLDER tiene alternativa documentada:
```bash
grep -B5 -A5 "\[PLACEHOLDER" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md | grep -i "Alternativa\|alternativa"
```
**Expected:** 3 líneas de alternativa (una por placeholder).

---

### 13. Imágenes verificadas via API para la mayoría de entradas

```bash
grep -c "✅ verificada" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** ≥15 — confirma que las imágenes de los actores principales (Cevallos, Cisneros, Popham, Beresford, Sobremonte, Liniers, Álzaga, Saavedra, Belgrano, Pueyrredón, José Bonaparte, Primera Junta, Napoleón, Ana Périchon) están verificadas via API de Wikimedia Commons.

---

### 14. Lectura editorial: coherencia narrativa de INV-18

Leer manualmente la entry INV-18 completa:
```bash
grep -A50 "^## Evento INV-18" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md | head -60
```
**Expected (editorial):**
- El excerpt menciona los regimientos criollos y el nexo hacia 1810
- El detalle expandible menciona a Saavedra, Liniers, Álzaga, Belgrano y Pueyrredón como actores que aparecerán en la Revolución de Mayo
- La narrativa presenta la conexión como condiciones necesarias pero no suficientes (evita determinismo)
- Hay al menos una referencia a las Abdicaciones de Bayona como catalizador político

---

### 15. Lectura editorial: rigor en card-nota-historiografica de Whitelocke

Leer manualmente la entry INV-16:
```bash
grep -A80 "^## Evento INV-16" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md | head -90
```
**Expected (editorial):**
- 4 hipótesis distinguibles sobre "por qué no bombardeó"
- Cada hipótesis tiene un razonamiento (no solo una etiqueta)
- La nota indica cuál es la más documentada y por qué
- No se afirma que una hipótesis es la verdadera — se presenta el debate abierto

---

## Edge Cases

### PLACEHOLDER sin alternativa documentada

Si `grep "\[PLACEHOLDER" S01-CONTENT-DRAFT.md` devuelve >3 resultados, buscar cuáles no tienen "Alternativa" en las siguientes 5 líneas:
```bash
grep -n "\[PLACEHOLDER" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
Inspeccionar cada número de línea ±5 para verificar que haya alternativa. Si no la hay, es un gap real que debe resolverse antes de S02.

### Cifra del tesoro con un solo valor

Si el grep de "1.438.514" devuelve 0, verificar que INV-03 o INV-05 explican la variación de cifras. El draft debe documentar ambas sin elegir una "oficial" — la variación es un hecho historiográfico.

### card-rumor sin explicación de por qué es rumor

```bash
grep -B2 -A3 "card-rumor" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
```
Cada ocurrencia de `card-rumor` debe estar acompañada de texto que explique qué evidencia está ausente. Si alguna aparece como etiqueta flotante sin explicación, es un gap editorial.

---

## Failure Signals

- `grep -c "^## Evento INV-"` devuelve <14: draft incompleto — S02 no debe comenzar
- `grep -c "\*\*Certeza:\*\*"` es menor que el count de entradas: hay entries sin clasificación — S02 no puede asignar `data-certeza` correcto
- `grep -c "\*\*Fuentes:\*\*"` es menor que el count de entradas: hay entries sin verificación documental — violación del must-have R012
- Ningún actor clave (Sobremonte, Liniers, Beresford, Popham, Whitelocke) aparece: el draft es incompleto
- `grep "card-nota-historiografica"` devuelve 0: los debates historiográficos no están marcados — S02 integrará cards sin los flags necesarios
- `grep "card-rumor"` devuelve 0: claims con evidencia parcial están presentados como hechos — violación del protocolo de certeza
- `grep "\[PLACEHOLDER"` devuelve >3: hay PLACEHOLDERs no documentados en las excepciones conocidas — requieren resolución

---

## Not Proven By This UAT

- La integración HTML de las 18 entradas en `index.html` (S02 lo hace)
- El correcto funcionamiento del expand/collapse, reveal-on-scroll y sub-nav link (S02)
- Los timeline markers 1806/1807 en `revolucion-timeline` (S03)
- La card de contexto europeo integrada en el flujo HTML (S03)
- Visualización correcta en 320px y 1920px+ (S02/S03)
- El `data-certeza` asignado correctamente en el HTML (S02)
- La resolución de los 3 PLACEHOLDERs de imagen (S02 o S03)

---

## Notes for Tester

**Los 3 PLACEHOLDERs son excepciones documentadas, no fallos:** INV-03 (caída de Buenos Aires ilustración), INV-05 (tesoro en Londres ilustración), INV-09 (soldado Patricios). Los tres tienen alternativas especificadas. El check 12 verifica exactamente que son 3 — si son más o menos, hay un problema.

**La cifra del tesoro aparece con dos valores diferentes en el draft** (1.086.208 y 1.438.514 pesos fuertes). Esto es correcto — miden cosas distintas. No "corregir" a un solo número.

**Whitelocke no tiene retrato verificado en Commons.** Si el test 13 devuelve 17 en lugar de 18, verificar si la imagen de INV-16 está documentada como excepción con proxy de Álzaga. Esto es correcto.

**La ausencia de Salvador María Alberdi es una decisión correcta**, no un gap. El test 11 confirma que la decisión está documentada — eso es suficiente para R011.

**Ana Périchon aparece en el draft.** El rol de Périchon como amante de Liniers (hecho documentado) es distinto de su supuesto rol en la fuga de Beresford (rumor). El draft maneja ambas dimensiones. El test 6 verifica que hay card-rumor ≥1.
