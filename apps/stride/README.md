# Stride

A GPS running tracker that runs in the browser and installs as an app.

- **Live:** current pace or speed (tap the big number to swap), time, distance, average and last split, GPS accuracy.
- **Workouts:** design sessions from steps (Warm up, Fast, Steady, Easy, Walk, Cool down) by time or distance, with repeat blocks (e.g. 6 × 30 s fast / 2 min easy). During the run Stride counts each step down, announces every change with a "3, 2, 1", vibrates with a pattern for each kind of step (set in Settings: one tap, three quick, one long, long-short-long and more) plus optional ticks at 3, 2, 1 seconds, and lets you skip; the saved run lists time, distance and pace for every step. Five ready-made workouts to start from.
- **Splits:** every kilometre or mile, with optional voice cues (time and last split), pause/resume and auto-pause.
- **Map:** a dark street map (Esri World Street Map tiles, no API key, darkened with a CSS filter; Leaflet bundled in `lib/`) fills the top of the run screen and follows you, with a recenter button; after the run the route is drawn on the map coloured by speed, with a speed chart. Tiles you have seen are cached (up to ~2000) so maps still show offline.
- **Two run views:** a Stats | Map switch at the top during a run: full stats (no map, extra-large numbers), or a full-screen map with a compact glass card for pace, time, distance, the workout step and the controls. The choice is remembered.
- **Design:** Inter font (bundled, OFL), big bold numbers, round Start/Pause/Resume/Finish buttons, a floating tab bar that hides during a run, and an Activity tab with weekly bars and route thumbnails.
- **History:** weekly, monthly and all-time totals; per-run splits, best split, top speed, notes; GPX export for Strava and others; backup and restore.
- **GPS handling:** high-accuracy fixes only (≤ 40 m), jumps faster than 43 km/h ignored, standing-still wobble not counted.
- The screen is kept awake during a run (Wake Lock), because phones pause GPS for web apps when the screen locks.

Runs are stored only on the phone (`localStorage`).

## Android app

`native/stride/` wraps this folder with Capacitor so runs and workouts keep tracking and talking with the screen
locked (background GPS foreground service, native text-to-speech, a small local `Buzz` plugin that plays vibration patterns with alarm priority, and a local `Speak` plugin that ducks Spotify and other music while voice cues play). It is built and published by
`.github/workflows/stride-apk.yml` as the `stride-apk` release:
https://github.com/davecube123/Apps-Studio/releases/download/stride-apk/stride.apk
The same `index.html` detects the app (`window.Capacitor`) and switches to the native plugins.
