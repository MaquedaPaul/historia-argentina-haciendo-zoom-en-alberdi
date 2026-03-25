# T01: Research bloque 1 — Caída de Buenos Aires, Sobremonte y el tesoro

**Slice:** S01
**Milestone:** M020

## Goal

Producir las entradas del content draft sobre: la expedición Popham/Beresford, la defensa mínima de 1806, la caída de la ciudad, la fuga de Sobremonte, el tesoro real capturado, y el contexto del virreinato (Pedro de Cevallos, Cisneros).

## Must-Haves

### Truths
- Entry sobre la expedición de Popham/Beresford: quiénes eran, que no tenían autorización de Londres, por qué atacaron Buenos Aires (oportunismo post-Ciudad del Cabo), con qué fuerzas (1.600 hombres), fecha exacta
- Entry sobre la defensa mínima: escaramuzas en Quilmes y Riachuelo, ausencia de resistencia organizada, la ciudad cae en ~2 días
- Entry sobre Sobremonte: quién era, qué hizo durante el ataque (abandonó la ciudad), adónde fue (Córdoba), qué pasó con el tesoro real
- Entry sobre el tesoro real: cantidad capturada (~1.086.000 pesos fuertes), qué parte logró Sobremonte llevarse, qué parte tomaron los británicos, cómo fue trasladado a Londres, fuente documentada
- Entry contextual sobre el Virreinato del Río de la Plata: Pedro de Cevallos como primer virrey (1776), la estructura que hereda Sobremonte, y Cisneros como último virrey (llega 1809 después de las invasiones)
- Por qué Beresford pidió refuerzos antes de que hubiera resistencia visible: su evaluación de la situación (ciudad de 40.000 habitantes con 1.600 soldados)
- Cada entry: certeza asignada, ≥2 fuentes verificadas, imagen Wikimedia identificada o nota de placeholder

### Artifacts
- `.gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md` — entradas 1–5 del content draft con formato consistente

### Key Links
- Las entradas de T01 alimentan directamente el content draft final de S01
- La información del tesoro y la destitución de Sobremonte se enlaza narrativamente con la entry de T02 sobre la Reconquista y las consecuencias políticas

## Steps

1. Buscar en web: expedición Popham Buenos Aires 1806 — fecha exacta, origen en Ciudad del Cabo, fuerza total, autorización
2. Buscar: detalles de la defensa de Buenos Aires junio 1806 — Quilmes, Riachuelo, Sobremonte posición
3. Buscar: Sobremonte fuga Buenos Aires 1806 tesoro real — monto exacto, fuentes primarias
4. Buscar: Beresford Buenos Aires 1806 gobernador — sus decretos, por qué pidió refuerzos, número exacto de hombres
5. Buscar: Pedro de Cevallos primer virrey Río de la Plata 1776 — contexto del virreinato
6. Buscar: Baltasar Hidalgo de Cisneros último virrey Buenos Aires — cuándo llegó y su rol posterior
7. Buscar imágenes Wikimedia para cada figura (Beresford, Sobremonte, Popham) usando API o búsqueda directa
8. Verificar URLs de imágenes via Wikimedia API (`/w/api.php?action=query&titles=File:...&prop=imageinfo&iiprop=url&iiurlwidth=500`)
9. Redactar entradas T01 en formato draft con título, año, certeza, excerpt, detalle, fuentes, imagen
10. Escribir T01-DRAFT-PARTIAL.md

## Context

- El formato de cada entry en el draft: `## Evento INV-N: Título`, `**Año/Período:**`, `**Certeza:**`, `**Excerpt:**` (2–4 oraciones), `**Detalle expandible:**` (2–4 párrafos), `**Fuentes:**` (≥2), `**Imagen:**` (URL + alt text o `[PLACEHOLDER: descripción]`), `**Notas:**` (flags para nota-historiografica, card-rumor, etc.)
- Fuentes confiables para este período: Roberts, C., *Las invasiones inglesas del Río de la Plata (1806-1807)*, Emecé, 1938; Ferns, H.S., *Britain and Argentina in the Nineteenth Century*, Oxford, 1960; Ternavasio, M., *Historia de la Argentina 1806-1852*, Siglo XXI, 2009; Actas del Cabildo de Buenos Aires (AGN)
- La card panorámica existente en la sección colonial (línea ~220 de index.html) usa como fuente: Roberts 1938 y Actas del Cabildo — estas son las fuentes de referencia correctas
- El monto del tesoro varía entre fuentes — documentar la variación y usar la fuente más específica disponible
- Wikimedia tiene imágenes de Sobremonte, Beresford y Popham — verificar con API antes de asumir disponibilidad
