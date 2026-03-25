# S06 — Research: Quién era Facundo Quiroga y con quién estaba cuando recibió la carta

**Date:** 2026-03-22

## Summary

S06 tiene dos componentes: (1) un perfil biográfico de Facundo Quiroga — quién era, de dónde venía, qué representaba en las guerras civiles, y su relación con Rosas — y (2) la identificación de las personas que lo acompañaban cuando Alberdi le entregó la carta en Buenos Aires (oct–nov 1834).

Ambos componentes están bien documentados. El perfil de Quiroga es uno de los temas más documentados de la historia argentina del siglo XIX: nacimiento, guerras civiles, relación con Rosas, residencia final en Buenos Aires, asesinato en Barranca Yaco. Para el entorno del encuentro, las fuentes convergen en un dato central: el secretario personal de Quiroga, **José Santos Ortiz**, estaba regularmente a su lado para despachar correspondencia; su agente comercial y amigo era **Braulio Costa**. Ninguna fuente identifica testigos adicionales presentes en el momento exacto en que Alberdi le entregó la carta — esto requiere una `card-nota-certeza`.

La recomendación es integrar dos nuevas cards (BIOG-19 y BIOG-20) directamente dentro del sub-período `#rev-alberdi-quiroga` ya existente — no crear un nuevo sub-período. Esto evita añadir un 7º sub-nav link para solo 2 cards temáticas, y es coherente con el patrón del bloque temático ya usado en S04 (thematic block dentro de un sub-período cronológico sin nuevo sub-period div).

## Recommendation

**Integrar BIOG-19 y BIOG-20 dentro del `#rev-alberdi-quiroga` existente**, inmediatamente ANTES del cierre `</div><!-- /#rev-alberdi-quiroga -->` (línea ~848). Usar el mismo `events-grid events-grid--certeza` que ya contiene BIOG-17 y BIOG-18, o introducir un `<h4 class="sub-period__subtitle">` + nuevo `<div class="events-grid events-grid--certeza">` como en el patrón S04-thematic-block. La segunda opción es más limpia visualmente porque separa las cards biográficas de Alberdi (BIOG-17/18) de las cards de contexto sobre Quiroga (BIOG-19/20).

**Certeza:**
- BIOG-19 (perfil Quiroga): `card-hecho` con `card-nota-historiografica` sobre la versión de Sarmiento.
- BIOG-20 (entorno del encuentro): `card-hecho` con `card-nota-certeza` acotando que la identidad de los presentes en el momento exacto de la entrega de la carta no está documentada individualmente en las fuentes primarias.

**No se necesita nueva imagen**: la URL de Quiroga ya está en uso en BIOG-17 y SP2-2 — reutilizable sin conflicto. La misma imagen en BIOG-19 es coherente (son sub-períodos distintos dentro del mismo sub-nav, y la imagen refuerza el perfil biográfico).

## Implementation Landscape

### Key Files

- `index.html` — Modificación: insertar BIOG-19 y BIOG-20 antes de `</div><!-- /#rev-alberdi-quiroga -->` (línea ~848). Las nuevas cards se insertan dentro del grid existente o como segundo grid con h4 separador. El sub-nav NO cambia (no hay nuevo sub-período). Baseline pre-S06: `data-certeza=52`, `reveal=73`, `sub-nav=6`.
- `.gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` — A crear en T01 con BIOG-19 y BIOG-20, hechos verificados, fuentes citadas, HTML de excerpt listo para inserción.

### Build Order

1. **T01 — Content draft**: Redactar BIOG-19 y BIOG-20 con hechos verificados. Riesgo alto (clasificación certeza correcta, nota historiográfica de Sarmiento). T01 produce el draft; T02 inserta.
2. **T02 — HTML integration**: Inserción CRLF-safe en `index.html` usando Node.js splice. Pre-flight obligatorio antes de insertar. Post-insert: `grep -c 'data-certeza' index.html` → 54.
3. **T03 — Triple gate**: Shell checks + DOM queries + coherencia narrativa.

### Verification Approach

