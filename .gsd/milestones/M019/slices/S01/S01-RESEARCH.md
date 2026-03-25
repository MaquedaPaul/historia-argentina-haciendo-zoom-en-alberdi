# M019-S01 — Research

**Date:** 2026-03-25
**Slice:** S01 — Investigación y borrador (La Ruptura Mitre-Urquiza, 1852)

## Summary

Este slice produce `S01-CONTENT-DRAFT.md` con las cards verificadas y certeza clasificada para el período Caseros–11 de Septiembre de 1852. La investigación confirma que todos los eventos del scope del milestone tienen fuente documental sólida. El milestone es historiográficamente rico y no requiere inventar nada: Caseros, el Acuerdo de San Nicolás, las Jornadas de Junio, la disolución de la Legislatura por Urquiza, y la Revolución del 11 de Septiembre son hechos con fechas exactas, actores documentados y fuentes historiográficas primarias y secundarias verificables.

**Veredicto sobre la "escena Mitre-Urquiza":** No existe evidencia de una escena de negociación privada en que Mitre le propusiera a Urquiza compartir el poder. Lo documentado es: (1) Mitre combatió bajo Urquiza en Caseros como jefe de artillería; (2) casi de inmediato se convirtió en líder de la oposición porteña al Acuerdo de San Nicolás desde *Los Debates*; (3) fue expulsado por Urquiza en junio de 1852; (4) participó en la Revolución del 11 de Septiembre. El "giro político" de aliado a enemigo es el arco real del período —documentado y narrable— sin necesidad de hipotetizar un encuentro que la historiografía no registra.

**Recomendación:** Incluir 4 cards en una nueva sub-sección dentro de `#rev-1852-1860`, insertadas **antes** de las cards SP4-1 a SP4-5 ya existentes, con la certeza apropiada para cada una. No incluir ninguna "escena" de negociación: el episodio va como `card-rumor` con nota explícita solo si se desea explicar por qué no se puede afirmar; si no, simplemente no se incluye. La opción más limpia, dado el milestone, es no incluirla y narrar el arco político real.

## Recommendation

Producir 4 cards para la nueva sub-sección "La ruptura de 1852: de Caseros al 11 de Septiembre":

1. **Caseros: Mitre en el Ejército Grande** — `card-hecho` — Mitre como jefe de artillería del Ejército Grande (hecho documentado con fuente).
2. **El Acuerdo de San Nicolás y las Jornadas de Junio** — `card-hecho` — El pacto del 31 de mayo de 1852, el debate en la Legislatura porteña (21–23 de junio), con *Los Debates* y *El Nacional* como canales de la oposición.
3. **Urquiza disuelve la Legislatura** — `card-hecho` — La disolución del 24 de junio de 1852 y la expulsión de Alsina, Mitre y Sarmiento.
4. **La Revolución del 11 de Septiembre** — `card-hecho` — El alzamiento del 11 de septiembre de 1852, actores, resultado inmediato.

Opcionalmente: una `card-rumor` o `card-opinion` explicando por qué "la escena de la propuesta de poder compartido" no tiene fuente directa. Esta es una elección editorial.

El nivel de certeza para todas es `data-certeza="hecho"` en las 4 cards principales, con fuentes de primera línea (historiografía argentina clásica: Ravignani, Halperin Donghi, Scobie, Saldías).

## Implementation Landscape

### Key Files

- `index.html` línea ~2283: `<div id="rev-1852-1860">` — sub-período "Organización Nacional (1852–1860)" con 5 cards ya existentes (SP4-1 a SP4-5). Las nuevas cards de M019 deben **preceder** a las existentes: insertar una nueva sub-subsección antes de SP4-1 (antes de la card de Alberdi/Bases).
- `styles.css` — no requiere cambios; los patrones `card-hecho`, `card-opinion`, `card-rumor`, `events-grid--certeza` ya existen.
- `app.js` — no requiere cambios; el sistema de reveal y fallbacks de imágenes es automático.

### Estructura a producir en S01-CONTENT-DRAFT.md

Para cada card:
- Título y fecha
- Tipo de certeza (`hecho` / `opinión` / `rumor`)
- Excerpt (2–4 oraciones)
- Fuentes (≥2 para cada card-hecho)
- Cita textual si aplica (para card-opinion)
- Nota sobre imagen

