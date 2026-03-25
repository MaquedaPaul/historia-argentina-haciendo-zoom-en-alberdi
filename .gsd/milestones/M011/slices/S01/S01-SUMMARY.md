---
id: S01
parent: M011
milestone: M011
provides:
  - S01-CONTENT-DRAFT.md con 5 cards verificadas (M011-ENC-1, M011-ENC-2, M011-RED37-1, M011-MARIQ-1, M011-RED37-2), listas para integración HTML en S03
requires: []
affects:
  - S03
key_files:
  - .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - "M011-ENC-1 certeza=debatido: Encarnación movilizó la base federal para hacer políticamente viable el retorno de Rosas con la Suma, pero no hay carta publicada que la muestre exigiendo ella la Suma como condición propia — la condición ya estaba fijada por Rosas desde 1832. La movilización es hecho; la causalidad directa lobby→Suma específicamente es inferencia bien fundada."
  - "M011-ENC-2 puede integrarse como <p class='card-nota-historiografica'> dentro de M011-ENC-1 o como article independiente — S03 decide según espacio. Preferido como nota interna para evitar proliferación dado que S23-2 ya toca el debate de agencia."
  - "M011-RED37-1 certeza=hecho: Salón Literario como punto de cristalización está completamente documentado en Weinberg 1977, Mayer 1963, y la autobiografía de Alberdi."
  - "M011-MARIQ-1 certeza=hecho con card-nota-certeza inline para el Himno Nacional: la tradición de la primera ejecución en su casa carece de documento primario. Se aplica certeza diferenciada inline en lugar de degradar toda la card."
  - "M011-RED37-2 certeza=hecho: arco Echeverría 1830–1837 documentado en Cervantesvirtual con cita autobiográfica del propio Echeverría. Card independiente que añade perspectiva pre-Salón que M011-RED37-1 y BIOG-11 no cubren."
  - "Quote de Alberdi sobre Mariquita ('la personalidad más importante...') incluido como atribuido en historiografía secundaria — no se inventó fuente primaria. S03 puede buscar fuente primaria en Escritos póstumos t. I antes de publicar."
patterns_established:
  - "Draft cards incluyen 'Nota de inserción HTML' con data-id destino, posición relativa a cards existentes, clase CSS correcta, y notas de alternativa de integración — permite integración mecánica en S03"
  - "Certeza diferenciada inline: cuando una card tiene certeza general 'hecho' pero contiene un sub-claim con menor soporte, aplicar <span class='card-nota-certeza'> dentro del excerpt en lugar de degradar toda la card (M011-MARIQ-1 → Himno)"
  - "data-certeza='debatido' usa clase card-opinion CSS (conforme a D052) — patrón confirmado y extendido"
  - "Fuentes secundarias populares (Infobae, cultura.gob.ar) tratadas como corroboración, no como fuente principal — atribución señalada como 'recogida en historiografía secundaria' cuando no se verifica fuente primaria"
observability_surfaces:
  - "grep \"^## \" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md — lista las 5 cards del draft completo"
  - "grep \"\\[VERIFICAR\\]\" S01-CONTENT-DRAFT.md — debe retornar 0 líneas (estado verificado)"
  - "grep -c \"Certeza:\" S01-CONTENT-DRAFT.md — retorna 5"
  - "grep \"card-nota-certeza\" S01-CONTENT-DRAFT.md | grep -i \"himno\" — verifica certeza diferenciada del Himno en M011-MARIQ-1"
  - "grep -A5 \"Certeza: hecho\" S01-CONTENT-DRAFT.md | grep \"Fuentes: —\" — debe retornar vacío (failure state check)"
drill_down_paths:
  - .gsd/milestones/M011/slices/S01/tasks/T01-SUMMARY.md
  - .gsd/milestones/M011/slices/S01/tasks/T02-SUMMARY.md
duration: ~95m total (T01: ~45m + T02: ~50m)
verification_result: passed
completed_at: 2026-03-24
---

# S01: Research — Encarnación/Suma del Poder Público y red Gen. del 37

