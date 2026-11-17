# Roam

A minimal travel companion, starting with Thailand: a map, a few great places, and your trip.

- **Map:** an interactive map (Leaflet, drawn by the app from Natural Earth country shapes with English city labels: no tiles, works offline) with each place as a round photo
  pin; tap for a preview card; filter by region; your trip is drawn as a dashed route. Tiles you have seen stay
  cached for offline use.
- **Places:** 17 hand-picked Thai places (Bangkok, Central, North, Andaman coast, Gulf islands) as photo cards, each
  with a short original description, practical tips, best time, how long to stay, your own notes, “Been here”, and an
  Open in Google Maps link.
- **Plan:** your places grouped into stops with nights per stop; choose how to travel each hop (direct, or routed via a
  hub city); travellers, budget / mid-range / comfort, baht, pesos or both; optional spots and your flight fare; a
  costed range in total and per person (transport, accommodation, food, local transport, fees, 10% buffer).
- **Today:** where you are (by start date or chosen stop), the next hop with fare, three ideas for the day, ✨ Surprise
  me (a hidden gem or local favourite), comfort notes (where to stay, beat the crowds, heat), a slow-morning nudge,
  and Moments (mood, text, optional photo in IndexedDB, pinned on the map) with an evening “three good things”.
- **Vibe and four tiles per place:** 🍜 Eat, 🎒 Do, 🎉 Night, 💡 Know (insider tips), per city with prices and map links;
  everything else folds into “Practical”. **Wish I'd known:** 15 country-wide tips (7-Eleven beer prices, alcohol hours,
  ATM fees, SuperRich, Airport Rail Link, scams). Map limited to Thailand.
- **Events:** 48 festivals, holidays, concerts, raves and recurring party nights (Nov 2026 to 2027) with dates, tips and
  ticket links; estimated lunar dates are flagged. “What's on” by month and city, an Events tile per place with live
  listing links, “Happening soon” on Today, and festivals that fall during your trip on Plan.
- **Place pages (Practical):** when to go and time of day, entry fees, getting there and around with fares, popular spots, hidden
  gems and local favourites with prices and map links.
- **Basics:** baht to peso converter, 13 Thai phrases you can hear, a packing list, practical info and price sources.
- **Data (Nov 2026):** 14 cities, 31 routes with 64 options, fees from official sources; transport fares are typical
  ranges and hotel/food/local bands are estimates; exchange rate from the BSP reference.
- **Basics:** money, getting around, weather by coast, temple etiquette, respect, phone and power, entry, emergencies.
- Built to add more countries: one data file per country in `data/`.

Photos: Unsplash (Unsplash License), bundled and resized. Map library: Leaflet 1.9.4 (BSD-2, `lib/LEAFLET-LICENSE.txt`).
Fonts: Fraunces, Inter (SIL OFL). Everything you add stays on the device.