### Build Order

1. Escribir `S01-CONTENT-DRAFT.md` con las 4 cards verificadas (este slice).
2. S02 lee el draft e integra en `index.html` — inserción antes de SP4-1, `--reveal-delay` en incrementos de 80ms.

### Verification Approach

- `grep -c 'data-certeza' index.html` debe aumentar en 4.
- `grep 'data-certeza="hecho"' index.html | wc -l` — verificar conteo.
- Visual browser check: las 4 nuevas cards aparecen antes de la card de Alberdi/Bases en `#rev-1852-1860`.
- No JS errors: `node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e){ console.error(e); }"`.

---

## Hechos verificados y fuentes (para el draft)

### Card 1 — Caseros: Mitre en el Ejército Grande (3 de febrero de 1852)

**Tipo:** hecho documentado

**Hechos confirmados:**
- Mitre se sumó a las órdenes de Urquiza a fines de 1851, llegó desde Montevideo a Entre Ríos.
- Combatió en Caseros como artillero / jefe de artillería del contingente porteño del Ejército Grande. (Infobae 2026-01-19: "A fines de 1851 se puso a las órdenes de Urquiza y combatió como artillero en la batalla de Caseros.")
- El Ejército Grande incluía futuros presidentes Mitre y Sarmiento entre sus jefes (Wikipedia, Batalla de Caseros: "Entre sus jefes se encontraban notorios argentinos, como los futuros presidentes Bartolomé Mitre y Domingo Faustino Sarmiento.").
- Caseros: 3 de febrero de 1852, Ejército Grande ~24.000 hombres; Rosas renunció ese mismo día y se exilió en Southampton.
- Mitre tenía 30 años.

**Fuentes:**
- Saldías, A., *Historia de la Confederación Argentina*, t. III, 1892.
- Halperin Donghi, T., *Una nación para el desierto argentino*, CEAL, 1982.
- Wikipedia / fuentes del Ejército Grande: confirmación del rol de Mitre.

**Imagen:** Retrato de Mitre ca. 1860 (Wikimedia Commons, libre de derechos). Existe foto `Bartolomé_Mitre_(Manzoni,_1861).jpg` ya referenciada en index.html para SP4-5 — se puede referenciar una diferente o más temprana. Alternativa: imagen de la batalla de Caseros (grabado).

---

### Card 2 — El Acuerdo de San Nicolás y las Jornadas de Junio (31 mayo – 23 junio 1852)

**Tipo:** hecho documentado

**Hechos confirmados:**
- El Acuerdo fue firmado el 31 de mayo de 1852 por 14 provincias (Buenos Aires no lo ratificó).
- Nombró a Urquiza Director Provisorio de la Confederación Argentina.
- Fijó la reunión de un Congreso Constituyente en Santa Fe; estableció 2 diputados por provincia (lo cual perjudicaba a Buenos Aires, que con más población esperaba más representantes).
- Buenos Aires también temía la nationalización de la Aduana — que aportaba ~80% de los ingresos fiscales del país.
- Debates en la Legislatura porteña: 21 de junio, Mitre lo atacó como "poder dictatorial, despótico y arbitrario" ("en una mano el dinero, en la otra las bayonetas, y disponían a sus pies el territorio, las leyes y los hombres"). 22 de junio: Vélez Sársfield lo atacó jurídicamente.
- *Los Debates* (Mitre) y *El Nacional* (Vélez Sársfield) lideraban la oposición periodística.
- 23 de junio: el gobernador Vicente López y Planes renunció.

**Cita Mitre documentada:** "en una mano el dinero, en la otra las bayonetas, y disponían a sus pies, el territorio, las leyes y los hombres" (discurso en la Legislatura, 21 de junio de 1852, citado en múltiples fuentes historiográficas, incluyendo laguia2000.com y todo-argentina.net).

**Fuentes:**
- Acuerdo de San Nicolás, texto primario (31 de mayo de 1852, 19 artículos + 1 adicional).
- Ravignani, E., *Asambleas Constituyentes Argentinas*, t. IV, Buenos Aires, 1937.
- Halperin Donghi, T., *Una nación para el desierto argentino*, CEAL, 1982.
- Scobie, J. R., *La lucha por la consolidación de la nacionalidad argentina*, Buenos Aires, 1964.