**Capa 1 — Shell:**
```bash
grep -c 'data-certeza' index.html          # debe ser 54 (52+2)
grep -c 'id="BIOG-19"' index.html          # debe ser 1
grep -c 'id="BIOG-20"' index.html          # debe ser 1
grep -c 'rev-alberdi-quiroga' index.html   # debe seguir siendo 3 (sin nuevo sub-período)
grep -c 'sub-nav__link' index.html         # debe seguir siendo 6 (sin nuevo link de nav)
```

**Capa 2 — DOM (browser_evaluate):**
```js
document.querySelectorAll('.reveal').length                                    // 77 (73+4: 1 h4 si se usa separador + 2 cards; o 75 si sin h4 reveal)
document.querySelectorAll('.sub-nav .sub-nav__link').length                    // sigue en 6
document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length        // 4 (era 2, ahora +2)
document.querySelector('#BIOG-19 .card-nota-historiografica')                  // not null
document.querySelectorAll('#BIOG-20 .card-nota-certeza').length                // 1
```

**Capa 3 — Coherencia narrativa:**
- BIOG-19 es perfil de Quiroga; no duplica SP2-2 (que nombra a Quiroga solo en el contexto del conflicto unitarios/federales, sin biografía).
- BIOG-20 es el entorno en Buenos Aires; no duplica BIOG-17 (que describe el encuentro puntual) ni BIOG-18 (que describe las conversaciones).
- La `card-nota-historiografica` de BIOG-19 no es redundante con la nota de Sarmiento en el existente card SP2-4 — son contextos distintos.

---

## Verified Facts for BIOG-19: Perfil de Facundo Quiroga

**Datos verificados en múltiples fuentes:**

| Hecho | Fuentes |
|-------|---------|
| Nacimiento: 27 nov 1788, San Antonio de los Llanos, La Rioja | Wikipedia EN, buscabiografias.com, billiken.lat, historiaybiografias.com |
| Padres: José Prudencio Quiroga + Juana Rosa de Argañaraz | buscabiografias.com (3-1), todo-argentina.net (10-4) |
| Apodo "El Tigre de los Llanos" — origen controvertido (yaguareté vs. puma en el desierto San Juan-La Rioja) | Wikipedia EN (1-6), sarmiento Facundo cap. I |
| Caudillo federal; combatió unitarios; lideró en La Tablada (1829, derrota), Oncativo (1830, derrota), La Ciudadela (1831, victoria) | repositoriouba.sisbi.uba.ar (12-14), historiaybiografias.com |
| Aliado de Rosas y de Estanislao López, pero más indómito y menos político | Wikipedia EN (1-13): Quiroga declaró que sus ideas eran "en realidad unitarias" pero se hizo federal porque el pueblo lo quería |
| Residió en Buenos Aires desde dic 1833; actividades comerciales con Braulio Costa | repositoriouba.sisbi.uba.ar (12-15) |
| Casado con Dolores Fernández (1817); hijos en Buenos Aires para escuela | buscabiografias.com (3-7), revisionistas.com.ar (13-22) |
| Asesinado 16 feb 1835, Barranca Yaco (norte de Córdoba, entre Córdoba y Santiago del Estero) | todas las fuentes |
| Sepultado en La Recoleta, Buenos Aires (traslado 1946) | Wikipedia EN (1-12) |

**Certeza BIOG-19:** `card-hecho`

**card-nota-historiografica obligatoria:** Sarmiento inmortalizó a Quiroga en *Facundo: Civilización y Barbarie* (1845) como símbolo de la "barbarie" caudillista opuesta a la "civilización" europea. Esta lectura — literaria y política — ha dominado la imagen de Quiroga en el imaginario argentino, pero historiadores posteriores (Ariel de la Fuente, *Children of Facundo*, 2000) muestran una figura más compleja. La `card-nota-historiografica` debe mencionar ambas lecturas.

---

## Verified Facts for BIOG-20: El entorno de Quiroga en Buenos Aires (1833–1835)

**Datos verificados:**

