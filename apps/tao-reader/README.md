# Tao Reader ☯️

An installable, offline reader for the **Tao Te Ching** in English and French.

## What's inside

- **English:** James Legge's 1891 translation (public domain), parsed from Project Gutenberg.
- **French:** a new translation of Legge's text made for this app, aligned passage by passage
  with the English. Chapter titles are the app's own.
- Both live in `data/tao-te-ching.json`, so nothing needs downloading or uploading.

## Features

- **Chapters:** Previous/Next buttons, a progress bar and a searchable contents sheet with read
  ticks. Arrow keys and swipe also work, and your place is remembered.
- **Languages:** EN, EN · FR (passage by passage) or FR.
- **Random verse ✨:** a quote card with Another, Listen, Copy, Share and Read.
- **Audio:** reads the chapter aloud with your device's voices and highlights each passage. Pause,
  stop and speed (0.8×–1.5×) are on the now-playing bar, and it carries on into the next chapter.
  In EN · FR mode it alternates English and French.
- **Themes:** light, sepia and dark, plus a text-size slider.
- **Your own books (optional):** Settings → Library → *Import an EPUB*. The book is stored only on
  that device, never uploaded. Its French is machine-translated (on-device in Chrome/Edge, otherwise
  the MyMemory service, with your OK). *Save French for offline* translates it all in one go.

Keyboard: `←` `→` navigate · `R` random verse · `C` contents · `Space` play/pause · `Esc` close.

## PWA files

| File | Purpose |
| --- | --- |
| `manifest.webmanifest` | Name, colours and icons for "Install" / "Add to Home Screen" |
| `sw.js` | Service worker that caches the app, the book data, fonts and the EPUB parser for offline use |
| `icons/` | App icons (standard, maskable, Apple touch) |

**When you change any app file, bump `VERSION` in `sw.js`** so installed copies pick up the update.
