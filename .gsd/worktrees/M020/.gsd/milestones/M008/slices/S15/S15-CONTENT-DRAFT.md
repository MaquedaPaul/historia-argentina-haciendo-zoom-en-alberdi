# S15 Content Draft — El asesinato de Facundo Quiroga — ¿fue Rosas?

**Slice:** S15 | **Milestone:** M008
**Cards:** S15-1 (card-hecho) + S15-2 (card-opinion/debatido)
**Target section:** `#periodo-rosas`, before the append marker

---

## Overview

Two cards narrate the Barranca Yaco ambush of 16 February 1835 and the open historiographic debate on intellectual authorship:

- **S15-1** (`card-hecho`, `data-certeza="hecho"`, 0ms stagger): The documented facts — mission context, ambush, material executors, trial and execution of the Reinafé brothers on 25 October 1837. Image: Descalzi painting, public domain.
- **S15-2** (`card-opinion`, `data-certeza="debatido"`, 80ms stagger): Three hypotheses on who ordered the murder (Reinafé solos / Rosas as intellectual author / Heredia as accomplice), with a `card-nota-historiografica` block presenting the liberal, revisionist, and contemporary-synthesis positions. No image.

---

## Card S15-1: La emboscada de Barranca Yaco (16 de febrero de 1835)

**Type:** card-hecho | **data-certeza:** hecho | **Stagger:** 0ms

### Prose

Juan Facundo Quiroga regresaba de una misión pacificadora en el noroeste argentino —encomendada por el gobernador Manuel Vicente Maza de Buenos Aires a instancias de Rosas— cuando su comitiva fue emboscada en Barranca Yaco, sobre el camino de Córdoba, el 16 de febrero de 1835. La partida atacante, al mando de Santos Pérez, actuó bajo órdenes de los hermanos Reinafé: José Vicente Reinafé era entonces gobernador de Córdoba. Quiroga, su secretario Santos Ortiz y la totalidad de su escolta —unas doce personas— fueron asesinados. Los hermanos Reinafé (José Vicente y sus hermanos Francisco, Guillermo y José Antonio) fueron detenidos, juzgados en Buenos Aires y ejecutados el 25 de octubre de 1837.

**Roles:** Santos Pérez fue el ejecutor material (el asesino directo); los hermanos Reinafé fueron los organizadores del crimen. Esta distinción fue establecida por el propio proceso judicial.

### Sources

- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 4.
- Saldías, A., *Historia de la Confederación Argentina*, t. I, 1892.

### Image Note

