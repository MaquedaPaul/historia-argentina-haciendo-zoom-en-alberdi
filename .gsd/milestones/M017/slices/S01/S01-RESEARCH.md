# M017-S01 — Investigación y borrador (Urquiza: Perfil y Trayectoria)

**Date:** 2026-03-24
**Slice:** S01 — Investigación y borrador
**Output:** `S01-CONTENT-DRAFT.md` con 5–7 cards sobre Urquiza verificadas

---

## Summary

Urquiza es una figura con documentación sólida para el período 1801–1851. Los datos biográficos centrales (nacimiento 18 oct 1801, Talar del Arroyo Largo, Entre Ríos; educación en Colegio de San Carlos, Buenos Aires; retorno a Entre Ríos ca. 1819; carrera política desde 1826; gobernador desde 1841) están confirmados en múltiples fuentes primarias y secundarias concordantes. El Pronunciamiento del 1 de mayo de 1851 tiene texto primario disponible y fecha exacta verificada. El debate historiográfico (¿traición a Rosas o decisión de Estado?) está bien documentado con posiciones claras: liberal/síntesis (Lynch, Halperin Donghi) vs. revisionista (Irazusta, revisionismo federal).

La sección debe ser una nueva sub-período `#rev-urquiza-perfil` dentro de `#periodo-revolucion`, insertada ENTRE `</div><!-- /#rev-1835-1852 -->` (línea 2270) y el conector Alberdi SP3→SP4 (línea 2272). Esto la posiciona cronológicamente correcta: el perfil de Urquiza cubre 1801–1851, culmina en el Pronunciamiento, y su continuación (Caseros) ya existe en `#rev-1835-1852` y `#rev-1852-1860`.

**Imágenes disponibles:** El sitio ya usa dos imágenes de Urquiza (líneas 1636 y 2328) — la del retrato al óleo (Josefa Díaz y Clucellas, 1880) en `Justo_José_de_Urquiza.jpg` (500px Wikimedia) y el retrato de `Justo_José_de_Urquiza_(retrato).jpg`. Ambas son reutilizables para cards nuevas sin conflicto. Una tercera imagen para el Pronunciamiento podría ser el grabado de la Plaza Ramírez de Concepción del Uruguay o la daguerrotipia de Charles D. Fredricks (ca. 1852, citada en Wikipedia EN).

---

## Recommendation

Producir un draft de **6 cards** en formato `S01-CONTENT-DRAFT.md`:

| # | ID | Título | Certeza | Tema |
|---|-----|--------|---------|------|
| 1 | URQ-1 | Origen entrerriano: familia, estancia, formación (1801–1819) | hecho | Nacimiento, padre vasco, Colegio San Carlos, retorno a Entre Ríos |
| 2 | URQ-2 | De comerciante a caudillo federal (1819–1841) | hecho | Carrera política 1826, comandante militar 1832, leal a Rosas 1836–1841 |
| 3 | URQ-3 | Gobernador de Entre Ríos: orden, prosperidad y tensión (1841–1851) | hecho | Gobierno, economía entrerriana, conflictos con Rosas sobre comercio y ríos |
| 4 | URQ-4 | El Pronunciamiento del 1° de mayo de 1851 | hecho | Texto primario, fecha exacta, mecánica política (aceptar renuncia), consecuencias inmediatas |
| 5 | URQ-5 | ¿Traición o decisión de Estado? El debate historiográfico | nota-historiografica / debatido | Posición rosista/revisionista vs. síntesis liberal (Lynch, Halperin) |
| 6 | URQ-6 | Urquiza en el sitio (conexión narrativa) | opinión | Vínculo con Alberdi: el constitucionalismo como horizonte compartido |

---

## Implementation Landscape

### Key Files

