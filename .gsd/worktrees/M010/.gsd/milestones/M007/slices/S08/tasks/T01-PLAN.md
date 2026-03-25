---
estimated_steps: 4
estimated_files: 1
---

# T01: Redactar S08-CONTENT-DRAFT con BIOG-23 y BIOG-24

**Slice:** S08 — Los escritos de Alberdi que leyó Facundo Quiroga
**Milestone:** M007

## Description

La investigación de S08 ya está completa (ver S08-RESEARCH.md, preloaded en context). Este task convierte esos hallazgos en un content draft con el HTML listo para insertar: BIOG-23 (`card-hecho`) catalogando los tres textos de Alberdi disponibles en 1834, y BIOG-24 (`card-rumor`) respondiendo honestamente la pregunta del slice — que no tiene respuesta documental directa. El draft evita fabricar reacciones de Quiroga y usa honestidad epistémica explícita.

**Contexto crítico previo:**
- `#rev-alberdi-quiroga` ya contiene BIOG-17…BIOG-22 (6 cards). El `data-certeza` baseline es 56; `.reveal` baseline es 79.
- La línea de inserción anchor es `</div><!-- /#rev-alberdi-quiroga -->` — confirmar número exacto con grep antes de escribir el draft.
- BIOG-22 (card-opinion, S07) ya nombra el Salón Literario en formación como contexto del rechazo; BIOG-23/24 pueden referenciar eso sin repetirlo.
- BIOG-17 ya narra que "Juan Facundo Quiroga leyó el escrito" refiriéndose a la carta de Heredia — no a ningún texto publicado. BIOG-24 debe referenciar ese hecho (ya establecido) sin repetir el texto verbatim de BIOG-17.

## Steps

1. **Confirmar anchor y baselines:** Ejecutar `grep -n '/#rev-alberdi-quiroga' index.html` y `grep -c 'data-certeza' index.html` para registrar la línea exacta y confirmar baseline 56. Registrar ambos en el draft.

2. **Redactar BIOG-23 (`card-hecho`):** Catálogo de los tres textos de Alberdi en 1834:
   - *El espíritu de la música; a la capacidad de todo el mundo* (Buenos Aires, 1832, 31 pp.) — en *Obras Completas*, t. I, pp. 29-51.
   - *Ensayo sobre un método nuevo para aprender a tocar el piano con la mayor facilidad* (Buenos Aires, 1832) — pedagógico musical.
   - *Memoria descriptiva sobre Tucumán* (1834) — primer texto político, encargado por el gobernador Heredia, publicado a fines de 1834.
   - Cierre del cuerpo: observar que Alberdi era una promesa con obra mínima, no un pensador establecido — lo que explica el tipo de apuesta de Quiroga.
   - `card-nota-certeza` obligatoria: "Ninguna fuente consultada documenta que Quiroga haya leído alguno de estos textos. La base de su evaluación fue la carta de Heredia y las conversaciones directas."
   - Cite footer: Laborde, Francisco, *Estudio crítico: Juan Bautista Alberdi*, larramendi.es; Wikipedia EN, "Juan Bautista Alberdi"; elhistoriador.com.ar (Felipe Pigna, 2020).
   - Clases: `card-hecho reveal reveal-slide`, `data-certeza="hecho"`, `style="--reveal-delay: 0ms"`.

3. **Redactar BIOG-24 (`card-rumor`):** La pregunta del slice reformulada honestamente.
   - `card-certeza-indicator`: icono ⚠️, badge `<span class="card-certeza-badge-rumor">Rumor</span>`.
   - Cuerpo: la pregunta "¿qué escritos de Alberdi leyó Quiroga?" no tiene respuesta documental. Lo que Quiroga leyó fue la carta de Heredia (ya narrado en BIOG-17). Si leyó algo de Alberdi, el candidato más plausible es la *Memoria sobre Tucumán* — por el nexo Heredia, por el tema (Tucumán y sus tradiciones), por la contemporaneidad de la publicación. Pero Quiroga valoraba a Alberdi como promesa formable, no como intelectual ya establecido. El sistema de recomendaciones personales era el mecanismo de evaluación de capital humano en la Argentina de 1834.
   - Añadir que Quiroga murió en Barranca Yaco en febrero de 1835 — tres meses después del encuentro — sin que ninguna fuente haya registrado sus impresiones sobre la obra de Alberdi. La laguna es históricamente real.
   - `card-rumor__origin` footer: etiqueta "Laguna documental", texto explicando el origen de la conjetura y la ausencia de fuente directa, citar elhistoriador.com.ar/Pigna y larramendi.es/Laborde.
   - Clases: `card-rumor reveal reveal-slide`, `data-certeza="rumor"`, `style="--reveal-delay: 80ms"`.

