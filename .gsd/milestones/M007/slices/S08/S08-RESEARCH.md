# S08: Los escritos de Alberdi que leyó Facundo Quiroga — Research

**Date:** 2026-03-22
**Slice:** S08
**Milestone:** M007
**Depends on:** S07 (complete — 56 data-certeza cards, 79 reveal elements, 6 sub-nav links)

---

## Summary

S08 cierra el arco narrativo Alberdi-Quiroga. El título del slice — "Los escritos de Alberdi que leyó Facundo Quiroga" — describe correctamente la pregunta del usuario, pero la investigación revela que la evidencia disponible no sostiene una narrativa directa del tipo "Quiroga leyó X obra de Alberdi y reaccionó Y". La situación real, bien documentada, es más interesante y honesta:

**Lo que está documentado:** En 1834, en el momento del encuentro, Alberdi tenía dos textos publicados — ambos de 1832, sobre música — y acababa de escribir (o estaba escribiendo durante ese año) la *Memoria descriptiva sobre Tucumán*, su primera obra política, encargada por el gobernador Heredia. Ninguna fuente consultada documenta explícitamente que Quiroga haya leído ninguno de estos textos. La frase que múltiples fuentes usan — "Juan Facundo Quiroga leyó el escrito" — refiere a la **carta de recomendación de Heredia**, no a ningún texto publicado de Alberdi.

**Lo que está inferido:** La propuesta de Quiroga de financiar los estudios en Estados Unidos sugiere que Quiroga evaluó positivamente al joven Alberdi — no como lector de sus obras, sino a través del filtro de Heredia (a quien conocía y valoraba) y posiblemente a través de la conversación directa. La *Memoria descriptiva sobre Tucumán* (1834) es el candidato más plausible para un texto que Quiroga pudo haber leído, pero la evidencia es circunstancial: fue escrita ese mismo año, a pedido del propio Heredia, sobre el territorio que Quiroga conocía y que Heredia gobernaba. La fecha de publicación relativa al encuentro no está establecida con precisión.

**Consecuencia para el HTML:** S08 requiere **honestidad epistémica** al nivel de S06 (BIOG-19/20). Las cards deben distinguir claramente entre (a) los textos que existían y que Quiroga *podría* haber leído, (b) la ausencia de evidencia de que los haya leído, y (c) la base real de la evaluación de Quiroga sobre Alberdi (carta + conversación + recomendación de Heredia). El formato correcto es: una `card-hecho` catalogando los textos de Alberdi disponibles en 1834, y una `card-rumor` (o `card-opinion` con `card-nota-certeza` fuerte) sobre la recepción de Quiroga.

---

## Recommendation

**Dos cards, con certeza diferenciada:**

1. **BIOG-23 (`card-hecho`):** Catálogo de los escritos de Alberdi disponibles en 1834 — los dos textos musicales de 1832 y la *Memoria descriptiva sobre Tucumán* (1834). Incluir una `card-nota-certeza` explícita señalando que no hay fuente directa que documente que Quiroga leyó alguno de estos textos. Este catálogo es históricamente útil porque revela que Alberdi era un autor muy joven y con una obra mínima cuando conoció a Quiroga — lo cual explica por qué Quiroga lo evaluó como promesa, no como intelectual establecido.

2. **BIOG-24 (`card-rumor`):** La pregunta del slice reformulada honestamente: ¿cómo evaluó Quiroga a Alberdi si no hay evidencia de que haya leído sus obras? La respuesta documentada es: a través de la carta de Heredia y de las conversaciones directas. El "escrito" que Quiroga leyó fue la carta, no una obra publicada. La propuesta del viaje sugiere que Quiroga evaluó el potencial intelectual de Alberdi como promesa formable, no como pensador ya formado. Clasificar esto como `card-rumor` (con badge "Especulación fundamentada") sería lo más honesto; alternativamente, una `card-opinion` con la atribución a Mayer es aceptable si se prefiere "interpretación historiográfica" sobre "rumor".

