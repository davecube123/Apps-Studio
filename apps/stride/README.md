# Stride

A GPS running tracker that runs in the browser and installs as an app.

- **Live:** current pace or speed (tap the big number to swap), time, distance, average and last split, GPS accuracy.
- **Splits:** every kilometre or mile, with optional voice cues (time and last split), pause/resume and auto-pause.
- **Map:** a dark street map (OpenStreetMap data, CARTO tiles, Leaflet bundled in `lib/`) follows you during the run, with a recenter button; after the run the route is drawn on the map coloured by speed, with a speed-along-the-way chart. Tiles you have seen are cached (up to ~2000) so maps still show offline; without tiles the route still draws.
- **History:** weekly, monthly and all-time totals; per-run splits, best split, top speed, notes; GPX export for Strava and others; backup and restore.
- **GPS handling:** high-accuracy fixes only (≤ 40 m), jumps faster than 43 km/h ignored, standing-still wobble not counted.
- The screen is kept awake during a run (Wake Lock), because phones pause GPS for web apps when the screen locks.

Runs are stored only on the phone (`localStorage`).
