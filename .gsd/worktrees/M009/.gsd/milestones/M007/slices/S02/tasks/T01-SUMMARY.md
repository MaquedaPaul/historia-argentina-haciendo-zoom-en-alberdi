---
id: T01
parent: S02
milestone: M007
provides:
  - S02-CONTENT-DRAFT.md with 4 verified biographical blocks (BIOG-5..BIOG-8) ready for HTML integration
key_files:
  - .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md
key_decisions:
  - Empleo de Alberdi post-internado es "dependiente en tienda de Maldes" (verificado en Mi vida privada), NO "copista en escribanía" (dato del CONTEXT no verificado)
  - Amistad Alberdi–Cané inicia en 1824 en el Colegio (no en 1837 en el Salón Literario)
  - Colegio de Ciencias Morales fundado ca. 1818 (no 1823 como decía M007-CONTEXT)
  - Academia de Jurisprudencia (1815) es institución distinta del Colegio y de la UBA
patterns_established:
  - S02-CONTENT-DRAFT sigue la misma estructura de S01-CONTENT-DRAFT (Certeza / Excerpt / Fuentes ≥2 / Cita-HTML / Notas de imagen)
  - Correcciones al planning context documentadas explícitamente al inicio del draft
  - Forward intelligence para S03 incluida en apéndice del draft
observability_surfaces:
  - test -f .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md → exits 0
  - grep -c "^## Bloque" .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md → returns 4
  - grep -c "VERIFICACIÓN PENDIENTE" .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md → returns 2 (activos)
  - grep -c "INCIERTO\|VERIFICACIÓN PENDIENTE\|PARÁFRASIS" .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md → returns 11
duration: ~90min
verification_result: passed
completed_at: 2026-03-20
blocker_discovered: false
---

# T01: Research y borrador verificado (Bloques 5–8)

**Creado S02-CONTENT-DRAFT.md con 4 bloques (BIOG-5..BIOG-8) verificados contra fuentes primarias y secundarias, con dos correcciones materiales al M007-CONTEXT.md: el primer empleo de Alberdi no fue en "escribanía" sino en la tienda de Maldes (verificado en Mi vida privada), y la amistad con Miguel Cané comenzó en 1824 en el Colegio, no en 1837.**

## What Happened

Investigué los 4 bloques biográficos de S02 usando búsquedas web y una fuente que cita directamente el texto de *Mi vida privada* (cervantesvirtual.com). Los resultados desmintieron dos afirmaciones del M007-CONTEXT.md planning document:

**Corrección 1 — BIOG-7 (empleo):** El M007-CONTEXT dice "copista en escribanía". Ninguna fuente consultada documenta esto. El texto de *Mi vida privada* (citado via cervantesvirtual.com) dice claramente que Felipe lo colocó "en la casa de comercio de un amigo nuestro, don J. B. Maldes, que había sido dependiente de mi padre en Tucumán". Todas las fuentes secundarias confirman: dependiente en tienda de comercio, no copista. La card BIOG-7 usa el dato verificado.

**Corrección 2 — Miguel Cané (padre):** El plan de S02 planteaba si había evidencia del vínculo antes de 1837. Sí la hay: JURSOC UNLP PDF, elhistoriador.com.ar, y el estudio académico de larramendi.es confirman que Cané y Alberdi fueron compañeros de banco en el Colegio de Ciencias Morales desde 1824. La amistad nació ahí, 13 años antes del Salón Literario.

**Hallazgos principales por bloque:**

- **BIOG-5 (viaje 1824):** El año 1824 está confirmado con alta certeza por 6+ fuentes independientes, incluyendo el paper académico de Yanzi Ferreira (ANCMYP, 2002) que precisa "julio de 1824". La única fuente que dice 1825 (historiaybiografias.com) tiene otros errores que reducen su confiabilidad. La beca fue gestionada bajo el gobernador Martín Rodríguez. El Colegio de Ciencias Morales fue fundado ca. 1818 (no 1823). Miguel Cané fue compañero de banco desde ese año.

- **BIOG-6 (abandono del internado):** Hay texto verificable de *Mi vida privada* citado en cervantesvirtual.com sobre la salida del Colegio. La frase "Me fue imposible soportar la disciplina" es atribuida por Infobae (2024) a "sus memorias" pero no pudo verificarse directamente contra la edición de *Escritos póstumos*; se marcó como [PARÁFRASIS — NO USAR COMO CITA DIRECTA] para T02. La fecha del abandono oscila entre ca. 1825–1826 (fuentes dicen que fue "tras el primer año") y un retorno documentado en 1827. Se usa con `card-nota-certeza`.

- **BIOG-7 (empleos):** La tienda de Maldes verificada en *Mi vida privada* es el empleo central. La actividad musical (conciertos para amigos, piano en casa de Mariquita Sánchez de Thompson, publicaciones de 1832) está bien documentada como pasatiempo/creación artística, no como trabajo remunerado explícito. Se usa certeza `hecho` para la actividad y `opinión` para la descripción como "fuente de ingreso".