**Insertion point:** Nuevo bloque temático (h4 + events-grid) dentro del sub-período existente `#rev-alberdi-quiroga`, usando el patrón establecido en S04 y S07 (thematic block BEFORE `</div><!-- /#rev-alberdi-quiroga -->`). Esto cierra el arco dentro del mismo sub-período sin abrir un nuevo sub-period (lo que añadiría un 7.º link al sub-nav). El `data-certeza` count sube de 56 a 58; los `.reveal` elements suben de 79 a 83 (1 h4 + 2 cards + 1 div.sub-period = 4 nuevos, pero el h4 y el div no tienen `reveal` explícito — en realidad serán las 2 cards = 2 nuevos `.reveal` + posiblemente el h4 = 3 total). Confirmar con pre-flight grep.

---

## Implementation Landscape

### Key Files

- `index.html` — único archivo a modificar. La inserción va antes de `</div><!-- /#rev-alberdi-quiroga -->` (actualmente en línea ~1094). Verificar con `grep -n '/#rev-alberdi-quiroga' index.html` antes de insertar.
- `.gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` — crear como artefacto intermedio (siguiendo el patrón de S05-S07).
- `tmp-s08-biog23-24.txt` — archivo temporal para la inserción CRLF-safe.

### Baselines Confirmados (pre-S08)

```
grep -c 'data-certeza' index.html  → 56
grep -c 'reveal reveal' index.html  → 79
grep -c 'sub-nav__link' index.html → 6
grep -n '/#rev-alberdi-quiroga' index.html → confirmar línea exacta antes de insertar
```

### Estructura de los Bloques HTML

Seguir el patrón de S07 (thematic block):

```html
<h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">
  Los textos de Alberdi en 1834 y la evaluación de Quiroga
</h4>
<div class="events-grid events-grid--certeza" aria-label="...">
  <!-- BIOG-23: card-hecho -->
  <!-- BIOG-24: card-rumor -->
</div>
```

### Templates HTML de Referencia

- `card-hecho`: BIOG-17, BIOG-19, BIOG-21 en `index.html`
- `card-rumor`: buscar con `grep -n 'card-rumor' index.html` — existen en el período colonial (M002) y revolución (M003). Usar su estructura exacta: `card-certeza-indicator` con icono "⚠️" o "❓", badge `badge--rumor`, `card-rumor__origin` footer.
- `card-nota-certeza` inline: mismo patrón que en BIOG-17, BIOG-19, BIOG-20, BIOG-21.

### Insertion Pattern (CRLF-safe)

Igual que S06 y S07:
1. Escribir HTML a `tmp-s08-biog23-24.txt` con el `Write` tool.
2. Usar Node.js `split('\r\n')` + `findIndex` + `splice` + `join('\r\n')`.
3. Anchor de inserción: `</div><!-- /#rev-alberdi-quiroga -->`.
4. Verificar con `grep -c 'data-certeza' index.html` → debe ser 58.

### Build Order

1. **T01 (Content Draft):** Investigar y redactar `S08-CONTENT-DRAFT.md` con las dos cards — catálogo de textos de 1834 (card-hecho) y evaluación de Quiroga sin lectura de obras (card-rumor). Determinar certeza final para BIOG-24 (rumor vs. opinion). Confirmar línea de inserción.
2. **T02 (HTML Integration):** Insertar el bloque. Verificar conteos.
3. **T03 (Triple Gate):** Shell checks + DOM checks + narrative read. Confirmar cierre del arco Alberdi-Quiroga.

### Verification Approach

```bash
# Shell checks post-inserción:
grep -c 'data-certeza' index.html             # → 58
grep -c 'id="BIOG-23"' index.html             # → 1
grep -c 'id="BIOG-24"' index.html             # → 1
grep -c 'rev-alberdi-quiroga' index.html      # → 3 (unchanged)
grep -c 'sub-nav__link' index.html            # → 6 (unchanged)

# DOM checks:
document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length  # → 8 (era 6)
document.querySelectorAll('.reveal').length                               # → 82 (era 79 + h4 + 2 cards)
```

