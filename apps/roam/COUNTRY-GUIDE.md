# Adding a country to Roam

One file per country: `apps/roam/data/<country>.json`, same shape as `thailand.json`. Research first, write second, verify last. Bump `VERSION` in `sw.js` and list new files (data, photos) in `SHELL`.

## 1. Build the place list

Work through every bucket below and write candidates down before choosing.

- **Top arrivals:** the most visited destinations by tourist arrival statistics (tourism board, national statistics office).
- **Guidebook must-sees:** the "top 10" or "highlights" of at least two major guidebooks and the official tourism site. Anything on all lists is a must.
- **Every region:** each major region has at least 2 places. A region with none is a gap, not a choice.
- **Islands and beaches:** the famous ones plus one quieter alternative per coast.
- **National parks and nature:** mountains, waterfalls, caves, lakes, wildlife, dive sites. Note seasonal closures.
- **Culture and history:** World Heritage sites, old capitals, major temples, churches or mosques, museums.
- **Food cities:** the places locals travel to eat; markets and regional dishes.
- **Nightlife hubs:** the party towns and the best bar streets in the big cities.
- **Day trips:** from the capital and each main hub (one to three hours away).
- **Off the path:** 2 to 3 gems per region that a well-travelled friend would mention.
- **Routes and loops:** the classic itineraries (for example a northern loop, an island hop). Each stop on them is covered.

**Target size:** 25 to 40 places for a large country, 12 to 20 for a small one.

## 2. Self-check before writing data

- Would a friend who has been there say "you missed X"? Ask about each region.
- Does every region in `regions` have places, and does every place belong to a region?
- Can a traveller do the two or three most common routes using only our places and legs?
- Is there something for each vibe: beach, party, culture, nature, food, quiet?
- Is the capital reachable from every city (directly or in one change)?
- Are islands and parks with seasonal closures flagged in crowd notes and timing?
- Any duplicates (a place that is really part of a city we already have)?

## 3. Data each record needs

**Country (top level):** `country`, `flag`, `center` [lat, lng], `zoom`, `bounds` [[s, w], [n, e]], `regions` {id: label}, `currency`, `fx` {codes, `asOf`, `source`}, `asOf` (YYYY-MM), `basics` [[title, text]] (money, getting around, weather, etiquette, law and respect, phone and power, entry rules, emergency numbers), `wishIKnew` [{`icon`, `title`, `tip`}] (10 to 15 real prices and gotchas), `phrases` [[English, romanised, script]] (Thailand's are still hardcoded as `PHRASES` in `index.html`; move them into the data file when adding a second country), `live` {city: [{`title`, `url`}]} (event listing sites), `sources` [{`title`, `url`}], `verify` [strings]. Add the country outline to `geo.json` from the same Natural Earth source.

**Place:** `id` (kebab case), `name`, `region`, `type` (temple, city, food, history, nature, beach, island, ...), `city` (a city id), `lat`, `lng`, `line` (one sentence), `about` (2 to 3 sentences), `tips` [3], `best` (months), `days`, `photo`, `thumb`, `fees` [{`what`, local amount}], `timeOfDay`, `popular` [{`name`, `what`, price, `lat`, `lng`}], `gems` [same shape], `localFavs` [{`name`, `what`, price range}], and a **crowd profile** (as in `crowds.json`): `months` [12 ints 1 to 5], `day` (morning, midday, afternoon, evening, night peak or all-day), `weekend` (1.0 to 1.6), `quietest`, `busiest`, optional `note`. Closed months are 1 and the note says so.

**City:** `id`, `name`, `lat`, `lng`, `getAround` (with prices), per-city price bands `stay`, `food`, `local`, each {`budget`, `mid`, `comfort`: [min, max] per day}, `timing` {`best`, `avoid`, `note`}, `vibe` {`tags`, `line`}, `eat`, `do`, `night` (each [{`name`, `what`, price range, `lat`, `lng`}]), `know` [local tips and scams].

**Leg:** `a`, `b` (city ids), `options` [{`mode`, `duration`, price range, `note`}]. Every city needs legs to its natural neighbours and to the capital (or main airport hub). Include the cheap option and the fast option.

**Event:** `id` (name plus year), `name`, `city` (id or "all"), `kind` (festival, holiday, party, market, music-festival, sport, concert, rave), `start`, `end`, `recurring`, `what`, `tip`, price, `url`, `confirmed` (true only when the dated official source is found). Cover the next 12 to 18 months: public holidays, the big national festivals, regional festivals per region, recurring parties and markets.

**Photos:** one per place, free licence (Unsplash, Pexels, Wikimedia Commons with a CC0 or CC BY licence and credit). Open each one and check it shows the right place, not a lookalike. Resize to the existing photo and thumb sizes and record the credit in the README.

**Verify and sources:** every price, fee, schedule and date gets a source URL in `sources`; anything not re-checked goes in `verify` as a plain sentence.

## 4. Final checks

- JSON parses; every `city`, `region`, leg end and event city points at a real id.
- Prices are in the local currency and current (`asOf`).
- No em or en dashes; no copyrighted text copied from guidebooks.
- Open the app offline after install: new photos and data load from the cache.

## 5. Worked example: Thailand

**Regions:** Bangkok, Central, North, Andaman coast, Gulf islands.

**Covered (18):** Grand Palace, Wat Arun, Yaowarat street food (Bangkok); Ayutthaya, Erawan Falls (Central); Sukhothai, Chiang Mai Old City, Doi Suthep, Pai, White Temple (North); Khao Sok, Railay, Phi Phi, Phuket Old Town, Koh Lanta (Andaman); Koh Samui, Koh Tao, Koh Phangan (Gulf).

**Coming (13):** Koh Chang, Koh Kood, Koh Mak, Koh Samet, Pattaya (east coast); Hua Hin, Khao Yai, Amphawa, Lopburi (central and near Bangkok); Phang Nga Bay, Similan Islands, Koh Lipe (Andaman); Mae Hong Son (North). These need cities, legs, events and photos too, and the east coast needs a region.

**Still missing after the 13:**

- **Isaan (Northeast), the biggest gap:** a whole region with nothing. Candidates: Khon Kaen or Udon Thani (food, Red Lotus Lake), Phanom Rung and Phimai (Khmer temples), Nong Khai and the Mekong, Ubon Ratchathani (Candle Festival in July), Loei and Chiang Khan.
- **Southern Andaman islands:** Koh Kradan, Koh Ngai, Koh Mook and Trang town, plus Koh Yao Noi and Koh Yao Yai between Phuket and Krabi.
- **North off the path:** Nan, Chiang Dao, Doi Inthanon (highest peak, a classic Chiang Mai day trip), Lampang, Mae Hong Son loop stops like Mae Sariang.
- **West:** Kanchanaburi town and the Death Railway beyond Erawan; Sangkhlaburi; Thong Pha Phum.
- **Gulf mainland:** Khao Sam Roi Yot, Chumphon, Nakhon Si Thammarat; Surin Islands (closed with the Similans).
- **Deep south:** Satun and Koh Tarutao beyond Lipe (note current travel advice for the far south border provinces).
- **Bangkok depth:** Chatuchak Weekend Market, Jim Thompson House, Bang Krachao (only a city tip today), the Damnoen Saduak and Maeklong railway markets.
- **Events:** regional festivals for any new region (Ubon Candle Festival, Phi Ta Khon in Loei, Surin Elephant Round-up).
- **Data:** phrases still live in `index.html`; crowd profiles live in a separate file and need merging into places.
