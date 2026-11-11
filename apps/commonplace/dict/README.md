# Commonplace dictionary data

- `wn-*.json`: **WordNet 3.1**, Princeton University (see `LICENSE-WordNet.txt`, which must accompany it).
  Each file holds the lemmas starting with that letter: `{"s": [[part of speech, gloss, "words in the synset"], …], "w": {lemma: [synset index, …]}}`, senses in WordNet's frequency order.
- `web-*.json`: **Webster's Revised Unabridged Dictionary (1913)**, public domain (Project Gutenberg text, via the
  `WebstersEnglishDictionary` JSON). `{word: definition}`; separate entries for one word are divided by a blank line.
- `index.json`: the list of parts, used by Settings → Dictionary → Download for offline.

Built from the `wordnet-db` (3.1.14) and `websters-english-dictionary` (2.0.0) npm packages by a script that only reformats them.
