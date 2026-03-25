---
id: T01
parent: S03
milestone: M007
provides:
  - S03-CONTENT-DRAFT.md con BIOG-9, BIOG-10, BIOG-11 y puente narrativo verificados
key_files:
  - .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md
key_decisions:
  - BIOG-10 usa card-hecho (no card-opinion) porque el vínculo Heredia–Alberdi está
    documentado directamente (recomendación para Córdoba, clases de latín en Wikipedia EN,
    oferta de habilitación por decreto, copla popular tucumana con nombre de Alberdi)
  - Puente narrativo usa cita del Fragmento preliminar: "Los pueblos, como los hombres, no
    tienen alas; hacen sus jornadas a pie, y paso a paso." — distinta de las dos ya en uso
  - Heredia gobernó de manera continua 1832–1838 (sin interrupción del mandato); reelecto
    25 de mayo de 1836
patterns_established:
  - Verificar URLs de imágenes de Commons antes de insertar en HTML (la imagen de Heredia
    existe en Commons pero la URL del thumb requiere confirmación en T02)
observability_surfaces:
  - grep -c "Heredia" .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md → debe ser ≥5
  - grep -c "^## BIOG" .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md → debe ser 3
  - grep "Fragmento preliminar" .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md | grep 1837 → ≥1 match
duration: ~90min
verification_result: passed
completed_at: 2026-03-20
blocker_discovered: false
---

# T01: Investigar y redactar borrador verificado para BIOG-9, BIOG-10 y BIOG-11

**Borrador S03-CONTENT-DRAFT.md producido con BIOG-9, BIOG-10, BIOG-11 verificados en ≥2 fuentes cada uno; Heredia documentado como hecho (no opinión); puente narrativo con cita distinta a las ya usadas en index.html.**

## What Happened

Se investigaron los tres bloques biográficos del período 1834–1837 usando búsquedas web en fuentes secundarias confiables (elhistoriador.com.ar, Wikipedia EN y ES, alfinal.com, institutojuanbautistaalberdi.net.ar, lagaceta.com.ar, hacer.org/pdf/fragmento.pdf, historiaybiografias.com, todo-argentina.net, revisionistas.com.ar).

**BIOG-9 — Regreso a Tucumán (1834):** Verificado con alta confianza. El regreso fue en 1834, tras pasar por Córdoba donde Alberdi obtuvo el grado de bachiller con recomendación de Heredia. La motivación incluye cuestiones sucesorias (documentado en La Gaceta de Tucumán, sep. 2024) y visita familiar. El hermano Felipe era ya colaborador cercano de Heredia. Certeza: `card-hecho` con una `card-nota-certeza` sobre las cuestiones sucesorias.

**BIOG-10 — Alejandro Heredia:** El vínculo con Alberdi resultó más documentado de lo que el plan anticipaba. Wikipedia EN confirma explícitamente que Heredia "taught Latin to his protege, Juan Bautista Alberdi"; historiaybiografias.com lo lista entre los jóvenes talentos protegidos por Heredia; la copla popular tucumana lo nombra junto a Alberdi. Dado esto, se decidió usar `card-hecho` (no `card-opinion` como sugería el plan inicial) con una `card-nota-certeza` solo sobre el calificativo de "mecenazgo". Hechos objetivos de Heredia: gobernador el 14 de enero de 1832, reelecto el 25 de mayo de 1836, asesinado el 12 de noviembre de 1838 en Los Lules. Gobierno continuo sin interrupción.

**BIOG-11 — Vuelta a Buenos Aires y Fragmento preliminar:** Regreso a fines de 1835 documentado en múltiples fuentes coincidentes. El *Fragmento preliminar* (1837): fue "lo que pensaba que sería su tesis doctoral" (ellibrototal.com) pero publicado como obra independiente antes de completar el doctorado formal — distinción documentada con `card-nota-certeza`. Editorial: Imprenta de la Libertad, Buenos Aires, 1837.

