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
- **Your own books (optional, private):** Settings → Library → *Import an EPUB or book file*.
  The book is stored only on that device and never goes into this repo or onto the website.

Keyboard: `←` `→` navigate · `R` random verse · `C` contents · `Space` play/pause · `Esc` close.

## Reading your own book (e.g. *The Tao of Leadership*) in English and French on your phone

GitHub Pages sites are public, so copyrighted books are never bundled. The app handles them privately instead:

1. On a **computer with Chrome or Edge**, open the app, then Settings → Library → *Import an EPUB…*.
2. Say **yes** to "Translate this book to French now". Chrome and Edge translate on the device, quickly and for free.
3. Settings → Library → **Export book + French to another device**. This saves a private `.taobook.json` file.
4. Send that file to your phone (AirDrop, Files, Drive, email to yourself).
5. On the phone, in the installed app: Settings → Library → *Import an EPUB or book file…* and pick the file.

Both languages are now on the phone and work offline. Keep the `.taobook.json` file private.
(Phones can import an EPUB directly too, but they usually lack an on-device translator, and the free
online fallback only allows about 5,000 to 50,000 characters a day.)

Keyboard: `←` `→` navigate · `R` random verse · `C` contents · `Space` play/pause · `Esc` close.

## PWA files

| File | Purpose |
| --- | --- |
| `manifest.webmanifest` | Name, colours and icons for "Install" / "Add to Home Screen" |
| `sw.js` | Service worker that caches the app, the book data, fonts and the EPUB parser for offline use |
| `icons/` | App icons (standard, maskable, Apple touch) |

**When you change any app file, bump `VERSION` in `sw.js`** so installed copies pick up the update.
