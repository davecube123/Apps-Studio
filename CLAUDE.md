# Apps Studio

Collection of unrelated, experimental/quirky apps. See README.md for layout.

- Each app lives in `apps/<kebab-case-name>/` and must be self-contained.
- Default to a single static `index.html` (inline CSS/JS, no build step) unless the idea needs more.
- When adding an app: start from `apps/_template/`, add it to the `APPS` array in the root `index.html`, and add a row to the README's Apps table.
- Every app is a PWA published via GitHub Pages: it keeps its own `manifest.webmanifest`, `sw.js` (scope = its folder) and `icons/`. Use relative paths only (the site lives under `/<repo>/`).
- Bump `VERSION` in an app's `sw.js` whenever its files change, and list new files in `SHELL`.
- Never commit copyrighted books or other third-party content; bundle only public-domain or original text. Users can import their own files at runtime (stored on-device).
- Every app shows its version number somewhere visible (e.g. Settings/About footer: “<App> v<N>”, bumped with the sw `VERSION`), and has an install prompt: a sheet that opens on its own (after setup or a few seconds in, snoozed for some days on “Not now”, never when already installed) using `beforeinstallprompt` where available and iOS/Android/in-app-browser instructions otherwise, plus a manual “Install” button.
- Private apps (Silvertongue, Allure, Anchor, Trine) are encrypted: their content lives only as `data/*.enc.json` + `data/vault.json`, unlocked in-app by `lib/vault.js` with the owner's passcode. Never commit their plain JSON; to change content, decrypt with the owner's passcode (`VAULT_CODE=… python3 tools/vault_decrypt.py apps/<app> data/<name>.enc.json <path outside the repo>`), edit outside the repo, and re-seal with `VAULT_CODE=… python3 tools/vault_encrypt.py apps/<app> <plain files>`.