- **File:** `Barranca_Yaco_2.jpeg`
- **Artist:** Cayetano Descalzi (artista argentino, 1809–1886), siglo XIX
- **License:** Public domain (obra del siglo XIX, autor fallecido hace más de 100 años)
- **500px thumb URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Barranca_Yaco_2.jpeg/500px-Barranca_Yaco_2.jpeg`
- **Alt text:** `«La emboscada de Barranca Yaco» (ca. mediados del siglo XIX), pintura de Cayetano Descalzi. Interpretación artística del asesinato de Facundo Quiroga el 16 de febrero de 1835.`
- **Attribution block:** Not needed (public domain; no CC license requirement).

---

## Card S15-2: ¿Quién ordenó el asesinato? La disputa sobre el autor intelectual

**Type:** card-opinion | **data-certeza:** debatido | **Stagger:** 80ms | **Image:** none

### Prose

El asesinato de Quiroga dejó una pregunta que la historiografía argentina no ha cerrado: ¿quién fue el verdadero autor intelectual? Tres hipótesis han sido sostenidas con argumentos distintos. La primera atribuye el crimen exclusivamente a los Reinafé: tenían motivos propios —Quiroga había intervenido políticamente en Córdoba y era un poder federal rival— y las confesiones del proceso no implicaron a Rosas. La segunda hipótesis señala a Rosas: era el único beneficiario neto del crimen, el único caudillo federal que rivalizaba con Quiroga en proyección nacional; la misión misma lo colocó en la ruta por Córdoba; Sarmiento lo acusó explícitamente en *Facundo* (1845). La tercera hipótesis incorpora a Alejandro Heredia, gobernador de Tucumán, quien también tenía conflictos con Quiroga y fue señalado por algunos historiadores como posible cómplice, aunque sin evidencia conclusiva.

### Historiographic Positions (for card-nota-historiografica)

- **Posición liberal** (Sarmiento, Mitre, Vicente Fidel López): Rosas fue el autor intelectual; la muerte de Quiroga despejó el único obstáculo serio a su hegemonía federal.
- **Posición revisionista** (José María Rosa, *Historia Argentina*, t. IV, 1964): Los Reinafé actuaron solos; la acusación a Rosas fue fabricada por sus enemigos unitarios para mancharlo.
- **Síntesis contemporánea** (Lynch, *Argentine Dictator*, 1981, cap. 4): La evidencia es circunstancial. Rosas claramente se benefició, pero nunca fue probada su culpabilidad.

### Sources

- Sarmiento, D. F., *Facundo: Civilización y Barbarie*, 1845, Segunda Parte.
- Rosa, J. M., *Historia Argentina*, t. IV, Oriente, 1964.
- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 4.
- Goldman, N. y Salvatore, R. (comps.), *Caudillismos rioplatenses*, EUDEBA, 1998.

---

## T02 Recipe

The following HTML block is the verbatim content to be spliced into `index.html` before the append marker `cards will be appended here by subsequent slices`. All non-ASCII characters use HTML entities. T02 should write this block to `C:/tmp/s15-cards.html` and then run the Node.js splice.

```html
<!-- S15-1: La emboscada de Barranca Yaco (16 de febrero de 1835) -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S15-1" style="--reveal-delay: 0ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Barranca_Yaco_2.jpeg/500px-Barranca_Yaco_2.jpeg" alt="&#xAB;La emboscada de Barranca Yaco&#xBB; (ca. mediados del siglo XIX), pintura de Cayetano Descalzi. Interpretaci&#xF3;n art&#xED;stica del asesinato de Facundo Quiroga el 16 de febrero de 1835." loading="lazy">
              </div>
              <span class="event-card__year">16 de febrero de 1835</span>
              <h3 class="event-card__title">La emboscada de Barranca Yaco (16 de febrero de 1835)</h3>
              <p class="event-card__excerpt">Juan Facundo Quiroga regresaba de una misi&#xF3;n pacificadora en el noroeste argentino &#x2014;encomendada por el gobernador Manuel Vicente Maza de Buenos Aires a instancias de Rosas&#x2014; cuando su comitiva fue emboscada en Barranca Yaco, sobre el camino de C&#xF3;rdoba, el 16 de febrero de 1835. La partida atacante, al mando de Santos P&#xE9;rez, actu&#xF3; bajo &#xF3;rdenes de los hermanos Reinaf&#xE9;: Jos&#xE9; Vicente Reinaf&#xE9; era entonces gobernador de C&#xF3;rdoba. Quiroga, su secretario Santos Ortiz y la totalidad de su escolta &#x2014;unas doce personas&#x2014; fueron asesinados. Los hermanos Reinaf&#xE9; (Jos&#xE9; Vicente y sus hermanos Francisco, Guillermo y Jos&#xE9; Antonio) fueron detenidos, juzgados en Buenos Aires y ejecutados el 25 de octubre de 1837. Santos P&#xE9;rez fue el ejecutor material; los Reinaf&#xE9; fueron los organizadores del crimen, distincci&#xF3;n establecida por el propio proceso judicial.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Lynch, J., Argentine Dictator: Juan Manuel de Rosas 1829&#x2013;1852, Oxford, 1981, cap. 4. Sald&#xED;as, A., Historia de la Confederaci&#xF3;n Argentina, t. I, 1892.</cite>
              </footer>
            </article>