**Imagen:** Retrato de Urquiza (ya en index.html) o imagen de la Casa del Acuerdo en San Nicolás (Wikimedia Commons).

---

### Card 3 — Urquiza disuelve la Legislatura (24 junio 1852)

**Tipo:** hecho documentado

**Hechos confirmados:**
- Ante la renuncia de López y la agitación en la Legislatura, Urquiza actuó el 24 de junio de 1852: disolvió la Legislatura, asumió personalmente el Poder Ejecutivo de Buenos Aires.
- Cita de Urquiza al disolver: "Considero este estado de cosas completamente anárquico, y en esta persuasión me hallo completamente autorizado para llenar la primera de mis obligaciones, que es salvar la Patria de la demagogia, después de haberla salvado de la tiranía." (Nota a Pinto, 24 de junio de 1852, citada en Wikipedia, Revolución del 11 de septiembre de 1852.)
- Expulsó del territorio a los líderes más exaltados: Alsina, Mitre y Sarmiento.
- Repuso a López como gobernador pro forma; convocó elecciones con escasa asistencia.

**Fuentes:**
- Wikipedia "Revolución del 11 de septiembre de 1852" — cita directa del texto de la nota de Urquiza a Pinto (fuente primaria citada en fuentes secundarias).
- Halperin Donghi, T., *Una nación para el desierto argentino*, CEAL, 1982.
- Scobie, J. R., *La lucha por la consolidación de la nacionalidad argentina*, Buenos Aires, 1964.

**Nota:** La cita de Urquiza ("salvar la Patria de la demagogia") es un quote verificable — puede ir en card-hecho con blockquote como cita del actor histórico en la fuente primaria, o en card-opinion si se enfatiza la interpretación.

---

### Card 4 — La Revolución del 11 de Septiembre de 1852

**Tipo:** hecho documentado

**Hechos confirmados:**
- Urquiza partió hacia Santa Fe el 8 de septiembre para inaugurar el Congreso Constituyente.
- Mitre regresó de Montevideo el 9 de septiembre.
- En la madrugada del 11 de septiembre de 1852 estalló la revolución en Buenos Aires.
- Jefe civil: Valentín Alsina. Militares: generales José María Pirán (designado jefe militar) y Juan Madariaga.
- El general Galán (gobernador delegado de Urquiza) no pudo impedirlo.
- La Legislatura se reunió, eligió gobernador interino al general Guillermo Pinto.
- Urquiza decidió negociar, no combatir: "contramarchó hasta San Nicolás" y eventualmente regresó a Entre Ríos.
- Resultado inmediato: el gobernador Pinto separó oficialmente la provincia del resto de la Confederación, que desde entonces se llamó "Estado de Buenos Aires".
- La Legislatura retiró sus diputados del Congreso de Santa Fe y desconoció a Urquiza en el mando de las relaciones exteriores.
- El 31 de octubre de 1852: Valentín Alsina fue elegido gobernador del Estado de Buenos Aires; Mitre fue designado Ministro de Gobierno y Relaciones Exteriores.

**Fuentes:**
- Halperin Donghi, T., *Una nación para el desierto argentino*, CEAL, 1982.
- Scobie, J. R., *La lucha por la consolidación de la nacionalidad argentina*, Buenos Aires, 1964.
- Ravignani, E., *Asambleas Constituyentes Argentinas*, t. IV, Buenos Aires, 1937.

**Imagen:** Retrato de Valentín Alsina (Wikimedia Commons) o el conocido mapa de la división Confederación / Estado de Buenos Aires (ya referenciado en SP4-3: `Mapa_Argentina_vs_BuenosAires_1858.jpg`).

---

## Veredicto: La "escena Mitre-Urquiza"

**Conclusión de la investigación:** No existe evidencia historiográfica de una escena específica en que Mitre le propusiera a Urquiza "tomar el poder juntos". Lo que sí está documentado:

