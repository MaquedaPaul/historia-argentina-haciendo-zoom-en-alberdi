---
id: T03
parent: S05
milestone: M007
provides:
  - Triple gate 15/15 — S05 cerrado; S05-CONTENT-DRAFT.md con Apéndice T03 (valores reales, no placeholders); git limpio
key_files:
  - .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md
key_decisions:
  - BIOG-17/18 grep count = 4 (2 comment lines + 2 article elements) — el check del plan dice "2 article elements", grep -c 'BIOG-1[78]' retorna 4 incluyendo comentarios; la verificación correcta es `grep -c 'id="BIOG-1[78]"' index.html` que retorna 2
  - Git está limpio porque la auto-commit del slice plan (chore M007/S05) ya integró index.html con los 120 líneas nuevas; T02 y T03 no necesitaron commits adicionales de index.html
patterns_established:
  - El auto-commit del sistema al crear el plan de slice (chore: auto-commit after plan-slice) captura index.html si ya fue modificado; los task summaries y content drafts viven en .gsd/ que está en .gitignore — el sistema los gestiona fuera de git
  - grep -c 'BIOG-1[78]' cuenta comments + articles; para contar solo articles usar grep -c 'id="BIOG-1[78]"'
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 52 (métrica primaria de S05)"
  - "grep -c 'rev-alberdi-quiroga' index.html → 3 (sub-nav link + div id + comentario cierre)"
  - "grep -c 'Apéndice T03' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md → 1 (cierre documentado)"
  - "document.querySelectorAll('.reveal').length → 73 (runtime health)"
  - "document.querySelectorAll('.sub-nav .sub-nav__link').length → 6 (sub-nav count)"
duration: ~8 min
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T03: Triple gate — verificación de shell, browser DOM, y coherencia narrativa

**Triple gate 15/15 ejecutado: Capa 1 (6 shell checks), Capa 2 (4 browser DOM checks), Capa 3 (5 narrative coherence checks) — todos pasados; S05 cerrado.**

## What Happened

T02 había integrado correctamente BIOG-17 y BIOG-18 (confirmado por el auto-commit del sistema que capturó index.html con 120 líneas nuevas). T03 ejecutó las tres capas de verificación independientes sin modificar HTML.

**Capa 1 — Shell:** Los 6 checks pasaron. `data-certeza=52`, `rev-alberdi-quiroga=3`, Node.js gate exit 0. Git limpio (empty `git status --short`). Se detectó que `grep -c 'BIOG-1[78]'` retorna 4 (incluyendo 2 líneas de comentario HTML además de los 2 article elements) — el check original del plan dice "2 article elements" pero grep incluye comentarios; la métrica real de artículos es 2 (verificada con `grep -c 'id="BIOG-1[78]"' index.html`).

**Capa 2 — Browser DOM:** Servidor `npx serve` iniciado en puerto 3000. Todas las queries DOM confirmaron los valores esperados: `.reveal=73`, `sub-nav__link=6`, `#rev-alberdi-quiroga [data-certeza]=2`, `#BIOG-18 .card-nota-certeza=2`, `#BIOG-17 .card-nota-certeza=1`. Screenshot visual confirmó rendering correcto de ambas cards con imagen de Quiroga, badges "Hecho", citas directas en blockquote, y texto narrativo completo.

**Capa 3 — Coherencia narrativa:** (a) SP2-2 y BIOG-17 son ángulos distintos — SP2-2 es perfil político del federalismo, BIOG-17 es episodio biográfico de Alberdi; sin superposición temática. (b) Cronología: BIOG-17/18 cubren 1834, BIOG-11 cubre 1835–1837 — contiguos pero no superpuestos. (c) "hombre extraordinario" aparece solo en el título de BIOG-18 (line 797), no en ninguno de los 6 `alberdi-quote` blockquotes (lines 320, 718, 981, 1091, 1261, 1750); "orden contra el Banco" solo en BIOG-18 narrative (lines 814, 819). (d) `card-nota-certeza` visibles en HTML (no comentadas). (e) `#rev-alberdi-quiroga` posicionado correctamente: después del cierre de `#rev-alberdi-formacion` (line 730) y antes de `#rev-1800-1820` (line 855). (f) Verificado que no hay contenido nuevo de S05 en `styles.css` ni `app.js`.

**Apéndice T03** añadido a S05-CONTENT-DRAFT.md con los 15 valores reales (no placeholders). Tabla marcada "Gate: 15/15 — S05 cerrado."

