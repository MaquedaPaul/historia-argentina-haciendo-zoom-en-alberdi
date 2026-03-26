# Pitfalls Research — M023 Alto Peru y Guerra Gaucha

## Historical Myths to Avoid

### P1: Huaqui como "culpa de Castelli"
- **Myth:** Castelli perdio Huaqui por incompetencia o por sus excesos jacobinos
- **Reality:** La derrota tuvo causas multiples: terreno desfavorable, deserciones masivas de tropas altoperuanas, superioridad numerica realista bajo Goyeneche. Castelli cometio errores tacticos pero no fue el unico responsable
- **Prevention:** Usar card-nota-historiografica para marcar la interpretacion

### P2: Guemes como "gaucho barbaro" o como "heroe inmaculado"
- **Myth:** Las dos versiones extremas — el caudillo salvaje (vision unitaria/portena) o el santo patriota (vision salteña revisionista)
- **Reality:** Guemes fue un hacendado militar con estrategia sofisticada, alianzas complejas con las elites saltenas, y conflictos internos. Su guerra gaucha fue efectiva pero tambien tuvo costos sociales
- **Prevention:** Citar Sara Mata (2008) que trata el tema con matiz social. Usar nivel de certeza "opinion" para interpretaciones

### P3: Juana Azurduy como "generala"
- **Myth:** Se le atribuye frecuentemente el rango de "generala" o "coronela" de forma imprecisa
- **Reality:** Pueyrredon le otorgo el grado de teniente coronel el 13 de agosto de 1816. El grado postumo de generala fue otorgido por Cristina Fernandez en 2009
- **Prevention:** Citar la fecha exacta del decreto y distinguir rango historico de homenaje postumo

### P4: Las republiquetas como "guerrillas organizadas"
- **Myth:** Presentarlas como un movimiento coordinado de resistencia
- **Reality:** Fueron focos dispersos, a menudo aislados entre si, con liderazgos locales independientes. Algunas duraron anos, otras semanas
- **Prevention:** No usar lenguaje que implique coordinacion central

### P5: Sipe-Sipe como "perdida de Bolivia"
- **Myth:** Bolivia se "perdio" en Sipe-Sipe
- **Reality:** El Alto Peru nunca fue controlado establemente por Buenos Aires despues de Huaqui. Sipe-Sipe fue la ultima expedicion formal pero el control ya se habia perdido. Bolivia se independizo como estado propio en 1825 bajo Bolivar
- **Prevention:** Distinguir entre control militar (perdido gradualmente 1811-1815) e independencia politica (1825)

## Structural/Performance Pitfalls

### S1: Exceso de cards en un sub-periodo
- **Risk:** Meter 10+ cards en un solo sub-periodo rompe el ritmo visual
- **Prevention:** Maximo 8-10 cards por sub-periodo. Si hay mas, dividir en bloques tematicos dentro del sub-periodo

### S2: content-visibility y cards nuevas
- **Risk:** Agregar 8-12 cards aumenta el height del periodo revolucion, que ya usa content-visibility:visible como excepcion
- **Prevention:** Recalcular contain-intrinsic-size despues de agregar cards. No cambiar content-visibility:visible para revolucion

### S3: Duplicacion con SP1-3
- **Risk:** La card existente SP1-3 ya menciona "Belgrano en el Norte, San Martin en Cuyo" panoramicamente
- **Prevention:** Las cards nuevas profundizan batallas especificas — no repiten el panorama. Agregar un link interno desde SP1-3 al nuevo sub-periodo si es posible

### S4: Imagenes de Wikimedia para batallas menores
- **Risk:** Vilcapugio, Ayohuma, Sipe-Sipe no tienen categorias dedicadas en Commons
- **Prevention:** Usar retratos de figuras clave (Belgrano, Guemes) o mapas de la categoria Maps of Argentine War of Independence como fallback

### S5: Alberdi como nino
- **Risk:** Forzar la conexion narrativa con Alberdi cuando tenia 1-11 anos durante estos eventos
- **Prevention:** Usar framing de "testigo-nino" geografico (Tucuman era base de operaciones) y referencias a sus escritos adultos, no inventar memorias infantiles
