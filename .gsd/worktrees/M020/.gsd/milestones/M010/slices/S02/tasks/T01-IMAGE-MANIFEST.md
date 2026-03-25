# T01 — Image Manifest: Semana de Mayo cards

**Slice:** S02 — Integración HTML — cards en index.html
**Status:** ✅ Complete — todas las URLs verificadas via Wikimedia API
**Verified:** 2026-03-24

## Protocolo aplicado

Cada URL fue verificada via:
```
https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json
```
o via Commons:
```
https://commons.wikimedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json
```

Cuando `thumbwidth < 500`, la API devuelve la URL original directa (sin `/thumb/`). En esos casos se usa la URL original directamente (per KNOWLEDGE.md: "Small Wikimedia images have no 500px thumb").

---

## Manifiesto de imágenes (11 cards)

| Card ID | Título abreviado | Archivo Wikimedia | URL 500px verificada | Alt text | Notas |
|---------|-----------------|-------------------|---------------------|----------|-------|
| Evento 1 | 14 mayo: noticias de España | `Baltasar_Hidalgo_de_Cisneros.jpg` | `https://upload.wikimedia.org/wikipedia/commons/0/02/Baltasar_Hidalgo_de_Cisneros.jpg` | Retrato del virrey Baltasar Hidalgo de Cisneros | ⚠️ Imagen es 448px (menor a 500) — API devolvió URL directa sin `/thumb/`. PD-old (pre-1900). |
| Evento 2 | 18 mayo: bando censurado | `Manuel_Belgrano.JPG` | `https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Manuel_Belgrano.JPG/500px-Manuel_Belgrano.JPG` | Retrato de Manuel Belgrano, patriota y peticionario del Cabildo Abierto | Reutilización desde SP1-3 (mismo personaje, contexto diferente — evento 18 mayo). PD-old. thumbwidth=500. |
| Evento 3 | 22 mayo: Cabildo Abierto vota | `Acta_del_22_de_mayo_de_1810.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Acta_del_22_de_mayo_de_1810.jpg/500px-Acta_del_22_de_mayo_de_1810.jpg` | Acta original del Cabildo Abierto del 22 de mayo de 1810 | ✅ Imagen alternativa elegida para evitar duplicación visual con SP1-1 (que usa `Cabildo_abierto.jpg` Subercaseaux). Este es el documento histórico primario, más coherente con el contenido de la card (el debate y la votación). thumbwidth=500, dominio público. |
| Evento 4 | 23 mayo: Junta Cisneriana fracasa | `Baltasar_Hidalgo_de_Cisneros.jpg` | `https://upload.wikimedia.org/wikipedia/commons/0/02/Baltasar_Hidalgo_de_Cisneros.jpg` | Retrato del virrey Baltasar Hidalgo de Cisneros | ⚠️ Misma imagen que Evento 1 (mismo personaje — Cisneros encabezó la Junta Cisneriana). La duplicación es aceptable: los eventos son consecutivos y el retrato es el único candidato verificado para Cisneros. 448px directa. |
| Evento 5 | 24 mayo: presión popular | `The_town_square,_Buenos_Aires_1818.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/The_town_square%2C_Buenos_Aires_1818.jpg/500px-The_town_square%2C_Buenos_Aires_1818.jpg` | Plaza de la Victoria (actual Plaza de Mayo) con el Cabildo al fondo, Buenos Aires 1818, acuarela de Emeric Essex Vidal | ✅ Acuarela de Emeric Essex Vidal, 1818 — 8 años después del evento pero vista idéntica a la de 1810. Muestra la Plaza de la Victoria y el Cabildo donde se desarrolló la presión popular. PD-old. thumbwidth=500. |
| Evento 6 | 25 mayo: Primera Junta | `Cornelio_Saavedra.jpg` | `https://upload.wikimedia.org/wikipedia/commons/2/28/Cornelio_Saavedra.jpg` | Retrato de Cornelio Saavedra, presidente de la Primera Junta de Gobierno | ⚠️ Imagen es 362px (menor a 500) — URL directa. PD-old. Saavedra como presidente de la Junta es la figura central del 25 de mayo. |
| Evento 7 | 26-31 mayo: primeras acciones | `Mariano_Moreno.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Mariano_Moreno.jpg/500px-Mariano_Moreno.jpg` | Retrato de Mariano Moreno, secretario de la Primera Junta | ✅ thumbwidth=500. PD-old. Moreno fue el secretario más activo de la Junta en los primeros días. |
| Temática 1 | French, Berutti y "los chisperos" | `Domingo_French_(retrato).jpg` | `https://upload.wikimedia.org/wikipedia/commons/8/8c/Domingo_French_%28retrato%29.jpg` | Retrato de cuerpo entero de Domingo French (1774–1825), patriota y organizador callejero | ✅ Imagen encontrada via búsqueda `srnamespace=6&srsearch=Domingo+French+retrato+Argentina`. 415px — URL directa (menor a 500). PD-old. Nota: también existe `File:Antonio_Luis_Beruti.jpg` (239px) como imagen secundaria alternativa, pero French es el organizador principal de la card. |
| Temática 2 | Manipulación del Cabildo Abierto | `Cabildo_abierto.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cabildo_abierto.jpg/500px-Cabildo_abierto.jpg` | Óleo de Pedro Subercaseaux "El Cabildo Abierto del 22 de mayo de 1810", 1908 | ✅ Ya verificado, ya en uso en SP1-1. Reutilización aceptable para esta card temática (contexto diferente: SP1-1 es la card panorámica del proceso; esta card analiza los mecanismos de manipulación del Cabildo). thumbwidth=500. Per S01 Forward Intelligence nota de reutilización. |
| Temática 3 | Milicias criollas y respaldo armado | `Cornelio_Saavedra.jpg` | `https://upload.wikimedia.org/wikipedia/commons/2/28/Cornelio_Saavedra.jpg` | Retrato de Cornelio Saavedra, coronel del Regimiento de Patricios y árbitro militar de la Revolución | ⚠️ Misma imagen que Evento 6. Duplicación aceptable: la card temática describe específicamente el rol de Saavedra como árbitro militar, y no existe imagen verificada del Regimiento de Patricios en Wikimedia Commons. 362px directa. |
| Temática 4 | ¿Revolución popular o golpe de élites? | *(sin imagen)* | **sin card-image — omitir bloque** | — | ✅ No existe imagen única apropiada para un debate historiográfico entre Mitre, Halperin Donghi y Pigna. Una imagen del Cabildo sería redundante (ya usada en múltiples cards). Una portada de libro requeriría fair use. La card usa `card-nota-historiografica` (texto prominente) como el elemento visual principal. T02 no debe incluir `<div class="card-image">` en esta card. |