- **BIOG-8 (regreso al estudio):** Desambiguadas las 4 instituciones educativas que el planning confundía. El título exacto en Córdoba es el 24 de mayo de 1834 (ANCMYP paper con fecha exacta y rector). El inicio de estudios de leyes es ca. 1831 (mayoría de fuentes) o 1832 (colabogados.org.ar). La motivación política del derecho es lectura historiográfica confirmada como `opinión` con atribución.

Se añadió V7 (check de failure path) al S02-PLAN.md (pre-flight requirement). Se actualizó KNOWLEDGE.md con 3 nuevas entradas.

## Verification

**T01-specific checks (per task plan):**
```bash
test -f .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md && echo EXISTS   # → EXISTS
grep -c "^## Bloque" .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md     # → 4
```

Both pass. Manual review confirms:
- Each block has `Certeza:` field with justification ✓
- Each block has ≥2 verified sources listed ✓
- Each block has non-empty `Cita-HTML` ✓
- The 1824 vs 1825 year discrepancy documented (1824 confirmed, single outlier noted) ✓
- BIOG-6 has `card-nota-certeza` prepared for uncertain date ✓
- Copista reference attributed to M007-CONTEXT as unverified; *Mi vida privada* gives "tienda de Maldes" ✓
- Academia de Jurisprudencia distinguished from Colegio de Ciencias Morales ✓
- No cita directa presentada como tal without explicit marking ✓
- Miguel Cané (padre) located in BIOG-5 as confirmed fact (not incertidumbre) ✓

**Slice verification checks (partial — T01 does not touch index.html):**
V1–V5 (HTML checks): N/A — index.html not modified in T01
V6 (CSS/JS check): N/A — no CSS/JS changes
V7 (new diagnostic check): draft exists, 2 VERIFICACIÓN PENDIENTE items properly flagged

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md && echo EXISTS` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## Bloque" .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` → 4 | 0 | ✅ pass | <1s |
| 3 | `grep -c "Cita-HTML" .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` → 4 | 0 | ✅ pass | <1s |
| 4 | `grep -c "INCIERTO\|VERIFICACIÓN PENDIENTE\|PARÁFRASIS" ...` → 11 | 0 | ✅ pass | <1s |

## Diagnostics

To inspect this task's output in future:
```bash
# Check draft exists and block count
test -f .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md && grep -c "^## Bloque" $_

# Check pending epistemic flags
grep -n "VERIFICACIÓN PENDIENTE\|INCIERTO\|PARÁFRASIS" .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md

# Check corrections to CONTEXT documented
grep -n "CORRECCIÓN" .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md
```

The S02-CONTENT-DRAFT.md is readable as a standalone document by T02 without re-investigation.

## Deviations

1. **"Copista en escribanía" → "Dependiente en tienda de Maldes"**: The task plan preserved the M007-CONTEXT's "copista" framing. Research found no source supporting this — all sources (including the *Mi vida privada* text directly) name the Maldes commercial house. Deviation: BIOG-7 uses verified data, not the planning assumption. Impact: T02 must use "tienda de Maldes", not "copista en escribanía".

2. **Miguel Cané (padre) resolved as BIOG-5 fact, not uncertain**: The plan said to investigate whether contact predated 1837 and note as uncertainty if not. Multiple sources confirm the friendship began in 1824 at the Colegio. No `card-nota-certeza` needed for this — it's a confirmed fact. The card mentions it directly.

3. **V7 added to S02-PLAN.md**: Pre-flight requirement was to add a diagnostic/failure-path check to the slice verification. Done: V7 is a Node.js script that diagnoses whether a failure is pre-T02 (draft missing) or post-T02 (cards not in HTML).

## Known Issues

1. **"Me fue imposible soportar la disciplina"**: This quote is widely attributed to *Mi vida privada* but could not be verified against the full text of *Escritos póstumos* t. I directly. It is marked [PARÁFRASIS] in the draft. T02 must use it with attribution ("en sus memorias") not as a verbatim extracted quote.

2. **Copista reference unresolved**: If a future source does document "copista en escribanía" for Alberdi, this would need to be investigated further. Current conclusion: the planning document had an unverified claim.

3. **1831 vs 1832 for start of legal studies**: Minor 1-year discrepancy between sources. Not material to the narrative; noted in the draft with `card-nota-certeza`.

## Files Created/Modified

- `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` — created: 4 verified biographical blocks (BIOG-5..BIOG-8) with Certeza/Excerpt/Fuentes/Cita-HTML/Notas de imagen; 2 appendices (incertidumbre table, correcciones al CONTEXT, forward intelligence para S03)
- `.gsd/milestones/M007/slices/S02/S02-PLAN.md` — updated: T01 marked [x]; V7 failure-path diagnostic check added to Verification section
- `.gsd/KNOWLEDGE.md` — updated: 3 new entries (Alberdi's first employment clarification; Miguel Cané friendship dating; law training institutions disambiguation)
