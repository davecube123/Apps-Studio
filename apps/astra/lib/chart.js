/* Astra chart engine: tropical zodiac, whole sign houses, real positions from Astronomy Engine (MIT). */
(function (root) {
  "use strict";
  const A = root.Astronomy;
  const SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
  const BODIES = { sun: "Sun", moon: "Moon", mercury: "Mercury", venus: "Venus", mars: "Mars", jupiter: "Jupiter", saturn: "Saturn", uranus: "Uranus", neptune: "Neptune", pluto: "Pluto" };
  const PLANETS = Object.keys(BODIES);
  const norm = x => ((x % 360) + 360) % 360;
  const rad = Math.PI / 180;

  /* local wall-clock time in an IANA zone -> UTC Date (uses the browser's own time zone database) */
  function tzOffsetMin(ms, tz) {
    const f = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const p = {}; f.formatToParts(new Date(ms)).forEach(x => p[x.type] = x.value);
    return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second) - Math.floor(ms / 1000) * 1000) / 6e4;
  }
  function zonedToUtc(y, mo, d, h, mi, tz) {
    const guess = Date.UTC(y, mo - 1, d, h, mi);
    let ms = guess - tzOffsetMin(guess, tz) * 6e4;
    ms = guess - tzOffsetMin(ms, tz) * 6e4;
    return new Date(ms);
  }

  function lonOf(p, date) {
    if (p === "sun") return A.SunPosition(date).elon;
    if (p === "moon") return A.EclipticGeoMoon(date).lon;
    return A.Ecliptic(A.GeoVector(BODIES[p], date, true)).elon;
  }
  /* longitudes and daily speed (degrees/day) for every planet */
  function positions(date) {
    const out = {}, t0 = new Date(date.getTime() - 432e5), t1 = new Date(date.getTime() + 432e5);
    for (const p of PLANETS) {
      const lon = norm(lonOf(p, date));
      let sp = norm(lonOf(p, t1)) - norm(lonOf(p, t0)); if (sp > 180) sp -= 360; if (sp < -180) sp += 360;
      out[p] = { lon, speed: sp, retro: p !== "sun" && p !== "moon" && sp < 0 };
    }
    return out;
  }
  function angles(date, lat, lon) {
    const t = A.MakeTime(date), eps = A.e_tilt(t).tobl * rad;
    const ramc = norm(A.SiderealTime(t) * 15 + lon) * rad, phi = lat * rad;
    const asc = norm(Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) / rad);
    const mc = norm(Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(eps)) / rad);
    return { asc, mc };
  }
  const signOf = lon => SIGNS[Math.floor(norm(lon) / 30)];
  const degIn = lon => norm(lon) % 30;

  /* birth chart. If the birth time is unknown, houses are counted from the Sun's sign (a solar chart). */
  function natal(b) {
    const date = b.timeKnown ? zonedToUtc(b.y, b.m, b.d, b.h, b.mi, b.tz) : zonedToUtc(b.y, b.m, b.d, 12, 0, b.tz);
    const pos = positions(date), ch = { date, pl: {}, timeKnown: !!b.timeKnown };
    let first;
    if (b.timeKnown) { const a = angles(date, b.lat, b.lon); ch.asc = a.asc; ch.mc = a.mc; first = Math.floor(a.asc / 30); }
    else first = Math.floor(pos.sun.lon / 30);
    ch.first = first;
    const houseOf = lon => ((Math.floor(norm(lon) / 30) - first + 12) % 12) + 1;
    for (const p of PLANETS) ch.pl[p] = Object.assign({}, pos[p], { sign: signOf(pos[p].lon), deg: degIn(pos[p].lon), house: houseOf(pos[p].lon) });
    ch.houseSign = h => SIGNS[(first + h - 1) % 12];
    ch.houseOf = houseOf;
    return ch;
  }

  const ASPECTS = [{ a: 0, kind: "fusion", name: "conjunct", g: "☌" }, { a: 60, kind: "flow", name: "sextile", g: "⚹" }, { a: 90, kind: "tension", name: "square", g: "□" }, { a: 120, kind: "flow", name: "trine", g: "△" }, { a: 180, kind: "tension", name: "opposite", g: "☍" }];
  function aspect(l1, l2, orb) {
    let d = Math.abs(norm(l1) - norm(l2)); if (d > 180) d = 360 - d;
    for (const x of ASPECTS) { const o = Math.abs(d - x.a); if (o <= orb * (x.a === 60 ? .75 : 1)) return Object.assign({ orb: o }, x); }
    return null;
  }

  /* natal points that transits are read against */
  function points(ch) {
    const pts = { sun: ch.pl.sun.lon, moon: ch.pl.moon.lon, venus: ch.pl.venus.lon, mars: ch.pl.mars.lon, jupiter: ch.pl.jupiter.lon };
    if (ch.timeKnown) { pts.asc = ch.asc; pts.mc = ch.mc; }
    return pts;
  }
  const ORB = { sun: 2, mercury: 1.5, venus: 2, mars: 2, jupiter: 2, saturn: 2, uranus: 1.5, neptune: 1.5, pluto: 1.5 };
  function transits(date, ch, pos) {
    pos = pos || positions(date); const pts = points(ch), out = [];
    for (const t of Object.keys(ORB)) for (const [n, l] of Object.entries(pts)) {
      const x = aspect(pos[t].lon, l, ORB[t]); if (x) out.push({ t, n, kind: x.kind, name: x.name, g: x.g, orb: x.orb, applying: null });
    }
    return out.sort((a, b) => a.orb - b.orb);
  }

  /* How much each transit planet and natal point touches each domain (0..1). */
  const REL = {
    power: { sun: 1, mars: 1, saturn: .8, pluto: .8, jupiter: .6, mc: 1, asc: .7, moon: .2, venus: .2, mercury: .4, uranus: .5, neptune: .2 },
    abundance: { jupiter: 1, venus: .9, sun: .5, saturn: .6, mercury: .5, moon: .4, mc: .6, asc: .2, mars: .3, pluto: .4, uranus: .4, neptune: .3 },
    love: { venus: 1, moon: .9, sun: .5, jupiter: .5, asc: .5, mars: .4, neptune: .6, mercury: .3, saturn: .3, pluto: .4, uranus: .3, mc: .1 },
    sex: { mars: 1, venus: .9, pluto: .9, moon: .5, asc: .5, sun: .3, neptune: .4, uranus: .4, jupiter: .3, saturn: .2, mercury: .2, mc: 0 }
  };
  const DOMAINS = Object.keys(REL);
  const KINDW = { flow: 1, fusion: .8, tension: -.7 };
  /* hard aspects from benefics still help; easy aspects from malefics help less */
  const NATURE = { venus: .4, jupiter: .5, saturn: -.3, mars: -.1, pluto: -.1, uranus: -.1, neptune: -.1 };
  const MOON_EL = { fire: { power: .5, sex: .4 }, earth: { abundance: .5, sex: .2 }, air: { love: .3, power: .2 }, water: { love: .5, sex: .4 } };
  const ELEM = ["fire", "earth", "air", "water"];
  function moonPhaseId(deg) { return ["new", "crescent", "first-quarter", "gibbous", "full", "disseminating", "last-quarter", "balsamic"][Math.floor(norm(deg + 22.5) / 45)]; }

  /* A 1..5 reading per domain for a given moment, plus the transits that drive it. */
  function score(date, ch, pos) {
    pos = pos || positions(date); const tr = transits(date, ch, pos), res = {};
    const phase = A.MoonPhase(date), moonSign = signOf(pos.moon.lon), el = ELEM[SIGNS.indexOf(moonSign) % 4];
    const waxing = phase < 180;
    for (const d of DOMAINS) {
      let s = 0; const why = [];
      for (const x of tr) {
        const w = (REL[d][x.t] || 0) * (REL[d][x.n] || 0); if (!w) continue;
        const slow = ["jupiter", "saturn", "uranus", "neptune", "pluto"].includes(x.t) ? .8 : 1;
        const tight = 1 - x.orb / (ORB[x.t] + .01) * .5;
        const v = w * slow * tight * (KINDW[x.kind] + (NATURE[x.t] || 0) * (x.kind === "tension" ? 1 : .5));
        s += v; if (Math.abs(v) > .12) why.push(Object.assign({ v }, x));
      }
      s += (MOON_EL[el][d] || 0) * .8;
      if (moonSign === ch.pl.sun.sign) s += .3; /* Moon in your Sun sign: a personal high */
      if (d === "abundance" || d === "power") s += waxing ? .25 : -.1;
      if (d === "sex" && phase > 150 && phase < 210) s += .35; /* full Moon */
      for (const r of ["venus", "mars", "mercury"]) if (pos[r].retro) s -= r === "venus" && (d === "love" || d === "abundance") ? .5 : r === "mars" && (d === "power" || d === "sex") ? .5 : r === "mercury" ? .1 : 0;
      const val = Math.max(1, Math.min(5, Math.round((3 + s * 1.15) * 2) / 2));
      res[d] = { val, raw: s, why: why.sort((a, b) => Math.abs(b.v) - Math.abs(a.v)) };
    }
    return { domains: res, transits: tr, moonSign, phase, phaseId: moonPhaseId(phase), pos };
  }

  /* Chaldean planetary hours from local sunrise and sunset */
  const CHALDEAN = ["saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon"];
  const DAY_RULER = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn"];
  function planetaryHours(date, lat, lon) {
    const obs = new A.Observer(lat, lon, 0);
    const startSearch = new Date(date.getTime() - 30 * 3600e3);
    let rise = A.SearchRiseSet("Sun", obs, +1, startSearch, 2);
    if (!rise) return null;
    /* find the sunrise that starts the current planetary day */
    let next = A.SearchRiseSet("Sun", obs, +1, new Date(rise.date.getTime() + 3600e3), 2);
    while (next && next.date <= date) { rise = next; next = A.SearchRiseSet("Sun", obs, +1, new Date(rise.date.getTime() + 3600e3), 2); }
    const set = A.SearchRiseSet("Sun", obs, -1, rise.date, 1); if (!set || !next) return null;
    const r = rise.date.getTime(), s = set.date.getTime(), n = next.date.getTime();
    /* the weekday ruler belongs to the local date of the sunrise */
    const wd = new Date(r + lon / 15 * 3600e3).getUTCDay(), ruler = DAY_RULER[wd];
    let i = CHALDEAN.indexOf(ruler); const hours = [];
    for (let k = 0; k < 24; k++) {
      const day = k < 12, a = day ? r + (s - r) / 12 * k : s + (n - s) / 12 * (k - 12), b = day ? r + (s - r) / 12 * (k + 1) : s + (n - s) / 12 * (k - 11);
      hours.push({ planet: CHALDEAN[(i + k) % 7], start: new Date(a), end: new Date(b), day });
    }
    return { ruler, sunrise: rise.date, sunset: set.date, next: next.date, hours };
  }

  /* sky events over a span: sign changes, stations (retro/direct) and Moon phases */
  function events(from, days) {
    const out = []; let prev = positions(from);
    for (let i = 1; i <= days * 2; i++) {
      const d = new Date(from.getTime() + i * 432e5), cur = positions(d);
      for (const p of PLANETS) {
        if (p === "moon") continue;
        if (signOf(prev[p].lon) !== signOf(cur[p].lon)) out.push({ at: d, type: "ingress", p, sign: signOf(cur[p].lon), retro: cur[p].retro });
        if (prev[p].retro !== cur[p].retro && p !== "sun") out.push({ at: d, type: cur[p].retro ? "retro" : "direct", p, sign: signOf(cur[p].lon) });
      }
      prev = cur;
    }
    for (const [lon, name] of [[0, "new"], [90, "first-quarter"], [180, "full"], [270, "last-quarter"]]) {
      let t = from;
      for (;;) { const r = A.SearchMoonPhase(lon, t, days); if (!r || r.date - from > days * 864e5) break; out.push({ at: r.date, type: "phase", phase: name, sign: signOf(A.EclipticGeoMoon(r.date).lon) }); t = new Date(r.date.getTime() + 864e5); }
    }
    return out.sort((a, b) => a.at - b.at);
  }

  /* synastry: aspects between two charts' personal planets */
  function synastry(a, b) {
    const P = ["sun", "moon", "venus", "mars"], out = [];
    for (const x of P) for (const y of P) { const asp = aspect(a.pl[x].lon, b.pl[y].lon, x === "moon" || y === "moon" ? 6 : 7); if (asp) out.push({ a: x, b: y, kind: asp.kind, name: asp.name, g: asp.g, orb: asp.orb }); }
    return out.sort((p, q) => p.orb - q.orb);
  }

  root.Chart = { SIGNS, PLANETS, DOMAINS, REL, norm, zonedToUtc, tzOffsetMin, positions, angles, natal, aspect, transits, score, planetaryHours, events, synastry, signOf, degIn, moonPhaseId };
})(typeof window !== "undefined" ? window : globalThis);
