---
id: S02
parent: M004
milestone: M004
provides:
  - .nacional-timeline element with 7 date markers (1862, 1865, 1878, 1880, 1884, 1890, 1900) at calculated positions across 1860–1900 span
  - Scoped CSS keyframes: nac-timeline-fill (progress bar), nac-marker-pop (dot), nac-label-fade / nac-label-fade-above (labels)
  - prefers-reduced-motion final-state block (no animation, all elements at terminal state)
  - Reveal system integration via .reveal .reveal-fade — auto-discovered as 52nd reveal element
  - --above modifier on 1880 marker to prevent overlap with 1878 (45%/50% cluster)
  - Final verification confirming all 10 M004 success criteria PASS at 1280px desktop and 375px mobile
  - Regression confirmation: colonial, revolución, scroll spy, sub-nav, expand/collapse all unaffected
key_files:
  - index.html
  - styles.css
key_decisions:
  - data-certeza="opinion" (no accent) used on Alberdi card — consistent with prior-period normalization; verification must query both variants
  - nth-child(2)–nth-child(8) selectors used for dot stagger because __progress div is first child of __track
  - 1880 marker placed --above to resolve 45%/50% overlap with 1878 marker
  - Keyframe scope prefixed "nac-" to avoid collision with colonial ("col-") and revolucion keyframes
patterns_established:
  - data-certeza accent normalization: "opinion" (no accent) is valid; all verification queries must use [data-certeza="opinion"],[data-certeza="opinión"] compound selector
  - Third nacional-timeline variant — identical structural pattern as colonial-timeline and revolucion-timeline; nth-child stagger offset of +1 due to __progress being first child of __track
observability_surfaces:
  - document.querySelectorAll('#periodo-nacional [data-certeza]').length === 7
  - document.querySelectorAll('#periodo-nacional .card-image img').length === 7
  - document.querySelector('#periodo-nacional .events-grid--certeza') !== null → true
  - document.querySelectorAll('.nacional-timeline__marker').length === 7
  - document.querySelectorAll('.reveal').length === 52 (was 51 before S02/T01)
  - document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length === 0
verification_result: passed
completed_at: 2026-03-19T21:09:00.000Z
---

# S02: Slice Summary

- **T01**: Added `.nacional-timeline.reveal.reveal-fade` with 7 date markers to `#periodo-nacional`, scoped CSS keyframes (`nac-timeline-fill`, `nac-marker-pop`, `nac-label-fade`, `nac-label-fade-above`), and `prefers-reduced-motion` support — reveal system auto-discovered as 52nd element; timeline animates on scroll at desktop and mobile.
- **T02**: Final verification pass — all 10 M004 success criteria PASS at 1280px desktop and 375px mobile; zero console errors; colonial/revolución/sub-nav/expand-collapse systems unaffected; one finding: `data-certeza="opinion"` (no accent) is the actual DOM value for the Alberdi card, matching prior-period normalization — queries must handle both variants.