---

## Hallazgos Críticos de la Investigación

### 1. El "escrito" que Quiroga leyó era la carta de Heredia

Todas las fuentes secundarias consultadas (elhistoriador.com.ar, monografias.com, nuestrosgrandes.com.ar, carasycaretas.org.ar, jursoc.unlp.edu.ar) usan la formulación: "Juan Facundo Quiroga leyó el escrito y le dijo al joven tucumano...". **El "escrito" que leyó Quiroga era la carta de recomendación de Heredia** — no ningún texto publicado de Alberdi. Esto es consistente con el ya integrado BIOG-17, que narra correctamente este hecho.

La larramendi.es (Francisco Laborde, estudio crítico) es la fuente más detallada y confirma el mismo patrón: Heredia "propuso que Alberdi fuera a los Estados Unidos para estudiar el sistema federal de ese país, y lo encomendó al general Quiroga para que le fueran proveídos los fondos necesarios." La evaluación de Quiroga era *de Alberdi como persona y promesa*, a través del filtro de Heredia — no a través de sus obras.

### 2. Los únicos textos publicados por Alberdi en 1834 eran de tema musical

En el momento del encuentro (ca. oct-nov 1834), Alberdi había publicado exactamente dos textos:
- *El espíritu de la música; a la capacidad de todo el mundo* (Buenos Aires, 1832, 31 pp.) — en *Obras Completas*, t. I, pp. 29-51.
- *Ensayo sobre un método nuevo para aprender a tocar el piano con la mayor facilidad* (Buenos Aires, 1832, 31 pp.) — pedagógico musical.

Ninguno de estos textos tenía relevancia política para Quiroga. Son textos sobre estética musical y pedagogía del piano.

### 3. La *Memoria descriptiva sobre Tucumán* (1834) es el candidato más plausible — pero con cautela

La *Memoria sobre Tucumán* fue escrita en 1834, encargada por el propio gobernador Heredia, y publicada "a fines de ese mismo año" (Laborde). Su contenido era geográfico-político — describía las bellezas de Tucumán y hacía un llamado a "volver a las glorias y tradiciones abandonadas del movimiento de Mayo de 1810". 

**Problema de fechas:** El encuentro con Quiroga fue en octubre o noviembre de 1834. La Memoria fue publicada "a fines de 1834". No está establecido si la publicación precedió o sucedió al encuentro. Laborde lo menciona en el mismo párrafo contextual del encuentro, lo que sugiere contemporaneidad, pero no secuencia.

**Conexión Heredia-Quiroga:** La Memoria fue encargada por Heredia. Si Heredia envió un ejemplar a Quiroga junto o antes de la carta de presentación, habría una cadena plausible. Pero esto no está documentado.

**Conclusión:** La *Memoria sobre Tucumán* es el texto más plausible para que Quiroga hubiera tenido acceso, dado el nexo Heredia, pero no hay evidencia directa. Pertenece al dominio `card-rumor`.

### 4. Quiroga era más letrado de lo que el estereotipo sugiere

Fuentes secundarias (apicultura.fandom.com, carasycaretas.org.ar) documentan que Quiroga "poseía un estilo bastante elegante" al escribir y tenía "el conocimiento de memoria que tenía de La Biblia." Era un caudillo que leía y escribía con fluidez — aunque su nivel intelectual formal estaba lejos del de Alberdi. Esto hace plausible que pudiera leer un texto como la *Memoria sobre Tucumán*, que era accesible y no especializado. Pero "capacidad de leer" no es "evidencia de haber leído".

### 5. El arco correcto para BIOG-24

