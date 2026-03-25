# S05 — Research: El encuentro entre Alberdi y Facundo Quiroga — la carta

**Date:** 2026-03-21
**Milestone:** M007
**Slice:** S05

## Summary

S05 narra el encuentro entre Alberdi y Juan Facundo Quiroga en Buenos Aires (oct–nov 1834), mediado por una carta de recomendación del gobernador Alejandro Heredia. El episodio es **bien documentado**: Alberdi lo relata en sus *Obras Completas* en primera persona, y múltiples fuentes académicas y biográficas lo reproducen de manera consistente. La carta la portó Alberdi físicamente hasta Quiroga; Quiroga leyó el texto, entabló conversación con el joven tucumano, le ofreció financiarle un viaje a EE.UU., y Alberdi finalmente devolvió el cheque/orden contra el Banco sin utilizarlo. El episodio ocurre apenas meses antes del asesinato de Quiroga en Barranca Yaco (16 febrero 1835).

La narrativa del encuentro tiene tres elementos distintos que S05 debe cubrir: (1) **la carta en sí** — quién la escribió, para quién, qué contenía; (2) **el encuentro físico** — fecha, lugar, contexto en Buenos Aires; (3) **las conversaciones** — el tono, el ofrecimiento del viaje, y la devolución del dinero por parte de Alberdi. S06, S07 y S08 abordarán respectivamente: el perfil de Quiroga y su entorno, por qué Alberdi rechazó el viaje, y qué textos de Alberdi había leído Quiroga.

S05 produce **2 cards**: BIOG-17 (la carta y el encuentro — card-hecho) y BIOG-18 (las conversaciones y el ofrecimiento — card-hecho con card-nota-certeza sobre los motivos del rechazo, que se desarrollan en S07). Ambas se insertan como nuevo sub-período `#rev-alberdi-quiroga` dentro de `#periodo-revolucion`, con su propio link en el sub-nav.

## Recommendation

**Abrir un nuevo sub-período** `<div id="rev-alberdi-quiroga">` con título "Alberdi y Facundo Quiroga (1834–1835)", insertado inmediatamente DESPUÉS del cierre de `#rev-alberdi-formacion` (línea 729) y ANTES del sub-período `#rev-1800-1820` (línea 735). Esto preserva el flujo cronológico (S05 ocurre en 1834–1835, que es contemporáneo a los sub-períodos SP1–SP2 existentes), añade un link al sub-nav, y mantiene la estructura de sub-períodos ya establecida.

**No insertar dentro de `#rev-alberdi-formacion`**: ese sub-período ya está cerrado narrativamente con el puente "Los pueblos, como los hombres, no tienen alas..." y S04 completó su arco temático. Forzar el encuentro con Quiroga dentro del mismo sub-período mezclaría la narración biográfica de formación con un episodio de acción política.

**Usar card-hecho para ambas cards**: la fuente primaria (Alberdi, *Obras Completas*) es directa y clara. La certeza es alta. Solo el contenido exacto de la carta de Heredia (que Alberdi portó) y el texto leído por Quiroga merecen card-nota-certeza, ya que Alberdi describe el efecto pero no el contenido literal.

## Implementation Landscape

### Key Files

- `index.html` — único archivo a modificar. Inserción DESPUÉS de la línea 729 (`</div><!-- /#rev-alberdi-formacion -->`), ANTES de la línea 735 (`<div id="rev-1800-1820"`). También requiere añadir un nuevo link en el sub-nav (línea 327–331).
- `.gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` — borrador a crear en T01 con los hechos verificados.

### Card Inventory (S05)

**BIOG-17 — "La carta de Heredia y el encuentro con Facundo Quiroga"** (`card-hecho`)
- **Fecha:** octubre–noviembre de 1834, Buenos Aires
- **Hechos verificados (≥3 fuentes concordantes):**
  - Felipe Alberdi (hermano de Juan Bautista) era colaborador cercano de Heredia y solicitó la carta de recomendación a su nombre
  - Heredia dio a Alberdi una carta de presentación para Quiroga, amigo suyo y aliado federal
  - Alberdi se dirigió a la dirección indicada en Buenos Aires y entregó la carta a Quiroga
  - Quiroga la leyó y "acogió [a Alberdi] con mucha gracia"
- **Fuente primaria:** Alberdi, *Obras Completas*, La Tribuna Nacional, Buenos Aires, 1886–1887 (relato autobiográfico del episodio)
- **Fuentes secundarias:** elhistoriador.com.ar; jursoc.unlp.edu.ar (PDF); nuestrosgrandes.com.ar; lv12.com.ar; revisionistas.com.ar; elbibliote.com — todos concordantes
- **card-nota-certeza:** El contenido exacto de la carta de Heredia no está reproducido en las fuentes consultadas — solo sus efectos (Quiroga la recibió favorablemente)
- **Imagen:** usar el retrato de Quiroga ya cargado en el sitio (`Facundo_Quiroga_por_García_del_Molino.jpg`, línea 904) — NO duplicar URL; si la card está en un sub-período distinto, puede reusarse
- **Stagger:** 0ms (primera card del sub-período)

