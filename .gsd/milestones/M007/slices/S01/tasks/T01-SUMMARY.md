---
id: T01
parent: S01
milestone: M007
provides:
  - S01-CONTENT-DRAFT.md con 4 bloques verificados (nacimiento, hermanos/madre, revolución Mayo, doble orfandad)
key_files:
  - .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Fecha de muerte del padre Salvador Alberdi es 1822 (no 1824 como decía el M007-CONTEXT): todas las fuentes consultadas dicen "a los once años" o explícitamente "1822"; 1824 es cuando Alberdi llegó a Buenos Aires.
  - Muerte de la madre: usamos "meses después del nacimiento" con card-nota-certeza; las fuentes discrepan entre "al momento del parto" y "siete meses más tarde" — la segunda tiene más detalle verificable.
  - La reflexión crítica adulta de Alberdi sobre Mayo (Bloque 3) se clasifica como `opinión` con atribución a Botana (1984), no como cita directa — ninguna cita verificable de Alberdi disponible en esta investigación.
patterns_established:
  - El patrón card-nota-certeza para incertidumbres epistemológicas inline está documentado en el draft con texto HTML exacto listo para copy-paste en T02.
observability_surfaces:
  - grep -c "^## Bloque" .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md → 4
  - grep -c "INCIERTO" .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md → 4 flags activos
  - grep "VERIFICACIÓN PENDIENTE" .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md → 1 item (cita directa Alberdi sobre Mayo)
  - grep "PARÁFRASIS" .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md → 1 item (anécdota de Belgrano y el niño)
duration: ~45 min
verification_result: passed
completed_at: 2026-03-20
blocker_discovered: false
---

# T01: Research y borrador de contenido verificado (Bloques 1–4)

**Redactado S01-CONTENT-DRAFT.md con 4 bloques verificados, fuentes explícitas, certeza clasificada y corrección de error histórico en el context doc (fecha de muerte del padre: 1822, no 1824).**

## What Happened

Cargué el contexto del milestone (M007-CONTEXT, M007-ROADMAP, KNOWLEDGE.md) y realicé investigación web sobre los 4 bloques biográficos. Las fuentes principales consultadas fueron Wikipedia EN (con citas a *Mi vida privada*), Infobae (2023), El Tucumano (2024), elhistoriador.com.ar (Pigna), JURSOC UNLP PDF biográfico, elpensante.com y todo-argentina.net.

**Hallazgo crítico (Bloque 4):** El M007-CONTEXT afirmaba que el padre murió "en 1824". Todas las fuentes externas consultadas dicen "cuando tenía 11 años" (= ca. 1821–1822) o explícitamente "en 1822" (Wikipedia EN, elpensante.com). 1824 es cuando Alberdi llegó a Buenos Aires con beca — el planificador confundió ambas fechas. La corrección está documentada en el draft y en KNOWLEDGE.md para que T02 no propague el error.

**Bloque 1 (nacimiento + padre):** Datos bien documentados. Fecha 29 agosto 1810 confirmada por 6+ fuentes. El rol del padre fue como patriota-civil (entrevistas con Belgrano, no combate de campo) — distinción importante para la certeza del bloque. La anécdota de Belgrano sentando al niño en sus rodillas es tradición biográfica secundaria, marcada como tal.

**Bloque 2 (hermanos + madre):** Hermanos Felipe y Tránsita identificados por nombre en múltiples fuentes; cuatro hermanos totales confirmados; los dos sin nombre quedan como [INCIERTO]. Discrepancia menor sobre si la madre murió "al momento del parto" o "siete meses más tarde" — documentada con card-nota-certeza, se usa la versión más detallada.

**Bloque 3 (Revolución de Mayo):** Posición patriota del padre: hecho bien documentado. La reflexión crítica adulta de Alberdi sobre Mayo: clasificada como `opinión` con atribución a Botana (1984). No se encontró cita directa verificable de Alberdi; marcado con [VERIFICACIÓN PENDIENTE] por si T02 accede a fuentes primarias adicionales.

**Bloque 4 (doble orfandad):** La incertidumbre dominante ya resuelta: 1822 para el padre. La madre murió en los primeros meses de 1811 (ca. 7 meses post-nacimiento). El draft incluye alerta explícita para T02 de no usar 1824.

También añadí la sección `## Observability Impact` al T01-PLAN.md (era el único gap identificado en el pre-flight) y una entrada en KNOWLEDGE.md sobre el error de fecha del padre.

## Verification

**T01 checks ejecutados:**

1. `test -f S01-CONTENT-DRAFT.md` → EXISTS ✅
2. `grep -c "^## Bloque" S01-CONTENT-DRAFT.md` → 4 ✅
3. Bloque 1: 6 fuentes verificadas (≥2 requeridas) ✅
4. Bloque 2: 6 fuentes verificadas; hermanos identificados o [INCIERTO] ✅
5. Bloque 3: certeza correctamente asignada (hecho para padre, opinión para lectura crítica) ✅
6. Bloque 4: fecha 1822 verificada contra múltiples fuentes; discrepancia documentada ✅
7. `grep -c "**Cita-HTML"` → 4 (todos los bloques tienen texto listo para card) ✅
8. Ninguna cita directa es paráfrasis no marcada: anécdota de Belgrano marcada [PARÁFRASIS/TRADICIÓN SECUNDARIA] ✅