- `index.html` (worktree: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M017/index.html`) — 2823 líneas. Sub-períodos viven dentro de `#periodo-revolucion`. La nueva sección va en **línea 2271**, entre `</div><!-- /#rev-1835-1852 -->` y el conector Alberdi SP3→SP4.
- `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` — archivo a crear por S01; insumo principal para S02.

### Estructura HTML del nuevo sub-período

```html
<div id="rev-urquiza-perfil" class="sub-period reveal reveal-fade">
  <h3 class="sub-period__title">Urquiza: Perfil y Trayectoria (1801–1851)</h3>
  <div class="events-grid events-grid--certeza" aria-label="...">
    <!-- URQ-1 a URQ-6 -->
    <!-- S01–S02 cards will be appended here by subsequent slices -->
  </div>
</div><!-- /#rev-urquiza-perfil -->
```

Sub-nav link a añadir en línea ~334:
```html
<a href="#rev-urquiza-perfil" class="sub-nav__link">1801–1851<span class="sub-nav__link-label">Urquiza: Perfil</span></a>
```

### Build Order

1. **T01 — Borrador de 6 cards en `S01-CONTENT-DRAFT.md`** — investigación verificada, certeza asignada, cites académicos, notas de imagen. Producto directo del presente slice.
2. **T02 — Verificación de imágenes Wikimedia** — confirmar URLs de las imágenes disponibles para URQ-1 a URQ-6 vía API de Wikimedia Commons.
3. El draft completo es el único output de S01. S02 consume `S01-CONTENT-DRAFT.md` para la integración HTML.

### Insertion Point Exacto

```
Línea 2270: </div><!-- /#rev-1835-1852 -->
```
→ Insertar nuevo bloque aquí (ANTES del conector Alberdi SP3→SP4 en línea 2272).

### Sub-nav Count Post-Inserción

El worktree M017 tiene **7 sub-nav links** (líneas 327–333). La nueva sección añade el 8°: `#rev-urquiza-perfil`. Verificación: `grep -c 'sub-nav__link' index.html` debe devolver 8 tras S02.

### Verification Approach

```bash
grep -c 'data-certeza=' index.html   # debe subir de 93 → 99 (6 nuevas cards)
grep -c 'rev-urquiza-perfil' index.html  # ≥2 (div + sub-nav link)
node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK')"  # syntax OK
```
Browser DevTools: `[SubNav] Initialized with 8 sub-periods, 8 links.`

---

## Hechos Verificados para el Draft

### URQ-1 — Origen (hecho, ≥2 fuentes)
- Nació 18 oct 1801, Talar del Arroyo Largo (hoy Arroyo Urquiza), depto. Uruguay, Entre Ríos. Partida de bautismo transcrita por Urquiza mismo (facsímil reproducido en "Historia de la Policía de Entre Ríos", Paraná, 1947; Museo Nacional Palacio San José).
- Padre: José Narciso de Urquiza y Álzaga, vasco de Castro Urdiales, estanciero y comerciante. Madre: María Cándida García González, criolla porteña.
- Estudió en el Colegio de San Carlos (Real) en Buenos Aires. La institución cerró; regresó a Entre Ríos ca. 1818–1819.
- Se dedicó al comercio; en 1826 fue electo diputado provincial (AGN, Fondo Urquiza, 1800–1880).
- **Fuentes:** Museo Palacio San José (gobierno.ar); AGN (atom.mininterior.gob.ar); Bosch, B., *Urquiza y su tiempo*, EUDEBA.

### URQ-2 — Caudillo federal leal a Rosas (hecho)
- 1823: participa en conspiración contra gobernador Lucio Mansilla; exiliado en Corrientes, vuelve pronto.
- 1826: diputado provincial; adhiere al partido federal, se opone a la Constitución centralista.
- 1832: nombrado Comandante General del Segundo Departamento Principal de Entre Ríos.
- 1836: Rosas lo pone al mando de la división federal de observación en la frontera uruguaya. *"Durante los quince años siguientes, Urquiza, un federal convencido, sirvió a Rosas como oficial militar y aliado político."* (turismoentrerios.com / Lynch)
- 1837: ascendido a coronel mayor; combate en Pago Largo (1839) y Cagancha (1839) bajo Echagüe.
- **Fuentes:** AGN; casarosada.gob.ar; Lynch, J., *Argentine Dictator*, Oxford, 1981.

### URQ-3 — Gobernador: 1841–1851 (hecho, con card-nota-certeza sobre tensión gradual)
- 15 de diciembre de 1841: la legislatura de Entre Ríos eligió gobernador a Urquiza (sustituyendo a Pascual Echagüe). Reelecto en 1845 y 1849 (SciELO/Almanack, 2021).
- Desde Concepción del Uruguay: extendió la ganadería, instaló saladeros, mejoró caminos y puertos, fundó el Colegio Nacional de Concepción del Uruguay.
- Entre Ríos bajo su gobierno fue la provincia más próspera del interior, rivalizando con Buenos Aires.
- Tensión con Rosas: Rosas prohibió exportación de oro (1837) y comercio con Montevideo; los intereses económicos entrerrianos chocaban con las restricciones rosistas. El Tratado de Alcaraz (1846) con Corrientes fue reprobado por Rosas. Hacia 1847–1850 la ruptura era previsible.
- **Fuentes:** SciELO-Almanack (2021, peer-reviewed); casarosada.gob.ar; Halperin Donghi, T., *De la revolución de independencia*, Paidós, 1972.

### URQ-4 — El Pronunciamiento del 1° de mayo de 1851 (hecho, texto primario disponible)
- **Fecha exacta verificada:** 1° de mayo de 1851, Concepción del Uruguay.
- **Mecánica:** La Legislatura entrerriana "aceptó las repetidas renuncias de Rosas" a la gobernación de Buenos Aires y a dirigir las relaciones exteriores de la Confederación (que Rosas presentaba anualmente como formalidad política, contando con ser rechazado).
- Entre Ríos reasumió soberanamente el manejo de sus relaciones exteriores y de guerra, en virtud del Pacto Federal del 4 de enero de 1831.
- Sustituyó "¡Mueran los salvajes unitarios!" por "¡Mueran los enemigos de la organización nacional!".
- Solo Corrientes apoyó el Pronunciamiento; las demás provincias lo condenaron públicamente como "traición".
- Consecuencias inmediatas: 29 de mayo de 1851 → triple alianza Entre Ríos + Brasil + Montevideo; Urquiza formó el Ejército Grande; 3 de febrero de 1852 → Caseros.
- **Fuentes:** Wikipedia ES (Pronunciamiento de Urquiza); entrerios.gov.ar; todo-argentina.net; SciELO/Almanack 2021. Texto primario parcial en fuentes secundarias múltiples concordantes.

### URQ-5 — Debate historiográfico (data-certeza="debatido")
- **Posición rosista/revisionista** (Irazusta; revisionismo federal): Urquiza traicionó a Rosas, al federalismo y a la soberanía nacional al aliarse con el Imperio del Brasil y los unitarios. Rosas calificó el acto en cartas privadas: "errores, rudeza, deslealtad y traición" (ministro Arana; citado en Domínguez Arribas, *Estudios Americanos*). "El loco traidor salvaje unitario Urquiza" fue la fórmula oficial rosista.
- **Posición liberal/síntesis** (Lynch, Halperin Donghi; Bosch): El Pronunciamiento fue una decisión soberana fundada en el Pacto Federal de 1831 — el mismo instrumento por el que Rosas tenía la delegación de las relaciones exteriores, que cualquier provincia podía retirarle. Los motivos eran a la vez económicos (libre navegación de los ríos, comercio sin restricciones) y constitucionales (Urquiza quería una Constitución que Rosas vetaba). Señalan que entre 1851 y 1853 Urquiza logró en 18 meses lo que Rosas había bloqueado durante dos décadas.
- **Fuentes:** Domínguez Arribas, J., *El enemigo unitario en el discurso rosista*, *Estudios Americanos* (CSIC); Lynch, J., *Argentine Dictator*, Oxford, 1981, cap. 10; Halperin Donghi, T., *De la revolución de independencia*, Paidós, 1972. También: Brienza, H., *Urquiza, el salvaje*, Aguilar, 2017 (perspectiva que llama a Urquiza "el traidor que constituyó una nación" — útil para la nota historiográfica).

### URQ-6 — Conexión narrativa con Alberdi (opinión)
- Alberdi y Sarmiento, desde el exilio en Chile, comenzaron a ver en Urquiza al caudillo que podría convocar el congreso constituyente (casarosada.gob.ar; Mayer, J.M., *Alberdi y su tiempo*, EUDEBA, 1963).
- Cuando Urquiza venció en Caseros, Alberdi escribió las *Bases* en 33 días y se las envió "con una dedicatoria que era también un programa" (ya en el sitio, línea 2274–2276 — NO duplicar esa cita).
- La card-opinión puede usar atribución a Mayer o a Halperin Donghi sobre la convergencia intelectual, sin nuevo blockquote de Alberdi (el sitio ya tiene múltiples).

---

## Imágenes Disponibles (pre-verificadas)

| Card | Imagen sugerida | URL en uso / disponible |
|------|----------------|------------------------|
| URQ-1 | Retrato Urquiza (Josefa Díaz y Clucellas, 1880) | `Justo_José_de_Urquiza.jpg` → ya en uso línea 1636 (reutilizable) |
| URQ-3 | Palacio San José (residencia de gobierno) | Verificar en Wikimedia: `Palacio_San_José_(Entre_Ríos).jpg` |
| URQ-4 | Daguerrotipo Urquiza ca. 1852 (Fredricks) | `Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg` — confirmado en Wikipedia EN infobox |
| URQ-5/6 | Retrato Urquiza (retrato) | `Justo_José_de_Urquiza_(retrato).jpg` → ya en uso línea 2328 (reutilizable) |

**Nota:** El daguerrotipo Fredricks ca. 1852 es la imagen más representativa del Pronunciamiento — muestra a Urquiza exactamente en ese período. T02 del draft debe verificar la URL exacta via API Wikimedia antes de integrar.

---

## Constraints

- **Sin duplicación:** `data-id="SP3-1"` a través de `SP3-6` (rev-1835-1852) ya mencionan a Urquiza en passing. La nueva sección es el único lugar donde Urquiza es el SUJETO PRINCIPAL.
- La carta o cita de Alberdi a Urquiza (línea 2274–2276) NO debe aparecer de nuevo en la nueva sección.
- El worktree M017 tiene estado anterior a M014/M015/M016. Sub-nav tiene **7 links** en este worktree (no 8+). La nueva sección añadirá el 8°.
- Usar HTML entities para no-ASCII en el bloque T02 Recipe (D053), especialmente para `ó` → `&#xF3;`, `é` → `&#xE9;` en atributos `data-certeza`.
- Zero nuevas clases CSS — usar `card-opinion` para `data-certeza="debatido"` (D052).

## Common Pitfalls

- **No heredoc en Windows/Git Bash** — usar Write tool para el draft y `node -e` con replace pattern para splices en index.html (ver KNOWLEDGE.md).
- **Sub-nav count:** En este worktree el contador base es 7 links (no 8 como en main). Verificar con `grep -c 'sub-nav__link'` antes y después.
- **Insertion point por comentario, no por línea:** Usar `<!-- /#rev-1835-1852 -->` como anchor grep-estable, no la línea 2270.
- **Certeza accent:** `data-certeza="opinión"` con entidad `&#xF3;` para opinión cards; `data-certeza="debatido"` sin acento para la nota historiográfica (D052, D058).

---

## Sources

- Museo Nacional Palacio San José — partida de bautismo: museourquiza.cultura.gob.ar
- AGN — Fondo Urquiza 1800–1880: atom.mininterior.gob.ar
- SciELO/Almanack (2021) — *Una lectura del Pronunciamiento de Urquiza de 1851*: scielo.br
- Casa Rosada (gobierno.ar) — perfil biográfico: casarosada.gob.ar
- Wikipedia EN — Justo José de Urquiza (con fuentes primarias citadas): en.wikipedia.org
- Wikipedia ES — Pronunciamiento de Urquiza: es.wikipedia.org
- Domínguez Arribas, J. — *El enemigo unitario en el discurso rosista*: estudiosamericanos.revistas.csic.es
- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981 (ya citado en el sitio)
- Halperin Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972 (ya citado en el sitio)
- Bosch, B., *Urquiza y su tiempo*, EUDEBA (citada en laciudadrevista.com)
- Lozier Almazán, B., *Urquiza*, Planeta, Buenos Aires, 1992 (ya citada en el sitio, línea 2265)
