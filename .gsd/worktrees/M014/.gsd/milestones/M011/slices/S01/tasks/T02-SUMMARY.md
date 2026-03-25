---
id: T02
parent: S01
milestone: M011
provides:
  - S01-CONTENT-DRAFT.md completo: 5 cards verificadas (M011-ENC-1, M011-ENC-2, M011-RED37-1, M011-MARIQ-1, M011-RED37-2). Slice S01 cerrado y listo para S03 (HTML Integration).
key_files:
  - .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - "M011-MARIQ-1 certeza=hecho con nota inline card-nota-certeza para el Himno Nacional: la tradición de la primera ejecución en su casa carece de documento primario (ella no lo mencionó en ningún escrito; el cuadro de Subercaseaux 1909 es el soporte visual principal) — certeza diferenciada inline es el tratamiento correcto según D009/D010"
  - "Alberdi quote sobre Mariquita ('la personalidad más importante de la sociedad de Buenos Aires...') se cita como 'atribuido' en historiografía secundaria — no se inventó fuente primaria; se recoge la atribución consistente sin pretender verificación de fuente primaria exacta"
  - "M011-RED37-2 (Echeverría catalizador) redactada como card independiente en lugar de integrarla en M011-RED37-1: añade el arco temporal 1830–1837 desde la perspectiva de Echeverría, que complementa sin duplicar M011-RED37-1 (que trata el Salón Literario 1837 como punto de cristalización) y BIOG-11 (que trata el Fragmento de Alberdi)"
  - "Quote Verification Protocol respetado: ningún excerpt usa citas directas de Echeverría o Mariquita sin fuente primaria verificable; la autobiografía de Echeverría se cita vía Cervantesvirtual"
patterns_established:
  - "Certeza diferenciada inline: cuando una card tiene certeza general 'hecho' pero contiene un sub-claim con menor soporte, aplicar span class='card-nota-certeza' dentro del excerpt en lugar de degradar la certeza de toda la card — permite granularidad sin proliferación de cards"
  - "Fuentes secundarias populares (Infobae, cultura.gob.ar) tratadas como corroboración, no como fuente principal — la atribución se señala como 'recogida en historiografía secundaria' cuando no se verifica fuente primaria"
observability_surfaces:
  - "grep \"^## \" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md — lista las 5 cards del draft completo"
  - "grep \"\\[VERIFICAR\\]\" S01-CONTENT-DRAFT.md — debe retornar 0 líneas (estado verificado)"
  - "grep -c \"Certeza:\" S01-CONTENT-DRAFT.md — debe retornar 5"
  - "grep \"card-nota-certeza\" S01-CONTENT-DRAFT.md | grep -i \"himno\" — verifica que el Himno Nacional tiene certeza diferenciada inline en M011-MARIQ-1"
duration: ~50m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T02: Research y draft — Red Generación del 37 y Mariquita Sánchez de Thompson

**Appendeadas 2 cards verificadas a S01-CONTENT-DRAFT.md (M011-MARIQ-1 y M011-RED37-2), completando el slice S01 con 5 cards totales, 0 flags sin resolver, y certeza diferenciada inline para la tradición del Himno Nacional en casa de Mariquita.**

## What Happened

Se revisaron los anclas HTML existentes (BIOG-7 ~l.493, BIOG-11 ~l.600, BIOG-12 ~l.637) para identificar los gaps: BIOG-7 solo menciona el piano de Mariquita sin desarrollar quién fue ella; BIOG-11 cubre el Salón Literario desde la perspectiva del *Fragmento* de Alberdi sin narrar la formación de la red ni el rol de Echeverría previo a 1837.

**Investigación de Mariquita Sánchez de Thompson:** Se consultaron Wikipedia ES (biográfico completo), elhistoriador.com.ar (Felipe Pigna, ed.), buenosaires.gob.ar/Museo Saavedra, Infobae (oct. 2025), cultura.gob.ar. La convergencia de fuentes documenta: tertulias desde 1808, correspondencia directa con Echeverría, Alberdi y Gutiérrez; rol de anfitriona de la Generación del 37 en los 1830s; exilio en Montevideo en 1838. El dato específico de que Alberdi "se alojó en su casa" (Infobae) amplía lo ya documentado en BIOG-7 (piano de Mariquita en la tienda de Maldes) — se señala como dato secundario en la nota de inserción HTML.

