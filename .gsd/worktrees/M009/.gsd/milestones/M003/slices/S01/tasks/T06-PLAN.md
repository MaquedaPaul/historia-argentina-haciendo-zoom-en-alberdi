---
estimated_steps: 6
estimated_files: 1
---

# T06: Source Wikimedia Commons images for all 19 events

**Slice:** S01 — Content research, verification, and HTML integration
**Milestone:** M003

## Description

Find and verify Wikimedia Commons images for all 19 event cards. Use the Wikimedia API to get verified 500px thumbnail URLs (proven pattern from M002). Target: at least 14 of 19 events with real images; the rest get styled placeholders. All images must be public domain (pre-1900 artworks, PD-old, PD-Art tags).

## Steps

1. Compile the list of 19 events and their ideal image subjects. Priority subjects: Cabildo Abierto painting (Pedro Subercaseaux), San Martín portrait(s), Belgrano portrait, Alberdi portrait(s) at different ages, Rosas portrait, Sarmiento portrait, Urquiza portrait, Caseros battle painting, Constitution 1853 document image, Tucumán Congress painting.
2. For each subject, search Wikimedia Commons. Use API calls (`/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=500`) to get verified thumbnail URLs at 500px.
3. Verify each image is public domain — check licensing on the file page (PD-old, PD-Art, PD-US).
4. For subjects without suitable images (assess case by case — most events in this period have period artwork available), note as placeholder with descriptive alt text.
5. Update S01-CONTENT-DRAFT.md entries with verified image URLs and alt text for each event.
6. Compile a summary of image coverage: which events have images, which are placeholders, and why.

## Must-Haves

- [ ] At least 14 of 19 events have verified Wikimedia Commons 500px thumbnail URLs
- [ ] All images are confirmed public domain
- [ ] Each image entry in the draft has: URL, alt text, original filename, license note
- [ ] Image subjects are historically accurate (correct person/event depicted)

## Verification

- S01-CONTENT-DRAFT.md has image URLs or placeholder notes for all 19 events
- At least 14 URLs are present (not placeholder)
- URLs follow the Wikimedia 500px thumbnail pattern

## Inputs

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — T01-T05 output (20 event entries + connecting narrative)
- KNOWLEDGE.md "Wikimedia Commons Image Sourcing" — API pattern and rate-limit notes

## Expected Output

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — all event entries updated with verified image URLs or placeholder notes
