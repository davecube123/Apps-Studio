# Roam

A minimal travel companion for Thailand and the Philippines: a map, a few great places, and your trip. Switch countries in Basics; each country keeps its own trip, notes and plan.

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

## The Philippines (added November 2026)

`data/philippines.json` follows the same shape as `thailand.json` (prices are in pesos; the price key is still
`thb`, which the app reads as "amount in local currency"). 33 places in 7 regions (Metro Manila, Northern Luzon,
Southern Luzon, Palawan, Central Visayas, Western Visayas, Mindanao), 26 base towns, 61 routes, 84 events (December 2026
to February 2028; estimated dates are flagged), Wish I'd known, Filipino phrases and a packing list. Country-specific
settings (map files, time zone, hubs, labels, phrases) live under `cfg`. Many fares and fees are listed in `verify`:
re-check them before relying on them.

Map: `data/geo-ph.json` (Natural Earth 1:10m country shapes, public domain) and `data/provinces-ph.json`
(geoBoundaries PHL ADM2, OpenStreetMap contributors, ODbL; simplified; towns from Natural Earth populated places).

### Photo credits (Wikimedia Commons)

| Place | File | Author | Licence |
|---|---|---|---|
| Intramuros | [File:Intramuros, Manila, Philippines.jpg](https://commons.wikimedia.org/wiki/File:Intramuros,_Manila,_Philippines.jpg) | Ray in Manila (via Flickr) | CC BY 2.0 (to confirm) |
| Binondo food crawl | [File:Binondo Church Facade.jpg](https://commons.wikimedia.org/wiki/File:Binondo_Church_Facade.jpg) | Lawrence Ruiz | CC BY-SA 4.0 |
| Poblacion, Makati nightlife | [File:Makati Poblacion skyscrapers, Makati Avenue (Makati; 06-20-2021).jpg](https://commons.wikimedia.org/wiki/File:Makati_Poblacion_skyscrapers,_Makati_Avenue_(Makati%3B_06-20-2021).jpg) | Patrickroque01 | CC BY-SA 4.0 |
| Banaue Rice Terraces | [File:Rice Terraces Banaue.jpg](https://commons.wikimedia.org/wiki/File:Rice_Terraces_Banaue.jpg) | Magalhães | Public domain |
| Batad | [File:Banaue Philippines Batad-Rice-Terraces-02.jpg](https://commons.wikimedia.org/wiki/File:Banaue_Philippines_Batad-Rice-Terraces-02.jpg) | CEphoto, Uwe Aranas | CC BY-SA 4.0 |
| Sagada | [File:Hanging Coffins of Sagada.jpg](https://commons.wikimedia.org/wiki/File:Hanging_Coffins_of_Sagada.jpg) | Andrewhaimerl | CC BY-SA 4.0 |
| Vigan heritage town | [File:Calle Crisologo in Broad Daylight.jpg](https://commons.wikimedia.org/wiki/File:Calle_Crisologo_in_Broad_Daylight.jpg) | Tubanismo | CC BY-SA 4.0 |
| Baguio | [File:Burnham Park - lake (Baguio, Benguet)(2018-02-25).jpg](https://commons.wikimedia.org/wiki/File:Burnham_Park_-_lake_(Baguio,_Benguet)(2018-02-25).jpg) | Patrick Roque (Patrickroque01) | CC BY-SA 4.0 (to confirm) |
| Taal Volcano from Tagaytay | [File:Taal Volcano.jpg](https://commons.wikimedia.org/wiki/File:Taal_Volcano.jpg) | Roberto Verzo (via Flickr) | CC BY 2.0 |
| Puerto Galera | [File:PH - Puerto Galera - White Beach - from sea 2.jpg](https://commons.wikimedia.org/wiki/File:PH_-_Puerto_Galera_-_White_Beach_-_from_sea_2.jpg) | Eugene Alvin Villar (seav) | CC BY-SA 4.0 |
| Mayon Volcano | [File:Mayon Volcano as of March 2020.jpg](https://commons.wikimedia.org/wiki/File:Mayon_Volcano_as_of_March_2020.jpg) | Marisa Mercado | CC BY-SA 4.0 |
| Donsol whale sharks | [File:Donsol - panoramio.jpg](https://commons.wikimedia.org/wiki/File:Donsol_-_panoramio.jpg) | jackylim (via Panoramio) | CC BY-SA 3.0 |
| El Nido and Bacuit Bay | [File:Island lagoon in Bacuit Bay, El Nido, Palawan, Philippines.jpg](https://commons.wikimedia.org/wiki/File:Island_lagoon_in_Bacuit_Bay,_El_Nido,_Palawan,_Philippines.jpg) | Vyacheslav Argenberg | CC BY 4.0 |
| Coron | [File:Kayangan Lake, Coron Island.jpg](https://commons.wikimedia.org/wiki/File:Kayangan_Lake,_Coron_Island.jpg) | Lyndon Aguila (Lyndon21) | CC BY-SA 4.0 |
| Puerto Princesa Underground River | [File:Puerto Princesa Underground River.jpg](https://commons.wikimedia.org/wiki/File:Puerto_Princesa_Underground_River.jpg) | Mike Gonzalez (TheCoffee) | CC BY-SA 3.0 |
| Port Barton | [File:Port Barton, Boats, Palawan, Philippines.jpg](https://commons.wikimedia.org/wiki/File:Port_Barton,_Boats,_Palawan,_Philippines.jpg) | Vyacheslav Argenberg | CC BY 4.0 |
| Cebu City heritage | [File:Magellan's Cross in Cebu.jpg](https://commons.wikimedia.org/wiki/File:Magellan's_Cross_in_Cebu.jpg) | Carlo Joseph Moskito | CC BY-SA 4.0 |
| Kawasan Falls | [File:Badian Kawasan Falls Cebu.jpg](https://commons.wikimedia.org/wiki/File:Badian_Kawasan_Falls_Cebu.jpg) | Shemlongakit | CC BY-SA 4.0 |
| Moalboal sardine run | [File:White Beach Moalboal.JPG](https://commons.wikimedia.org/wiki/File:White_Beach_Moalboal.JPG) | Lindstrm | CC BY-SA 3.0 |
| Malapascua | [File:Malapascua (island), Bounty Beach, Philippines.jpg](https://commons.wikimedia.org/wiki/File:Malapascua_(island),_Bounty_Beach,_Philippines.jpg) | Vyacheslav Argenberg | CC BY 4.0 |
| Bantayan Island | [File:Sugar Beach Bantayan.jpg](https://commons.wikimedia.org/wiki/File:Sugar_Beach_Bantayan.jpg) | Mike Gonzalez (TheCoffee) | CC BY-SA 3.0 |
| Chocolate Hills | [File:Chocolate Hills - edit.jpg](https://commons.wikimedia.org/wiki/File:Chocolate_Hills_-_edit.jpg) | Ramir Borja; derivative work by MrPanyGoff | CC BY-SA 3.0 |
| Panglao | [File:Alona Beach, Panglao.jpg](https://commons.wikimedia.org/wiki/File:Alona_Beach,_Panglao.jpg) | Marife.altabano | CC BY-SA 4.0 |
| Siquijor | [File:Salagdoong Beach Siquijor-Daylight.jpg](https://commons.wikimedia.org/wiki/File:Salagdoong_Beach_Siquijor-Daylight.jpg) | Genpasaporte2 | CC BY-SA 4.0 |
| Apo Island | [File:Apo Island east.jpg](https://commons.wikimedia.org/wiki/File:Apo_Island_east.jpg) | Mike Gonzalez (TheCoffee) | CC BY-SA 3.0 |
| Boracay | [File:Boracay White Beach.png](https://commons.wikimedia.org/wiki/File:Boracay_White_Beach.png) | Jhun Sacapano | CC BY-SA 4.0 |
| Iloilo City and the Miagao church | [File:Miagao Church Facade Closeup.JPG](https://commons.wikimedia.org/wiki/File:Miagao_Church_Facade_Closeup.JPG) | Retdar | CC BY-SA 4.0 |
| Guimaras | [File:Beach and islands of Taklong Island Guimaras.jpg](https://commons.wikimedia.org/wiki/File:Beach_and_islands_of_Taklong_Island_Guimaras.jpg) | Iloilo Wanderer | CC BY-SA 3.0 (to confirm) |
| Siargao | [File:The calm sea of cloud 9 siargao island philippines.jpg](https://commons.wikimedia.org/wiki/File:The_calm_sea_of_cloud_9_siargao_island_philippines.jpg) | Aneesah Mariam | CC BY-SA 4.0 |
| Camiguin | [File:Camiguin White Island.jpg](https://commons.wikimedia.org/wiki/File:Camiguin_White_Island.jpg) | Theglennpalacio | CC BY-SA 4.0 |
| Davao City | [File:People's Park, Davao City, Philippines (1 May 2010).jpg](https://commons.wikimedia.org/wiki/File:People's_Park,_Davao_City,_Philippines_(1_May_2010).jpg) | Robert Ryan U. Ong | CC BY-SA 3.0 |
| Philippine Eagle Center | [File:Pithecophaga jefferyi -Philippine Eagle Center, Davao City, Philippines-8a.jpg](https://commons.wikimedia.org/wiki/File:Pithecophaga_jefferyi_-Philippine_Eagle_Center,_Davao_City,_Philippines-8a.jpg) | Constantine Agustin (via Flickr) | CC BY-SA 2.0 |
| San Juan, La Union surf town | [File:Surfing Capital of the Northern Philippines.jpg](https://commons.wikimedia.org/wiki/File:Surfing_Capital_of_the_Northern_Philippines.jpg) | Emman Asuncion Foronda | CC BY-SA 4.0 |
