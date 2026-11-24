"""Mechanical harmony check for a content app's PLAIN JSON (keep it outside the repo for private apps).

Usage:  python3 tools/harmony_check.py /path/to/content.json
Reads the app's canon from the JSON's top-level "canon" key, if present:
  {"rules": ["..."], "forbid": [{"pattern": "regex", "why": "..."}], "lineFields": ["line"]}
and reports: em/en dashes, forbidden patterns (with where they occur), duplicate and near-duplicate lines.
This catches mechanical drift only. After adding or editing content, ALSO run a full read-through review of the
whole app against canon["rules"] (contradictions between sections, voice, names, terms), and log every change.
"""
import json, re, sys, difflib

def walk(x, path=""):
    if isinstance(x, dict):
        for k, v in x.items():
            if k not in ("canon", "id"): yield from walk(v, f"{path}.{k}" if path else k)
    elif isinstance(x, list):
        for i, v in enumerate(x): yield from walk(v, f"{path}[{i}]")
    elif isinstance(x, str): yield path, x

def main():
    d = json.load(open(sys.argv[1])); canon = d.get("canon", {}) if isinstance(d, dict) else {}
    texts = list(walk(d)); problems = 0
    for p, t in texts:
        if "—" in t or "–" in t: print("DASH", p); problems += 1
    for f in canon.get("forbid", []):
        rx = re.compile(f["pattern"], re.I)
        for p, t in texts:
            m = rx.search(t)
            if m: print("FORBID", f.get("why", f["pattern"]), "|", p, "|", t[max(0, m.start() - 40):m.end() + 40].replace("\n", " ")); problems += 1
    fields = tuple(canon.get("lineFields", ["line"]))
    lines = [(p, t.strip()) for p, t in texts if p.rsplit(".", 1)[-1] in fields]
    seen = {}
    for p, t in lines:
        k = re.sub(r"\W+", " ", t.lower()).strip()
        if k in seen: print("DUPLICATE", p, "=", seen[k], "|", t); problems += 1
        seen.setdefault(k, p)
    keys = list(seen.items())
    for i in range(len(keys)):
        for j in range(i + 1, len(keys)):
            if len(keys[i][0]) > 20 and difflib.SequenceMatcher(None, keys[i][0], keys[j][0]).ratio() > 0.9:
                print("NEAR-DUPLICATE", keys[i][1], "~", keys[j][1]); problems += 1
    print(f"{len(texts)} strings checked, {problems} issue(s).", "Rules to review by reading:" if canon.get("rules") else "", *[f"\n - {r}" for r in canon.get("rules", [])])
    sys.exit(1 if problems else 0)

if __name__ == "__main__":
    main()