**BIOG-18 — "Las conversaciones con el Tigre de los Llanos"** (`card-hecho`)
- **Hechos verificados:**
  - Alberdi visitó a Quiroga "con repetición" y "muchas veces se entretuvo en largas conversaciones"
  - Las conversaciones eran "ajenas del todo a la política"
  - Alberdi describe a Quiroga como "ese hombre extraordinario" — fascinación intelectual sin acuerdo político
  - Quiroga le dijo que le convendría estudiar en EE.UU. más que en Buenos Aires y se ofreció a pagar todos los gastos
  - Alberdi "se entusiasmó con la idea" inicialmente
  - Al día siguiente, Alberdi devolvió la "orden contra el Banco" (libranza/cheque), renunciando al proyecto de viaje
- **Cita directa verificada** (Alberdi, *Obras Completas*): «El general Quiroga me acogió con mucha gracia. Lo visité con repetición y muchas veces se entretuvo en largas conversaciones conmigo, ajenas del todo a la política. Yo no me cansaba en estudiar, de paso, a ese hombre extraordinario.»
- **Segunda cita directa:** «Al día siguiente le hice una visita respetuosa, en que tuve el gusto de restituirle su orden contra el Banco, renunciando al proyecto de viaje para los Estados Unidos.»
- **card-nota-certeza:** Los motivos del rechazo no están detallados en *Mi vida privada* ni en *Obras Completas* en el pasaje conocido — se desarrollan en S07
- **Stagger:** 80ms

### Sub-Nav Addition

Añadir al `<nav class="sub-nav">` (entre líneas 326–332):
```html
<a href="#rev-alberdi-quiroga" class="sub-nav__link">1834–1835<span class="sub-nav__link-label">Alberdi y Quiroga</span></a>
```
Posición sugerida: después del link de `#rev-alberdi-formacion` (línea 327), antes del link de `#rev-1800-1820` (línea 328). Esto pasará el SubNav de 5 a 6 sub-períodos.

### Sub-Período HTML Structure

```html
<!-- ══════════════════════════════════════════════════
     SUB-PERÍODO ALBERDI-QUIROGA: El encuentro con Facundo (1834–1835)
     2 eventos — ambos hecho
     ══════════════════════════════════════════════════ -->
<div id="rev-alberdi-quiroga" class="sub-period reveal reveal-fade">
  <h3 class="sub-period__title">Alberdi y Facundo Quiroga (1834–1835)</h3>
  <div class="events-grid events-grid--certeza" aria-label="El encuentro entre Alberdi y Facundo Quiroga">
    <!-- BIOG-17 -->
    <!-- BIOG-18 -->
  </div>
</div>
```

### Build Order

1. **T01 — Redactar S05-CONTENT-DRAFT.md** con BIOG-17 y BIOG-18 verificados, citas directas exactas, fuentes, y nota de certeza. Este es el paso de alta incertidumbre (aunque la evidencia es sólida, las citas exactas en español del original necesitan transcripción fiel).

2. **T02 — Integración HTML (CRLF-safe)**:
   - Pre-flight check: `grep -c 'BIOG-17\|BIOG-18\|rev-alberdi-quiroga' index.html` → debe ser 0
   - Escribir HTML a temp file (Write tool, no heredoc)
   - Insertar sub-nav link (1 línea) y sub-período completo (Node.js CRLF-safe splice)
   - Verificar: `grep -c 'data-certeza' index.html` → ≥52 (50 baseline + 2 nuevas)
   - Verificar: `grep -c 'rev-alberdi-quiroga' index.html` → ≥2 (sub-nav + sub-period div)

3. **T03 — Triple gate**:
   - Capa 1 (shell): data-certeza ≥52, BIOG-17/18 presentes, sub-nav link presente, keywords (Quiroga, carta, Heredia, 1834, Buenos Aires) todos presentes
   - Capa 2 (browser DOM): reveal count ≥72, SubNav 6/6 sub-períodos, #rev-alberdi-quiroga visible y funcional
   - Capa 3 (coherencia narrativa): BIOG-17/18 no contradicen BIOG-9/10 (Tucumán/Heredia); no duplican contenido de SP2-2 (unitarios vs federales, que ya menciona a Quiroga)

### Verification Approach

```bash
# Shell checks
grep -c 'data-certeza' index.html        # → ≥52
grep -c 'BIOG-1[78]' index.html          # → 2
grep -c 'rev-alberdi-quiroga' index.html # → ≥2 (sub-nav + div id)
grep -q 'octubre.*1834\|1834.*octubre\|octubre.*noviembre.*1834' index.html && echo OK
grep -q 'Heredia\|carta.*recomendación' index.html && echo OK

# Browser DOM
# document.querySelectorAll('.reveal').length  → ≥72
# document.querySelectorAll('.sub-nav .sub-nav__link').length → 6
# document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length → 2
```

## Common Pitfalls

