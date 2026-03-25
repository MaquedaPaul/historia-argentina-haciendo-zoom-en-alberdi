# M010: La Semana de Mayo — Cronología Detallada (14–30 de mayo de 1810)

**Vision:** Dar a los lectores la película completa de la Semana de Mayo: no solo el resultado del 25, sino el proceso político, las maniobras, los actores, los días de tensión que precedieron y siguieron a la formación de la Primera Junta.

## Success Criteria

- 7 cards day-by-day (14, 18, 22, 23, 24, 25, 30 de mayo) integradas en `index.html`
- 2–3 cards temáticas sobre las maniobras políticas (Legión ardiente, sobres duplicados, debate popular vs. élite)
- Cada card con ≥1 cita de fuente confiable
- El debate "revolución popular vs. golpe de élites" representado con `card-nota-historiografica`
- La card panorámica existente (SP1-1) se mantiene intacta
- No se introdujo CSS ni JS nuevo
- El sistema reveal-on-scroll funciona para todos los elementos nuevos

## Key Risks

- Verificación del nombre exacto de la "Legión ardiente/Infernal" — distintas fuentes usan distintas denominaciones
- Los "sobres duplicados" — el mecanismo exacto requiere fuentes primarias (Actas del Cabildo)
- El debate popular vs. élite requiere representación equilibrada de Mitre, Halperin y revisión posterior

## Slices

- [x] **S01: Research y content draft — 14 al 25 de mayo** `risk:high` `depends:[]`
  > After this: draft verificado con los 7 días clave + las maniobras políticas, fuentes identificadas, certeza asignada a cada claim. No hay HTML todavía.

- [x] **S02: Integración HTML — cards en index.html** `risk:medium` `depends:[S01]`
  > After this: las cards están integradas en `index.html` dentro del sub-período rev-1800-1820, después de la card SP1-1. El reveal-on-scroll funciona. El sitio es coherente visualmente.
