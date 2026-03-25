---
estimated_steps: 4
estimated_files: 1
---

# T01: Escribir S20-CONTENT-DRAFT.md con HTML entity-encoded para ambas cards

**Slice:** S20 — Lo del 29 — el fusilamiento de Dorrego y la crisis de 1829
**Milestone:** M008

## Description

Crear el archivo `S20-CONTENT-DRAFT.md` con contenido histórico verificado para dos cards: S20-1 (card-hecho sobre el contexto de la Convención de Paz con Brasil que hizo a Dorrego políticamente vulnerable) y S20-2 (card-opinion sobre el significado historiográfico del fusilamiento como ruptura fundacional). El bloque "T02 Recipe" al final del draft debe contener el HTML verbatim con todos los caracteres non-ASCII como entidades HTML — es el input directo del splice en T02.

**Scope guard crítico:** S13-1 ya cubre la narrativa del fusilamiento (golpe 1 dic 1828, fusilamiento 13 dic 1828, movilización de Rosas, Puente de Márquez, Cañuelas, Barracas, elección de Rosas 8 dic 1829). S20 debe NO repetir esa secuencia. S20-1 explica el CONTEXTO PREVIO que hizo a Dorrego vulnerable; S20-2 explica el SIGNIFICADO POLÍTICO posterior como ruptura fundacional.

## Steps

1. **Escribir la sección S20-1 (hecho)** con estos elementos:
   - Título: algo como "La paz impopular: la Convención Preliminar de 1828 y la vulnerabilidad de Dorrego"
   - Año display: 1828
   - Certeza: hecho
   - Excerpt (3-4 oraciones): La Cisplatina (Banda Oriental) era parte de las Provincias Unidas desde 1821; Brasil la ocupó en 1825, desencadenando la guerra Argentina-Brasil (1825–1828). La guerra terminó con la Convención Preliminar de Paz (27 agosto 1828), negociada por el diplomático británico Lord Ponsonby: ambas partes se retiraron y la Banda Oriental se constituyó como estado independiente (Uruguay). Dorrego, como gobernador de Buenos Aires y responsable de facto de la política exterior, firmó el tratado. Fue profundamente impopular: Buenos Aires había combatido y gastado, y ahora cedía un territorio. Esto le dio a Lavalle un pretexto político — Dorrego era "culpable" de la humillación nacional.
   - Imagen: `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Dorrego-fusilamiento.jpg/500px-Dorrego-fusilamiento.jpg`
   - Fuentes: Lynch, *Argentine Dictator*, cap. 3 (1981); Saldías, *Historia de la Confederación Argentina*, t. I (1892); Goldman y Salvatore (comps.), *Caudillismos rioplatenses*, EUDEBA (1998); La Convención Preliminar de Paz, 27 agosto 1828 (fuente primaria).

2. **Escribir la sección S20-2 (opinión)** con estos elementos:
   - Título: algo como "La línea de sangre: el fusilamiento como ruptura fundacional de la política argentina"
   - Año display: 1828–1829
   - Certeza: opinión (accented)
   - Excerpt (3-4 oraciones): Interpretación historiográfica atribuida a tres historiadores: Saldías (1892) encuadró el fusilamiento como el acto inaugural de una nueva forma de política argentina — la eliminación de un gobernador legítimo sin juicio como arma política. Halperín Donghi (1972) argumenta que "cerró el ciclo de las guerras civiles de transición y abrió el de las guerras civiles permanentes" — transformó el conflicto faccionario en vendetta de sangre. Lynch (1981, cap. 3) señala que el error de Lavalle no fue militar sino político: al matar a un gobernador electo sin proceso, validó cada acto de violencia subsiguiente en nombre de la "venganza federal".
   - Imagen: `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Juan_Lavalle.jpg/500px-Juan_Lavalle.jpg`
   - Fuentes: Lynch, *Argentine Dictator*, cap. 3 (Oxford, 1981); Halperín Donghi, *De la revolución de independencia a la confederación rosista* (Paidós, 1972); Saldías, *Historia de la Confederación Argentina*, t. I (1892).