**5 cards de contenido verificadas entregadas en S01-CONTENT-DRAFT.md: M011-ENC-1 (lobby Encarnación, certeza debatido), M011-ENC-2 (nota historiográfica), M011-RED37-1 (formación red Generación del 37, certeza hecho), M011-MARIQ-1 (perfil Mariquita, certeza hecho con nota inline Himno), M011-RED37-2 (Echeverría catalizador 1830–1837, certeza hecho). Listo para integración HTML en S03.**

## What Happened

**T01 — Encarnación y el lobby para la Suma del Poder Público:** Se revisó el contenido existente del sitio (cards S23-1, S23-2, S24-1, S24-2) para identificar el gap: ninguna card abordaba el delta específico entre 1829 (Suma negada) y 1835 (Suma concedida), ni el rol de Encarnación en ese delta. La investigación web convergió en que Encarnación movilizó activamente la base federal porteña — organizando la Revolución de los Restauradores (octubre 1833), manteniendo correspondencia de inteligencia (AGN Sala X, publicada 1923) y presionando a la Legislatura. El Museo Histórico Nacional describe su objetivo como "conseguir el apoyo unánime de la Junta de Representantes para que le otorgasen nuevamente las facultades extraordinarias". Sin embargo, ninguna carta publicada la muestra *exigiendo ella* la Suma como condición propia: Rosas ya tenía esa exigencia desde 1832 cuando declinó continuar sin ella. La certeza `debatido` refleja esta distinción: la movilización es hecho; la causalidad directa entre su lobby y la Suma *específicamente* (versus el regreso de Rosas en general) es inferencia bien fundada. Se crearon dos entradas: M011-ENC-1 (el lobby documentado) y M011-ENC-2 (la nota historiográfica sobre el debate de agencia), con la opción de integrar ENC-2 como párrafo dentro de ENC-1 en S03.

Como bonus, T01 también draftó M011-RED37-1 sobre el Salón Literario de 1837 como punto de cristalización de la red intelectual — certeza `hecho`, plenamente documentada en Weinberg 1977 y Mayer 1963. Al finalizar T01, el slice ya cumplía los requisitos mínimos (≥3 cards, ≥3 certeza, ≥3 fuentes, 0 flags sin resolver).

**T02 — Red Generación del 37 y Mariquita Sánchez de Thompson:** Se revisaron los anclajes HTML existentes (BIOG-7 con el piano de Mariquita, BIOG-11 con el Salón Literario, BIOG-12 con El Iniciador) para identificar los gaps: BIOG-7 solo menciona el piano sin desarrollar quién fue Mariquita; BIOG-11 cubre el *Fragmento* de Alberdi sin narrar la formación de la red ni el rol previo de Echeverría.

**Mariquita Sánchez de Thompson (M011-MARIQ-1):** Múltiples fuentes convergentes (Wikipedia ES, elhistoriador.com.ar/Pigna, buenosaires.gob.ar/Museo Saavedra, Infobae oct. 2025) documentan sus tertulias desde 1808, su correspondencia directa con Echeverría y Alberdi, y su rol de anfitriona de la Generación del 37. El punto crítico fue el Himno Nacional: Wikipedia ES lo consigna "Según la tradición"; El Historiador anota que "ella en ningún escrito mencionó tan trascendente episodio". Se aplicó la decisión de certeza diferenciada inline (patrón M004/KNOWLEDGE.md): la card tiene certeza general `hecho` (perfil, tertulias, vínculos son hechos documentados), pero el Himno lleva un `<span class="card-nota-certeza">` dentro del excerpt marcando el debate. Una fuente alternativa (sisanjuan.gob.ar) indica que el estreno oficial fue en la Plaza de la Victoria el 25 de mayo de 1813, reforzando que la tradición del salón de Mariquita no es el único relato documentado.

El quote de Alberdi sobre Mariquita aparece consistentemente en múltiples fuentes secundarias (cultura.gob.ar, cadena3.com, eldiariochubutense.com) pero ninguna da volumen/página/carta específica. Se incluyó como atribuido en el excerpt siguiendo el Quote Verification Protocol, con nota en Fuentes sobre la ausencia de fuente primaria verificada.

