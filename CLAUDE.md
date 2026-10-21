# Apps Studio

Collection of unrelated, experimental/quirky apps. See README.md for layout.

- Each app lives in `apps/<kebab-case-name>/` and must be self-contained.
- Default to a single static `index.html` (inline CSS/JS, no build step) unless the idea needs more.
- When adding an app: start from `apps/_template/`, add it to the `APPS` array in the root `index.html`, and add a row to the README's Apps table.
- Every app is a PWA published via GitHub Pages: it keeps its own `manifest.webmanifest`, `sw.js` (scope = its folder) and `icons/`. Use relative paths only (the site lives under `/<repo>/`).
- Bump `VERSION` in an app's `sw.js` whenever its files change, and list new files in `SHELL`.
- Never commit copyrighted books or other third-party content; bundle only public-domain or original text. Users can import their own files at runtime (stored on-device).
