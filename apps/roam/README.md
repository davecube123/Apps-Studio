# Roam

A minimal travel companion, starting with Thailand: a map, a few great places, and your trip.

- **Map:** an interactive map (Leaflet, drawn by the app from Natural Earth country shapes and 77 province boundaries (geoBoundaries / OpenStreetMap, every island included) softly tinted by region, with English town and province
  labels that appear as you zoom in: no tiles, works offline) with each place as a round photo pin; tap for a preview
  card (with how busy it is now); filter by region; your trip is drawn as a dashed route. **⇄ A to B:** search any two
  towns, islands or sights (e.g. “Railay”, “Doi Inthanon”) and see the best-balance, fastest and cheapest way between them (up to four hops, stopovers spelled out, car fares split per person, door-to-door time incl.
  airport time, fares per person); also “Get here” on every place page.
- **Search:** a search bar on the map finds places, towns, provinces and the spots inside places (restaurants, markets, viewpoints, bars; names and descriptions). Tap a result and the map flies there with a labelled pin and a card (price, Google Maps, the place). The Places page has the same search: it filters the grid and lists matching spots with a Map button.
- **Places:** 48 hand-picked Thai places (Bangkok, Central, North, Northeast (Isaan), East coast incl. Koh Chang, Koh Kood,
  Koh Mak and Koh Samet, Gulf islands, Andaman coast incl. Similan, the Trang islands and Koh Lipe); nearby pins merge into
  a numbered bubble at low zoom as photo cards, each
  with a short original description, practical tips, best time, how long to stay, your own notes, “Been here”, and an
  Open in Google Maps link.
- **Plan it for me:** answer days, dates, what you love (beaches, parties, culture, nature, food), pace and arrival
  city; Roam picks in-season places, orders them for the least travel, splits the nights and chooses each hop to suit
  your budget style. Add stops right on the Plan page (search, or “Easy next” chips with travel times), and get up to
  three heads-ups: off-season or closed places, very long hops with a faster option, a better order (one-tap “Tidy
  order”), festivals near your route, too many one-night stops.
- **Plan:** your places grouped into stops with nights per stop; choose how to travel each hop (direct, or routed via a
  hub city); travellers, budget / mid-range / comfort, baht, pesos or both; optional spots and your flight fare; a
  costed range in total and per person (transport, accommodation, food, local transport, fees, 10% buffer).
- **Today:** where you are (by start date or chosen stop), the next hop with fare, three ideas for the day, ✨ Surprise
  me (a hidden gem or local favourite), comfort notes (where to stay, beat the crowds, heat), a slow-morning nudge,
  and Moments (mood, text, optional photo in IndexedDB, pinned on the map) with an evening “three good things”.
- **Vibe and four tiles per place:** 🍜 Eat, 🎒 Do, 🎉 Night, 💡 Know (insider tips), per city with prices and map links;
  everything else folds into “Practical”. **Wish I'd known:** 15 country-wide tips (7-Eleven beer prices, alcohol hours,
  ATM fees, SuperRich, Airport Rail Link, scams). Map limited to Thailand.
- **Events:** 80+ festivals, holidays, concerts, raves and recurring party nights (Nov 2026 to 2027) with dates, tips and
  ticket links; estimated lunar dates are flagged. “What's on” by month and city, an Events tile per place with live
  listing links, “Happening soon” on Today, and festivals that fall during your trip on Plan.
- **Place pages (Practical):** when to go and time of day, entry fees, getting there and around with fares, popular spots, hidden
  gems and local favourites with prices and map links.
- **Basics:** baht to peso converter, 13 Thai phrases you can hear, a packing list, practical info and price sources.
- **How busy:** each place shows a one-line crowd estimate for right now (season, weekday, Thai time of day and
  festivals), with a month strip, the quietest and busiest times, and a link to Google Maps' live busyness.
- **Data (Nov 2026):** 35 cities, 82 routes, fees from official sources; transport fares are typical
  ranges and hotel/food/local bands are estimates; exchange rate from the BSP reference.
- **Basics:** money, getting around, weather by coast, temple etiquette, respect, phone and power, entry, emergencies.
- Built to add more countries: one data file per country in `data/`.

Photos: Unsplash (Unsplash License), bundled and resized. Map library: Leaflet 1.9.4 (BSD-2, `lib/LEAFLET-LICENSE.txt`).
Fonts: Fraunces, Inter (SIL OFL). Everything you add stays on the device.

- `COUNTRY-GUIDE.md` is the checklist for adding a country (what places to cover, fields, self-checks) and lists the
  remaining Thailand gaps (Isaan, Trang islands, Nan, Kanchanaburi town).
