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

| App | What it does |
| --- | --- |
| [Excuse Generator](apps/excuse-generator/) | Produces a fresh, highly specific excuse for whatever you didn't do. |
| [Tao Reader](apps/tao-reader/) | The Tao Te Ching in English and French, offline: chapters, random verses, read-aloud. Installable PWA. |