**Puente narrativo:** Se buscó una cita del *Fragmento preliminar* distinta de las dos ya en uso ("Una generación que empieza a vivir..." en línea ~676, y "Concebí el derecho como un fenómeno vivo..." en SP2-4). Se seleccionó "Los pueblos, como los hombres, no tienen alas; hacen sus jornadas a pie, y paso a paso" — verificada en el texto completo de hacer.org/pdf/fragmento.pdf. Comando de verificación para T02: `grep -n "paso a paso\|jornadas a pie" index.html` debe devolver 0 matches.

**Imagen de Heredia:** Existe un retrato en Wikimedia Commons (Archivo:Alejandro_Heredia.JPG). La URL del thumbnail requiere verificación en T02 antes de insertar.

## Verification

Todos los checks del task plan pasaron:

| # | Comando | Resultado | Veredicto |
|---|---------|-----------|-----------|
| V1 | `test -f .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` | archivo existe | ✅ pass |
| V2 | `grep -c "^## BIOG" S03-CONTENT-DRAFT.md` | 3 | ✅ pass (≥3) |
| V3 | `grep -c "Heredia" S03-CONTENT-DRAFT.md` | 43 | ✅ pass (≥5) |
| V4 | `grep "Fragmento preliminar" ... \| grep "1837"` | 3 matches | ✅ pass (≥1 con fecha) |

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## BIOG" .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` | 0 (output: 3) | ✅ pass | <1s |
| 3 | `grep -c "Heredia" .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` | 0 (output: 43) | ✅ pass | <1s |
| 4 | `grep "Fragmento preliminar" ... \| grep "1837"` | 0 (3 matches) | ✅ pass | <1s |

## Diagnostics

- El borrador S03-CONTENT-DRAFT.md es la superficie de inspección principal para este task.
- Para verificar integridad del borrador: `grep -c "^## BIOG" S03-CONTENT-DRAFT.md` → 3; `grep -c "Heredia" S03-CONTENT-DRAFT.md` → 43.
- Para verificar que la cita del puente no está duplicada en index.html: `grep -n "paso a paso\|jornadas a pie" index.html` → debe devolver 0 matches antes de T02.
- Imagen de Heredia: `https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Alejandro_Heredia.JPG/400px-Alejandro_Heredia.JPG` — verificar en T02 que resuelve.

## Deviations

1. **BIOG-10: `card-hecho` en lugar de `card-opinion`** — el plan sugería `card-opinion` para el vínculo personal Heredia–Alberdi. La investigación encontró evidencia directa suficiente (Wikipedia EN con cita explícita a fuentes biográficas, historiaybiografias.com, copla popular con nombre de Alberdi) para justificar `card-hecho` con `card-nota-certeza`. Esto no es un desvío problemático — es una mejora de certeza basada en evidencia.

2. **Cita "paso a paso" verificada** — el plan decía "encontrar una cita diferente para el blockquote de cierre". La cita seleccionada ("Los pueblos, como los hombres, no tienen alas; hacen sus jornadas a pie, y paso a paso") está verificada en el texto completo del *Fragmento preliminar* en hacer.org/pdf/fragmento.pdf y es distinta de las dos ya en uso en el sitio.

## Known Issues

- La URL exacta del thumbnail de la imagen de Heredia en Commons (`https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Alejandro_Heredia.JPG/400px-Alejandro_Heredia.JPG`) no fue verificada haciendo una petición HTTP. T02 debe confirmar que resuelve antes de insertar la imagen. Si falla, omitir imagen para BIOG-10.
- La distinción "tesis/obra independiente" para el *Fragmento preliminar* queda como `card-nota-certeza` — no resuelta como hecho absoluto, pero documentada y manejada.

## Files Created/Modified

- `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` — borrador con BIOG-9, BIOG-10, BIOG-11 y puente narrativo; fuentes citadas; certezas justificadas; HTML excerpts listos para T02