La propuesta del viaje a EE.UU. no se deriva de haber leído textos de Alberdi. Se deriva de la recomendación de Heredia + las conversaciones directas. Quiroga valoraba a Alberdi como *promesa formable* (un joven de 24 años, tucumano como Heredia, con estudios de leyes y cultura literaria) — no como pensador ya establecido. Esto lo hace paradójicamente más poderoso: Quiroga apostaba al potencial, no al historial. La card correcta para BIOG-24 encuadra la evaluación de Quiroga en esos términos — y usa `card-rumor` para ser honesto sobre que la pregunta del slice ("¿qué escritos leyó?") no tiene respuesta documental directa.

---

## Constraints

- **Zero CSS/JS nuevo** (D001, M007-CONTEXT): las dos cards usan únicamente clases existentes.
- **Sub-nav invariant**: insertar DENTRO de `#rev-alberdi-quiroga`, NO como nuevo `<div class="sub-period">`. El count de sub-nav__link debe permanecer en 6.
- **`data-certeza="rumor"` es una clase válida y existente** en el proyecto — dos cards de M002/M003 la usan. No es nueva. El diagnostic grep debe incluir `rumor` en exclusión (patrón establecido en S07).
- **Pre-flight check obligatorio**: antes de insertar, confirmar `grep -c 'BIOG-23\|BIOG-24' index.html` → 0. Si no es 0, la inserción ya fue aplicada.
- **CRLF**: `index.html` usa CRLF. Node.js splice con `split('\r\n')` es obligatorio (patrón KNOWLEDGE).

## Common Pitfalls

- **No repetir el contenido de BIOG-17**: BIOG-17 ya narra que Quiroga "leyó la carta" y lo recibió bien. BIOG-23/24 deben referenciar ese hecho sin repetirlo verbatim.
- **No repetir las citas verbatim de BIOG-18**: las dos citas de *Obras Completas* en BIOG-18 están protegidas por el patrón de S07. BIOG-23/24 no las reproducen.
- **La Memoria sobre Tucumán NO está integrada en el sitio como card independiente** — está mencionada brevemente en BIOG-11. Puede referenciarse sin repetir el contenido de BIOG-11.
- **No fabricar reacción de Quiroga**: si no existe fuente directa sobre qué pensó Quiroga de los textos de Alberdi, no inventarla. La honestidad epistémica (patrón de todo el milestone) exige la laguna documental explícita.

---

## Estructura Narrativa Sugerida para las Cards

### BIOG-23 `card-hecho` — "Lo que Alberdi había escrito en 1834"

**Tesis:** En el momento del encuentro con Quiroga, Alberdi era un autor con apenas dos textos publicados — ambos sobre música — y tenía en circulación o reciente publicación la *Memoria descriptiva sobre Tucumán*, su primera obra política. Su obra intelectual era mínima; era una promesa, no un pensador establecido.

**Contenido:** Catálogo breve de los tres textos (1832 x2, 1834 x1) con fechas, tema y contexto editorial. Cerrar con la observación de que esto hace comprensible el tipo de apuesta que Quiroga hacía: no apostaba a lo que Alberdi ya había hecho, sino a lo que podría hacer con una formación más amplia.

**`card-nota-certeza`:** Ninguna fuente consultada documenta que Quiroga leyó ninguno de estos textos. La carta de presentación de Heredia y las conversaciones directas fueron la base de la evaluación de Quiroga sobre Alberdi.

**Certeza:** `card-hecho` / `data-certeza="hecho"` — los textos y fechas están verificados. La nota certeza hace la distinción epistémica.

### BIOG-24 `card-rumor` — "¿Qué leyó Quiroga? La pregunta sin respuesta documental"

**Tesis:** La pregunta "¿qué escritos de Alberdi leyó Quiroga?" no tiene respuesta documentada en las fuentes disponibles. Lo que sí está documentado es la base de la evaluación de Quiroga: la recomendación de Heredia (aliado federal clave), las conversaciones directas, y la impresión personal del joven Alberdi. Si Quiroga leyó algo de Alberdi, el candidato más plausible es la *Memoria sobre Tucumán* — por el nexo Heredia, por el tema (Tucumán y su historia), y por la contemporaneidad de su publicación.