**Determinación de certeza para el Himno Nacional:** Múltiples fuentes académicas y divulgativas son explícitas en que la tradición de la primera ejecución en casa de Mariquita es "tradición" sin documento primario de su autoría (Wikipedia ES: "Según la tradición"; El Historiador: "ella en ningún escrito mencionó tan trascendente episodio"; sisanjuan.gob.ar: "La tradición afirma [...] aun cuando ella no dejara escrito alguno"). El cuadro de Subercaseaux (1909) fue central en instalar el relato visual. Además, fuentes alternativas sostienen que el estreno oficial fue el 25 de mayo de 1813 en la Plaza de la Victoria. Se aplicó certeza diferenciada inline con `card-nota-certeza` dentro del excerpt de M011-MARIQ-1 — la certeza general de la card es `hecho` (perfil, tertulias, vínculos Gen. del 37 son hechos documentados) pero el Himno tiene nota inline marcando el debate.

**Atribución del quote de Alberdi sobre Mariquita:** "Fue la personalidad más importante de la sociedad de Buenos Aires, sin la cual es imposible explicar el desarrollo de su cultura y buen gusto." — atribuido consistentemente por múltiples fuentes secundarias (cultura.gob.ar, cadena3.com, eldiariochubutense.com, 6-7). Se incluye en el excerpt como cita atribuida; se indica en Fuentes que el texto exacto sin fuente primaria verificada — Quote Verification Protocol respetado.

**Investigación de Echeverría como catalizador:** Cervantesvirtual (Biblioteca Miguel de Cervantes) provee documentación académica sólida: retorno de París en junio/julio 1830 (fecha exacta "28 de junio de 1830" en 19-11; "fines de junio de 1830" en 12-2; autobiografía del propio Echeverría: "regresé a mi patria a mediados de 1830"). La reseña favorable de Gutiérrez a *Los consuelos* (1834) está documentada como primer contacto entre ambos (Cervantesvirtual 18-18). Para 1837 en torno a Echeverría se agrupan "Gutiérrez, Alberdi, Cané, Quiroga Rosas, Frías, Vicente F. López, Carlos Tejedor, Thompson" (Cervantesvirtual 18-19).

**Decisión de card M011-RED37-2 independiente vs. integrada en M011-RED37-1:** M011-RED37-1 (T01) narra el Salón Literario como punto de cristalización (1835–1838); M011-RED37-2 (T02) narra el arco 1830–1837 desde la perspectiva de Echeverría como catalizador previo. Los dos ángulos son complementarios, no redundantes. Se mantienen como cards independientes; S03 puede decidir si integrar M011-RED37-2 como párrafo dentro de M011-RED37-1 si el espacio lo requiere (patrón documentado en nota de inserción HTML de la card).

## Verification

Ejecutados todos los checks del task plan y del slice:

```bash
grep -c "^## " S01-CONTENT-DRAFT.md   # 5 (≥3: PASS; ≥4 para T02: PASS)
grep -q "Mariquita" S01-CONTENT-DRAFT.md # PASS
grep -q "Echeverr" S01-CONTENT-DRAFT.md  # PASS
grep -c "\[VERIFICAR\]" S01-CONTENT-DRAFT.md # 0 (PASS)
test -f S01-CONTENT-DRAFT.md          # PASS
grep -c "Certeza:" S01-CONTENT-DRAFT.md # 5 (≥3: PASS)
grep -c "Fuentes:" S01-CONTENT-DRAFT.md # 5 (≥3: PASS)
grep -A5 "Certeza: hecho" S01-CONTENT-DRAFT.md | grep "Fuentes: —" # empty (PASS)
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## " S01-CONTENT-DRAFT.md` (→5, ≥3) | 0 | ✅ pass | <1s |
| 3 | `grep -c "Certeza:" S01-CONTENT-DRAFT.md` (→5, ≥3) | 0 | ✅ pass | <1s |
| 4 | `grep -c "Fuentes:" S01-CONTENT-DRAFT.md` (→5, ≥3) | 0 | ✅ pass | <1s |
| 5 | `grep -c "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` (→0) | 1 | ✅ pass | <1s |
| 6 | `grep -q "Mariquita" S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 7 | `grep -q "Echeverr" S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 8 | `grep -A5 "Certeza: hecho" S01-CONTENT-DRAFT.md \| grep "Fuentes: —"` (→empty) | 1 | ✅ pass | <1s |