| Hecho | Fuentes |
|-------|---------|
| Quiroga en BA desde dic 1833: motivaciones — salud (reuma), hijos en escuelas, negocios | revisionistas.com.ar (13-22): "enviará a sus hijos a las escuelas porteñas, recuperar su salud (sufría de reuma), atender sus bienes y su capital" |
| Secretario personal: **José Santos Ortiz** — a su lado para despachar correspondencia, coronel y letrado | revisionistas.com.ar (13-10): "las horas de la mañana para despachar su correspondencia, para lo que está a su lado don José Santos Ortiz"; comercioyjusticia.info (17-10) |
| Agente comercial y amigo: **Braulio Costa** | repositoriouba.sisbi.uba.ar (12-15): "incursionó en la actividad comercial junto a su agente y amigo Braulio Costa" |
| Encargo como mediador Salta-Tucumán: gobernador Maza (interino de BA) → Quiroga; partió 18 dic 1834; acompañado por Santos Ortiz | comercioyjusticia.info (17-9, 17-10): "hacia allí partió el 18 de diciembre de 1834. Lo acompañaba su secretario, el coronel Dr. José Santos Ortiz" |
| Rosas acompañó a Quiroga hasta San Antonio de Areco (17–18 dic 1834), conversaciones extensas antes de partir | scribd.com / mitribuna (15-1, 20-18) |

**Sobre quién estaba presente en el momento exacto de la entrega de la carta (oct-nov 1834):**
- Ninguna fuente individualiza a los presentes en ese encuentro específico.
- Se puede inferir que Ortiz estaba disponible (era el secretario habitual), pero no hay evidencia directa.
- **Decisión de certeza:** `card-hecho` para el entorno general + `card-nota-certeza` acotando que la identidad exacta de los presentes en el momento de la entrega de la carta no está documentada individualmente en las fuentes primarias.

**Certeza BIOG-20:** `card-hecho` con `card-nota-certeza` puntual.

---

## Quiroga's Relationship with Rosas — Context for BIOG-19

Wikipedia EN (1-13) cita una declaración de Quiroga en su correspondencia con Rosas: sus ideas eran "en realidad unitarias" pero se hizo campeón del federalismo porque la gente lo quería. Esta paradoja —el más temido caudillo federal con ideas secretamente unitarias— es demasiado rica para omitirla en BIOG-19. Cabe en el cuerpo del card como card-nota-certeza o como dato del excerpt.

**Fuente primaria disponible:** *Archivo del Brigadier General Juan Facundo Quiroga* (Instituto Ravignani/UBA), 4 tomos (1957–1988). Las cartas de Quiroga a Rosas (dic 1834) confirman la relación de consulta y amistad entre ambos.

---

## Sarmiento's *Facundo* as Historiographic Frame

Sarmiento publicó *Facundo: Civilización y Barbarie* en 1845 — 10 años después del asesinato de Quiroga. La obra, escrita desde el exilio chileno como crítica al régimen de Rosas, usa a Quiroga como símbolo de la "barbarie" del interior. Esta lectura sesgó la imagen de Quiroga durante décadas.

La `card-nota-historiografica` de BIOG-19 debe mencionar:
- Que Sarmiento escribió el *Facundo* como texto político-literario, no como historia neutral.
- Que los estudios posteriores (De la Fuente 2000, Paoli 1952) ofrecen una lectura más matizada.
- Usar la misma estructura `<p class="card-nota-historiografica">` con `<strong>Nota historiográfica:</strong>` que ya existe en el sitio.

---

## Image Reuse

La imagen de Quiroga (`Facundo_Quiroga_por_García_del_Molino.jpg`) ya está en uso en:
- **BIOG-17** (línea 744): URL de 500px thumb, Wikimedia Commons.
- **SP2-2** (línea 1024): misma URL.

Para BIOG-19, reutilizar la misma URL es correcto y coherente — es la card de perfil biográfico del personaje. No se necesita buscar imagen adicional.

