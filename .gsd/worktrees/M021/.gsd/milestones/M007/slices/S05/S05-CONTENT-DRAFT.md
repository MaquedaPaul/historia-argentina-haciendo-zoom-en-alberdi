# S05-CONTENT-DRAFT: El encuentro entre Alberdi y Facundo Quiroga — la carta
## Borrador verificado — 2 cards (BIOG-17 y BIOG-18)

**Preparado en:** T01 — Redactar S05-CONTENT-DRAFT.md con BIOG-17 y BIOG-18 verificados
**Slice:** S05 — El encuentro entre Alberdi y Facundo Quiroga — la carta
**Milestone:** M007
**Pre-flight check:** `grep -c 'BIOG-1[78]\|rev-alberdi-quiroga' index.html` → 0 (verificar antes de T02)
**Baselines post-S04:** 50 `data-certeza`, 70 reveal elements, 5 sub-nav links

---

## Fuente primaria de las citas directas

Todas las citas directas en BIOG-17 y BIOG-18 provienen de:

> Alberdi, Juan Bautista. *Obras Completas*, La Tribuna Nacional, Buenos Aires, 1886–1887.

El pasaje autobiográfico del encuentro con Quiroga es reproducido de manera idéntica en ≥3 fuentes independientes: elbibliote.com, revisionistas.com.ar, y la síntesis de JURSOC UNLP. La paginación exacta del tomo de *Obras Completas* no está disponible en ninguna de las fuentes consultadas — la cita se atribuye a la obra en su conjunto.

---

## BIOG-17: La carta de Heredia y el encuentro con Facundo Quiroga

**Card ID:** BIOG-17
**Certeza:** `card-hecho` (`data-certeza="hecho"`)
**Año display:** 1834
**Título sugerido:** La carta de Heredia: cómo Alberdi conoció a Facundo Quiroga
**Stagger delay:** 0ms (primera card del sub-período, `--reveal-delay: 0ms`)

### Excerpt HTML (listo para insertar en `<p>` tags)

```html
<p>
  En octubre o noviembre de 1834, el joven Juan Bautista Alberdi — entonces estudiante de
  derecho en Buenos Aires — se presentó en casa de Juan Facundo Quiroga portando una carta
  de recomendación firmada por el gobernador de Tucumán, Alejandro Heredia. La carta la había
  solicitado Felipe Alberdi, hermano de Juan Bautista y colaborador cercano de Heredia en Tucumán;
  Heredia la escribió para su amigo y aliado federal Quiroga, que residía en Buenos Aires desde
  diciembre de 1833.
</p>
<p>
  Quiroga recibió la carta, la leyó, y —según el propio Alberdi— lo acogió de inmediato:
</p>
<blockquote>
  <p>«El general Quiroga me acogió con mucha gracia.»</p>
  <cite>Alberdi, J. B., <em>Obras Completas</em>, La Tribuna Nacional, Buenos Aires, 1886–1887.</cite>
</blockquote>
<p>
  Era la primera vez que Alberdi, de 24 años, entraba en contacto directo con uno de los
  caudillos más temidos y más influyentes de la Argentina rosista. El encuentro abriría
  una serie de visitas que marcarían su vida intelectual.
</p>
```

### Cita directa verificada

- «El general Quiroga me acogió con mucha gracia.»
  — Alberdi, J. B., *Obras Completas*, La Tribuna Nacional, Buenos Aires, 1886–1887.
  — Reproducida en: elbibliote.com; revisionistas.com.ar; JURSOC UNLP (PDF biográfico). (≥3 fuentes independientes ✅)

### Fuentes (≥2 requeridas — se citan 5)

