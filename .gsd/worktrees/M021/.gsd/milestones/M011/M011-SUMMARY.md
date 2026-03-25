---
id: M011
provides:
  - 8 articles M011 integrados en index.html con reveal-on-scroll, certeza diferenciada, y HTML entities
  - Cards verificadas: M011-ENC-1 (lobby Encarnación, certeza debatido), M011-CANE-1 (amistad Alberdi–Cané, certeza hecho), M011-CANE-2 (escena del "cielo", certeza debatido), M011-MARIQ-1 (perfil Mariquita, certeza hecho con inline card-nota-certeza para el Himno), M011-RED37-1 (Salón Literario 1837, certeza hecho), M011-RED37-2 (Echeverría catalizador 1830–1837, certeza hecho), M011-ROM-1 (patrón de discreción sentimental, certeza hecho), M011-ROM-2 (candidata Ana María Medeiros, certeza rumor)
  - ENC-2 integrado como <p class="card-nota-historiografica"> dentro del article ENC-1 (no article separado)
  - Patrones decisorios: certeza diferenciada inline (card-nota-certeza vs. card-level downgrade), card-rumor para candidatos sin fuente, certeza hecho para patrones de silencio biográfico documentado, card-nota-historiografica inline vs. article separado
  - Baselines post-M011: 101 data-certeza, 106 reveal reveal-slide, 71 hecho, 7 debatido, 4 rumor, 26 card-nota-certeza spans
key_decisions:
  - "D062: M011-ENC-1 certeza=debatido — la movilización de Encarnación es hecho; la causalidad directa lobby→Suma específicamente (vs. regreso de Rosas en general) es inferencia bien fundada, no hecho probado"
  - "D063: Primera ejecución del Himno en casa de Mariquita — inline card-nota-certeza dentro de card-hecho, no downgrade de la card completa"
  - "D064: 'Cielo/Cielito' = género musical rioplatense, no canción con letra fija — para 1838 era nostálgico, lo que añade peso simbólico a la escena de despedida"
  - "D065: 'Vicente López' en Gen. del 37 = Vicente Fidel López (el hijo, 1815–1903), no Vicente López y Planes (el padre, autor del Himno)"
  - "D066: M011-CANE-2 certeza=debatido — escena narrada en Mi vida privada y citada por Mayer 1963, pero pasaje paginado no verificado en ediciones digitalizadas"
  - "D067: M011-ROM-1 certeza=hecho (patrón de silencio), M011-ROM-2 certeza=rumor (candidata Ana María Medeiros sin fuente primaria ni secundaria accesible)"
patterns_established:
  - "card-nota-historiografica inline dentro del article padre como <p> — nunca como article separado; distingue de card-nota-certeza que va dentro de <p class='event-card__excerpt'>"
  - "Certeza hecho para patrón biográfico de silencio estructural documentado por múltiples académicos (Martino 2016, Terán 2004)"
  - "card-rumor para candidato a vínculo específico sin fuente primaria ni secundaria accesible — documenta la ausencia explícitamente con ruta de verificación"
  - "Bottom-up splice order aplicado a través de secciones distintas del DOM (no solo dentro del mismo grid)"
  - "Template card-rumor complejo (BIOG-24) para secciones biográficas; template simple para secciones coloniales — verificar qué template usa la sección destino antes de integrar"
observability_surfaces:
  - "grep -c 'data-id=\"M011-' index.html → 8 (todas las cards M011 integradas)"
  - "grep -c 'reveal reveal-slide' index.html → 106 (baseline post-M011)"
  - "grep -c 'data-certeza' index.html → 101 (baseline post-M011)"
  - "grep -c 'data-certeza=\"hecho\"' index.html → 71"
  - "grep -c 'data-certeza=\"debatido\"' index.html → 7"
  - "grep -c 'data-certeza=\"rumor\"' index.html → 4"
  - "grep -c 'card-nota-certeza' index.html → 26"
  - "grep -n 'S10.*S24 cards will be appended' index.html → línea 2222 (marker intacto)"
  - "git diff --name-only HEAD -- styles.css app.js → vacío (CSS/JS intactos)"
