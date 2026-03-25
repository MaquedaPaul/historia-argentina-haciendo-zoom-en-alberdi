# T02: Research bloque 2 — Reconquista, regimientos y figuras criollas

**Slice:** S01
**Milestone:** M020

## Goal

Producir las entradas del content draft sobre: la Reconquista de agosto 1806, los roles de Liniers y Álzaga, la destitución de Sobremonte, la formación de los regimientos criollos, y las trayectorias emergentes de Belgrano, Saavedra y Pueyrredón.

## Must-Haves

### Truths
- Entry sobre Santiago de Liniers: quién era (marino francés al servicio español), cómo organizó la reconquista desde Montevideo y la Banda Oriental, qué fuerzas reunió, cómo atacó y desde dónde, la fecha de la rendición de Beresford
- Entry sobre Martín de Álzaga: quién era (comerciante vasco, alcalde del Cabildo), su rol durante la Reconquista — con `card-nota-historiografica` si el debate sobre si coordinó milicias armadas o solo logística/comunicaciones no tiene resolución clara en las fuentes
- Entry sobre la destitución de Sobremonte: el Cabildo lo destituye después de la Reconquista — explicar que es la primera vez que un cuerpo colonial destituye a un virrey sin orden de la Corona; las consecuencias políticas
- Entry sobre los regimientos criollos: qué regimientos se formaron (Patricios, Arribeños, Húsares de Pueyrredón, Montañeses, Gallegos, Andaluces, Cántabros), cómo se convocó el reclutamiento, el sistema de elección de líderes por voto dentro del cuerpo (hecho inédito en el sistema colonial)
- Entry sobre la rivalidad Liniers vs. Álzaga por el mérito de la Reconquista: ambos reclaman el protagonismo — el militar francés vs. el comerciante español del Cabildo — y sus destinos opuestos en 1810 (Liniers fusilado como contrarrevolucionario en Córdoba, Álzaga ejecutado por intentar un contragolpe español en Buenos Aires)
- Entry sobre Belgrano durante las invasiones: secretario del Consulado → se niega a jurar lealtad a Beresford → se incorpora a los Patricios → las invasiones como su punto de quiebre hacia lo militar
- Entry sobre Saavedra: participación en la Reconquista → elegido comandante de los Patricios → cómo ese poder militar criollo lo lleva a presidir la Primera Junta
- Entry sobre Pueyrredón: su rol en las invasiones, qué regimiento lideró
- Verificar y decidir sobre Salvador María Alberdi (padre de Juan Bautista): ¿estuvo en Buenos Aires? ¿participó? Si hay evidencia, incluir como hilo narrativo; si no, documentar la ausencia de evidencia
- Cada entry: certeza asignada, ≥2 fuentes, imagen identificada

### Artifacts
- Entradas INV-6 a INV-12 agregadas a `.gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md`

### Key Links
- La entry sobre la destitución de Sobremonte continúa la narrativa de T01 (fuga y tesoro)
- Las entries de regimientos establecen los actores que T03 necesita para la segunda invasión y el nexo con Mayo 1810

## Steps

1. Buscar: Santiago de Liniers Buenos Aires reconquista 1806 — origen, fuerzas, trayecto desde Montevideo, fecha exacta
2. Buscar: Martín de Álzaga reconquista Buenos Aires — rol exacto en agosto 1806, qué coordinó
3. Buscar: destitución de Sobremonte Cabildo Buenos Aires 1807 — proceso, fundamentos, precedente histórico
4. Buscar: regimientos criollos Buenos Aires 1806 1807 — lista completa, fechas de creación, líderes
5. Buscar: Patricios regimiento Buenos Aires Saavedra — formación, elección de Saavedra como comandante
6. Buscar: Manuel Belgrano invasiones inglesas 1806 — juramento británico, incorporación a los Patricios
7. Buscar: Juan Martín de Pueyrredón invasiones inglesas — rol específico
8. Buscar: Salvador María Alberdi Buenos Aires 1806 — cualquier evidencia de presencia o participación
9. Buscar: rivalidad Liniers Álzaga reconquista Buenos Aires — fuentes historiográficas sobre el debate de mérito
10. Buscar imágenes Wikimedia: Liniers, Álzaga, Saavedra, Belgrano (ya existe en HTML pero verificar URL válida), Pueyrredón
11. Redactar entradas T02 con formato consistente
12. Escribir T02-DRAFT-PARTIAL.md

## Context

- La rivalidad Liniers-Álzaga tiene resolución narrativa fuerte: ambos son ejecutados en 1810, pero por bandos opuestos. Liniers es visto como símbolo realista por los revolucionarios; Álzaga como símbolo español-peninsular. Esta ironía debe quedar en la card.
- El sistema de elección popular de líderes en los regimientos es uno de los hechos más significativos del período: por primera vez, los criollos eligen a sus propios jefes militares. Esto es el embrión institucional de Mayo 1810.
- Para Belgrano: verificar la historia del juramento — Beresford exigió juramento de lealtad a la Corona británica, Belgrano (y otros) se negaron. Esto es un hecho documentado pero verificar fuente primaria.
- Saavedra era hacendado porteño, no militar profesional — su elección como comandante de los Patricios fue política y social, no por mérito castrense.
- Patrón de certeza: la destitución de Sobremonte → `card-hecho` (documentado en actas); la coordinación exacta de Álzaga → `card-opinion` o `card-hecho` con `card-nota-historiografica` según lo que encuentren las fuentes.

## Observability Impact

**Signals this task changes:**
- `T02-DRAFT-PARTIAL.md` created on disk with 7 entries (INV-06 to INV-12)
- `grep -c "^## Evento INV-" T02-DRAFT-PARTIAL.md` → should return 7
- `cat T01-DRAFT-PARTIAL.md T02-DRAFT-PARTIAL.md | grep -c "^## Evento INV-"` → should return 12

**How a future agent inspects this task:**
```bash
# Verify T02 is complete
grep "\[x\] \*\*T02" .gsd/milestones/M020/slices/S01/S01-PLAN.md

# Check entries produced
grep "^## Evento INV-" .gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md

# Check historiographic debates documented
grep -A3 "card-nota-historiografica" .gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md

# Check image verification table
tail -12 .gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md

# Check combined count with T01
cat .gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md .gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md | grep -c "^## Evento INV-"
```

**Failure state visibility:**
- If T02-DRAFT-PARTIAL.md is missing or has <7 entries → task did not complete
- If `grep -c "card-nota-historiografica" T02-DRAFT-PARTIAL.md` returns 0 → historiographic debates not documented
- If `grep -c "[PLACEHOLDER" T02-DRAFT-PARTIAL.md` > 1 → more images need verification
- Accepted failure: 1 placeholder (soldado Patricios) — no Commons file found; documented explicitly
