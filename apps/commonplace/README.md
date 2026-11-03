# Commonplace ❝

A beautiful reader for your own books that keeps a **commonplace book** of the passages you quote,
in the spirit of Apple Books, Kindle and ReadEra, with Apple-style restraint.

## Reading

- **PDFs show their original pages** (rendered with pdf.js, crisp at any pixel density), in a continuous
  scroll with printed page numbers and a selectable text layer. Dark and sepia themes tint the pages.
- **EPUB and text are laid out as real pages, one under the other** (the default, as in ReadEra's
  vertical mode): each page is one screen tall with a clear line between pages, a paragraph that
  doesn't fit continues on the next page (cut between lines, never through one, hyphens kept), and
  every page shows its number in the chapter. Paragraphs are justified and indented by default
  (Aa → Paragraphs: Indented / Spaced). Each piece of a split paragraph keeps the paragraph's index
  and starting character, so quotes, search, bookmarks and jumps stay exact across page breaks.
- **Pages ↔** turns pages sideways instead: tap the right or left edge, or swipe (the page follows your
  finger); tap the middle to show or hide the controls. **Scroll** is a continuous column.
- Newsreader serif (bundled, OFL) or sans; size, line spacing, margins, alignment; light / sepia / dark.
- Footer: chapter, page, a page scrubber, and "minutes left in chapter" (or pages left in a PDF);
  a faint page number stays when the controls are hidden. Arrow keys and Space turn pages on a keyboard.

## Finding your way

- **The book's own table of contents:** EPUB 3 nav or EPUB 2 NCX, with parts, chapters and sections
  nested and linked mid-chapter; PDF bookmarks (outline). Each entry shows its page. The contents collapse:
  entries with sections inside have a chevron, the path to where you are reading opens by itself (the
  current section is judged from the middle of the screen), and Expand all / Collapse all sits on top.
- **Go to page** and the **scrubber**.
- **Search in the book**, with highlighted snippets; a result opens with the match highlighted.
- **Bookmarks** (the ribbon), listed next to Contents and this book's Quotes.
- **Library:** three columns of identical book tiles (any cover shape fits; landscape covers shown whole), most recently opened at the top left, with a search box for titles and authors.

## Quoting

Select any passage, even across paragraphs (or on a PDF page), and tap **Quote**; choose a colour,
add tags and a note. **Copy** and **Look up** (Wiktionary) sit beside it. Quotes stay highlighted in
the book; tap one to see or edit its note. The **Quotes** tab gathers them across all books, with
search, book and tag filters, newest or in-book order, and Markdown export. Tap a quote and the book
opens exactly there, the passage pulsing on screen.

## Pages and anchors

PDFs keep their printed page numbers, and a PDF quote stores the exact highlighted region of its page.
EPUB and text books get **stable pages** of 1,600 characters: page numbers never move with font size or
device, and the footer shows "Pages 12–13" when a screen spans two. Reflowable quotes are anchored by
chapter, paragraph and character offsets.

## Robustness

- The app never zooms out (`minimum-scale=1`) and nothing can overflow sideways; PDF pages size
  themselves to the screen, so rotating keeps everything at full size and returns to the same page.
- PDF canvases are capped at about 4 million pixels and at most 10 pages stay drawn, to keep memory
  low on phones; a page still being drawn is cancelled before it is redrawn.
- Pages are measured only after the book font (all four faces) has loaded, and line boxes include
  their leading, so no line spills at a page edge.
- The phone's Back button closes an open panel first; your place is saved when the app goes to the
  background; the status bar takes the reading theme's colour; DRM-protected EPUBs say so.

## Formats

EPUB (DRM-free), PDF with selectable text, TXT and Markdown. Not supported: Kindle formats (MOBI,
AZW), DRM-protected EPUBs, scanned PDFs without a text layer.

## Data

Everything is in IndexedDB on the device, including each book's original file (so PDFs can show their
pages). Books added before version 2 can be re-imported from the Library (press and hold a book →
*Re-import the file*), which keeps their quotes, bookmarks and place. Settings → *Back up* exports
quotes, notes and bookmarks as JSON; restore it after adding the books on a new device, and they
reconnect by title. JSZip and pdf.js load from cdnjs the first time and are then cached offline.
When files change, bump `VERSION` in `sw.js` and `APP_VERSION` in `index.html`.