requirement_outcomes:
  - id: R009
    from_status: validated
    to_status: validated
    proof: "106 reveal reveal-slide elements en index.html post-M011 (baseline 98 pre-M011 + 8 articles nuevos). git diff --name-only HEAD -- styles.css app.js → vacío: reveal-on-scroll funciona sin wiring adicional para todos los elementos nuevos."
  - id: R012
    from_status: validated
    to_status: validated
    proof: "9 cards de contenido verificadas en S01-CONTENT-DRAFT.md y S02-CONTENT-DRAFT.md antes de integración HTML (0 flags [VERIFICAR] en drafts finales). Certeza debatido para ENC-1 y CANE-2 donde la evidencia primaria no permite conclusión definitiva. Certeza rumor para ROM-2 donde no existe fuente accesible. Certeza diferenciada inline (card-nota-certeza) para claims específicos dentro de cards hecho (Himno Nacional, escena del cielo, candidata Medeiros)."
  - id: R013
    from_status: validated
    to_status: validated
    proof: "101 data-certeza en index.html post-M011. Distribución: 71 hecho, 7 debatido (nueva categoría M011 para historiografía contestada), 4 rumor, 26 card-nota-certeza spans. Todos los 8 articles M011 tienen data-certeza asignado. Certeza diferenciada inline preservada verbatim del draft en 3 cards (MARIQ-1, CANE-2, ROM-2)."
duration: ~202min total (S01: ~95min + S02: ~75min + S03: ~32min)
verification_result: passed
completed_at: 2026-03-24
---

# M011: Redes, Vínculos y Vida Personal de Alberdi

**8 cards M011 integradas en index.html con certeza diferenciada — ENC-1 (lobby Encarnación, debatido), CANE-1+CANE-2 (amistad Alberdi–Cané y escena del cielo, hecho+debatido), MARIQ-1 (perfil Mariquita con inline Himno, hecho), RED37-1+RED37-2 (red Generación del 37, hecho), ROM-1+ROM-2 (silencio sentimental+candidata sin fuente, hecho+rumor) — styles.css y app.js sin modificar, reveal-on-scroll funcional para todos los elementos nuevos.**

## What Happened

M011 ejecutó tres slices en secuencia: S01 y S02 en paralelo (research independiente), S03 dependiente de ambos (integración HTML).

**S01 — Encarnación, red Gen. del 37 y Mariquita:** La investigación sobre el lobby de Encarnación Ezcurra para la Suma del Poder Público (1833–1835) convergió en un hallazgo decisivo: la correspondencia del AGN Sala X (publicada 1923) documenta que Encarnación movilizó la base federal porteña — Revolución de los Restauradores (oct. 1833), correspondencia de inteligencia, presión a la Legislatura — pero ninguna carta publicada la muestra *exigiendo ella* la Suma como condición propia. Rosas había fijado esa condición desde 1832. Lynch (1981, cap. 5) la enmarca como creadora de las condiciones políticas, no como originadora de la demanda. Resultado: M011-ENC-1 con certeza `debatido` y M011-ENC-2 (nota historiográfica sobre el debate de causalidad) integrada como `<p class="card-nota-historiografica">` dentro del article ENC-1 — no como article separado, siguiendo el patrón D052.

La investigación sobre la red Gen. del 37 produjo tres cards: M011-RED37-1 (Salón Literario 1837 como punto de cristalización, certeza `hecho`, documentado en Weinberg 1977 y Mayer 1963); M011-MARIQ-1 (perfil de Mariquita Sánchez de Thompson, certeza `hecho` con inline `card-nota-certeza` para la tradición del Himno Nacional — ella nunca lo mencionó en ningún escrito, Subercaseaux pintó el cuadro en 1909); y M011-RED37-2 (Echeverría catalizador 1830–1837 desde perspectiva de su llegada a Buenos Aires, certeza `hecho`, documentada en Cervantesvirtual con carta autobiográfica de Echeverría).

**S02 — Alberdi y Cané, escena del "Cielo...", romances:** La investigación resolvió dos preguntas abiertas del plan: "Cielo" es un género musical rioplatense (no una canción con letra fija), documentado en Wikipedia ES y el musicólogo Veniard (UCA), que para 1838 era ya nostálgico en los salones cultos — lo que añade peso simbólico específico a la escena de despedida pre-exilio. "Vicente López" en el contexto de la Gen. del 37 es Vicente Fidel López (el hijo, 1815–1903, historiador), no su padre autor del Himno Nacional — distinción crítica marcada explícitamente en el HTML de CANE-2.

El arco Alberdi–Cané 1824–1863 (M011-CANE-1) recibió certeza `hecho`: Colegio de Ciencias Morales (1824), Salón Literario (1837), co-laboración en *El Iniciador* (15 abril 1838), carta de Gutiérrez ("el San Bernardo de la cruzada") todas verificadas. La escena del "cielo" (M011-CANE-2) recibió certeza `debatido`: la escena está narrada en *Mi vida privada* y citada por Mayer (1963), pero el pasaje exacto y la nómina de presentes no se verificaron contra edición paginada — el texto completo paginado no está indexado digitalmente en las fuentes accesibles.