1. Alberdi, J. B., *Obras Completas*, La Tribuna Nacional, Buenos Aires, 1886–1887 (fuente primaria — cita directa del encuentro)
2. elhistoriador.com.ar — episodio de Felipe Alberdi / Heredia / carta de recomendación
3. JURSOC UNLP, "Juan Bautista Alberdi" (PDF biográfico académico) — secuencia completa del episodio
4. revisionistas.com.ar — cronología de Quiroga en Buenos Aires (dic. 1833–ene. 1835) y fecha del encuentro (oct–nov 1834)
5. elbibliote.com — citas directas de Alberdi sobre el episodio

### Cite display (footer de la card)

```
Alberdi, J. B., Obras Completas, La Tribuna Nacional, Buenos Aires, 1886–1887; elhistoriador.com.ar; JURSOC UNLP.
```

### Notas de imagen

- **URL exacta:** `https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg/500px-Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg`
- **Atribución:** García del Molino, ca. 1840. Dominio público.
- **Alt text sugerido:** `Retrato de Juan Facundo Quiroga, por García del Molino, ca. 1840`
- **Nota de duplicación:** La misma URL ya está cargada en SP2-2 (línea ~904 del index.html, contexto: Quiroga como símbolo del federalismo). Son sub-períodos distintos — la URL puede reutilizarse sin problema técnico. Verificar visualmente que no coincidan en la misma pantalla.

### card-nota-certeza

```
Nota: el contenido literal de la carta que Alejandro Heredia escribió para Quiroga no está
reproducido en ninguna de las fuentes consultadas. Las fuentes documentan que Alberdi entregó
la carta y que Quiroga lo recibió favorablemente, pero el texto de la carta en sí permanece
desconocido.
```

---

## BIOG-18: Las conversaciones con el Tigre de los Llanos

**Card ID:** BIOG-18
**Certeza:** `card-hecho` (`data-certeza="hecho"`)
**Año display:** 1834–1835
**Título sugerido:** "Ese hombre extraordinario": las conversaciones de Alberdi con Quiroga
**Stagger delay:** 80ms (`--reveal-delay: 80ms`)

### Excerpt HTML (listo para insertar en `<p>` tags)

```html
<p>
  Tras ese primer encuentro, Alberdi volvió a ver a Quiroga con frecuencia. Lo describe en
  sus <em>Obras Completas</em> con una mezcla de fascinación intelectual y distancia política:
</p>
<blockquote>
  <p>«Lo visité con repetición y muchas veces se entretuvo en largas conversaciones conmigo,
  ajenas del todo a la política. Yo no me cansaba en estudiar, de paso, a ese hombre
  extraordinario.»</p>
  <cite>Alberdi, J. B., <em>Obras Completas</em>, La Tribuna Nacional, Buenos Aires, 1886–1887.</cite>
</blockquote>
<p>
  En el transcurso de esas conversaciones, Quiroga hizo a Alberdi una propuesta inesperada:
  costearle un viaje de estudios a los Estados Unidos, convencido de que sería más formativo
  que permanecer en Buenos Aires. Alberdi se entusiasmó con la idea — hasta el día siguiente.
  Quiroga le entregó una libranza bancaria (una orden contra el Banco) para cubrir los gastos.
  Pero Alberdi la devolvió:
</p>
<blockquote>
  <p>«Al día siguiente le hice una visita respetuosa, en que tuve el gusto de restituirle su
  orden contra el Banco, renunciando al proyecto de viaje para los Estados Unidos.»</p>
  <cite>Alberdi, J. B., <em>Obras Completas</em>, La Tribuna Nacional, Buenos Aires, 1886–1887.</cite>
</blockquote>
<p>
  Las razones del rechazo no están detalladas en el pasaje de <em>Obras Completas</em> —
  se desarrollan en una sección posterior de este sitio. Lo que sí registra Alberdi es el
  gesto: devolver el dinero fue un acto de independencia intelectual frente al hombre más
  poderoso que había conocido. Quiroga partiría en enero de 1835 hacia el interior en misión
  mediadora. Sería asesinado en Barranca Yaco el 16 de febrero de ese año.
</p>
```

### Citas directas verificadas

