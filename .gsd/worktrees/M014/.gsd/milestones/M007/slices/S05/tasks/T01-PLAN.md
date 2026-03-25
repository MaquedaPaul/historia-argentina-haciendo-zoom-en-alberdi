---
estimated_steps: 4
estimated_files: 1
---

# T01: Redactar S05-CONTENT-DRAFT.md con BIOG-17 y BIOG-18 verificados

**Slice:** S05 — El encuentro entre Alberdi y Facundo Quiroga — la carta
**Milestone:** M007

## Description

Crear el borrador de contenido verificado para las dos cards de S05: BIOG-17 (la carta de Heredia y el encuentro físico con Quiroga, oct–nov 1834) y BIOG-18 (las visitas repetidas, conversaciones, ofrecimiento del viaje a EE.UU., y devolución de la libranza bancaria). El borrador es el artefacto de alta calidad que el task de integración HTML (T02) copia mecánicamente — siguiendo el patrón establecido en S01–S04.

La investigación está completa en `S05-RESEARCH.md`: los 11 hechos clave están verificados, las dos citas directas de Alberdi (*Obras Completas*, La Tribuna Nacional, 1886–1887) están reproducidas en ≥3 fuentes independientes, y los límites de certeza están definidos. T01 convierte esa investigación en texto HTML listo para insertar.

## Steps

1. Leer `S05-RESEARCH.md` para recordar los hechos verificados, citas directas exactas, y estructura de card inventory (BIOG-17 y BIOG-18). No hay investigación nueva que hacer — la fuente primaria (*Obras Completas*) y las fuentes secundarias ≥3 ya establecen las citas y hechos.

2. Estructurar el draft con dos secciones principales (BIOG-17 y BIOG-18), cada una con estos campos:
   - **Card ID y título**
   - **Certeza:** hecho / opinión / rumor
   - **Fecha:** fecha o rango del evento
   - **Excerpt HTML:** el texto completo del cuerpo de la card, listo para insertar en `<p>` tags. Incluye hechos narrativos y las citas directas en `<blockquote>` donde aplica.
   - **Fuentes:** lista de ≥2 fuentes con formato `Autor, *Obra*, editorial, año` o URL descriptiva
   - **Cite display:** el texto de la etiqueta `<cite>` del footer de la card
   - **Image notes** (solo BIOG-17): URL de la imagen de Quiroga (ya en el sitio, línea ~904)
   - **Stagger delay:** BIOG-17 = 0ms, BIOG-18 = 80ms
   - **card-nota-certeza:** texto exacto de cada nota, si aplica