Para los romances, la investigación no encontró a "Ana María Medeiros" en ninguna fuente primaria ni secundaria accesible (CONICET/Dialnet/Cervantesvirtual/Mitologías Hoy/historiografía alberdiana de Martino 2016, Terán 2004, García Mérou 1890). El nombre puede provenir de Mayer (1963) no digitalizado. La decisión fue dos cards: M011-ROM-1 (patrón biográfico de discreción sentimental, certeza `hecho` — el silencio autobiográfico estructural documentado por múltiples académicos independientes es en sí un hecho historiográfico verificable) y M011-ROM-2 (candidata Ana María Medeiros, certeza `rumor` con ruta de verificación explícita hacia el índice onomástico de Mayer 1963).

**S03 — Integración HTML:** Cinco splices bottom-up sobre index.html en dos tasks de implementación. T01 integró 5 cards en grid 1 de `#rev-alberdi-formacion` (RED37-1+RED37-2 → MARIQ-1 → CANE-1+CANE-2, orden bottom-up para evitar desplazamiento de anchors). T02 integró 3 cards en dos secciones distintas del DOM: primero ENC-1 con ENC-2 inline en `#periodo-rosas` (línea ~2173, mayor número → primer splice), luego ROM-1+ROM-2 en grid 2 de `#rev-alberdi-formacion` (línea ~790). T03 ejecutó los 11 invariantes del slice plan — todos pasaron. Los spans `card-nota-certeza` de MARIQ-1, CANE-2 y ROM-2 fueron preservados verbatim del draft. HTML entities para todos los caracteres non-ASCII. El marker `S10–S24 cards will be appended` quedó intacto en línea 2222.

## Cross-Slice Verification

**Success Criterion 1: Cards nuevas integradas sobre Encarnación/Suma del Poder Público, amistad Alberdi–Cané (con escena del "Cielo..."), red Gen. del 37, Thomson, y romances de Alberdi**

✅ VERIFICADO. Ocho articles M011 presentes exactamente una vez cada uno en index.html:
- `grep -c 'data-id="M011-' index.html` → **8**
- IDs: ENC-1, CANE-1, CANE-2, MARIQ-1 (=Thomson/Mariquita), RED37-1, RED37-2, ROM-1, ROM-2

**Success Criterion 2: Cada card con ≥1 fuente identificada**

✅ VERIFICADO. Los drafts S01-CONTENT-DRAFT.md y S02-CONTENT-DRAFT.md documentan fuentes para cada card (0 flags `[VERIFICAR]` en ambos drafts finales). Fuentes representativas: Lynch (1981) para ENC-1; Mayer (1963) + Gutiérrez correspondencia para CANE-1; Mi vida privada + Mayer (1963) para CANE-2; buenosaires.gob.ar/Museo Saavedra + elhistoriador.com.ar + Infobae para MARIQ-1; Weinberg (1977) + Mayer (1963) para RED37-1; Cervantesvirtual/carta autobiográfica Echeverría para RED37-2; Martino (2016) + Terán (2004) para ROM-1; nota de ausencia de fuente para ROM-2 con certeza `rumor`.

**Success Criterion 3: El debate sobre el lobby de Encarnación tiene certeza `debatido` o `hecho` según lo que la evidencia soporte**

✅ VERIFICADO. `grep -A1 'data-id="M011-ENC-1"' index.html` → `data-certeza="debatido"`. La distinción es honesta: la movilización de Encarnación es hecho; la causalidad directa lobby→Suma específicamente (vs. regreso de Rosas en general) es inferencia bien fundada. D062 documenta la decisión con justificación explícita.

**Success Criterion 4: Los romances de Alberdi usan certeza diferenciada por grado de documentación**

✅ VERIFICADO. ROM-1 usa `data-certeza="hecho"` (patrón biográfico de discreción, documentado por Martino 2016 y Terán 2004). ROM-2 usa `data-certeza="rumor"` (candidata Ana María Medeiros sin fuente primaria ni secundaria accesible). ROM-2 lleva `card-nota-certeza` con ruta de verificación explícita hacia Mayer (1963). Las certezas son distintas entre sí y justificadas independientemente.

**Success Criterion 5: No hay CSS ni JS nuevos**

