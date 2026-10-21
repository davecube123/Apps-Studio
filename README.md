# Apps Studio 🧪

A playground for random, experimental, and occasionally ridiculous little apps.
No roadmap, no theme. If it sounds fun, it goes here.

## Layout

```
index.html            Gallery page that links to every app
apps/
  _template/          Copy this to start a new app
  <app-name>/         One folder per app, self-contained
    index.html
    README.md         (optional) what it is, how to run it
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

Then edit `apps/my-weird-idea/index.html` and add an entry to `index.html`.

## Running

Static apps: just open `index.html` in a browser, or serve the repo:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Apps

| App | What it does |
| --- | --- |
| [Excuse Generator](apps/excuse-generator/) | Produces a fresh, highly specific excuse for whatever you didn't do. |