<!-- S15-2: &#xBF;Qui&#xE9;n orden&#xF3; el asesinato? La disputa sobre el autor intelectual -->
            <article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" data-id="S15-2" style="--reveal-delay: 80ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2696;</span>
                <span class="card-certeza-label">Debatido historiogr&#xE1;ficamente</span>
              </div>
              <span class="event-card__year">1835 &#x2014; debate abierto</span>
              <h3 class="event-card__title">&#xBF;Qui&#xE9;n orden&#xF3; el asesinato? La disputa sobre el autor intelectual</h3>
              <p class="event-card__excerpt">El asesinato de Quiroga dej&#xF3; una pregunta que la historiograf&#xED;a argentina no ha cerrado: &#xBF;qui&#xE9;n fue el verdadero autor intelectual? Tres hip&#xF3;tesis han sido sostenidas con argumentos distintos. La primera atribuye el crimen exclusivamente a los Reinaf&#xE9;: ten&#xED;an motivos propios &#x2014;Quiroga hab&#xED;a intervenido pol&#xED;ticamente en C&#xF3;rdoba y era un poder federal rival&#x2014; y las confesiones del proceso no implicaron a Rosas. La segunda hip&#xF3;tesis se&#xF1;ala a Rosas: era el &#xFA;nico beneficiario neto del crimen, el &#xFA;nico caudillo federal que rivaliz&#xF3; con Quiroga en proyecci&#xF3;n nacional; Sarmiento lo acus&#xF3; expl&#xED;citamente en <em>Facundo</em> (1845). La tercera hip&#xF3;tesis incorpora a Alejandro Heredia, gobernador de Tucum&#xE1;n, quien tambi&#xE9;n ten&#xED;a conflictos con Quiroga y fue se&#xF1;alado por algunos historiadores como posible c&#xF3;mplice, aunque sin evidencia conclusiva.</p>
              <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> La posici&#xF3;n liberal (Sarmiento, Mitre, Vicente Fidel L&#xF3;pez) afirma que Rosas fue el autor intelectual: la muerte de Quiroga despej&#xF3; el &#xFA;nico obst&#xE1;culo serio a su hegemon&#xED;a federal. La posici&#xF3;n revisionista (Jos&#xE9; Mar&#xED;a Rosa, <em>Historia Argentina</em>, t. IV, 1964) sostiene que los Reinaf&#xE9; actuaron solos y que la acusaci&#xF3;n a Rosas fue fabricada por sus enemigos unitarios. La s&#xED;ntesis contempor&#xE1;nea (Lynch, <em>Argentine Dictator</em>, 1981, cap. 4) concluye que la evidencia es circunstancial: Rosas claramente se benefici&#xF3;, pero jam&#xE1;s fue probada su culpabilidad.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Sarmiento, D. F., Facundo: Civilizaci&#xF3;n y Barbarie, 1845, Segunda Parte. Rosa, J. M., Historia Argentina, t. IV, Oriente, 1964. Lynch, J., Argentine Dictator, Oxford, 1981, cap. 4. Goldman, N. y Salvatore, R. (comps.), Caudillismos rioplatenses, EUDEBA, 1998.</cite>
              </footer>
            </article>
```

---

## Observability Impact

- **Inspection signal after T01:** `test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md && echo OK` confirms this file exists and is non-empty.
- **Inspection signal after T02:** `grep -c 'data-certeza' index.html` must return 76 (up from 74); `grep -c 'data-id="S15-' index.html` must return 2.
- **Failure state:** If T02 reads this file and finds no recipe section, or if the HTML entities are malformed, the splice will either insert garbled content or nothing. The backup at `C:/tmp/index.html.bak-s15` allows recovery.
- **Human review signal:** The prose sections above (non-entity form) allow a human reviewer to verify historical accuracy before running T02. Once satisfied, T02 can proceed mechanically.

---

## Accuracy Checklist

- [x] "Barranca Yaco" (with "a") — matches all existing occurrences in index.html
- [x] Execution date: 25 de octubre de 1837
- [x] Santos Pérez = material executor (gunman); Reinafé brothers = organizers
- [x] data-certeza="hecho" on S15-1
- [x] data-certeza="debatido" on S15-2
- [x] Stagger: S15-1 = 0ms, S15-2 = 80ms
- [x] S15-1 has image (Descalzi, public domain)
- [x] S15-2 has NO image
- [x] S15-2 has `<p class="card-nota-historiografica">` with all three historiographic positions named
- [x] All non-ASCII chars in the recipe HTML block use HTML entities
- [x] data-id="S15-1" and data-id="S15-2"
