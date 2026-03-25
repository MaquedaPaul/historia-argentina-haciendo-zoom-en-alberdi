---
estimated_steps: 5
estimated_files: 1
---

# T01: Research y borrador verificado (Bloques 5–8)

**Slice:** S02 — De Tucumán a Buenos Aires — primeros pasos (1824–1833)
**Milestone:** M007

## Description

Antes de tocar `index.html`, todos los hechos históricos para los 4 bloques biográficos de S02 deben estar verificados, clasificados por certeza, y escritos en un borrador que T02 usará como fuente única de verdad. El período 1824–1833 es el más frágil del milestone: las fechas del abandono del internado son vagas en fuentes secundarias comunes; la referencia al trabajo de copista existe en *Mi vida privada* pero requiere localización; la motivación de Alberdi para estudiar leyes es frecuentemente inferida por biógrafos más que citada directamente. Sin investigación rigurosa primero, T02 propagaría incertidumbres sin marcar en el HTML.

Los 4 bloques a documentar:
- **BIOG-5:** Viaje a Buenos Aires (ca. 1824), ingreso al Colegio de Ciencias Morales, rol de Felipe como tutor.
- **BIOG-6:** Abandono del internado — fecha aproximada, circunstancias según *Mi vida privada*.
- **BIOG-7:** Primeros empleos — copista en escribanía (verificado en *Mi vida privada*), lecciones/trabajo de música.
- **BIOG-8:** Regreso al estudio formal, Academia de Jurisprudencia, motivación política (el derecho como instrumento del cambio, no vocación forense).

Miguel Cané (padre, 1812–1863) debe ubicarse dentro de una de estas cards donde sea verificable; si solo hay evidencia de su vínculo en el Salón Literario de 1837 (posterior a S02), mencionarlo con `card-nota-certeza` de incertidumbre sobre el primer contacto.

## Steps

1. **Investigar BIOG-5 (viaje a Buenos Aires):** Buscar en fuentes web accesibles (Wikipedia EN, Infobae, elhistoriador, JURSOC UNLP, elpensante.com) el año exacto del viaje — algunas fuentes dicen 1824, otras 1825. Documentar cuál dice qué. Confirmar: (a) que fue Felipe quien gestionó la beca, (b) que ingresó al Colegio de Ciencias Morales, (c) que ese colegio fue fundado por Rivadavia en 1823 (actual Colegio Nacional Buenos Aires). Para Miguel Cané (padre): verificar cuándo se conocieron — si hay referencia anterior a 1837, documentarla; si no, señalar que la amistad está documentada desde el Salón Literario.

2. **Investigar BIOG-6 (abandono del internado):** Localizar el pasaje de *Mi vida privada* donde Alberdi narra su salida del Colegio de Ciencias Morales. Las fuentes secundarias deben dar año aproximado (ca. 1827–1829). Determinar certeza: si el motivo (carácter independiente, tensión con la disciplina rígida) está en *Mi vida privada*, es `hecho`; si es inferencia biográfica, es `opinión`. Si el año es impreciso, preparar `card-nota-certeza`. Importante: distinguir entre el Colegio de Ciencias Morales (internado) y la Academia de Jurisprudencia (institución diferente a la que ingresa más tarde).

3. **Investigar BIOG-7 (primeros empleos):** Localizar la referencia al trabajo de copista en *Mi vida privada* — anotar si la fuente secundaria cita directamente el libro o parafrasea. Buscar mención de actividad musical remunerada (lecciones de guitarra, fortepiano) en el mismo período; el *Ensayo sobre un método nuevo para aprender a tocar la guitarra* (1832) da una coordenada temporal útil para ubicar cuándo era activo musicalmente. Distinguir entre faceta artística personal y trabajo como fuente de ingreso.

4. **Investigar BIOG-8 (regreso al estudio / Academia de Jurisprudencia):** Confirmar el nombre exacto de la institución (Academia de Jurisprudencia, no el Colegio de Ciencias Morales). Año de ingreso: las fuentes suelen decir ca. 1832–1834. La motivación "el derecho como herramienta política" es una lectura autobiográfica / historiográfica — identificar si Alberdi lo dice en *Mi vida privada* o si es inferencia de biógrafos (Mayer, Groussac). Asignar certeza `hecho` si hay cita verificada, `opinión` con atribución si es lectura secundaria.