**Contenido:** Encuadrar la laguna documental honestamente. Explicar por qué Quiroga habría valorado la *Memoria* si la leyó (Tucumán era clave en sus alianzas del noroeste). Explicar por qué Quiroga no necesitaba haber leído obras de Alberdi para apostar a él — el sistema de recomendaciones personales era el mecanismo de evaluación de capital humano en la Argentina de 1834.

**Certeza:** `card-rumor` / `data-certeza="rumor"` — hay base circunstancial para la conjetura, pero sin evidencia directa. Este es exactamente el dominio del `card-rumor` según el sistema de certeza del proyecto (D009, D010).

---

## Cierre del Arco Narrativo

Con BIOG-23 y BIOG-24, el arco Alberdi-Quiroga queda completo dentro de `#rev-alberdi-quiroga`:

| Card | Certeza | Contenido |
|------|---------|-----------|
| BIOG-17 | hecho | La carta de Heredia y el primer encuentro |
| BIOG-18 | hecho | Las conversaciones y la propuesta del viaje |
| BIOG-19 | hecho | Perfil biográfico de Quiroga |
| BIOG-20 | hecho | El entorno de Quiroga en Buenos Aires |
| BIOG-21 | hecho | La devolución de la libranza |
| BIOG-22 | opinion | Por qué rechazó el viaje (análisis historiográfico) |
| BIOG-23 | hecho | Los textos de Alberdi disponibles en 1834 |
| BIOG-24 | rumor | ¿Qué leyó Quiroga? La laguna documental |

El arco completo cuenta: encuentro → propuesta → rechazo → análisis del rechazo → catálogo de textos → honestidad sobre lo que Quiroga leyó. El cierre con `card-rumor` es narrativamente correcto — Quiroga muere en Barranca Yaco en febrero de 1835, tres meses después del encuentro, sin que ninguna fuente haya registrado sus impresiones sobre la obra de Alberdi. La laguna es históricamente real.

---

## Sources

- Laborde, Francisco, *Estudio crítico: Juan Bautista Alberdi* (larramendi.es) — fuente más completa para el período 1832–1835; documenta la contemporaneidad de la *Memoria sobre Tucumán* con el encuentro con Quiroga. (source: https://www.larramendi.es/i18n/catalogo_imagenes/grupo.cmd?path=1000613)
- Wikipedia EN, "Memoria descriptiva sobre Tucumán" — confirma que fue encargada por Heredia. (source: https://en.wikipedia.org/wiki/Memoria_descriptiva_sobre_Tucum%C3%A1n)
- Wikipedia EN, "Juan Bautista Alberdi" — cronología de publicaciones 1832–1834. (source: https://en.wikipedia.org/wiki/Juan_Bautista_Alberdi)
- Caras y Caretas 2025, "Facundo Quiroga, el gran caudillo riojano" — documenta que Quiroga era letrado, tenía estilo elegante al escribir, y confirma la recomendación de Heredia. (source: https://carasycaretas.org.ar/2025/02/10/facundo-quiroga-el-gran-caudillo-riojano/)
- JURSOC UNLP, "Juan Bautista Alberdi" — cronología coincidente con múltiples fuentes. (source: https://www.jursoc.unlp.edu.ar/documentos/academica/juan_bautista_alberdi.pdf)
- elhistoriador.com.ar, "Juan Bautista Alberdi" (Felipe Pigna, 2020) — confirma que lo que Quiroga leyó fue "el escrito" [la carta]. (source: https://elhistoriador.com.ar/juan-bautista-alberdi/)
- ANCMYP, Yanzi Ferreira (2002) — citado en S02/S08 para fechas del bachiller en Córdoba.
