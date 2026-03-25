---
id: T02
parent: S05
milestone: M007
provides:
  - index.html con sub-período #rev-alberdi-quiroga (BIOG-17 + BIOG-18) integrado; data-certeza=52, reveal=73, sub-nav=6 links
key_files:
  - index.html
key_decisions:
  - La inserción del sub-período en /tmp usa el patrón CRLF-safe (split \r\n, splice, join \r\n) — el archivo temp /tmp/s05-subperiodo.txt usa LF nativo del Write tool; Node.js splitea en \n el temp file pero rejoinea index.html con \r\n, preservando el encoding del archivo principal
patterns_established:
  - El archivo temp del sub-período (escrito con Write tool) usa LF; el script de inserción splitea ese temp en \n pero rejoinea index.html con \r\n — la mezcla es intencional y correcta (el temp file nunca va al HTML final con sus LF; sus líneas se splican como strings en el array de CRLF)
  - grep -Pc '\r\r' falla en este entorno Windows/Git Bash — usar Node.js para verificar CRLF doble: node -e "const t=require('fs').readFileSync('index.html','utf8');if(t.match(/\r\r/g))process.exit(1);"
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 52 (métrica primaria de inserción)"
  - "grep -c 'rev-alberdi-quiroga' index.html → 3 (sub-nav link + div id + comentario cierre)"
  - "document.querySelectorAll('.reveal').length → 73 en browser console"
  - "document.querySelectorAll('.sub-nav .sub-nav__link').length → 6 en browser console"
  - "document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length → 2 en browser console"
duration: ~12 min
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T02: Integrar sub-período #rev-alberdi-quiroga en index.html (CRLF-safe)

Integrado sub-período `#rev-alberdi-quiroga` con BIOG-17 (la carta de Heredia) y BIOG-18 (las conversaciones y el ofrecimiento del viaje) en index.html; data-certeza subió de 50 a 52, reveal de 70 a 73, sub-nav de 5 a 6 links — todas las verificaciones shell y DOM pasaron.

## What Happened

Pre-flight confirmó 0 ocurrencias de BIOG-17/18 y rev-alberdi-quiroga — sin trabajo previo aplicado.

Se verificó la indentación exacta del sub-nav (10 espacios) con grep. Se escribieron los dos archivos temp con el Write tool (no heredoc): `/tmp/s05-subnav.txt` para el link del sub-nav y `/tmp/s05-subperiodo.txt` para el bloque completo del sub-período.

La Inserción 1 (sub-nav link) usó Node.js CRLF-safe: localizó `href="#rev-alberdi-formacion"` en línea 327 e insertó el nuevo link en línea 328. La Inserción 2 (sub-período) localizó `</div><!-- /#rev-alberdi-formacion -->` en línea 730 (post-inserción-1) e insertó el bloque completo de ~119 líneas después. El archivo quedó en 1797 líneas totales.

Los archivos temp ya no existían al momento de la limpieza (el sistema los había eliminado automáticamente), confirmando que no hay residuos.

Se añadió la sección `## Observability Impact` a T02-PLAN.md como requería el pre-flight gap detectado.