**Echeverría como catalizador (M011-RED37-2):** Cervantesvirtual (Biblioteca Miguel de Cervantes) proveyó documentación académica sólida: carta autobiográfica de Echeverría citando "regresé a mi patria a mediados de 1830"; reseña favorable de Gutiérrez a *Los consuelos* (1834) como primer contacto documentado entre ambos; y la lista de participantes del Salón de 1837 que incluye a "Gutiérrez, Alberdi, Cané, Quiroga Rosas, Frías, Vicente F. López, Carlos Tejedor, Thompson". La card narra el arco 1830–1837 desde la perspectiva de Echeverría, que M011-RED37-1 (Salón como cristalización) y BIOG-11 (perspectiva del *Fragmento* de Alberdi) no cubren.

## Verification

Todos los checks del slice plan pasaron:

| Check | Comando | Resultado | Veredicto |
|-------|---------|-----------|-----------|
| Archivo existe | `test -f .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` | exit 0 | ✅ PASS |
| ≥3 cards | `grep -c "^## " S01-CONTENT-DRAFT.md` | 5 | ✅ PASS |
| ≥3 certeza | `grep -c "Certeza:" S01-CONTENT-DRAFT.md` | 5 | ✅ PASS |
| ≥3 fuentes | `grep -c "Fuentes:" S01-CONTENT-DRAFT.md` | 5 | ✅ PASS |
| 0 flags sin resolver | `grep -c "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` | 0 | ✅ PASS |
| Encarnación presente | `grep -q "Encarnaci" S01-CONTENT-DRAFT.md` | exit 0 | ✅ PASS |
| Mariquita presente | `grep -q "Mariquita" S01-CONTENT-DRAFT.md` | exit 0 | ✅ PASS |
| Hecho sin fuente | `grep -A5 "Certeza: hecho" ... \| grep "Fuentes: —"` | vacío | ✅ PASS |

## New Requirements Surfaced

- none

## Deviations

**M011-RED37-1 creada en T01 (no en T02):** El plan de T01 se enfocaba en Encarnación; la card de la red Gen. del 37 estaba planificada para T02. Se creó en T01 porque la investigación naturalmente la producía como contexto relacional para la card de Encarnación, y porque alcanzar ≥3 cards en T01 reducía el riesgo de que T02 bloqueara el slice. T02 luego agregó M011-RED37-2 (ángulo Echeverría 1830–1837) como card complementaria.

**M011-ENC-2 no planificada explícitamente:** El plan mencionaba "dos entries si hay dos ángulos distintos"; se crearon efectivamente dos: ENC-1 (el lobby documentado) y ENC-2 (la nota historiográfica sobre el debate de causalidad Suma vs. regreso general). Esto da a S03 flexibilidad para integrar ENC-2 como nota dentro de ENC-1 o como card independiente.

**M011-RED37-2 como card independiente:** El plan de T02 pedía cards sobre "cómo se formaron los vínculos" y podría haberse integrado en M011-RED37-1. Se mantuvieron separadas porque narran ángulos distintos: M011-RED37-1 trata el Salón 1837 como punto de cristalización; M011-RED37-2 trata la construcción de la red 1830–1837 desde la perspectiva de Echeverría. La nota de inserción HTML de M011-RED37-2 documenta explícitamente la opción de integración como párrafo adicional dentro de M011-RED37-1 si S03 decide reducir la proliferación de cards.

## Known Limitations

- La fuente primaria exacta del quote de Alberdi sobre Mariquita ("la personalidad más importante de la sociedad de Buenos Aires...") no fue verificada: todas las fuentes secundarias consultadas lo reproducen sin volumen/página/carta específica. S03 o un futuro content pass debe buscar en *Escritos póstumos* t. I (1895) antes de presentarlo como cita directa.
- El canal específico por el que Alberdi y Echeverría se conocieron *antes* de 1837 (si mediaron las tertulias de Mariquita u otro espacio) no está documentado con certeza — M011-MARIQ-1 y M011-RED37-2 lo enuncian como contexto relacional sin afirmar causalidad específica.
- M011-ENC-2 puede resultar redundante con S23-2 (que ya toca el debate de agencia de Encarnación). S03 debe evaluar en el contexto del DOM si integrar como nota o descartar.

## Follow-ups

