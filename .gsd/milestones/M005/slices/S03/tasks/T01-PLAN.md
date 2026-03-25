---
estimated_steps: 5
estimated_files: 3
---

# T01: Source and add audio assets

**Slice:** S03 — Ambient Sound System
**Milestone:** M005

## Description

Source 3 CC0/CC BY ambient audio clips from Freesound.org (or Wikimedia Commons Audio), one per historical period. These are the external dependency that determines S03 viability. If usable clips cannot be found, S03 should be dropped (R006 says "optional") rather than shipping poor-quality audio.

## Steps

1. Search Freesound.org for colonial-era ambient audio: "church bells ambience", "horse hooves cobblestone", "colonial market". Target: 30-60 second loop-able CC0 clip at ≤500KB MP3.
2. Search for revolution-era audio: "military drum march", "distant cannon", "19th century crowd". Target: same constraints.
3. Search for national-era audio: "accordion tango early", "steam train 19th century", "harbor ship bells". Target: same constraints.
4. If suitable clips found: download, trim to loop-able segments (ensure end matches beginning in amplitude), convert to MP3 128kbps. Save as `audio/colonial.mp3`, `audio/revolucion.mp3`, `audio/nacional.mp3`.
5. If usable clips NOT found: document the search results and recommend dropping S03. Write a note in S03-PLAN.md explaining the decision.

## Must-Haves

- [ ] 3 MP3 files in `audio/` directory, each ≤500KB
- [ ] All clips are CC0 or CC BY licensed (document sources)
- [ ] Each clip loops cleanly (no jarring cut at loop boundary)
- [ ] Audio content is period-appropriate (not anachronistic)

## Verification

- `ls -la audio/` shows 3 files, each ≤512000 bytes
- Each file plays in a browser `<audio>` element without error
- Loop test: play with `loop` attribute — no audible pop or silence gap at loop point

## Inputs

- M005-RESEARCH.md audio sourcing section — search terms and constraints
- Freesound.org CC0 filter

## Expected Output

- `audio/colonial.mp3` — colonial period ambient audio (church bells, market, or horse hooves)
- `audio/revolucion.mp3` — revolution period ambient audio (drums, crowd, or cannon)
- `audio/nacional.mp3` — national period ambient audio (accordion, train, or harbor)
