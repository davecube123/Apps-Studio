# Daily Way ◯

A 20-minute daily practice towards mastery of four classics, the **Tao Te Ching**, the **I Ching**,
**The Secret of the Golden Flower** and the **Chuang Tzu**, and towards living their shared teaching.
Apple-style minimalism, offline, private.

## The daily session (≈20 min)

| Step | Time | What you do | Why |
| --- | --- | --- | --- |
| Arrive | 1 | Three slow breaths; today's *thread* (an idea that runs through all four books) | Settles attention; primes what to look for |
| Recall | 4 | Spaced-repetition cards from your captures, threads and hexagrams, mixed | Testing effect (Roediger & Karpicke, 2006); spacing (Cepeda et al., 2006); interleaving (Rohrer & Taylor, 2007) |
| Read | 5 | Today's chapter on a weekly rhythm across the books; Legge's Tao Te Ching is built in, others point to your edition, with a 5-min timer | Interleaving; slow, repeated reading |
| Capture | 3 | One passage, in your own words, plus the question it raises, tagged to threads | Generation effect (Slamecka & Graf, 1978); elaborative interrogation (Dunlosky et al., 2013) |
| Connect | 2 | Today's passage beside one from a *different* book: what do they say to each other? | Integration across sources (Wiley & Voss, 1999) |
| Sit | 4 | "Circulating the light" (Golden Flower), with a breathing guide, bell and screen kept awake | Brief daily meditation (Zeidan et al., 2010; Tang et al., 2015) |
| Carry | 1 | "When ___, I will ___" for the day | Implementation intentions (Gollwitzer & Sheeran, 2006) |
| Evening | 2 | Did you live it? What did you notice? What would you tell a friend? | Reflection (Di Stefano et al., 2014); self-distancing (Kross & Ayduk, 2011) |

Plus **Teach it back** on Sundays (explain a thread to a beginner; protégé effect, Fiorella & Mayer, 2013).

## Staying motivated

- Three rings (**Learn · Practice · Reflect**) that close as you complete the day.
- A forgiving streak: one missed day is fine, two in a row reset it (Lally et al., 2010; avoids all-or-nothing).
- **Just 2 minutes** on busy days still counts as showing up (Fogg, 2019).
- Your own *why*, shown on Today (self-concordant goals; Sheldon & Elliot, 1999).
- Week of rings, an 18-week heatmap, progress through each book, memory maturity, and 16 milestones.
- A daily calendar reminder (.ics) at your chosen time.

## Books and copyright

The Tao Te Ching is James Legge's 1891 translation (public domain), taken from Tao Reader. For the
I Ching, Golden Flower and Chuang Tzu you read **your own editions**: set the translator and the
number of chapters for each, and the plan follows them. Thread descriptions and prompts are original.
On I Ching days, if you use [My I Ching](../i-ching-book/) on the same site, your own words for the
hexagram appear in the Read step.

## Data

Everything is stored in `localStorage` on the device. Settings → *Back up* exports a JSON file to
restore on another device. When files change, bump `VERSION` in `sw.js` and `APP_VERSION` in `index.html`.