- S03 debe decidir la integración de M011-ENC-2: como `<p class="card-nota-historiografica">` dentro del article de M011-ENC-1, o como article independiente. Preferido: integración como nota (reduce proliferación).
- S03 debe evaluar si M011-RED37-2 duplica excesivamente con BIOG-11 y M011-RED37-1, y si corresponde integrarla como párrafo adicional dentro de M011-RED37-1.
- El quote de Alberdi sobre Mariquita necesita verificación de fuente primaria antes de publicar. Candidato: *Escritos póstumos*, t. I, La Tribuna Nacional, Buenos Aires, 1895; o *Mi vida privada*, ca. 1872–82.

## Files Created/Modified

- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — CREADO (T01) y COMPLETADO (T02). 5 cards: M011-ENC-1, M011-ENC-2, M011-RED37-1, M011-MARIQ-1, M011-RED37-2. 0 flags sin resolver. Listo para S03.
- `.gsd/milestones/M011/slices/S01/tasks/T02-PLAN.md` — MODIFICADO. Añadida sección `## Observability Impact`.

## Forward Intelligence

### What the next slice should know

- **S03 (HTML Integration):** El archivo `S01-CONTENT-DRAFT.md` es la especificación de entrada. Cada `## M011-XXX-N` section es una card separada. Leer las "Nota de inserción HTML" antes de splicing — contienen el data-id sugerido, posición relativa a cards existentes, clase CSS correcta, y opciones de integración alternativa.
- **Posición en el DOM:** Las cards de Encarnación (ENC-1, ENC-2) van en `#periodo-rosas` entre `data-id="S23-2"` y `data-id="S24-1"`. Las cards de la red y Mariquita (RED37-1, MARIQ-1, RED37-2) van en `#rev-alberdi-formacion` intercaladas con BIOG-7 (→MARIQ-1), BIOG-11 (→RED37-1→RED37-2), BIOG-12.
- **Certeza diferenciada inline:** M011-MARIQ-1 tiene un `<span class="card-nota-certeza">` dentro del excerpt para el Himno Nacional. Preservar ese span al integrar en HTML — es un artefacto intencional, no texto a limpiar.
- **M011-ENC-1 usa `card-opinion` class** (no `card-hecho`), porque certeza=debatido usa card-opinion según D052.
- **D051 aplica:** Si S03 agrega algún contexto sobre el plebiscito de 1835 cerca de ENC-1, usar 9,316 (no 9,320).

### What's fragile

- El quote de Alberdi sobre Mariquita — no se verificó fuente primaria. Si S03 lo incluye en HTML como `<blockquote>`, marcar claramente como "atribuido" en el `card-opinion__context`, no como cita directa verificada.
- M011-ENC-2 como card independiente podría sonar repetitiva junto a S23-2. Si S03 la descarta como card independiente e integra el contenido en ENC-1, el dato historiográfico no se pierde.

### Authoritative diagnostics

- `grep "^## " .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — lista las 5 cards en orden: ENC-1, ENC-2, RED37-1, MARIQ-1, RED37-2
- `grep "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` — debe retornar vacío; si retorna >0 líneas, hay claims sin resolver antes de integrar en HTML
- `grep "card-nota-certeza" S01-CONTENT-DRAFT.md` — localiza el span del Himno en MARIQ-1

### What assumptions changed

- **Asunción inicial:** M011-ENC-1 podría resultar `hecho` si había carta explícita de Encarnación exigiendo la Suma. **Realidad:** Ninguna carta publicada muestra esa exigencia explícita. Rosas ya tenía la condición desde 1832; lo que Encarnación hizo fue crear las condiciones políticas para que esa condición fuera viable. Certeza `debatido` es la clasificación honesta.
- **Asunción inicial:** La primera ejecución del Himno en casa de Mariquita sería hecho verificable. **Realidad:** Es tradición sin documento primario — ella misma no la menciona en ningún escrito. Certeza diferenciada inline es el tratamiento correcto.
- **Asunción inicial:** T02 necesitaría crear M011-RED37-1 desde cero. **Realidad:** T01 ya la creó como bonus, dejando T02 libre para agregar dos cards complementarias (MARIQ-1 y RED37-2) con más profundidad de la planificada.
