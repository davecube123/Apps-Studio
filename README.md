# Apps Studio 🧪

A playground for random, experimental, and occasionally ridiculous little apps.
No roadmap, no theme. If it sounds fun, it goes here.

Every app is a **PWA** (Progressive Web App) served by **GitHub Pages**, so you can open it
on your phone and install it to your home screen, where it works offline.

## Layout

```
index.html            Gallery page that links to every app
apps/
  _template/          Copy this to start a new app (already a PWA)
  <app-name>/         One folder per app, self-contained
    index.html
    manifest.webmanifest   Install metadata (name, colours, icons)
    sw.js                  Service worker for offline use
    icons/                 App icons
    README.md              (optional) what it is, how to run it
```

## Rules of the studio

1. **One folder per app** under `apps/`, named in `kebab-case`.
2. **Self-contained.** An app shouldn't depend on another app's files.
3. **Any stack is fine.** Plain HTML/JS is the default because it runs anywhere
   with zero setup, but an app can bring its own `package.json`, Python, etc.
   If it needs setup, put the steps in that app's `README.md`.
4. **Register it** in the `APPS` list in `index.html` so it shows up in the gallery.

## Starting a new app

```bash
cp -r apps/_template apps/my-weird-idea
```

Then:

1. Edit `apps/my-weird-idea/index.html`.
2. In `manifest.webmanifest`, set `name`, `short_name` and the colours.
3. Replace the placeholder icons in `icons/`.
4. List any extra files in `SHELL` inside `sw.js`.
5. Add an entry to the `APPS` list in the root `index.html`.

Whenever you change an app, bump `VERSION` in its `sw.js` so installed copies update.

## Publishing with GitHub Pages

1. On GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick the branch, keep `/ (root)`, and save.
3. After a minute the studio is live at `https://<your-username>.github.io/<repo-name>/`, and each
   app is at `…/apps/<app-name>/`.

To install an app on your phone, open its page and then:
- **Android (Chrome):** tap *Install app* (also under Settings in Tao Reader) or ⋮ → *Add to Home screen*.
- **iPhone (Safari):** tap Share → *Add to Home Screen*.

`.nojekyll` at the root tells Pages to serve the files as they are.

## Running locally

Static apps: just open `index.html` in a browser, or serve the repo:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Apps

Live at **https://davecube123.github.io/Apps-Studio/**

| App | What it does |
| --- | --- |
| [Excuse Generator](apps/excuse-generator/) | Produces a fresh, highly specific excuse for whatever you didn't do. |
| [Tao Reader](apps/tao-reader/) | The Tao Te Ching in English and French, offline: chapters, random verses, read-aloud. Installable PWA. |
| [Little Pages](apps/little-pages/) | Read your own EPUB/PDF/TXT books, with habit-building features grounded in behaviour science. Installable PWA. |
| [My I Ching](apps/i-ching-book/) ([open](https://davecube123.github.io/Apps-Studio/apps/i-ching-book/)) | Learn the 64 hexagrams by writing your own Book of Changes: readings, reflections, spaced practice, printable book. Installable PWA. |
| [Daily Way](apps/daily-way/) ([open](https://davecube123.github.io/Apps-Studio/apps/daily-way/)) | A 20-minute daily practice with the Tao Te Ching, I Ching, Golden Flower and Chuang Tzu: recall, read, capture, connect, sit, carry. Installable PWA. |
| [Commonplace](apps/commonplace/) ([open](https://davecube123.github.io/Apps-Studio/apps/commonplace/)) | A beautiful reader for your own books (original PDF pages, turned pages for EPUB, real contents, search, bookmarks): quote passages with tags and notes, then open any quote at its exact page. Installable PWA. |
| [Book of Changes](apps/book-of-changes/) ([open](https://davecube123.github.io/Apps-Studio/apps/book-of-changes/)) | The I Ching in plain modern language: cast a hexagram with yarrow stalks and read an original rendition of all 64 (Judgment, Image, every line, explained), or browse and study any hexagram. Installable PWA. |
| [Noticing](apps/noticing/) ([open](https://davecube123.github.io/Apps-Studio/apps/noticing/)) | Train visual attention two minutes a day: a daily real-world mission, adaptive look-and-recall and spot-the-change drills, and an observation journal that checks how well your confidence matches reality. Installable PWA. |
| [Ashes and Gold](apps/ashes-and-gold/) ([open](https://davecube123.github.io/Apps-Studio/apps/ashes-and-gold/)) | A wordless story game about a man's journey from boyhood to elderhood, built on the public-domain Iron John tale: each of nine chapters is one feeling carried by one small interaction. Installable PWA. |
| [Living Window](apps/living-window/) ([open](https://davecube123.github.io/Apps-Studio/apps/living-window/)) | A quiet window onto an original generated landscape that follows the real sun, moon and (optionally) your weather, with generated music and nature sounds, a day scrubber and a sleep fade-out. Installable PWA. |
| [Song of Songs](apps/song-of-songs/) ([open](https://davecube123.github.io/Apps-Studio/apps/song-of-songs/)) | The Song of Songs in an original modern translation with a full commentary (about 40,000 words): every passage with its Hebrew words, how Jewish and Christian readers and modern scholars have read it, what it means for love, the body and inner life, and a question to sit with. Themes, search, quotes and notes. Installable PWA. |
| [Woodshed](apps/woodshed/) ([open](https://davecube123.github.io/Apps-Studio/apps/woodshed/)) | A practice recorder for guitar and voice: raw-mic recording with a level meter, count-in and metronome, markers, takes organised by song with lyrics and chords, a player with A–B loop and slow-down, a tuner, and a practice log. Installable PWA. |
| [Kasama](apps/kasama/) ([open](https://davecube123.github.io/Apps-Studio/apps/kasama/)) | A Taglish companion for the girlfriend and family of a friend with psychosis (family only, optional PIN). A daily way to be close to him, lessons, LEAP scripts and practice, his next consult, step-by-step help in El Nido and Palawan (AICS, free medicines, PWD ID, Malasakit, PhilHealth), a fund tracker, a plan for heavy days, Bible verses in Tagalog and English, and caregiver self-care. Installable PWA. |