3. **Escribir el bloque "T02 Recipe"** al final del draft: HTML verbatim de ambas cards listo para ser copiado como input de T02. Reglas de encoding obligatorias:
   - Todos los caracteres non-ASCII en el HTML deben estar como entidades: `&#xF3;` (ó), `&#xE1;` (á), `&#xE9;` (é), `&#xED;` (í), `&#xFA;` (ú), `&#xF1;` (ñ), `&#xFC;` (ü), `&#xE0;` (à), `&#xF2;` (ò).
   - La sección de prose/descripción del draft puede usar UTF-8 normal (solo el bloque Recipe necesita entidades).
   - S20-2 debe usar `data-certeza="opini&#xF3;n"` (entity-encoded) — no `data-certeza="opinión"`.
   - S20-2 usa icono 💬 (`&#x1F4AC;`) y label `Interpretaci&#xF3;n historiogr&#xE1;fica`.
   - S20-1 usa icono ✓ (`&#x2713;`) y label `Hecho documentado`.
   - Stagger delays: S20-1 `--reveal-delay: 0ms`, S20-2 `--reveal-delay: 80ms`.
   - Incluir `<!-- S20-1: ... -->` HTML comment antes de cada card (junto con `data-id="S20-1"` attribute — per KNOWLEDGE.md: ambos están en uso desde S13; el check `grep -c 'data-id="S20-'` = 2 es la verificación recomendada).
   - NO usar `card-nota-historiografica` — S20-1 es hecho documentado, S20-2 es opinión atribuida; ninguna requiere formato multi-posición.

4. **Verificar ausencia de non-ASCII en el bloque T02 Recipe** con Node.js:
   ```
   node -e "const fs=require('fs'); const content=fs.readFileSync('.gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md','utf8'); const recipeStart=content.indexOf('## T02 Recipe'); const recipe=recipeStart>=0?content.slice(recipeStart):''; const bad=recipe.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(bad.length===0?'PASS':'FAIL:'+bad.length+' lines with non-ASCII');"
   ```

## Must-Haves

- [ ] `S20-CONTENT-DRAFT.md` existe y tiene contenido en ambas secciones S20-1 y S20-2.
- [ ] El bloque T02 Recipe contiene HTML verbatim para ambas cards.
- [ ] Todos los caracteres non-ASCII en el T02 Recipe están entity-encoded.
- [ ] S20-2 usa `data-certeza="opini&#xF3;n"` (entity-encoded).
- [ ] S20-1 usa imagen `Dorrego-fusilamiento.jpg` (500px thumb). S20-2 usa imagen `Juan_Lavalle.jpg` (500px thumb) — no `General_Don_Juan_LaValle.jpg` que ya está en S10-3.
- [ ] El contenido de S20 NO repite la narrativa de S13-1 (golpe, fusilamiento, Rosas-movilización, Puente de Márquez, Cañuelas, Barracas, elección 8 dic 1829).
- [ ] Node.js ASCII check devuelve PASS.

## Verification

- `test -s .gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md && echo DRAFT_OK`
- `grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md` → ≥ 1
- Node.js ASCII check en el bloque T02 Recipe → PASS

## Inputs

- `.gsd/milestones/M008/slices/S20/S20-RESEARCH.md` — contenido histórico, imágenes confirmadas, scope guard, fuentes, HTML pattern de referencia.
- `.gsd/milestones/M008/slices/S20/S20-CONTEXT.md` — contexto adicional del slice.
- S13-1 en `index.html` (línea ~1680 aprox) — leer para confirmar qué narrativa ya está cubierta y NO duplicar.
- S17-1 en `index.html` — leer para confirmar el patrón `data-certeza="opini&#xF3;n"` con icono 💬 que S20-2 debe seguir.

## Expected Output

- `.gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md` — draft completo con dos secciones de contenido histórico y un bloque T02 Recipe con HTML entity-encoded listo para splice.
