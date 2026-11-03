# Commonplace ❝

A beautiful reader for your own books that keeps a **commonplace book** of the passages you quote.

- **Your books:** EPUB, PDF (with selectable text), TXT and Markdown, stored privately on the device
  (IndexedDB). A public-domain sample (Legge's Tao Te Ching) is one tap away.
- **Reading:** serif typography (Newsreader, bundled, OFL), light / sepia / dark, size, spacing,
  alignment, contents with page numbers, your place remembered. Tap the page to show or hide the controls.
- **Quoting:** select any passage, even across paragraphs, and tap **Quote**; choose a colour, add
  tags and a note. Quotes stay highlighted in the book; tap a highlight to see or edit its note.
- **The collection:** every quote across all books, with search, filters by book and tag, newest or
  in-book order, and Markdown export.
- **Exact place:** tap any quote and the book opens on that page with the passage pulsing on screen.

## Pages

PDFs keep their **printed page numbers**. EPUB and text books have no fixed pages, so Commonplace uses
**stable pages** of about 1,600 characters: a quote's page never changes with font size or device.
Each quote is anchored by chapter, paragraph and character offsets, so the jump is exact.

## Data

Settings → *Back up quotes and notes* exports a JSON file. On a new device, add the books again and
restore the backup: quotes reconnect to their books by title. The EPUB/PDF components (JSZip, pdf.js)
load from cdnjs the first time and are then cached offline. When files change, bump `VERSION` in
`sw.js` and `APP_VERSION` in `index.html`.
