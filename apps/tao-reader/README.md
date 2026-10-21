# Tao Reader ☯️

A calm, chapter-by-chapter reader for Tao Te Ching–style books (built around
John Heider's *The Tao of Leadership*, but works with most EPUBs).

**The book is not included.** Open the app and load your own `.epub`. It's parsed
in the browser and stored locally (IndexedDB), so you only load it once per browser.

## Features

- **Chapters** with Previous / Next buttons, a progress bar, a searchable chapter list,
  ←/→ keys and swipe gestures. Your place is remembered.
- **Random verse** 🎲: draws a passage from any chapter, with Another / Listen / Copy / Open chapter.
- **French**: EN, EN+FR (side by side, paragraph by paragraph) or FR only.
  - Uses the browser's built-in on-device translator when available (recent Chrome/Edge).
  - Otherwise, with your OK, falls back to the free MyMemory online service. Translations are cached.
- **Audio** 🔊: reads the chapter aloud with the Web Speech API, highlighting each paragraph,
  with pause, stop and speed controls. It continues into the next chapter like an audiobook.
  In EN+FR mode it alternates English and French. Pick voices in settings (Aa).
- Light / sepia / dark themes, adjustable text size.

Keyboard: `←` `→` navigate · `R` random verse · `C` chapters · `Space` play/pause · `Esc` close.

## How chapters are detected

Spine documents whose first line looks like `12. Title` become chapters. Lines that repeat
across many pages (running headers) are dropped. If fewer than 5 numbered chapters are found,
each non-empty section of the book becomes a chapter.
