# Little Pages 📖

A reader for your own books, designed to help you **read a little every day**.
Pick EPUB, PDF (with selectable text), TXT or Markdown files from your device. Books, notes and
history stay on that device.

## Features, and the research behind them

| Feature | Why |
| --- | --- |
| **Reading plan:** "After [something you already do], I'll read for N minutes [where], [with a treat]", plus a daily calendar reminder (`.ics`) | Implementation intentions roughly double follow-through (Gollwitzer & Sheeran, 2006). Habit stacking (Fogg, 2019). Temptation bundling (Milkman, Minson & Volpp, 2014) |
| **Tiny default goal** (5–30 min) and a **Just one page** button | Tiny habits: make starting easy (Fogg, 2019) |
| **Forgiving streak:** one rest day is fine, two in a row reset it | Missing one day barely affects habit formation (Lally et al., 2010). Avoids the all-or-nothing "what-the-hell" effect (Polivy & Herman, 1985) |
| **66-day habit journey** | Median time for a daily habit to become automatic (Lally et al., 2010) |
| **Daily ring**, plus **minutes left in the chapter** and in the book at your measured pace | Goal-gradient effect (Kivetz, Urminsky & Zheng, 2006) |
| **Progress screen:** week bars, 18-week heatmap, pages, best streak, reading speed | Monitoring progress improves goal attainment (Harkin et al., 2016) |
| **Fresh-start nudges** on Mondays, the 1st of the month, and after a break | Fresh-start effect (Dai, Milkman & Riis, 2014) |
| **One idea worth remembering?** after each session; notes resurface on Today | Retrieval practice / testing effect (Roediger & Karpicke, 2006) |
| **"Where you left off" recap** when you come back to a book | Makes it easier to pick up the thread |
| **Quitting is okay:** move a book back to *Want to read* | Autonomy keeps motivation intrinsic (Deci & Ryan, 2000) |
| A small celebration when you reach the daily goal or finish a book; no guilt messages | Positive reinforcement without pressure |

The same explanations are in the app under **Progress → The science behind Little Pages**.

## How time is counted

Time counts only while the reader is open and in front of you, and you've scrolled or tapped within
the last 3 minutes. One minute of reading counts as showing up for the streak. A paragraph counts as
read once it scrolls past the top of the screen, and that drives the pages and reading-speed numbers.

## Data

Everything lives in the browser's IndexedDB on the device. Settings → *Back up reading history*
exports history, notes and settings (not the books) to a JSON file, which you can restore on another
device.

## PWA

`manifest.webmanifest`, `sw.js` and `icons/` make it installable and offline-capable. The EPUB
(JSZip) and PDF (pdf.js) parsers load from cdnjs the first time they're needed and are cached after
that. Bump `VERSION` in `sw.js` when files change.
