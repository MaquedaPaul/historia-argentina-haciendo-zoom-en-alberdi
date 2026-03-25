# Historia Argentina 1500-1900 — Proyecto Web

## Visión
Página web interactiva, multimedia e inmersiva que narra la historia argentina desde 1500 hasta 1900. **Juan Bautista Alberdi** es el hilo conductor narrativo — el intelectual que pensó el país desde las ideas — sin eclipsar a los demás próceres.

### Contenido multimedia
- **Texto** con tres niveles de certeza claramente diferenciados
- **Imágenes** históricas (ilustraciones, pinturas, fotos de época)
- **Videos** embebidos (documentales, recreaciones)
- **Animaciones** CSS/JS (mapas interactivos, transiciones)
- **Sonidos** ambientales de época (opcionales, sin narración de voz)

### Niveles de certeza
Todo contenido está clasificado y marcado visualmente:
1. 🟢 **Hecho fáctico** — Documentado, verificado, con fecha y fuente
2. 💬 **Opinión de prócer** — Cita atribuida con autor, fecha, contexto (carta, discurso, libro)
3. ⚠️ **Rumor / Especulación** — Marcado explícitamente como tal, con origen si se conoce

### Rigurosidad histórica
Cada milestone de contenido incluye una fase obligatoria de verificación: fechas, nombres, lugares, secuencia de eventos y citas textuales contrastadas contra fuentes fiables.

---

## Estructura de Períodos

| Período | Nivel de detalle | Enfoque |
|---------|-----------------|---------|
| **1500–1800** | 📋 Panorámico | Pueblos originarios, conquista, colonia, virreinato, invasiones inglesas |
| **1800–1860** | 🔍 **Foco detallado** | Revolución, independencia, guerras civiles, Rosas, Caseros, Constitución 1853. **Alberdi como hilo conductor.** |
| **1860–1900** | 📋 Panorámico | Organización nacional, presidencias, inmigración, modernización. Cierre de Alberdi. |

---

## Milestones

| ID | Nombre | Descripción | Estado |
|----|--------|-------------|--------|
| M001 | Fundación y Estructura Base | Setup web, layout, navegación, timeline, estilos base, JS base | not started |
| M002 | Período 1500-1800 | Contenido panorámico colonial + verificación histórica | not started |
| M003 | Período 1800-1860 | Contenido detallado revolución/independencia + Alberdi + verificación | not started |
| M004 | Período 1860-1900 | Contenido panorámico organización nacional + verificación + cierre Alberdi | not started |
| M005 | Pulido Final y Deploy | Animaciones, sonidos, responsividad, optimización, publicación | not started |

---

## Tech Stack
- HTML5 semántico
- CSS3 (custom properties, grid, flexbox, animaciones)
- JavaScript vanilla (Intersection Observer, scroll spy, audio API)
- Zero build step — deploy directo en hosting estático
