# S14 — El segundo gobierno de Rosas — el Restaurador — Research

**Date:** 2026-03-23

## Summary

S14 is well-understood work following established patterns. The slice must add ≥2 cards to `#periodo-rosas` narrating the second mandate (1835–1852): the Suma del Poder Público acquisition, the Mazorca, the French blockade (1838–1840), the Battle of Vuelta de Obligado (1845), and the fall at Caseros (1852). The M008-CONTEXT.md already specifies exactly which events to cover and which certeza levels to apply.

**Critical context:** The M003 sub-period `#rev-1835-1852` already contains SP3 cards covering the Suma del Poder Público and the Mazorca from Alberdi's perspective. S14 must NOT duplicate that content — it must add different, complementary cards to the `#periodo-rosas` container (the M008-specific events-grid). The S14 cards approach the second mandate from a chronological/political-history angle, not from the Alberdi-exile angle already covered in SP3.

**Recommended scope:** 3 cards total:
- **S14-1 (card-hecho):** El retorno de Rosas y la Suma del Poder Público (1835) — how he returned, the plebiscite mechanics, the title "Restaurador de las Leyes", the Suma as legal instrument. Certeza: `hecho`.
- **S14-2 (card-hecho):** Diecisiete años de Confederación — bloqueo francés, Vuelta de Obligado, y Caseros (1835–1852) — the major political/military events of the mandate. Certeza: `hecho`.
- **S14-3 (card-opinion, data-certeza="debatido"):** ¿Qué fue el régimen rosista? La certeza diferenciada — a brief `card-opinion` with `card-nota-historiografica` note that the nature of the regime is historiographically debated. This seeds the debate that S15–S19 will develop in depth.

Two hecho cards is the minimum (per roadmap), but a third brief opinion/debatido card is justified because S14's roadmap entry explicitly mentions "Explica por qué lo llamaban 'el Restaurador de las Leyes'" and notes `debatido` as a certeza for the nature of the regime. The third card sets up the debate slices (S15–S19) without preempting them.

## Recommendation

Use the same **content-draft → verbatim-splice** workflow established in S09–S13:
1. **T01** writes `S14-CONTENT-DRAFT.md` with full prose, source verification, and a complete "T02 Recipe HTML block" ready for verbatim splice.
2. **T02** performs the Node.js splice, inserts cards before the append marker, verifies counts.

No CSS or JS changes. No new card types. `card-opinion` with `data-certeza="debatido"` is the correct mapping for the "debated nature of the regime" card — the CSS does not have a `card-debatido` class and the zero-new-CSS constraint is binding.

## Implementation Landscape

### Key Files

- `index.html` — Insert 3 new cards before the marker at **line 1717** (`<!-- S10–S24 cards will be appended here by subsequent slices -->`). Current `data-certeza` count: **71**. Post-S14 target: **74**.
- `.gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` — Write this in T01. Contains all prose, sources, image URLs, and verbatim T02 Recipe HTML block.
- `C:/tmp/s14-cards.html` — Temp file for T02 recipe HTML (Write tool, not heredoc).
- `C:/tmp/index.html.bak-s14` — Recovery backup before splice.

### Confirmed Image Candidates (not already used)

| Filename (Wikimedia Commons) | Thumb URL | Size | License | Use |
|------------------------------|-----------|------|---------|-----|
| `Divisas de la época de Rosas.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Divisas_de_la_%C3%A9poca_de_Rosas.jpg/500px-Divisas_de_la_%C3%A9poca_de_Rosas.jpg` | 700×467 | CC BY 2.5 ar | S14-1 (divisa punzó, Suma) |
| `Batalla de la Vuelta de Obligado.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Batalla_de_la_Vuelta_de_Obligado.jpg/500px-Batalla_de_la_Vuelta_de_Obligado.jpg` | 2181×1532 | Public domain | S14-2 (bloqueo/Caseros events) |
| `Bloqueo frances 1838.png` | `https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Bloqueo_frances_1838.png/500px-Bloqueo_frances_1838.png` | 742×506 | CC BY 4.0 | Alternative for S14-2 |
| `Encarnacion Ezcurra 1835.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Encarnacion_Ezcurra_1835.jpg/500px-Encarnacion_Ezcurra_1835.jpg` | 834×1000 | (confirm PD) | Reserve for S23 |