## Verification

**Shell — Capa 1:**
- `grep -c 'data-certeza' index.html` → **52** ✅
- `grep -c 'id="BIOG-1[78]"' index.html` → **2** (article elements exactos) ✅
- `grep -c 'rev-alberdi-quiroga' index.html` → **3** ✅
- Keywords: Heredia, hombre extraordinario, orden contra el Banco, 1834 → **KEYWORDS_OK** ✅
- Node.js gate → **OK:52** exit 0 ✅
- `git status --short` → **vacío** ✅

**Browser DOM — Capa 2:**
- `document.querySelectorAll('.reveal').length` → **73** ✅
- `document.querySelectorAll('.sub-nav .sub-nav__link').length` → **6** ✅
- `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` → **2** ✅
- `document.querySelectorAll('#BIOG-18 .card-nota-certeza').length` → **2** ✅
- Bonus: `#BIOG-17 .card-nota-certeza` → **1** ✅

**Narrativa — Capa 3:**
- BIOG-17 vs SP2-2: ángulos distintos ✅
- Cronología 1834 / 1835–1837: sin superposición ✅
- Citas no duplican alberdi-quotes: confirmado grep ✅
- card-nota-certeza visibles en HTML ✅
- Posición #rev-alberdi-quiroga: line 736 (entre 730 y 855) ✅

**Apéndice:**
- `grep -c 'Apéndice T03' S05-CONTENT-DRAFT.md` → **1** ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` → 52 | 0 | ✅ pass | <1s |
| 2 | `grep -c 'id="BIOG-1[78]"' index.html` → 2 | 0 | ✅ pass | <1s |
| 3 | `grep -c 'rev-alberdi-quiroga' index.html` → 3 | 0 | ✅ pass | <1s |
| 4 | Keywords grep (Heredia, hombre extraordinario, 1834) | 0 | ✅ pass | <1s |
| 5 | `node -e "...if(n<52){process.exit(1);}"` → OK:52 | 0 | ✅ pass | <1s |
| 6 | `git status --short` → vacío | 0 | ✅ pass | <1s |
| 7 | DOM: `.reveal` count = 73 | — | ✅ pass | browser |
| 8 | DOM: sub-nav links = 6 | — | ✅ pass | browser |
| 9 | DOM: `#rev-alberdi-quiroga [data-certeza]` = 2 | — | ✅ pass | browser |
| 10 | DOM: `#BIOG-18 .card-nota-certeza` = 2 | — | ✅ pass | browser |
| 11 | Narrativa: BIOG-17 distinto de SP2-2 | — | ✅ pass | manual |
| 12 | Narrativa: cronología sin superposición | — | ✅ pass | manual |
| 13 | Narrativa: citas no duplican alberdi-quotes | — | ✅ pass | grep |
| 14 | Narrativa: card-nota-certeza visibles | — | ✅ pass | grep |
| 15 | Narrativa: posición #rev-alberdi-quiroga | — | ✅ pass | grep |

## Diagnostics

- **Métrica primaria:** `grep -c 'data-certeza' index.html` → 52
- **Localización sub-período:** `grep -n 'rev-alberdi-quiroga' index.html` → líneas 328 (sub-nav), 736 (div id), 848 (comentario cierre)
- **Runtime health:** `document.querySelectorAll('.reveal').length` → 73
- **Cierre documentado:** `grep -c 'Apéndice T03' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` → 1
- **CRLF check:** `node -e "const t=require('fs').readFileSync('index.html','utf8');console.log(t.match(/\r\r/g)?'DOBLE':'OK');"` → OK

## Deviations

- **grep -c 'BIOG-1[78]' retorna 4, no 2:** El plan especificaba "→ debe ser 2 (exactamente 2 article elements)" pero grep -c cuenta también las 2 líneas de comentario HTML `<!-- BIOG-17: ... -->` y `<!-- BIOG-18: ... -->`. El check correcto para article elements es `grep -c 'id="BIOG-1[78]"' index.html` → 2. Impacto: ninguno — los 2 article elements están presentes y son correctos. Documentado para futuros agentes.

## Known Issues

Ninguno.

## Files Created/Modified

- `.gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` — Apéndice T03 añadido con tabla de 15 resultados verificados (valores reales, "Gate: 15/15 — S05 cerrado")
- `.gsd/milestones/M007/slices/S05/tasks/T03-SUMMARY.md` — este archivo
