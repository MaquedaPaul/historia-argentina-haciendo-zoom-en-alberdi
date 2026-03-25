# S01: Infancia, familia y años formativos (1810–1824) — UAT

**Milestone:** M007
**Written:** 2026-03-20

## UAT Type

- UAT mode: live-runtime + artifact-driven
- Why this mode is sufficient: el slice produce HTML real integrado en un sitio estático. Las verificaciones de runtime (browser) confirman reveal-on-scroll, sub-nav funcional y contenido visible. Las verificaciones de artefacto (grep/node) confirman la integridad estructural del HTML. El contenido histórico fue revisado directamente en el HTML por T03. UAT humano puede validar precisión histórica y coherencia narrativa.

## Preconditions

1. El servidor de desarrollo debe estar corriendo (o abrir `index.html` directamente en browser).
2. El archivo `index.html` en el directorio del milestone debe tener `data-certeza count: 38` (verificar con: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log(m?m.length:0);"` → debe retornar `38`).
3. El archivo `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` debe existir con 4 bloques: `grep -c "^## Bloque" S01-CONTENT-DRAFT.md` → `4`.

## Smoke Test

Abrir el sitio en browser y navegar al período "Revolución e Independencia (1800–1860)". El sub-nav debe mostrar "1810–1824 / Infancia y Formación" como primer link. Hacer click — debe hacer smooth scroll a una sección con el título "Alberdi: Los años de formación (1810–1824)" y 4 cards visibles con reveal-on-scroll.

---

## Test Cases

### 1. Sub-nav link registrado y funcional

1. Abrir el sitio en browser y navegar a la sección `#periodo-revolucion`.
2. Localizar el sub-nav horizontal (sticky dentro de la sección).
3. Verificar que el primer link del sub-nav muestra el texto **"1810–1824"** con sublabel **"Infancia y Formación"**.
4. Hacer click en ese link.
5. **Expected:** La página hace smooth scroll hasta el bloque biográfico de Alberdi. El link queda visualmente activo (resaltado) en el sub-nav. La consola JS muestra `[SubNav] Active sub-period → rev-alberdi-formacion`.

### 2. Las 4 cards biográficas están presentes con certeza correcta

1. Navegar a la sección `#rev-alberdi-formacion` (via sub-nav o scroll directo).
2. Verificar que hay exactamente **4 event-cards** en esa sección.
3. Verificar los badges de certeza de cada card:
   - Card 1 (nacimiento/padre): badge **"Hecho documentado"** (verde).
   - Card 2 (hermanos/madre): badge **"Hecho documentado"** (verde).
   - Card 3 (posición Mayo): badge **"Opinión atribuida"** (azul) — con blockquote.
   - Card 4 (doble orfandad): badge **"Hecho documentado"** (verde).
4. **Expected:** 4 cards visibles con los badges de certeza correctos. Card 3 muestra un blockquote (no un párrafo regular).

### 3. Contenido histórico: fechas y nombres clave

1. Leer la Card 1 (nacimiento).
2. Verificar que menciona: **"29 de agosto de 1810"**, **"San Miguel de Tucumán"**, **"Salvador Alberdi"**, **"Manuel Belgrano"**, **"campañas del Norte (1812–1813)"**.
3. Leer la Card 2 (hermanos/madre).
4. Verificar que menciona: **"Josefa Rosa de Aráoz"**, **"Felipe"**, **"Tránsita"**, **"cuatro hermanos"**.
5. Leer la Card 4 (doble orfandad).
6. Verificar que la fecha de muerte del padre es **"1822"** (NO "1824") — con una nota `[Nota: la fecha 1822 aparece en Wikipedia EN...]`.
7. **Expected:** Todas las fechas y nombres son correctos según los puntos 2, 4 y 6. La fecha 1824 NO aparece como año de muerte del padre.

### 4. Flags epistémicos (card-nota-certeza) visibles

1. Navegar a `#rev-alberdi-formacion`.
2. En la Card 2 (hermanos/madre): verificar que aparece una nota inline `[Nota: las fuentes discrepan entre "al momento del parto" y "siete meses más tarde"...]`.
3. En la Card 3 (posición Mayo): verificar que aparece una nota inline `[Nota: la reflexión crítica adulta de Alberdi sobre los límites de Mayo es una lectura historiográfica establecida (Botana, 1984)...]`.
4. En la Card 4 (doble orfandad): verificar que aparece una nota inline `[Nota: la fecha 1822 aparece en Wikipedia EN y en elpensante.com...]`.
5. **Expected:** 3 notas epistémicas visibles en las cards 2, 3 y 4. Ninguna nota en la Card 1 (el nacimiento es el hecho mejor documentado del bloque).

### 5. Reveal-on-scroll funcional para las nuevas cards

1. Navegar al inicio de la página.
2. Abrir DevTools → consola.
3. Hacer scroll lento hasta `#rev-alberdi-formacion`.
4. Observar la consola mientras el sub-período entra en viewport.
5. **Expected:** La consola muestra:
   - `[Reveal] Revealed: div#rev-alberdi-formacion.sub-period.reveal--visible` (el div contenedor hace fade-in).
   - 4 líneas del tipo `[Reveal] Revealed: article.event-card.card-hecho...` (o `card-opinion`) con stagger visible.
   - Las cards hacen slide-in de forma escalonada (0ms → 80ms → 160ms → 240ms).

### 6. Fuentes citadas presentes en cada card

1. Navegar a `#rev-alberdi-formacion`.
2. En cada una de las 4 cards, verificar que hay un footer con `<cite>` que menciona al menos una fuente.
3. Verificar que Card 1 cita `Mi vida privada` (Alberdi) o Wikipedia EN.
4. Verificar que Card 3 cita **Botana** (1984) en la atribución de la blockquote.
5. Verificar que Card 4 cita **Wikipedia EN** y **JURSOC UNLP**.
6. **Expected:** Todas las cards tienen footer con `<cite>`. Las fuentes específicas mencionadas son verificables en los puntos 3–5.

### 7. Integridad del sistema de certeza (conteo total)

1. Ejecutar en terminal:
   ```
   grep -c 'data-certeza' index.html
   ```
2. **Expected:** retorna `38`.
3. Ejecutar:
   ```
   node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log('count:', m?m.length:0);"
   ```
4. **Expected:** `count: 38`.
5. Verificar que las cards existentes (pre-S01) no fueron alteradas: navegar al período colonial, revolucionario y nacional — sus cards deben aparecer normalmente.

---

## Edge Cases

### Sub-nav overflow en mobile

1. Redimensionar el browser a 375px de ancho (o usar DevTools → mobile).
2. Navegar a `#periodo-revolucion`.
3. **Expected:** El sub-nav no se desborda visualmente. Los 5 links son accesibles (scroll horizontal en el sub-nav o wrapping). El link "1810–1824" es visible y clickeable.

### Scroll desde el inicio activa correctamente el sub-period inicial

1. Cargar el sitio en `http://localhost` (o file://) sin hash en la URL.
2. Hacer scroll lento desde arriba hasta `#periodo-revolucion`.
3. **Expected:** El sub-nav activa inicialmente el sub-período que entra primero en viewport. Si `#rev-alberdi-formacion` es el primero, se activa su link. La consola muestra `[SubNav] Set initial active → #rev-alberdi-formacion` o el sub-período cronológico correcto si se aterriza más abajo.

### Card 3 como opinión no rompe el layout de la grid

1. Navegar a `#rev-alberdi-formacion`.
2. Verificar que la Card 3 (card-opinion con blockquote) tiene altura visual coherente con las otras cards.
3. **Expected:** Las 4 cards tienen alturas proporcionales dentro de `events-grid--certeza`. El blockquote de Card 3 está visualmente diferenciado (borde izquierdo o fondo distinto) respecto a los párrafos de las otras cards.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` retorna < 38 → cards faltantes o atributo eliminado en la integración.
- `grep -q 'rev-alberdi-formacion' index.html` falla → el sub-período no fue integrado o el id fue modificado.
- La consola JS muestra `[SubNav] Initialized with 4 sub-periods` (no 5) → el sub-nav link no fue añadido o tiene clase incorrecta.
- La consola JS muestra `[Reveal] Initialized with 52 elements` (no 57) → las nuevas cards no tienen clase `reveal`.
- El año de muerte del padre aparece como "1824" (no "1822") en Card 4 → el error del M007-CONTEXT se propagó.
- Card 3 tiene badge "Hecho documentado" (verde) en lugar de "Opinión atribuida" (azul) → certeza mal clasificada.
- Ningún `[Nota:...]` visible en las cards 2, 3 o 4 → los `card-nota-certeza` fueron eliminados o las incertidumbres no fueron documentadas.

---

## Not Proven By This UAT

- **Precisión histórica profunda** — este UAT verifica los datos que están en el HTML. La verificación de que esos datos son históricamente correctos requiere que el tester humano coteje con *Mi vida privada* (Alberdi, 1872–82) y Mayer, *Alberdi y su tiempo* (EUDEBA, 1963). Especialmente: fecha exacta de muerte de la madre, nombres de los 2 hermanos sin identificar, cita directa de Alberdi sobre Mayo.
- **Contenido de S02–S08** — este UAT solo cubre el sub-período 1810–1824. Los períodos posteriores se verifican en sus respectivos slices.
- **Performance / Lighthouse** — el sitio no fue auditado con Lighthouse en este slice. Se asume que el reuso de estilos y patrones existentes no introduce regresiones (sin CSS/JS nuevo).
- **Accesibilidad detallada** — no se verificó con lectores de pantalla. Se asume coherencia con los patrones de accesibilidad establecidos en M005 (ARIA labels, skip links).

---

## Notes for Tester

- **El error de fecha del padre (1822 vs 1824) es el check más importante.** El documento de planificación del milestone tenía "1824" como fecha de muerte. El HTML debe decir "1822". Si ves "1824" en la Card 4, es una regresión.
- **Card 3 es intencionalmente `card-opinion`, no `card-hecho`.** La reflexión crítica adulta de Alberdi sobre Mayo no tiene cita directa verificada; está basada en lectura historiográfica (Botana 1984). El badge azul "Opinión atribuida" es correcto.
- **Los `[Nota:]` inline son epistémicamente correctos**, no son errores. Señalan incertidumbres reales que no pudieron resolverse con fuentes secundarias accesibles. Son el equivalente del aparato crítico de una edición académica.
- **Cuatro cards es el contenido mínimo de S01.** El milestone completo (M007) tendrá 11+ bloques al finalizar. S01 cubre solo los años 1810–1824. Si el tester espera más profundidad, S02–S04 añaden la continuación cronológica y el perfil multifacético.
- La **anécdota de Belgrano sentando al niño Alberdi en sus rodillas** fue investigada pero no incluida como cita directa — está documentada en el CONTENT-DRAFT como tradición biográfica secundaria `[PARÁFRASIS/TRADICIÓN SECUNDARIA]`. No aparece en el HTML y eso es correcto.