**Already used and unavailable for S14:**
- `Juan_Manuel_de_Rosas_1829.jpg` (S13-1)
- `Juan_Manuel_de_Rosas_by_Descalzi_oval.png` (S13-2)
- `Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas,_1842.jpg` (SP3-1)
- `Retrato_de_Juan_Manuel_de_Rosas.jpg` (SP3-2)
- `Batalla_de_Caseros_3_Febrero_1852.jpg` (SP3-6)
- `Juan_Manuel_de_Rosas.jpg` (S12)
- `Retrato_del_General_Juan_Manuel_de_Rosas.jpg` (S12)

**Image assignment:**
- **S14-1** → `Divisas de la época de Rosas.jpg` (the divisa punzó is the most visually distinctive symbol of the rosista regime and connects to the "por qué lo llamaban Restaurador" narrative). CC BY 2.5 ar attribution required.
- **S14-2** → `Batalla de la Vuelta de Obligado.jpg` (Public domain, the decisive soberanía event that best represents the whole mandate's geopolitical dimension).
- **S14-3** (opinion/debatido card) — no image needed if prose is brief; alternatively reuse a pre-approved Rosas portrait from earlier (SP3 cards are in a different sub-period container, so technically not reused within `#periodo-rosas` — but ideologically it's cleaner to omit or use a distinct image). Omit image from S14-3 to keep it lean — the card is a historiographic note, not a narrative event.

### Content Coverage for S14

Per M008-CONTEXT.md § S14:

**S14-1 content (card-hecho):**
- After Quiroga's assassination (February 1835), political crisis → Legislatura called Rosas back.
- This time he demanded and received the Suma del Poder Público.
- Plebiscite of March 1835: 9,320 votes in favor, 4 against (per M008-CONTEXT.md — note: SP3-1 has 9,316, a discrepancy to resolve; the primary source is Zinny/Saldías; T01 should verify and use consistent figure).
- Title "Restaurador de las Leyes": self-designated to contrast with unitarios who had "violated the federal constitution."
- The Suma: concentrated executive, legislative, and judicial power in one person (gobernador de Buenos Aires).
- **S13 Forward Intelligence hook**: "When Rosas returned in 1835, he demanded and received the Suma del Poder Público he had been denied in 1832." This explicit callback to S13-2 is required per S13 Forward Intelligence.

**S14-2 content (card-hecho):**
- Mandate timeline: 1835–1852 (17 years).
- La Mazorca: operating especially 1839–1842 (note: SP3-2 already covers the Mazorca, so S14-2 should cover events NOT covered there — bloqueo francés and Vuelta de Obligado primarily).
- French blockade (1838–1840): French ships blockaded Buenos Aires over treatment of French citizens; Rosas refused to negotiate humiliating terms; French withdrew in 1840 (Convention Mackau).
- Anglo-French blockade and Vuelta de Obligado (1845): British and French ships forced passage up the Paraná; Argentine batteries at Vuelta de Obligado (20 November 1845) fought back and were defeated militarily but the action became a symbol of resistance; the blockade was ultimately lifted by 1850.
- Battle of Caseros (3 February 1852): Urquiza's coalition (Entre Ríos, Corrientes, Brazil, Uruguay) defeated Rosas; Rosas fled to England and died in exile in 1877.

**S14-3 content (card-opinion, data-certeza="debatido"):**
- Brief card with `card-nota-historiografica` noting: the nature of the rosista regime is one of the most contested questions in Argentine historiography. S15–S19 develop the debate in full. This card signals the upcoming debate without resolving it.
- Can use a paraphrase attribution to Halperín Donghi: the regime was an "authoritarian system of personal power" that was neither the barbaric tyranny of the liberal school nor the popular-sovereignty model of revisionism.

### Plebiscite Vote Count Discrepancy

- **M008-CONTEXT.md** (preloaded): 9,320 votes for, 4 against.
- **SP3-1 card already in index.html**: 9,316 votes for, 4 against.

T01 must verify against the primary sources cited: Saldías (*Historia de la Confederación Argentina*, t. II) and Lynch (*Argentine Dictator*, cap. 5). The most commonly cited figure in secondary literature is 9,316 — the 9,320 in CONTEXT.md may be a rounding artifact. S14-1 prose should use whichever figure T01 verifies; if the figure in SP3-1 (9,316) is authoritative, S14-1 should match it to avoid visible contradictions on the same page.

### Build Order

1. **T01** — Content draft: write S14-CONTENT-DRAFT.md with verified prose for 3 cards + T02 Recipe HTML block. Verify plebiscite figure against sources. Flag CC BY 2.5 ar image attribution.
2. **T02** — Splice: backup index.html, write C:/tmp/s14-cards.html via Write tool, Node.js splice using ASCII-only marker substring `'cards will be appended here by subsequent slices'`, verify counts.

### Verification Approach

```bash
# After T02 splice:
grep -c 'data-certeza' index.html          # Must be 74 (71 + 3)
grep -c 'data-id="S14-' index.html         # Must be 3 (unambiguous — data-id attr only)
grep -c 'cards will be appended here' index.html  # Must remain 1
git diff --name-only HEAD -- styles.css app.js    # Must be empty
test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK
```

Browser DOM check:
```js
document.querySelectorAll('[data-id^="S14-"]').length  // Must be 3
```

## Common Pitfalls

- **Duplicate content with SP3:** The `#rev-1835-1852` sub-period already has Suma del Poder Público (SP3-1) and Mazorca (SP3-2) from M003. S14 cards go into `#periodo-rosas`, a different container. The content must complement — not repeat — the SP3 cards. S14-1 covers the *political mechanics of the return and Suma acquisition* (S13 continuation); SP3-1 covers the *Alberdi-context overview of the Suma*. These are different angles on the same fact.
- **Plebiscite vote count:** 9,316 vs 9,320 — resolve in T01. Use consistent figure with SP3-1.
- **En-dash in marker:** Use ASCII-only substring `'cards will be appended here by subsequent slices'` in Node.js indexOf — NOT the full comment with the en-dash (`–`). This is documented in KNOWLEDGE.md.
- **Stagger delays:** Reset to 0ms / 80ms / 160ms for S14's own 3 cards. Do NOT continue cumulative delay from S13.
- **Windows /tmp:** Use `C:/tmp/` not `/tmp/`. Create with `mkdir -p C:/tmp` before writing.
- **grep-c 'S14-' multiplier:** Since S13 established that cards now use both HTML comments AND data-id attributes, `grep -c 'S14-'` will return 6 for 3 cards (2 matches per card). Use `grep -c 'data-id="S14-'` for an unambiguous 1-per-card count.
- **CC BY 2.5 ar attribution:** `Divisas de la época de Rosas.jpg` requires attribution. Place `<p class="img-attribution">` inside `.card-image` immediately after `<img>` (per KNOWLEDGE.md CC BY-SA Attribution Block Placement pattern).

## Sources

Historical content for S14 cards draws on:
- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 5–10.
- Saldías, A., *Historia de la Confederación Argentina*, t. II–III, 1892.
- Halperín Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972.
- Myers, J., *Orden y virtud: el discurso republicano en el régimen rosista*, UNQ, 1995.
- Rosa, J. M., *Historia Argentina*, t. IV–V, Oriente, 1964.
- Irazusta, J. e I., *La Argentina y el imperialismo británico*, 1934.