---

## Resumen de decisiones de coherencia visual

1. **Evento 3 ≠ SP1-1** — Se usa el Acta del 22 de mayo (documento primario) en lugar de `Cabildo_abierto.jpg` (Subercaseaux) para evitar duplicación visual entre cards adyacentes. SP1-1 ya usa Subercaseaux; Temática 2 también lo usará — un tercer uso en Evento 3 sería excesivo.

2. **Eventos 1 y 4 comparten imagen de Cisneros** — Aceptable porque los eventos son consecutivos (14 y 23 de mayo) y el personaje central es el mismo.

3. **Eventos 6 y Temática 3 comparten imagen de Saavedra** — Aceptable porque contextos distintos (Evento 6: instauración de la Junta; Temática 3: rol militar específico) y no hay alternativa verificada para los Patricios.

4. **Belgrano en Evento 2 + SP1-3** — Reutilización válida; SP1-3 es otra card sobre Belgrano en diferente período.

---

## Imágenes adicionales disponibles (no asignadas pero verificadas)

| Archivo | URL | Contexto potencial |
|---------|-----|-------------------|
| `Antonio_Luis_Beruti.jpg` | `https://upload.wikimedia.org/wikipedia/commons/3/3f/Antonio_Luis_Beruti.jpg` | Co-organizador con French; 239px — si T02 decide incluir ambos retratos en Temática 1 |
| `Emeric_Essex_Vidal_-_Vista_del_Cabildo_desde_la_Recova_-_1817.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Emeric_Essex_Vidal_-_Vista_del_Cabildo_desde_la_Recova_-_1817.jpg/500px-Emeric_Essex_Vidal_-_Vista_del_Cabildo_desde_la_Recova_-_1817.jpg` | Alternativa Cabildo exterior 1817 (Vidal); 500px — si se quiere imagen del edificio físico |
| `Acta_de_votación_22_de_mayo.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Acta_de_votaci%C3%B3n_22_de_mayo.jpg/500px-Acta_de_votaci%C3%B3n_22_de_mayo.jpg` | Otra versión del acta del 22 de mayo; 500px |

---

## API queries ejecutadas (log de verificación)

| Archivo candidato | API endpoint | Resultado |
|------------------|-------------|---------|
| `Baltasar_Hidalgo_de_Cisneros.jpg` | `en.wikipedia.org/w/api.php` | ✅ thumbwidth=448, URL directa |
| `Cornelio_Saavedra.jpg` | `en.wikipedia.org/w/api.php` | ✅ thumbwidth=362, URL directa |
| `Cabildo_abierto.jpg` | `en.wikipedia.org/w/api.php` | ✅ thumbwidth=500, thumb URL |
| `Mariano_Moreno.jpg` | `en.wikipedia.org/w/api.php` | ✅ thumbwidth=500, thumb URL |
| `Manuel_Belgrano.JPG` | `commons.wikimedia.org/w/api.php` | ✅ thumbwidth=500, thumb URL |
| `Acta_del_22_de_mayo_de_1810.jpg` | `commons.wikimedia.org/w/api.php` | ✅ thumbwidth=500, thumb URL |
| `The_town_square,_Buenos_Aires_1818.jpg` | `commons.wikimedia.org/w/api.php` | ✅ thumbwidth=500, thumb URL |
| `Domingo_French_(retrato).jpg` | `commons.wikimedia.org/w/api.php` | ✅ thumbwidth=415, URL directa |
| `Antonio_Luis_Beruti.jpg` | `commons.wikimedia.org/w/api.php` | ✅ thumbwidth=239, URL directa |
| `Emeric_Essex_Vidal_-_Vista_del_Cabildo_desde_la_Recova_-_1817.jpg` | `commons.wikimedia.org/w/api.php` | ✅ thumbwidth=500, thumb URL |
| `Acta_de_votación_22_de_mayo.jpg` | `commons.wikimedia.org/w/api.php` | ✅ thumbwidth=500, thumb URL |
| `Acta_del_25_de_Mayo_de_1810.jpg` | `commons.wikimedia.org/w/api.php` | ❌ missing — no existe |
| `Primera_junta_de_gobierno.jpg` | `en.wikipedia.org/w/api.php` | ❌ missing — no existe |
| `Acta_capitular_1810.jpg` | searched via `srsearch` | ❌ not found — solo PDFs de acuerdos del Cabildo |
