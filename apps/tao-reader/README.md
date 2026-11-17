# Tao Reader 道德經

An installable, offline reader for the **Tao Te Ching**, chapter by chapter, with an old-paper look:
Roman-numeral chapters, a cinnabar seal with the Chinese chapter number, and the original text
written top to bottom in brush-style characters.

## Translations

| Tab | What it is | Where it comes from |
|---|---|---|
| Wilhelm | An English rendering of Richard Wilhelm's German, made for this app | Original work, based on the 1911 German (public domain) |
| Wilhelm · Deutsch | Richard Wilhelm, *Laotse: Tao te king* (Jena, 1911) | Public domain; OCR text proofread |
| Feng & English, Ch'u Ta-Kao, Le Guin, Heider, Bynner | Slots for **your own copies** | Still under copyright, so never bundled. Settings → Library → Add: an EPUB, text or HTML file, or pasted text. The app finds the 81 chapters by their numbers (1, I, One, Chapter One…), skipping tables of contents and trailing notes, and stores them only on that device (IndexedDB). |

A book imported in the previous version (e.g. *The Tao of Leadership*) is carried over to the Heider
slot automatically, or can be assigned to any slot from Settings → Library.

## Features

- **Chapters I–LXXXI:** swipe, arrow keys or the ‹ › buttons; a contents grid of numerals with read marks.
- **原文:** the received Chinese text (public domain), in vertical columns.
- **對照 Compare:** every translation you have for the chapter, stacked.
- **Draw a verse:** a random passage on a sealed card, with Another, Read chapter and Share.
- **Read aloud** with the device's voices (English or German).
- **Themes:** Paper and Ink night, plus text size.
- Install prompt (Android, iPhone Safari/Chrome, in-app browsers) and a manual Install in Settings.

## Files

- `data/tao.json`: the Chinese, Wilhelm's German and its English rendering, 81 chapters.
- `fonts/`: Cinzel, Cormorant Garamond and LXGW WenKai TC (subset to the characters of the text), all SIL OFL 1.1.
- Bump `VERSION` in `sw.js` and `VER` in `index.html` together.