5. **Redactar `S02-CONTENT-DRAFT.md`** con la estructura estándar por bloque: `## Bloque N: Título → Certeza → Excerpt (2–4 oraciones) → Fuentes (≥2) → Cita-HTML (texto exacto para la card) → Notas de imagen`. Flags: `[INCIERTO — ver nota]` para fechas disputadas, `[VERIFICACIÓN PENDIENTE]` con razón para items sin fuente, `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]` para citas no verificadas contra el original. Incluir tabla de incertidumbres activas al final del borrador.

## Must-Haves

- [ ] `S02-CONTENT-DRAFT.md` creado con exactamente 4 secciones `## Bloque N: ...` (BIOG-5, BIOG-6, BIOG-7, BIOG-8).
- [ ] Cada bloque tiene campo `Certeza` asignado (hecho / opinión / rumor) con justificación.
- [ ] Cada bloque tiene ≥2 fuentes verificadas listadas.
- [ ] El año del viaje a Buenos Aires (1824 vs 1825) está documentado con qué fuente dice qué — no elegido arbitrariamente.
- [ ] El abandono del internado tiene `card-nota-certeza` preparado si la fecha/motivo no puede precisarse con fuente directa.
- [ ] La referencia al copista está atribuida a *Mi vida privada* (directa o via secundaria que cita el libro) y no es una afirmación sin fuente.
- [ ] La Academia de Jurisprudencia está distinguida del Colegio de Ciencias Morales.
- [ ] Ninguna cita directa en Cita-HTML es una paráfrasis presentada como cita — marcado explícitamente si fuera el caso.
- [ ] Miguel Cané (padre) tiene ubicación en el borrador: dentro de BIOG-5 (si hay evidencia previa a 1837) o como nota en BIOG-8 con `card-nota-certeza`.

## Verification

- `test -f .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md && echo EXISTS || echo MISSING`
- `grep -c "^## Bloque" .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` devuelve 4
- Manual review: abrir el archivo y confirmar que cada bloque tiene campos `Certeza`, `Fuentes` con ≥2 entradas, y `Cita-HTML` no vacío.

## Observability Impact

- Signals added: `S02-CONTENT-DRAFT.md` creado — `test -f` exits 0; `grep -c "^## Bloque" ...` returns 4.
- Flags epistémicos: `grep -c "INCIERTO\|VERIFICACIÓN PENDIENTE\|PARÁFRASIS" S02-CONTENT-DRAFT.md` lista incertidumbres activas que T02 debe propagar como `card-nota-certeza` en el HTML.
- How a future agent inspects this: `grep "INCIERTO" S02-CONTENT-DRAFT.md` lista todos los datos disputados; `grep "VERIFICACIÓN PENDIENTE" S02-CONTENT-DRAFT.md` lista items sin fuente primaria.
- Failure state: si el borrador no existe cuando T02 comienza, T02 debe re-investigar desde cero — costo alto. Si `card-nota-certeza` no se propaga al HTML para datos flaggeados, hechos inciertos quedan sin señal visible para el lector.

## Inputs

- `.gsd/milestones/M007/M007-CONTEXT.md` — Bloques 5–8 con certeza sugerida, fuentes preferidas (*Mi vida privada*, Mayer, Groussac, Botana), notas de incertidumbre.
- `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` — estructura estándar de borrador a replicar; apéndice de auditoría epistémica como modelo para el apéndice de S02.
- `.gsd/KNOWLEDGE.md` — "Alberdi Quote Verification Protocol" (nunca sintetizar citas directas de secundarias); "Content Draft as Intermediate Artifact" (patrón establecido); "Alberdi's Father Death Date: Context Error vs. Sources" (el error de 1824 en CONTEXT ya fue corregido en S01 — no reinvestigar).
- `.gsd/milestones/M007/M007-ROADMAP.md` — Key Risks: detalles del período en el internado y abandono tienen vaguedad en fuentes; empleos tempranos necesitan *Mi vida privada* como fuente directa.
- S01 Forward Intelligence: "Felipe Alberdi ya está mencionado como tutor y gestor de la beca en BIOG-4. S02 puede continuar su rol narrativo sin re-introducirlo."

## Expected Output

- `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` — borrador con 4 bloques (BIOG-5..BIOG-8) verificados, con Certeza / Excerpt / Fuentes / Cita-HTML / Notas de imagen por bloque. Legible por T02 sin re-investigación. Tabla de incertidumbres activas al final.
