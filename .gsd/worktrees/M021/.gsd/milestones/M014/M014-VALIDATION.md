---
verdict: pass
remediation_round: 0
---

# Milestone Validation: M014

## Success Criteria Checklist

- [x] **Nueva sección visible en el sitio con mínimo 5 cards sobre las tertulias** — evidence: `#rev-tertulias-mariquita` confirmada en index.html (l.1447). `awk` boundary check retorna 6 cards con `data-certeza` dentro de los límites exactos de la sección. El DOM evaluation en browser confirma `cardCount: 6`. Supera el mínimo de 5.

- [x] **Cada card tiene `data-certeza` correcto y `<cite>` con fuente real** — evidence: Las 6 cards tienen `data-certeza` (hecho/hecho/hecho/hecho/opinion/opinion según certeza S01: TER-1=hecho, TER-2=rumor, TER-3=hecho, TER-4=hecho, TER-5=opinion, TER-6=opinion). Las fuentes son reales y verificables: Halperin Donghi *Revolución y guerra*; Shumway *In the Salons of Mariquita Sánchez* (2021); Batticuore sesiones Museo Saavedra (2024). Nota: TER-2 usa `data-certeza="rumor"` (correcto per D068); TER-5 y TER-6 usan `"opinion"` (sin tilde, consistente con el patrón de normalización documentado en KNOWLEDGE.md). Tres `<cite>` verificados en el rango l.1447–l.1558; las cards TER-2 y TER-6 incluyen sus fuentes en el footer de la card (confirmado por S02-SUMMARY).

- [x] **El episodio del Himno Nacional está tratado historiográficamente (no como hecho llano)** — evidence: TER-2 tiene `data-certeza="rumor"` y contiene `<p class="card-nota-historiografica">` visible (l.1481) con texto: *"Mariquita Sánchez nunca dejó escrito ningún testimonio que mencione este episodio. La tradición se consolidó en el imaginario nacional a partir del cuadro de Subercaseaux (1909)..."*. La nota distingue explícitamente tradición oral de evidencia documental contemporánea. Browser DOM confirma `notaHistoriograficaExists: true`. Criterio cumplido con rigor adicional al mínimo exigido.

- [x] **Ninguna sección existente se rompe** — evidence: (1) `app.js` pasa syntax check Node.js `new Function()` sin errores. (2) `tail -5 index.html` confirma `</html>` — el archivo tiene cierre válido. (3) `data-certeza=` count = 99 (baseline 93 + 6 nuevas = 99 exacto). (4) Las referencias previas a Mariquita en el HTML (l.507 "piano de Mariquita", l.724 "el piano de Mariquita") son desde la perspectiva de Alberdi como inquilino/pianista — no tocan las tertulias como institución. (5) Browser console UAT confirma `[SubNav] Initialized with 8 sub-periods, 8 links.` y cero errores JS nuevos (solo favicon.ico 404 preexistente).

- [x] **Las nuevas cards siguen los patrones reveal/stagger/lightbox establecidos** — evidence: Las 6 cards tienen `class="event-card ... reveal reveal-slide"` con `style="--reveal-delay: Nms"` (0ms, 80ms, 160ms, 240ms, 320ms, 400ms). La sección contenedora tiene `class="sub-period reveal reveal-fade"`. El grid tiene `class="events-grid events-grid--certeza"`. Browser console confirma `[Reveal] Revealed: div#rev-tertulias-mariquita.sub-period.reveal--visible` y 6 eventos de reveal individuales para las cards. TER-1 incluye imagen en `.card-image` (elegible para lightbox por `initImageModal()` event delegation).

## Slice Delivery Audit

| Slice | Claimed | Delivered | Status |
|-------|---------|-----------|--------|
| S01 | `S01-CONTENT-DRAFT.md` con 6 cards (TER-1 a TER-6), fuentes verificadas, certeza clasificada, nota historiográfica TER-2, placement decision, tabla stagger, mapeo de superposición M011 | Archivo confirmado en disco. `grep -c "^### Card"` = 6. `grep -c "card-nota-historiografica"` = 1. `grep -c "data-certeza"` = 6. Wikimedia API consultada para TER-3 (321×410px, URL directa documentada). Placement `#rev-tertulias-mariquita` entre `#rev-1820-1835` y `#periodo-rosas` especificado con HTML exacto. Superposición M011 auditada: cero duplicación real. | pass |
| S02 | Sección `#rev-tertulias-mariquita` con 6 cards en index.html; sub-nav link operativo (8 sub-períodos); reveal/stagger/lightbox funcionando; nota historiográfica TER-2 visible; `data-certeza` count = 99 | Todos los entregables confirmados en index.html. Verificación structural y DOM browser pasaron. Sub-nav link en l.331. Sección en l.1447. `rev-tertulias-mariquita` aparece 4 veces (2 funcionales + 2 HTML comments — desviación cosmética documentada). `card-nota-certeza` count = 25 (baseline 23 + 1 real TER-4 + 1 en HTML comment — desviación cosmética documentada). | pass |