- **SP2-2 ya menciona a Quiroga** (línea 904) con su imagen y como símbolo del federalismo. BIOG-17/18 son narrativa personal (el encuentro con Alberdi), no un perfil de Quiroga — no hay superposición temática real. Pero el planner debe verificar que la imagen de Quiroga en BIOG-17 no sea la misma URL repetida en la misma pantalla (puede serlo — están en sub-períodos distintos, no en la misma grilla).
- **Sub-nav count cambia de 5 a 6** — actualizar la verificación DOM en T03 para buscar 6 links (no 5, que era el invariante anterior a S05).
- **Las citas directas de Alberdi** provienen de *Obras Completas* (La Tribuna Nacional, 1886–1887), no de *Mi vida privada* — aunque el contenido autobiográfico es similar. La fuente correcta es *Obras Completas* para las citas del encuentro con Quiroga.
- **El contenido de la carta de Heredia**: múltiples fuentes dicen que Alberdi "entregó la carta" — pero ninguna reproduce el texto de esa carta. No inventar contenido. card-nota-certeza es obligatoria aquí.
- **La "orden contra el Banco"**: es una libranza bancaria (cheque/giro), no una carta adicional. Nombrarla correctamente en la card.
- **CRLF-safe splice**: el archivo index.html usa CRLF. Usar el patrón Node.js documentado en KNOWLEDGE.md (split en `\r\n`, rejoin con `\r\n`). Nunca heredoc.

## Open Risks

- El texto exacto en español de las citas de Alberdi sobre el encuentro con Quiroga proviene de los *Obras Completas* (1886–1887) que citan revisionistas.com.ar y elbibliote.com. No se pudo verificar la paginación exacta en un facsimile digital. Las citas son reproducidas de manera idéntica en ≥3 fuentes independientes — suficiente para card-hecho, pero sin número de página citado. La cite de la card puede decir: Alberdi, J. B., *Obras Completas*, t. I (o III), La Tribuna Nacional, Buenos Aires, 1886.
- Aclarar qué tomo de las *Obras Completas* contiene este relato: probablemente t. I o el que contiene los escritos autobiográficos. Las citas contextuales en las fuentes secundarias no especifican el tomo.

## Key Facts Established (for T01 use)

| Hecho | Certeza | Fuente primaria |
|-------|---------|-----------------|
| Felipe Alberdi pidió carta de recomendación a Heredia para su hermano | hecho | Múltiples secundarias concordantes |
| Alberdi viajó a BA en 1834 y entregó la carta a Quiroga | hecho | Obras Completas (cit. por ≥3 fuentes) |
| Fecha: octubre–noviembre de 1834 | hecho | revisionistas.com.ar, elbibliote.com |
| Quiroga vivía en BA desde dic. 1833 hasta enero 1835 | hecho | revisionistas.com.ar, elbibliote.com |
| Quiroga "acogió a Alberdi con mucha gracia" | hecho (cita directa) | Alberdi, Obras Completas |
| Alberdi lo visitó "con repetición", conversaciones ajenas a la política | hecho (cita directa) | Alberdi, Obras Completas |
| Alberdi describió a Quiroga como "ese hombre extraordinario" | hecho (cita directa) | Alberdi, Obras Completas |
| Quiroga ofreció pagar viaje de estudios a EE.UU. | hecho | Alberdi, Obras Completas; ≥4 fuentes |
| Alberdi devolvió la "orden contra el Banco" al día siguiente | hecho (cita directa) | Alberdi, Obras Completas |
| Quiroga partió a su misión mediadora en enero 1835 | hecho | Múltiples fuentes |
| Quiroga fue asesinado en Barranca Yaco, 16 febrero 1835 | hecho | Múltiples fuentes |

## Baseline Metrics (post-S04, pre-S05)

- `grep -c 'data-certeza' index.html` → 50
- `document.querySelectorAll('.reveal').length` → 70
- `document.querySelectorAll('.sub-nav .sub-nav__link').length` → 5
- Sub-nav links: `#rev-alberdi-formacion`, `#rev-1800-1820`, `#rev-1820-1835`, `#rev-1835-1852`, `#rev-1852-1860`

## Post-S05 Expected Metrics

- `grep -c 'data-certeza' index.html` → 52
- `document.querySelectorAll('.reveal').length` → 73 (1 sub-period div + 2 cards)
- `document.querySelectorAll('.sub-nav .sub-nav__link').length` → 6
- `grep -c 'BIOG-1[78]' index.html` → 2

## Sources

- Alberdi, J. B., *Obras Completas*, La Tribuna Nacional, Buenos Aires, 1886–1887 (cita directa del encuentro con Quiroga — reproducida en ≥3 fuentes independientes)
- elhistoriador.com.ar — episodio Felipe/Heredia/carta/ofrecimiento EE.UU.
- jursoc.unlp.edu.ar (PDF académico) — misma secuencia de hechos
- revisionistas.com.ar — cronología de Quiroga en BA (dic. 1833–ene. 1835) y fecha oct–nov 1834
- elbibliote.com — citas directas de Alberdi sobre el encuentro
- nuestrosgrandes.com.ar, lv12.com.ar — confirmación independiente