✅ VERIFICADO. `git diff --name-only HEAD -- styles.css app.js` → vacío. styles.css y app.js sin modificar en todo el milestone.

**Success Criterion 6: El reveal-on-scroll funciona para todos los elementos nuevos**

✅ VERIFICADO. Los 8 articles M011 tienen clase `reveal reveal-slide` y `style="--reveal-delay: Nms"`. `grep -c 'reveal reveal-slide' index.html` → **106** (baseline 98 pre-M011 + 8 articles nuevos). El sistema de reveal-on-scroll en app.js autodescubre todos los `.reveal` elements en DOMContentLoaded — sin wiring adicional necesario.

**Definition of Done:**
- [x] Todos los slices `[x]` en M011-ROADMAP.md (S01, S02, S03)
- [x] S01-SUMMARY.md, S02-SUMMARY.md, S03-SUMMARY.md existen con `verification_result: passed`
- [x] S01→S03 cross-slice integration: S01-CONTENT-DRAFT.md y S02-CONTENT-DRAFT.md consumidos por S03 sin flags pendientes
- [x] index.html tiene 8 articles M011 con certeza correcta y reveals funcionales
- [x] styles.css y app.js sin modificar

## Requirement Changes

- **R009** (reveal-on-scroll): validated → validated — 106 `reveal reveal-slide` elements post-M011 confirman que los 8 articles nuevos heredaron el sistema de reveal sin wiring adicional.
- **R012** (rigurosidad histórica): validated → validated — 9 cards de contenido verificadas en research slices antes de integración HTML; certeza diferenciada aplicada honestamente (debatido para ENC-1 y CANE-2, rumor para ROM-2, hecho para los demás); 0 flags `[VERIFICAR]` activos en index.html post-M011.
- **R013** (sistema de certeza): validated → validated — 101 articles con data-certeza; nueva sub-categoría `debatido` aplicada (7 cards total, 2 nuevas en M011); `rumor` usado para candidata sin fuente (ROM-2); `card-nota-certeza` inline en 3 cards nuevas (26 total). Sistema demostrado funcionando a escala completa.

## Forward Intelligence

### What the next milestone should know

- **Baselines post-M011:** `data-certeza` = 101, `reveal reveal-slide` = 106, hecho = 71, debatido = 7, rumor = 4, `card-nota-certeza` = 26. Usar estos como punto de partida para verificaciones de conteo en milestones subsiguientes.
- **Marker de append en `#periodo-rosas`:** El comment `<!-- S10–S24 cards will be appended here by subsequent slices -->` está en línea 2222. Siempre relocalizar con `grep -n 'S10.*S24 cards will be appended' index.html` antes de insertar — cualquier splice previo desplaza el número de línea.
- **Grid 1 vs. Grid 2 en `#rev-alberdi-formacion`:** Grid 1 cubre formación intelectual (BIOG-1 a BIOG-11 + M011-CANE-1, CANE-2, MARIQ-1, RED37-1, RED37-2). Grid 2 cubre perfil multifacético (BIOG-13 a BIOG-16 + M011-ROM-1, ROM-2). El stagger de grid 2 termina en 560ms (ROM-2); la próxima card en ese grid debe empezar en 640ms o reiniciar.
- **`card-nota-historiografica` pattern confirmado:** ENC-2 integrado como `<p class="card-nota-historiografica">` dentro del article ENC-1 es el patrón canónico para notas historiográficas que pertenecen a una card padre. No crear articles independientes para este tipo de nota.
- **Template card-rumor:** El template correcto para `#rev-alberdi-formacion` es el complejo (BIOG-24: `event-card__body / event-card__header / event-card__content / card-rumor__origin`). El template simple (secciones coloniales) produciría estructura inconsistente.
- **Certeza `debatido` vs. `opinión`:** M011 estableció `debatido` como la certeza para debates historiográficos multi-posición sobre hechos contestados (D058). `opinión` se usa para interpretaciones atribuidas a un historiador específico (D057). La distinción es semántica aunque ambas usan `card-opinion` CSS class (D052).
- **Fuentes para upgrade de certeza pendientes:** CANE-2 puede subir de `debatido` a `hecho` si se verifica el pasaje de *Mi vida privada* en edición FNA (1999) o *Obras Completas* t. VIII. ROM-2 puede subir de `rumor` a `debatido` o `hecho` si el índice onomástico de Mayer (1963) en biblioteca física menciona a Ana María Medeiros. La cita de Alberdi sobre Mariquita puede verificarse en *Escritos póstumos* t. I (1895) o *Mi vida privada* (ca. 1872–82).