URL activa: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg/500px-Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg`

Para BIOG-20 (entorno en Buenos Aires): se puede optar por no usar imagen (card sin `.card-image`) o usar la misma imagen. Las cards sin imagen siguen el patrón existente en el sitio — verificar si hay cards sin imagen en `card-hecho`.

---

## Insertion Anchor

```
Línea ~840:  </article>   ← cierre de BIOG-18
Línea ~841:
Línea ~842:        </div>  ← cierre del .events-grid de BIOG-17/18
Línea ~843:      </div><!-- /#rev-alberdi-quiroga -->   ← cierre del sub-período ← INSERTAR ANTES DE ESTA LÍNEA
```

**Pre-flight check antes de insertar:**
```bash
grep -c 'id="BIOG-19"\|id="BIOG-20"' index.html   # debe ser 0
```

---

## Stagger Delays

BIOG-17 usa `--reveal-delay: 0ms`, BIOG-18 usa `--reveal-delay: 80ms`.

Opciones para BIOG-19 y BIOG-20:
- **Si se usan dentro del mismo `events-grid`**: continuar desde 160ms y 240ms.
- **Si se usa un `<h4>` separador + nuevo `events-grid`**: resetear a 0ms y 80ms para el nuevo bloque (patrón S04, documentado en KNOWLEDGE: "No stagger reset to 0 needed" — pero en S04 se usó 80ms a 400ms independiente).

Recomendación: usar `<h4 class="sub-period__subtitle">` + nuevo `events-grid--certeza` con stagger 0ms / 80ms para BIOG-19/20. El h4 actúa como separador visual que hace que el reset sea natural.

---

## Sources

- Datos biográficos de Quiroga: Wikipedia EN (entrada "Facundo Quiroga"), buscabiografias.com, historiaybiografias.com, todo-argentina.net, billiken.lat
- Quiroga en Buenos Aires 1833–35 y secretario Santos Ortiz: revisionistas.com.ar ("Facundo Quiroga en Buenos Aires"), comercioyjusticia.info
- Quiroga como agente comercial de Costa: repositoriouba.sisbi.uba.ar (Norma ISAD UBA)
- Misión mediadora dic 1834 y Carta de Rosas: scribd.com ("Carta de Rosas a Quiroga 1834"), mitribunaconlahistoria.blogspot.com
- Asesinato en Barranca Yaco: museojesuitico.cultura.gob.ar, infobae.com (16 feb 2022), infodefensa.com
- Sarmiento sobre Quiroga: cervantesvirtual.com (texto de *Facundo*)
- Cita directa de Alberdi sobre el encuentro: revisionistas.com.ar (13-6 a 13-9), atribuida a *Obras Completas* (1886–1887) — ya usada en BIOG-17/18

---

## Common Pitfalls

- **No duplicar SP2-2**: la card SP2-2 (línea 1017) ya menciona a Quiroga como líder federal junto a Rosas y López. BIOG-19 debe ser perfil biográfico personal (quién era como persona, origen, guerras), no repetir el contexto del conflicto unitarios/federales.
- **La imagen de Quiroga en BIOG-17 no es redundante con BIOG-19**: son sub-períodos biográficos distintos (S05: el encuentro; S06: el perfil). El patrón del sitio permite la misma imagen en distintas cards.
- **"Barranca Yaco"** — nunca escribir "Barranco Yaco" (sin la 'a' final); la ortografía correcta del paraje es "Barranca Yaco".
- **Fecha del asesinato**: 16 de febrero de 1835 — BIOG-18 ya tiene esta información en `card-nota-certeza`. BIOG-20 puede referenciarla brevemente sin repetir el texto.
- **José Santos Ortiz**: murió junto a Quiroga en Barranca Yaco. Este dato da peso dramático al personaje pero debe estar en BIOG-20 en el contexto del viaje mediador (enero 1835), no confundido con el momento de la entrega de la carta (oct-nov 1834).

## Open Risks

- **Ninguna fuente nombra testigos específicos en el momento de la entrega de la carta**: la certeza de BIOG-20 sobre "quiénes lo acompañaban" debe ser parcialmente `card-nota-certeza` — Ortiz estaba regularmente a su lado para correspondencia, pero no hay evidencia directa de que estuviera presente en ese encuentro específico.
- **La paradoja Quiroga/federalismo**: la declaración de que sus ideas eran "en realidad unitarias" (Wikipedia EN 1-13) proviene de su correspondencia con Rosas — no de una fuente neutral. Citar como `card-nota-certeza` o dentro del excerpt con atribución. No presentar como dato absoluto de BIOG-19 sin cualificación.