- Existe un "Borrador de Bases para la organización nacional propuesto por la Provincia de Buenos Aires" (ca. marzo-abril 1852, Archivo de Rufino de Elizalde), cuyo art. 6° proponía "investir al Gral. Urquiza como el jefe más caracterizado y de más prestigio en la República con la autoridad suprema provisoria" — documentado por Cassagne (2023). Este documento es una propuesta institucional de Buenos Aires hacia Urquiza, no una conversación personal Mitre-Urquiza.
- La reunión del 5 de mayo de 1852 en San Benito de Palermo (Cassagne, PDF, 2023) reunió a Vélez Sársfield, Alsina, Vicente Fidel López, Francisco Pico, Gorostiaga y Pujol para discutir las bases del pacto — Mitre no está documentado como participante nominado en esa reunión.
- Lo que hay documentado entre Mitre y Urquiza en 1852 es: alianza en Caseros (febrero), enfrentamiento político abierto desde junio (debates del Acuerdo de San Nicolás), expulsión por Urquiza (junio-julio), regreso y participación en la Revolución del 11 de Septiembre.

**Clasificación final:**
- No hay fuente directa de la "escena" de propuesta de poder compartido Mitre→Urquiza.
- Si el usuario quería referirse al período de colaboración táctica en Caseros seguido del giro político, eso es narrable como hecho.
- Si quería referirse al borrador de Bases de Buenos Aires (Elizalde Archive, marzo-abril 1852) como indicio de que Buenos Aires negoció con Urquiza antes de romperse, eso va como `card-opinion` (interpretación historiográfica del documento) con la nota de Cassagne.
- La forma más honesta y conforme a R001/R013: no incluir ninguna "escena de propuesta de poder compartido". El arco real (aliados en Caseros → enemigos en septiembre) se narra con hechos documentados.

---

## Common Pitfalls

- **No confundir la disolución de la Legislatura (24 de junio de 1852) con la Revolución del 11 de Septiembre** — son eventos separados por casi tres meses.
- **El "Estado de Buenos Aires" como nombre formal** — comienza a usarse oficialmente a partir del 11 de septiembre de 1852.
- **La inserción en index.html:** las nuevas cards van ANTES de SP4-1 (la card de Alberdi/Bases), no después, para mantener el orden cronológico: Caseros (febrero 1852) → Acuerdo de San Nicolás (mayo 1852) → Jornadas de junio → Disolución Legislatura → 11 de septiembre → Bases de Alberdi (publicadas en mayo 1852, pero integradas al Congreso de noviembre 1852) → Congreso de Santa Fe (1853).
- **`--reveal-delay`:** los stagger delays para las 4 nuevas cards deben ser 0ms, 80ms, 160ms, 240ms; los existentes SP4-1 a SP4-5 deberán incrementarse en 320ms cada uno (o el planner puede decidir que son en grids separados y los delays se resetean).
- **No crear un nuevo `<div id="...">` sub-periodo**: el integration point es agregar cards dentro del grid ya existente de `#rev-1852-1860`, o —si el planner prefiere— agregar una nueva sub-subsección con `<h4>` antes de las cards SP4-x existentes.

## Sources

- Halperin Donghi, T., *Una nación para el desierto argentino*, CEAL, Buenos Aires, 1982.
- Scobie, J. R., *La lucha por la consolidación de la nationalidad argentina*, Editorial Hachette, Buenos Aires, 1964.
- Ravignani, E., *Asambleas Constituyentes Argentinas*, t. IV, Buenos Aires, 1937.
- Saldías, A., *Historia de la Confederación Argentina*, t. III, Buenos Aires, 1892.
- Cassagne, J. C., "El Acuerdo de San Nicolás de los Arroyos y su sentido actual" (y "El Acuerdo de San Nicolás y el federalismo"), 2023 — documenta el Borrador Elizalde.
- Acuerdo de San Nicolás, texto primario, 31 de mayo de 1852 (19 artículos + adicional).
- Wikipedia ES: "Revolución del 11 de septiembre de 1852" — cita nota de Urquiza a Pinto (24 junio 1852).
- Wikipedia ES: "Bartolomé Mitre" y "Batalla de Caseros" — confirmación rol de Mitre en Caseros.
- Infobae (2026-01-19): perfil Mitre — "a fines de 1851 se puso a las órdenes de Urquiza y combatió como artillero en la batalla de Caseros".