Verificación DOM en browser: se sirvió el sitio con `npx serve` y se evaluó el estado DOM — todos los conteos coinciden exactamente con los esperados (reveal=73, sub-nav links=6, certeza cards en #rev-alberdi-quiroga=2). El screenshot confirmó la visualización correcta de BIOG-17 con la imagen de Quiroga y BIOG-18 con ambas citas directas.

## Verification

Todas las verificaciones pasaron sin excepción:

**Shell — capa 1:**
- `grep -c 'data-certeza' index.html` → **52** ✅ (esperado ≥52)
- `grep -c 'id="BIOG-1[78]"' index.html` → **2** ✅ (2 article elements)
- `grep -c 'rev-alberdi-quiroga' index.html` → **3** ✅ (≥2 requerido: sub-nav link + div id + comentario cierre)
- `grep -q 'Heredia' index.html && echo OK` → **OK** ✅
- `grep -q 'orden contra el Banco\|hombre extraordinario' index.html && echo OK` → **OK** ✅
- `grep -q '1834\|octubre' index.html && echo OK` → **OK** ✅
- Node.js CRLF doble check → **CRLF OK** ✅ (sin doble \r\r)

**Browser DOM — capa 2:**
- `document.querySelectorAll('.reveal').length` → **73** ✅
- `document.querySelectorAll('.sub-nav .sub-nav__link').length` → **6** ✅
- `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` → **2** ✅
- `document.querySelector('#rev-alberdi-quiroga') !== null` → **true** ✅
- `document.querySelectorAll('#BIOG-18 .card-nota-certeza').length` → **2** ✅
- `document.querySelectorAll('#BIOG-17 .card-nota-certeza').length` → **1** ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` → 52 | 0 | ✅ pass | <1s |
| 2 | `grep -c 'id="BIOG-1[78]"' index.html` → 2 | 0 | ✅ pass | <1s |
| 3 | `grep -c 'rev-alberdi-quiroga' index.html` → 3 | 0 | ✅ pass | <1s |
| 4 | `grep -q 'Heredia' index.html && echo OK` | 0 | ✅ pass | <1s |
| 5 | `grep -q 'orden contra el Banco\|hombre extraordinario' index.html && echo OK` | 0 | ✅ pass | <1s |
| 6 | Node.js CRLF doble check | 0 | ✅ pass | <1s |
| 7 | DOM: `.reveal` count = 73 | — | ✅ pass | browser |
| 8 | DOM: sub-nav links = 6 | — | ✅ pass | browser |
| 9 | DOM: `#rev-alberdi-quiroga [data-certeza]` = 2 | — | ✅ pass | browser |
| 10 | DOM: `#BIOG-18 .card-nota-certeza` = 2 | — | ✅ pass | browser |

## Diagnostics

- **Estado en shell:** `grep -n 'rev-alberdi-quiroga' index.html` → muestra 3 líneas (línea ~328 sub-nav, línea ~737 div id, línea ~850 comentario cierre)
- **Estado en browser:** `document.querySelectorAll('[data-certeza]').length` → 52 total
- **Verificar CRLF:** `node -e "const t=require('fs').readFileSync('index.html','utf8');console.log(t.match(/\r\r/g)?'DOBLE':'OK');"`
- **Localizar BIOG-17/18:** `grep -n 'id="BIOG-1[78]"' index.html` → líneas 741 y 792
- **Si data-certeza < 52:** verificar `grep -n 'rev-alberdi-formacion' index.html` para confirmar que el anchor no cambió de posición
- **Nota:** `grep -Pc '\r\r'` no funciona en este entorno (Git Bash / Windows) — siempre usar el Node.js check alternativo

## Deviations

- **grep -Pc '\r\r' no disponible:** El plan especificaba `grep -Pc '\r\r' index.html` para detectar CRLF doble, pero este patrón falla en el entorno Git Bash/Windows con "grep: -P supports only unibyte and UTF-8 locales". Se reemplazó con el check Node.js equivalente documentado en KNOWLEDGE.md. El resultado fue el mismo: confirmación de ausencia de CRLF doble.
- **Temp files ya ausentes al limpiar:** Los archivos `/tmp/s05-subnav.txt` y `/tmp/s05-subperiodo.txt` no existían al ejecutar `rm` (eliminados automáticamente por el entorno). Esto no afecta el resultado — las inserciones ya habían ocurrido.

## Known Issues

Ninguno.

## Files Created/Modified

- `index.html` — +1 sub-nav link (línea 328) + sub-período #rev-alberdi-quiroga con BIOG-17 y BIOG-18 (~119 líneas, insertadas después de línea 730); data-certeza=52, reveal=73, sub-nav=6
- `.gsd/milestones/M007/slices/S05/tasks/T02-PLAN.md` — añadida sección `## Observability Impact` (pre-flight gap fix)