4. **Escribir el draft:** Crear `S08-CONTENT-DRAFT.md` con: nota de inserción (anchor line, baselines), bloque h4 + events-grid completo (BIOG-23 + BIOG-24), tabla self-check con los 5 Capa 1 checks esperados, y una tabla del arco BIOG-17…BIOG-24 con certeza.

## Must-Haves

- [ ] El HTML de BIOG-23 usa exactamente `card-hecho`, `data-certeza="hecho"`, `--reveal-delay: 0ms`
- [ ] El HTML de BIOG-24 usa exactamente `card-rumor`, `data-certeza="rumor"`, `--reveal-delay: 80ms`, con `card-certeza-indicator`, `card-certeza-icon` ⚠️, `card-certeza-badge-rumor`, y `card-rumor__origin` footer
- [ ] BIOG-23 tiene una `card-nota-certeza` span visible señalando que ninguna fuente documenta lectura por parte de Quiroga
- [ ] BIOG-24 NO inventa reacción ni opinión de Quiroga sobre ningún texto — sólo declara la laguna documental
- [ ] Ninguna de las dos cards repite verbatim citas de BIOG-17 o BIOG-18
- [ ] El draft incluye la línea exacta del anchor confirmada con grep

## Observability Impact

**Signals that change when T01 completes:**
- `.gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` is created (was absent before). Signal: `test -f S08-CONTENT-DRAFT.md` exits 0.
- The draft contains `BIOG-23` and `BIOG-24` identifiers. Signal: `grep -c 'BIOG-2[34]' S08-CONTENT-DRAFT.md` → ≥ 2.

**How a future agent inspects this task:**
- `grep -c 'card-hecho\|card-rumor' S08-CONTENT-DRAFT.md` → 2 (one each) confirms the correct certeza split.
- `grep 'card-nota-certeza' S08-CONTENT-DRAFT.md` → confirms BIOG-23 has the epistemic caveat note.
- `grep 'card-rumor__origin' S08-CONTENT-DRAFT.md` → confirms BIOG-24 has its footer block.
- `grep 'data-certeza="hecho"' S08-CONTENT-DRAFT.md` → 1 (BIOG-23 only).
- `grep 'data-certeza="rumor"' S08-CONTENT-DRAFT.md` → 1 (BIOG-24 only).

**Failure state visible when T01 is incomplete or incorrect:**
- `test -f S08-CONTENT-DRAFT.md` exits 1 → T01 never ran.
- `grep -c 'card-nota-certeza' S08-CONTENT-DRAFT.md` → 0 → the mandatory epistemic caveat is missing from BIOG-23.
- `grep 'Quiroga.*reaccionó\|Quiroga.*pensó\|Quiroga.*leyó.*Alberdi\|Quiroga.*dijo.*texto' S08-CONTENT-DRAFT.md` → any match → BIOG-24 invented a Quiroga reaction and fails the epistemic honesty constraint.
- `grep -c 'card-rumor__origin' S08-CONTENT-DRAFT.md` → 0 → BIOG-24 footer is missing (will break T02 integration).

## Verification

- `test -f .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md`
- `grep -c 'BIOG-2[34]' .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` → devuelve ≥ 2

## Inputs

- `S08-RESEARCH.md` — hallazgos de investigación completos; fuentes verificadas; estructura narrativa recomendada para BIOG-23 y BIOG-24
- `index.html` — confirmar baseline counts y línea del anchor; leer BIOG-17 y BIOG-18 para evitar repetición verbatim
- `.gsd/KNOWLEDGE.md` — patrones card-rumor, card-nota-certeza, CRLF-safe splice, reveal stagger

## Expected Output

- `.gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` — draft completo con HTML listo para insertar, tabla self-check, nota de inserción con número de línea del anchor
