# Woodshed

A practice recorder for playing and singing with a guitar, as an installable, offline PWA.

- **Record:** the phone's voice processing is off by default (it squashes guitar), with a live waveform, a level meter that warns when you clip, optional input boost, a count-in on the metronome, pause, and **Mark** to flag a spot to come back to.
- **Songs:** key, capo, tempo, and your lyrics with chords (chord lines are highlighted on the Record screen). Takes collect under their song.
- **Takes:** a practice log (minutes per day, streak), quick play from the list, and a player with seek, ±5 s, markers, A–B loop, slow-down without pitch change (0.5×–1×), star ratings, notes, and share or save.
- **Feedback on every take** (analysed on the phone, in a background worker): *Pitch* traces your sung notes on a note grid and scores how many land within 20 cents, and whether you lean flat or sharp; *Timing* plots your tempo across the take (rushing or dragging, against the click if you used one) and how tightly strums sit on the beat; *Dynamics* measures the range between quiet and loud. Each comes with one concrete thing to practise next.
- **Compare:** switch between two takes at the same moment (A/B) to hear what changed.
- **Practice loop:** set one thing to focus on for the next take; it is saved with the take, and you rate each take as you go.
- **Drone:** a sustained root (and fifth) in any key to sing against, for intonation.
- **Microphone:** on only while you record (or check your level, or tune), off the moment you stop.
- **Groove:** play along with a click and see every strum land on a live timeline, early or late, with your *spread* (consistency, in ms) and your *feel* (pushing or laid back). The microphone path is low-passed and the click is a high woodblock tick, so it works through the speaker; an AudioWorklet marks each attack to the sample, and a one-time loopback calibration removes the phone's audio delay. You can also tap the screen. The click can sound on every beat, on 2 & 4, on beat 1 only, or on the offbeats, with subdivisions (8ths, triplets, 16ths), swing, silent bars (gap click) and a speed trainer. Eleven exercises (Lock in, Constant motion, Backbeat, Only the one, Gap click, Inner clock, Slow is hard, Offbeats, Swing feel, Sixteenths, Speed trainer) keep your best result, and a 14-day chart tracks your spread.
- **Tune:** a chromatic tuner with standard-tuning reference tones, a metronome with tap tempo, and recording settings.

Recordings are stored on the device (IndexedDB) and never uploaded.