**Slice-level checks (estado pre-T02):**

- V4: Draft existe con 4 bloques → ✅ PASS
- V1: `data-certeza` en index.html = 34 (pre-T02; deberá ser ≥38 post-T02) → partial, esperado
- V2: `rev-alberdi-formacion` en index.html → FAIL esperado (T02 lo integra)
- V3: grep biográfico en index.html → 9 coincidencias (Belgrano ya mencionado en html existente) → cumplirá ≥2 post-T02
- V5: diagnóstico node.js data-certeza → 34 confirmado
- V6: card-nota-certeza count → 1 pre-T02 (correcto)

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md && echo EXISTS` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## Bloque" S01-CONTENT-DRAFT.md` | 0 (returns 4) | ✅ pass | <1s |
| 3 | `grep -c "**Cita-HTML" S01-CONTENT-DRAFT.md` | 0 (returns 4) | ✅ pass | <1s |
| 4 | `grep -c "INCIERTO" S01-CONTENT-DRAFT.md` | 0 (returns 4) | ✅ pass | <1s |
| 5 | `grep -c 'data-certeza' index.html` | 0 (returns 34) | ✅ pass (baseline pre-T02) | <1s |
| 6 | `node -e "...data-certeza count..."` | 0 (returns 34) | ✅ pass (matches grep) | <1s |
| 7 | `grep 'Salvador.*Alberdi\|Belgrano\|...' index.html \| wc -l` | 0 (returns 9) | ✅ pass (≥2 cumple) | <1s |

## Diagnostics

Para inspeccionar el output de este task en un contexto fresco:
- `grep -c "^## Bloque" .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` → debe retornar 4
- `grep "INCIERTO" .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` → lista las 4 incertidumbres activas
- `grep "VERIFICACIÓN PENDIENTE" .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` → 1 item: cita directa de Alberdi sobre Mayo
- `grep "PARÁFRASIS" .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` → 1 item: anécdota Belgrano/niño
- Si T02 integra las cards: `grep -c "card-nota-certeza" index.html` deberá retornar ≥4 (una por bloque con incertidumbre)

## Deviations

**Desviación 1 — Corrección de error histórico no contemplado:** El M007-CONTEXT afirmaba que el padre de Alberdi murió en 1824. Las fuentes externas consultadas lo contradicen consistentemente (Wikipedia EN: "1822"; múltiples fuentes: "a los once años"). El draft documenta esto explícitamente y alerta a T02. No es un desvío del plan — el plan pedía verificar fechas y clasificar incertidumbres; esto es exactamente lo que pasó.

**Desviación 2 — No se accedió a Mi vida privada directamente:** El plan pedía *Mi vida privada* como fuente primaria preferida. No hay acceso directo al texto en esta sesión. Las fuentes secundarias consultadas citan *Mi vida privada* (especialmente Wikipedia EN y el artículo académico de Martino, 2016 en Mitologías Hoy). Los datos son consistentes entre fuentes, lo que da confianza razonable. Items que requieren acceso primario están marcados con [VERIFICACIÓN PENDIENTE].

## Known Issues

1. **Cita directa de Alberdi sobre los límites de Mayo (Bloque 3):** No verificada. La card usa lectura historiográfica (Botana, 1984) con certeza `opinión`. Si T02 accede a *Fragmento preliminar* (1837) o *Escritos póstumos* t. XV, puede actualizar a cita directa.
2. **Nombres de los 2 hermanos sin identificar (Bloque 2):** Las fuentes consultadas solo nombran Felipe y Tránsita. Los otros dos hermanos quedan como [INCIERTO]. Mayer, *Alberdi y su tiempo* (EUDEBA, 1963) podría resolverlo — no fue accesible en esta sesión.
3. **Imagen del padre Salvador Alberdi:** No se verificó existencia en Wikimedia Commons. T02 debe buscar antes de asumir que existe.

## Files Created/Modified

- `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` — borrador completo con 4 bloques verificados: nacimiento (Bloque 1), hermanos y crianza (Bloque 2), posición ante Mayo (Bloque 3), doble orfandad (Bloque 4). Incluye Cita-HTML lista para copy-paste, fuentes ≥2 por bloque, [INCIERTO] flags, y alerta de error en el context doc sobre fecha de muerte del padre (1822, no 1824).
- `.gsd/milestones/M007/slices/S01/tasks/T01-PLAN.md` — añadida sección `## Observability Impact` (pre-flight gap resuelto).
- `.gsd/KNOWLEDGE.md` — entrada añadida: "Alberdi's Father Death Date: Context Error vs. Sources".
