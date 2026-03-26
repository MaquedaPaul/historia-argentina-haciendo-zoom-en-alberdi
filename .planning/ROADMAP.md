# Roadmap: Historia Argentina — M023: Alto Peru y la Guerra Gaucha

## Overview

M023 is a content milestone that deepens the military front of Argentine independence. Three phases follow the narrative dependency chain: first, build the container sub-period and populate the northern failure arc (Suipacha through the "Por que Chile" synthesis card); second, add the defensive phase with Guemes and the republiquetas; third, close the arc with the Alberdi exit connector and a verification pass. The result is a coherent two-movement narrative — why the north failed, then how the frontier held anyway — inserted as a standalone sub-period inside the existing revolution section.

## Milestones

- **v1.1 M023 — Alto Peru y la Guerra Gaucha** — Phases 1-3 (in progress)

## Phases

- [ ] **Phase 1: Estructura y Arco del Norte** - New sub-period scaffold + five battle cards + "Por que Chile" synthesis card
- [ ] **Phase 2: Guerra Gaucha** - Guemes profile card + Azurduy/republiquetas card
- [ ] **Phase 3: Conector de Cierre y Verificacion** - Alberdi exit connector + animation and integration verification pass

## Phase Details

### Phase 1: Estructura y Arco del Norte
**Goal**: The new sub-period `rev-alto-peru-guerra-gaucha` exists in the page with all six northern-arc cards readable and the sub-nav link active
**Depends on**: Nothing (first phase)
**Requirements**: ARCO-02, INTG-02, ALTO-01, ALTO-02, ALTO-03, ALTO-04, ALTO-05, ARCO-01
**Success Criteria** (what must be TRUE):
  1. User sees "Alto Peru y la Guerra Gaucha" as a clickable entry in the sticky sub-nav and clicking it scrolls to the correct section
  2. User can expand the Suipacha card and read about the first patriot victory (1810) with sources cited
  3. User can expand the Huaqui card and see the nota-historiografica on the Castelli controversy
  4. User can expand Exodo Jujeno, Vilcapugio/Ayohuma, and Sipe-Sipe cards — each with verified Wikimedia image and certeza marker
  5. User can expand "Por que Chile" synthesis card and read the historiographic argument linking northern failures to the Andean strategy
**Plans**: 3 plans
Plans:
- [x] 01-01-PLAN.md — CSS rule for .card-nota-historiografica + sub-nav link + sub-period skeleton
- [ ] 01-02-PLAN.md — Battle cards: Suipacha, Huaqui (with nota-historiografica), Exodo Jujeno
- [ ] 01-03-PLAN.md — Battle cards: Vilcapugio/Ayohuma, Sipe-Sipe + synthesis card "Por que Chile"
**UI hint**: yes

### Phase 2: Guerra Gaucha
**Goal**: The two defensive-phase cards (Guemes and Azurduy/republiquetas) are live inside the sub-period and tell the response arc to the expedition failures
**Depends on**: Phase 1
**Requirements**: GAUC-01, GAUC-02
**Success Criteria** (what must be TRUE):
  1. User can expand the Guemes card and read his profile, gaucha tactics, frontier defense role, and death in 1821 — with Sara Mata cited as authority
  2. User can expand the Azurduy/republiquetas card and read about Juana Azurduy's correct historical rank (teniente coronel, 1816 decree), Padilla, Warnes, and the dispersed nature of the republiquetas
  3. The Guemes and Azurduy cards use card-opinion or card-nota-historiografica markers for contested interpretations
**Plans**: TBD

### Phase 3: Conector de Cierre y Verificacion
**Goal**: The full sub-period reads as a coherent narrative — Alberdi entry and exit connectors in place, reveal animations staggered correctly across all cards, no broken markup
**Depends on**: Phase 2
**Requirements**: INTG-01
**Success Criteria** (what must be TRUE):
  1. User reads the Alberdi entry connector framing Tucuman as the army's base and Alberdi as a witness-child (father knew Belgrano)
  2. User reads the Alberdi exit connector closing the northern arc before the rev-1820-1835 sub-period begins
  3. All cards in the sub-period reveal on scroll with correct stagger timing (no cards appear simultaneously or out of order)
**Plans**: TBD

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Estructura y Arco del Norte | M023 | 1/3 | In Progress|  |
| 2. Guerra Gaucha | M023 | 0/? | Not started | - |
| 3. Conector de Cierre y Verificacion | M023 | 0/? | Not started | - |
