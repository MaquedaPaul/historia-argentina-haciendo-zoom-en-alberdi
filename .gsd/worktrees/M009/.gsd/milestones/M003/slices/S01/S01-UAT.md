---
id: S01
parent: M003
type: artifact-driven
---

# S01: UAT

- `document.querySelectorAll('#periodo-revolucion [data-certeza]').length >= 15` — minimum card count
- `document.querySelectorAll('#periodo-revolucion [data-certeza="hecho"]').length >= 10` — hecho count
- `document.querySelectorAll('#periodo-revolucion [data-certeza="opinion"]').length >= 4` — opinión count
- `document.querySelectorAll('#periodo-revolucion [data-certeza="rumor"]').length >= 1` — rumor count
- `document.querySelectorAll('#periodo-revolucion .sub-period').length === 4` — all 4 sub-periods present
- `document.querySelectorAll('#periodo-revolucion .card-image img').length >= 14` — images present
- `document.querySelectorAll('#periodo-revolucion cite').length >= 10` — source citations on hecho cards
- `document.querySelectorAll('#periodo-revolucion .alberdi-quote').length >= 3` — Alberdi connecting text
- Visual: all cards render with correct certeza styling (green/blue/amber indicators)
- Visual: images load or fallback gracefully (no broken image icons)
- Visual: stagger reveal animations fire on scroll
- Diagnostic: `document.querySelectorAll('#periodo-revolucion .img-error, #periodo-revolucion .img-fallback').length === 0` — no broken image fallbacks active (failure-path check)
