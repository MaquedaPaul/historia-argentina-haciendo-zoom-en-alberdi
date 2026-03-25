# Historia Argentina 1500–1900

An interactive single-page site covering 400 years of Argentine history — from the first Spanish contacts to the consolidation of the modern republic.

## Live Demo

> Deploy URL will be added here after publishing.

## Features

- **34 event cards** organised across 3 thematic periods:
  - *Encuentro y Conquista* (1500–1700)
  - *Revolución e Independencia* (1700–1820)
  - *Nación en construcción* (1820–1900)
- **Certeza classification system** — each card is tagged as Confirmado ✔, Debatido ⚡, or Leyenda 🌀 to signal the historiographic confidence level
- **Animated horizontal timelines** with scroll-driven reveal for each period
- **Ambient sound** — optional period-appropriate background audio with a toggle button (no autoplay)
- **Responsive design** with a hamburger menu for mobile viewports

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styles | CSS3 (custom properties, Grid, Flexbox, animations) |
| Logic  | Vanilla JavaScript (ES2020, no build step) |
| Fonts  | Google Fonts (Cinzel, Lato) |

No frameworks, no bundler, no runtime dependencies — open `index.html` directly in a browser.

## Project Structure

```
historia/
├── index.html       # Single HTML file — all content lives here
├── styles.css       # All styles: layout, animations, responsive
├── app.js           # Interactivity: timeline scroll, sound toggle, nav
└── audio/
    ├── colonial.mp3    # Ambient sound — colonial / conquest period
    ├── revolucion.mp3  # Ambient sound — revolution / independence period
    └── nacional.mp3    # Ambient sound — nation-building period
```

## Running Locally

No installation required:

```bash
# Option 1 — just open the file
open index.html

# Option 2 — local HTTP server (avoids audio CORS issues in some browsers)
python -m http.server 8080
# then visit http://localhost:8080
```

## Credits

| Asset type | Source |
|------------|--------|
| Historical images | [Wikimedia Commons](https://commons.wikimedia.org/) — public domain / CC licences |
| Ambient audio | [Freesound.org](https://freesound.org/) — Creative Commons licences |
| Web fonts | [Google Fonts](https://fonts.google.com/) — Cinzel, Lato |

## Licence

Content is for educational purposes. All third-party images and audio retain their original licences (see credits above). Original code is released under the MIT Licence.