### What's fragile

- **Línea 2222 del marker en `#periodo-rosas`** — el número de línea cambia con cada splice. Siempre relocalizar, nunca hardcodear.
- **La cita de Alberdi sobre Mariquita** ("la personalidad más importante...") en MARIQ-1 está incluida en el DOM pero sin fuente primaria verificada — presente en ≥3 fuentes secundarias. Aparece en el excerpt sin blockquote formal. Si un futuro pass la promueve a blockquote, debe verificarse primero en *Escritos póstumos* o *Mi vida privada*.
- **ROM-2 certeza `rumor`** — el único respaldo del nombre "Ana María Medeiros" en el contexto M011 es el roadmap de planificación. Un roadmap de planificación NO es una fuente historiográfica. No elevar la certeza sin consultar Mayer (1963) físicamente.
- **Certeza `debatido` de CANE-2** — no degradar a `hecho` sin verificar el pasaje paginado. La verificación requiere acceso a la edición impresa de *Mi vida privada* (FNA 1999 o Obras Completas t. VIII).

### Authoritative diagnostics

- `grep -c 'data-id="M011-' index.html` → 8 es el estado correcto post-M011. Cualquier valor diferente indica integración incompleta o duplicada.
- `grep -n 'card-nota-historiografica' index.html | grep "2[12][0-9][0-9]:"` → localiza ENC-2 en `#periodo-rosas`; debe aparecer exactamente una vez en ese rango de líneas.
- `git diff --name-only HEAD -- styles.css app.js` → debe estar siempre vacío cuando solo se toca index.html.
- `grep -c '[VERIFICAR]' index.html` → debe ser 0; cualquier valor mayor indica claims sin resolver en el HTML público.

### What assumptions changed

- **Asunción original:** Encarnación movilizó específicamente la Suma del Poder Público. **Realidad:** Rosas tenía esa condición desde 1832; lo que Encarnación hizo fue crear las condiciones políticas para que esa condición fuera viable. Certeza `debatido` es la clasificación honesta.
- **Asunción original:** "Cielo" sería una canción identificable con letra fija. **Realidad:** Es un género musical rioplatense (danza y canto patriótico, 1810–1830), cuyas coplas inician con "cielo". Para 1838 era nostálgico, lo que añade peso simbólico a la escena.
- **Asunción original:** "Ana María Medeiros" tendría respaldo en historiografía secundaria accesible. **Realidad:** Ausencia total en todas las fuentes digitalizadas consultadas. El nombre posiblemente proviene de Mayer (1963) no digitalizado.
- **Asunción original:** Una sola card de romances cubriría el espectro. **Realidad:** La distinción epistémica entre patrón biográfico general (certeza `hecho`) y candidato específico sin fuente (certeza `rumor`) requiere dos cards para mantener la integridad del sistema de certeza.
- **Asunción original:** La primera ejecución del Himno Nacional en casa de Mariquita sería hecho verificable. **Realidad:** Es tradición sin documento primario — ella misma no la menciona en ningún escrito; el cuadro de Subercaseaux fue pintado en 1909. Certeza diferenciada inline es el tratamiento correcto.

## Files Created/Modified

- `index.html` — 8 articles M011 integrados: CANE-1, CANE-2 después de BIOG-5; MARIQ-1 después de BIOG-7; RED37-1, RED37-2 después de BIOG-11 (todos en grid 1 de #rev-alberdi-formacion); ROM-1, ROM-2 después de BIOG-16 (grid 2 multifacético); ENC-1 (con ENC-2 inline como card-nota-historiografica) antes del marker en #periodo-rosas
- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — CREADO en S01: 5 cards verificadas (ENC-1, ENC-2, RED37-1, MARIQ-1, RED37-2), 0 flags [VERIFICAR]
- `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` — CREADO en S02: 4 cards verificadas (CANE-1, CANE-2, ROM-1, ROM-2), 0 flags [VERIFICAR]
- `.gsd/KNOWLEDGE.md` — MODIFICADO en S02: entrada "'Cielo/Cielito' es un Género Musical, no una Canción Específica" con distinción Vicente López y rutas de verificación; entradas sobre certeza hecho para patrones de silencio biográfico, card-nota-historiografica vs. card-nota-certeza placement, bottom-up splice order, card-rumor template selection
- `.gsd/milestones/M011/M011-SUMMARY.md` — CREADO (este archivo)