## Observability Impact

- **Único artefacto runtime:** `S01-CONTENT-DRAFT.md` — el draft completo (T01+T02) es el input de S03. No hay cambios en `index.html`, JS, ni CSS en T02.
- **Señal de trabajo incompleto:** `grep "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` — debe retornar 0 líneas. Si retorna >0, hay claims sin resolver.
- **Listar cards:** `grep "^## " S01-CONTENT-DRAFT.md` — 5 cards al finalizar S01.
- **Himno con certeza diferenciada:** `grep "card-nota-certeza" S01-CONTENT-DRAFT.md | grep -i "himno"` — verifica que el episodio del Himno está marcado inline como tradición.
- **Failure state visible para S03:** `grep -A5 "Certeza: hecho" S01-CONTENT-DRAFT.md | grep "Fuentes: —"` debe retornar vacío — certeza hecho sin fuente es error de draft.

## Diagnostics

- Inspección completa del draft: `cat .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md`
- Cards de T02 solamente: `grep -A2 "M011-MARIQ-1\|M011-RED37-2" S01-CONTENT-DRAFT.md`
- Certeza de cada card: `grep "^- Certeza:" S01-CONTENT-DRAFT.md`
- Nota certeza diferenciada del Himno: `grep "card-nota-certeza" S01-CONTENT-DRAFT.md`

## Deviations

**M011-RED37-2 agrega perspectiva de Echeverría como catalizador previo al Salón (1830–1837):** El task plan pedía una card sobre "cómo se formaron los vínculos" antes del Salón. T01 ya creó M011-RED37-1 sobre el Salón como punto de cristalización. Se creó M011-RED37-2 específicamente para el arco 1830–1837 desde la perspectiva de Echeverría (retorno de París, *Los consuelos* 1834, contacto con Gutiérrez), que T01 no cubría. La nota de inserción HTML de M011-RED37-2 indica explícitamente que S03 puede integrarla como párrafo dentro de M011-RED37-1 si la proliferación de cards es excesiva.

**Quote de Alberdi tratado como atribución sin fuente primaria verificada:** El task plan no especificaba cómo tratar este quote. Se decidió incluirlo en el excerpt (es relevante y recurrente en historiografía secundaria) pero anotarlo en Fuentes como "atribuido en historiografía secundaria; texto exacto sin fuente primaria verificada" — preserva el Quote Verification Protocol sin descartar una cita culturalmente importante.

## Known Issues

- La fuente primaria exacta del quote de Alberdi sobre Mariquita ("la personalidad más importante...") no se verificó. Todas las fuentes consultadas lo reproducen como si fuera de sus cartas o escritos, pero ninguna da volumen/página/carta específica. S03 puede optar por omitirlo del excerpt o buscar la fuente exacta en los *Escritos póstumos* de Alberdi (t. I, 1895) antes de publicar.
- La relación cronológica exacta entre las tertulias de Mariquita en los 1830s y el círculo previo al Salón Literario (si Echeverría y Alberdi se conocieron en sus reuniones específicamente) no está documentada con certeza — M011-MARIQ-1 lo enuncia como contexto relacional, no como causalidad específica.

## Files Created/Modified

- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — MODIFICADO. Appendeadas 2 cards (M011-MARIQ-1, M011-RED37-2). Header de status actualizado. Comentario de append final reemplazado por cierre de S01. Draft total: 5 cards, 0 flags sin resolver.
- `.gsd/milestones/M011/slices/S01/tasks/T02-PLAN.md` — MODIFICADO. Añadida sección `## Observability Impact` requerida por pre-flight check.
