# My I Ching ䷀

A PWA for mastering the 64 hexagrams by **writing your own Book of Changes**. You produce a
hexagram your own way (coins, yarrow, dice, numbers, anything) and enter it line by line. The app
gives you its structure and asks you to write its Judgment, Image and six lines in your own words,
and how they relate to your life right now. Over months the chapters fill in, keep their earlier
drafts, and print as a real book.

No translation is bundled. The structure (trigrams, sequence, line positions) is ancient and public
domain. Keywords and contemplation questions are original. Every text is yours.

## How it's organised

- **Today:** start a reading, the attitude you're carrying, reading look-backs that are due, one chapter to write today, practice due.
- **New reading:** question → situation → method → build six lines (6/7/8/9) from the bottom up, type them (`789678`), start from a number, or let the app cast (coin or yarrow odds).
- **Reading:** primary → relating hexagram, moving-line emphasis (Zhu Xi's rule), then guided steps: first impression, Judgment, Image, moving lines, where it's heading, carry it into life (attitude + "When…, I will…"), and look back.
- **How to read a hexagram:** the method in eight steps (question and first impression, the two trigrams, name and Judgment, Image, lines, hidden and relating hexagrams, bringing it home, looking back). Each step comes with a fully worked example: a reading of Hexagram 3 with line 1 moving, changing into 8.
- **My Book:** 64 chapters in sequence or as an 8×8 trigram map. Each chapter has *My words* (every passage keeps dated drafts you can restore), *Interpret* (the eight-step method applied to that hexagram, with its trigrams, place, centre and resonance of each line, its defining line and hidden hexagram, and writing fields at each step), *Structure* (trigrams, the six places, fitting and resonance, nuclear, inverse, opposite and pair hexagrams) and *In my life* (every reading it appeared in).
- **Practice:** Leitner spaced repetition. Decks: trigrams, figure → name, name → figure (you build it), and your own words.
- **Read as a book:** a typeset title page, preface, contents and chapters → Print / Save as PDF. Also Markdown export and JSON backup/restore.

## The research behind it

| Feature | Why |
| --- | --- |
| Every text written in your own words | Generation effect (Slamecka & Graf, 1978; Bertsch et al., 2007) |
| "How it speaks to my life now" | Self-reference effect (Rogers et al., 1977; Symons & Johnson, 1997) |
| Recall before reveal, spaced 1/3/7/16/35/90 days | Testing effect (Roediger & Karpicke, 2006); spacing (Cepeda et al., 2006); Leitner (1972) |
| Mixed practice | Interleaving (Rohrer & Taylor, 2007) |
| Learning hexagrams as two trigrams | Chunking (Miller, 1956); dual coding (Paivio, 1971) |
| Question and first impression recorded before events unfold | Guards against confirmation and hindsight bias (Nickerson, 1998; Fischhoff, 1975) |
| Reflective writing on the situation | Expressive writing (Pennebaker, 1997) |
| "When ___, I will ___" | Implementation intentions (Gollwitzer & Sheeran, 2006) |
| Look back after 3–30 days | Reflection improves learning from experience (Di Stefano et al., 2014; Kolb, 1984) |
| "What would I tell a friend?" | Self-distancing (Kross & Ayduk, 2011; Grossmann & Kross, 2014) |
| Kept drafts, revising chapters | Elaborative rehearsal (Craik & Lockhart, 1972) |

The same list is in the app under **The science behind this app**.

## Design

Calm, writing-first journaling (in the spirit of Day One and Stoic), with the look of ink on rice
paper: serif writing surfaces, one vermilion seal accent, brush-textured hexagrams, light and dark themes.

## Data

Everything is in `localStorage` on the device. Settings → *Back up* exports a JSON file you can
restore on another device. Bump `VERSION` in `sw.js` when files change.