1. «Lo visité con repetición y muchas veces se entretuvo en largas conversaciones conmigo, ajenas del todo a la política. Yo no me cansaba en estudiar, de paso, a ese hombre extraordinario.»
   — Alberdi, J. B., *Obras Completas*, La Tribuna Nacional, Buenos Aires, 1886–1887.
   — Reproducida en: elbibliote.com; revisionistas.com.ar; JURSOC UNLP (PDF). (≥3 fuentes ✅)

2. «Al día siguiente le hice una visita respetuosa, en que tuve el gusto de restituirle su orden contra el Banco, renunciando al proyecto de viaje para los Estados Unidos.»
   — Alberdi, J. B., *Obras Completas*, La Tribuna Nacional, Buenos Aires, 1886–1887.
   — Reproducida en: elbibliote.com; revisionistas.com.ar; elhistoriador.com.ar. (≥3 fuentes ✅)

### Fuentes (≥2 requeridas — se citan 5)

1. Alberdi, J. B., *Obras Completas*, La Tribuna Nacional, Buenos Aires, 1886–1887 (fuente primaria — ambas citas directas)
2. elhistoriador.com.ar — episodio completo incluyendo el ofrecimiento del viaje y la devolución
3. revisionistas.com.ar — citas directas de Alberdi y cronología de Quiroga (partida ene. 1835; muerte 16 feb. 1835)
4. elbibliote.com — citas directas de Alberdi sobre las conversaciones y la devolución
5. JURSOC UNLP, "Juan Bautista Alberdi" (PDF biográfico académico) — secuencia narrativa completa

### Cite display (footer de la card)

```
Alberdi, J. B., Obras Completas, La Tribuna Nacional, Buenos Aires, 1886–1887; elhistoriador.com.ar; revisionistas.com.ar.
```

### Notas de imagen

Sin imagen en BIOG-18 — la imagen de Quiroga ya está asignada a BIOG-17. No duplicar.

### card-nota-certeza (exactamente 2 — requeridas)

**Nota 1 — motivos del rechazo:**
```
Nota: los motivos por los que Alberdi devolvió la libranza bancaria y renunció al viaje a los
Estados Unidos no están detallados en el pasaje de Obras Completas que narra este episodio.
El análisis de esa decisión se desarrolla en una sección posterior de este sitio.
```

**Nota 2 — contexto de la muerte de Quiroga:**
```
Nota: Juan Facundo Quiroga partió hacia el interior en misión mediadora en enero de 1835 y
fue asesinado en Barranca Yaco (Córdoba) el 16 de febrero de 1835. El encuentro con Alberdi
ocurrió apenas dos o tres meses antes. Sarmiento lo inmortalizó ese mismo año en Facundo
(1845), diez años después de su muerte.
```

---

## Notas de integración para T02

### Estructura del sub-período HTML

```html
<!-- ══════════════════════════════════════════════════
     SUB-PERÍODO ALBERDI-QUIROGA: El encuentro con Facundo (1834–1835)
     2 eventos — ambos hecho
     ══════════════════════════════════════════════════ -->
<div id="rev-alberdi-quiroga" class="sub-period reveal reveal-fade">
  <h3 class="sub-period__title">Alberdi y Facundo Quiroga (1834–1835)</h3>
  <div class="events-grid events-grid--certeza" aria-label="El encuentro entre Alberdi y Facundo Quiroga">
    <!-- BIOG-17: La carta de Heredia y el encuentro con Facundo Quiroga -->
    <!-- BIOG-18: Las conversaciones con el Tigre de los Llanos -->
  </div>
</div><!-- /#rev-alberdi-quiroga -->
```

### Sub-nav link

```html
<a href="#rev-alberdi-quiroga" class="sub-nav__link">1834–1835<span class="sub-nav__link-label">Alberdi y Quiroga</span></a>
```

**Posición:** DESPUÉS del link de `#rev-alberdi-formacion`, ANTES del link de `#rev-1800-1820`.

