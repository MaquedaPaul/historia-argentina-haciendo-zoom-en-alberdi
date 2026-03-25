---
id: S01
parent: M004
type: artifact-driven
---

# S01: UAT

- `document.querySelectorAll('#periodo-nacional [data-certeza]').length === 7`
- `document.querySelectorAll('#periodo-nacional .card-image img').length === 7`
- `document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length === 0`
- `document.querySelectorAll('#periodo-nacional cite').length >= 7`
- `document.querySelector('#periodo-nacional .events-grid--certeza') !== null`
- Visual check: cards render at 1200px and 375px without overflow or broken images
