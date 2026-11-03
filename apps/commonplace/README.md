# Commonplace ❝

A beautiful reader for your own books that keeps a **commonplace book** of the passages you quote,
in the spirit of Apple Books, Kindle and ReadEra, with Apple-style restraint.

## Reading

- **PDFs show their original pages** (rendered with pdf.js, crisp at any pixel density), in a continuous
  scroll with printed page numbers and a selectable text layer. Dark and sepia themes tint the pages.
- **EPUB and text are laid out as pages you turn:** tap the right or left edge, or swipe (the page
  follows your finger); tap the middle to show or hide the controls. Scroll mode is a setting.
- Newsreader serif (bundled, OFL) or sans; size, line spacing, margins, alignment; light / sepia / dark.
- Footer: chapter, page, a page scrubber, and "minutes left in chapter" (or pages left in a PDF);
  a faint page number stays when the controls are hidden. Arrow keys and Space turn pages on a keyboard.

## Finding your way

- **The book's own table of contents:** EPUB 3 nav or EPUB 2 NCX, with parts, chapters and sections
  nested and linked mid-chapter; PDF bookmarks (outline). Each entry shows its page.
- **Go to page** and the **scrubber**.
- **Search in the book**, with highlighted snippets; a result opens with the match highlighted.
- **Bookmarks** (the ribbon), listed next to Contents and this book's Quotes.
- **Continue reading** card at the top of the Library.

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