3. Para BIOG-17 — verificar los hechos clave del borrador:
   - Felipe Alberdi (hermano de Juan Bautista) era colaborador de Heredia y solicitó la carta
   - Heredia dio a Alberdi carta de presentación para Quiroga (su amigo y aliado federal)
   - Alberdi entregó la carta en Buenos Aires, oct–nov 1834
   - Quiroga la leyó y "acogió [a Alberdi] con mucha gracia" (cita directa — Obras Completas)
   - card-nota-certeza: el contenido literal de la carta de Heredia no está reproducido en las fuentes consultadas
   - Imagen: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg/500px-Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg` — NO duplicar si ya está cargada en SP2-2; son sub-períodos distintos, la URL puede reutilizarse
   - Atribución imagen: "García del Molino, ca. 1840. Dominio público."

4. Para BIOG-18 — verificar los hechos clave y transcribir citas:
   - Alberdi visitó a Quiroga "con repetición y muchas veces se entretuvo en largas conversaciones"
   - Las conversaciones eran "ajenas del todo a la política"
   - Alberdi describe a Quiroga como "ese hombre extraordinario" — fascinación intelectual
   - Quiroga ofreció pagar todos los gastos de un viaje de estudios a EE.UU. (consideraba que sería más formativo que Buenos Aires)
   - Alberdi "se entusiasmó con la idea" inicialmente
   - "Al día siguiente le hice una visita respetuosa, en que tuve el gusto de restituirle su orden contra el Banco, renunciando al proyecto de viaje para los Estados Unidos" (cita directa — Obras Completas)
   - card-nota-certeza (primera): los motivos del rechazo no están detallados en el pasaje conocido de *Obras Completas* — se desarrollan en S07
   - card-nota-certeza (segunda): Quiroga partió a su misión mediadora en enero 1835 y fue asesinado en Barranca Yaco el 16 de febrero de 1835 — el encuentro ocurrió apenas meses antes
   - La "orden contra el Banco" es una libranza/giro bancario (no una carta); nombrarla correctamente

## Must-Haves

- [ ] BIOG-17 tiene ≥2 fuentes citadas, la cita directa "acogió [a Alberdi] con mucha gracia", y card-nota-certeza sobre el contenido de la carta de Heredia
- [ ] BIOG-18 tiene las dos citas directas de Alberdi (*Obras Completas*): la de "ese hombre extraordinario" y la de la devolución de la "orden contra el Banco"
- [ ] BIOG-18 tiene exactamente 2 card-nota-certeza: (1) motivos del rechazo en S07, (2) contexto de la muerte de Quiroga (feb. 1835)
- [ ] El texto HTML del excerpt está completo en el draft — no placeholders ni `[TBD]`
- [ ] El draft documenta la URL exacta de la imagen de Quiroga para BIOG-17
- [ ] Las citas directas reproducen exactamente el español del original (no paráfrasis), tal como aparecen en ≥3 fuentes independientes

## Verification

- `test -f .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md && echo EXISTS`
- `grep -c 'BIOG-1[78]' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` → ≥2
- `grep -q 'hombre extraordinario\|orden contra el Banco' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md && echo OK`
- `grep -q 'Heredia\|Felipe Alberdi' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md && echo OK`
- `! grep -q 'TBD\|\[VERIFICAR\]' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md && echo CLEAN` (debe estar limpio de placeholders sin resolver)

## Observability Impact

T01 produce un artefacto en disco, no señales de runtime. El estado inspeccionable es:

- **Señal de éxito:** `test -f .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md && echo EXISTS` — si falla, el draft no fue creado
- **Señal de contenido mínimo:** `grep -c 'BIOG-1[78]' S05-CONTENT-DRAFT.md` → debe ser ≥2; si retorna 0 o 1, el draft está incompleto
- **Señal de citas verificadas:** `grep -q 'hombre extraordinario\|orden contra el Banco' S05-CONTENT-DRAFT.md && echo OK` — fallo indica que las citas directas de Obras Completas no fueron transcriptas
- **Señal de limpieza:** `grep -q 'TBD\|\[VERIFICAR\]' S05-CONTENT-DRAFT.md && echo DIRTY || echo CLEAN` — presencia de DIRTY indica placeholders sin resolver que bloquean T02
- **Estado de fallo visible:** si T02 intenta copiar el draft y encuentra `[TBD]` o ausencia de BIOG-17/18, la inserción HTML producirá contenido incompleto. El gate de T03 (`grep -c 'data-certeza' index.html` < 52) detectará el fallo río abajo.

No hay señales de runtime en T01 — el artefacto es estático y su inspección es exclusivamente por shell.

## Inputs

- `.gsd/milestones/M007/slices/S05/S05-RESEARCH.md` — contiene card inventory completo (BIOG-17/18), hechos verificados (tabla de 11 hechos), citas directas exactas de *Obras Completas*, estructura del sub-período HTML, y baseline metrics post-S04

## Expected Output

- `.gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` — borrador verificado con BIOG-17 y BIOG-18 completos: texto HTML del excerpt listo para insertar, citas directas verificadas, ≥2 fuentes por card, card-nota-certeza exactas, y notas de imagen
