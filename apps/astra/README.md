# Astra

Astrology for four parts of life: **power, abundance, love and sex**.

- **Real chart:** tropical zodiac, whole sign houses. Planet positions come from [Astronomy Engine](https://github.com/cosinekitty/astronomy) (MIT, `lib/astronomy.min.js`). Ascendant and Midheaven are computed from sidereal time and checked against the horizon. Birth time is converted to UTC with the browser's own time zone database. Without a birth time, houses are counted from the Sun's sign.
- **Today:** the Moon's sign and phase, a 1 to 5 reading for each domain built from transits to your Sun, Moon, Venus, Mars, Jupiter, Rising and Midheaven, the current planetary hour, and today's transits.
- **Domain pages:** today's drivers, your best planetary hours today, the best days in the next 30, your natal blueprint (placements, house signs, planets in houses) and 10 practices.
- **My chart:** a wheel plus every placement; tap one to read it.
- **Sky ahead:** 60 days of ingresses, retrograde stations and Moon phases, placed in your houses.
- **Match:** compares your Sun, Moon, Venus and Mars with someone else's, for love and chemistry.

Data: `data/astra.json` is original writing for this app. `data/cities.json` comes from city-timezones (MIT), from simplemaps World Cities Basic (CC BY 4.0). Everything stays on the device. Astrology is offered for reflection and timing, not as a promise.