### Anchor de inserción del sub-período

Insertar el bloque del sub-período DESPUÉS de la línea que contiene `</div><!-- /#rev-alberdi-formacion -->` y ANTES de la línea que contiene `<div id="rev-1800-1820"`. Verificar con `grep -n 'rev-alberdi-formacion' index.html` antes de insertar.

### Conteos esperados post-T02

- `data-certeza`: 50 + 2 = **52**
- reveal elements: 70 + 1 (sub-period div) + 2 (cards) = **73**
- sub-nav links: 5 + 1 = **6**
- `BIOG-1[78]` en index.html: **2**

### Verificación de citas alberdi-quote no duplicadas

Las 6 citas alberdi-quote ya en uso (post-S04):

| # | Cita (inicio) | Línea aprox. |
|---|--------------|--------------|
| 1 | "Los pueblos, como los hombres, no tienen alas…" | 724 |
| 2 | "Una generación que empieza a vivir..." | ~885 |
| 3 | "El destierro es una escuela cruel..." | ~885 |
| 4 | "El pueblo que ha combatido veinte años..." | ~1055 |
| 5 | "Gobernar es poblar" | ~775 |
| 6 | "Gobernar es poblar — y también..." | ~1544 |

Las citas de BIOG-17/18 son `<blockquote>` dentro de cards, no `alberdi-quote` de sección — no entran en conflicto con las 6 existentes. ✅

---

## Checklist de must-haves (verificación pre-T02)

- [x] BIOG-17 tiene ≥2 fuentes citadas (5 en total)
- [x] BIOG-17 tiene la cita directa "acogió [a Alberdi] con mucha gracia" — reproducida como «me acogió con mucha gracia»
- [x] BIOG-17 tiene card-nota-certeza sobre el contenido de la carta de Heredia
- [x] BIOG-17 documenta la URL exacta de la imagen de Quiroga
- [x] BIOG-18 tiene las dos citas directas de *Obras Completas*: "ese hombre extraordinario" y "orden contra el Banco"
- [x] BIOG-18 tiene exactamente 2 card-nota-certeza: (1) motivos del rechazo → S07, (2) muerte de Quiroga feb. 1835
- [x] El texto HTML del excerpt está completo — sin placeholders ni `[TBD]`
- [x] Las citas directas reproducen exactamente el español del original (≥3 fuentes concordantes)
- [x] La "orden contra el Banco" nombrada correctamente como libranza bancaria (no "carta adicional")

---

## Apéndice T03: Resultados del triple gate

| Capa | Check | Resultado | Valor |
|------|-------|-----------|-------|
| 1 — Shell | data-certeza ≥ 52 | ✅ | 52 |
| 1 — Shell | BIOG-17/18 presentes (2 article elements) | ✅ | 2 |
| 1 — Shell | rev-alberdi-quiroga ≥ 2 | ✅ | 3 |
| 1 — Shell | Keywords OK | ✅ | OK |
| 1 — Shell | Node.js gate exit 0 | ✅ | OK:52 |
| 1 — Shell | git limpio / committed | ✅ | — |
| 2 — Browser | .reveal ≥ 73 | ✅ | 73 |
| 2 — Browser | sub-nav links = 6 | ✅ | 6 |
| 2 — Browser | #rev-alberdi-quiroga [data-certeza] = 2 | ✅ | 2 |
| 2 — Browser | #BIOG-18 .card-nota-certeza = 2 | ✅ | 2 |
| 3 — Narrativa | BIOG-17 distinto de SP2-2 | ✅ | OK |
| 3 — Narrativa | Cronología sin superposición | ✅ | OK |
| 3 — Narrativa | Citas no duplican alberdi-quotes | ✅ | OK |
| 3 — Narrativa | card-nota-certeza visibles | ✅ | OK |
| 3 — Narrativa | Posición de #rev-alberdi-quiroga | ✅ | OK |

**Gate: 15/15 — S05 cerrado.**