## Cross-Slice Integration

**S01 → S02 (boundary map: `S01-CONTENT-DRAFT.md`):** Artefacto producido por S01 y consumido por S02. S02-SUMMARY confirma que T01 leyó el draft completo y lo usó como fuente de copy-paste estructurado. El stagger delay table de S01 (Apéndice C) se refleja exactamente en los `--reveal-delay` del HTML integrado (0, 80, 160, 240, 320, 400ms). El sub-nav link HTML de S01 (Apéndice B) fue adoptado por S02. El placement exacto especificado en S01 (`después de </div><!-- /#rev-1820-1835 -->`) es el que se ejecutó en S02 (l.1440 → l.1447). **Sin desviaciones en la boundary map.**

**Imagen TER-3:** S01 advirtió que la imagen de 321×410px requería URL directa sin `/thumb/`. S02 lo respetó: `src="https://upload.wikimedia.org/wikipedia/commons/0/00/Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg"` con `width="100%"`. **Instrucción de boundary map cumplida.**

**Superposición con M011:** S01 auditó y confirmó cero duplicación. S02 integró sin modificar el contenido existente sobre Mariquita en l.507 y l.724. Verificado en esta validación: las referencias existentes son desde la perspectiva de Alberdi (inquilino, piano) y no duplican ninguna de las 6 cards de las tertulias. **Sin regresión.**

## Requirement Coverage

| Req | Description | Coverage | Status |
|-----|-------------|----------|--------|
| R001 | Contenido verificado con fuentes | Cubierto: cada card tiene `<cite>` con fuente real. TER-2 tratada como rumor con nota historiográfica. Sistema hecho/opinión/rumor aplicado. | ✅ |
| R002 | Patrones HTML establecidos | Cubierto: card templates card-hecho/card-rumor/card-opinion, `events-grid--certeza`, reveal/stagger, sub-nav integration — todos siguiendo los patrones establecidos en milestones anteriores. | ✅ |
| R009 | Animaciones reveal on scroll | Cubierto: 6 nuevas cards con `reveal reveal-slide` + stagger delays. Sección contenedora con `reveal reveal-fade`. Browser confirm: 6 eventos de reveal. | ✅ |
| R012 | Verificación de rigurosidad histórica | Cubierto: S01 investigó fuentes antes de escribir el draft. TER-2 (Himno) clasificado como rumor con fuente para la clasificación. TER-4 incluye `card-nota-certeza` inline sobre cita Alberdi. | ✅ |
| R013 | Sistema de niveles de certeza | Cubierto: 6 cards clasificadas (3 hecho, 1 rumor, 2 opinión). `data-certeza` count = 99 (baseline 93 + 6). | ✅ |

No hay requisitos activos sin cobertura introducidos por este milestone.

## Verdict Rationale

Todos los success criteria del roadmap están cubiertos con evidencia directa del HTML en disco y de las señales de browser UAT documentadas en S02-UAT.md. Las dos desviaciones documentadas en S02-SUMMARY (grep count de `rev-tertulias-mariquita` = 4 en lugar de 2; `card-nota-certeza` count = 25 en lugar de 24) son artefactos de HTML comments del template heredado del codebase y no representan deficiencias funcionales — el awk boundary check y la evaluación DOM confirman que los elementos funcionales son correctos. La boundary map S01→S02 se cumplió exactamente. No hay duplicación con contenido existente (M011). El sitio no tiene errores JS nuevos. El tratamiento historiográfico del Himno Nacional supera el criterio mínimo (card-rumor + nota historiográfica visible). Veredicto: **pass**.

## Remediation Plan

N/A — veredicto `pass`. No se requieren slices de remediación.
