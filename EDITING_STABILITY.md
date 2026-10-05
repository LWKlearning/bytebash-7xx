# BYTEBASH editing stability — 2026-10-03

Reported problems: effect racks disappearing after creating/editing MIDI notes, unreliable editing during playback, and the File menu appearing to do nothing.

Corrections:
- Opening clicks no longer immediately dismiss File or track menus. Outside dismissal runs during capture, before menu-opening handlers; toolbar menu positions follow the actual button rectangle.
- Piano, timeline and automation gestures use bounded, disposable pointer handlers. Completion clears cancellation; cancellation/lost capture restores only the gesture's notes, selected clips, loop or automation points. No gesture replaces the whole project. Other pointer IDs cannot commit an active drag.
- Unfinished gestures are canceled before normal edits, undo, redo or project loading take their snapshots. Undo does not resurrect unfinished previews. Gesture undo/redo preserves concurrent effect changes.
- The piano roll remains mounted while the same pattern and track are edited, preserving note selection, scroll and touch interaction.
- Schedule edits refresh individual changed notes or audio clips immediately, preserving the transport clock, unchanged voices, effect nodes and effect tails. The 120 ms pause/play restart timer is removed. Structural routing/rack changes still use transactional graph replacement; graph provenance updates after successful replacement.
- Playback preparation rechecks project/schedule changes after async asset loading and respects transport generation cancellation. Missing sample voices can retry without waiting for the next loop.
- The new gesture module is included in the offline shell and its cache version is advanced.

Verification:
- Full bounded suite: 157/157 passed (18 modules parsed, 54 HTML IDs, 360 sample paths verified).
- One additional transactional graph regression: passed with the nine existing graph tests (10/10). Total suite: 158 tests.
- 18 new regressions exercise completed/stale/canceled/duplicate note gestures; pointer cancellation and lost capture; preservation of effects in undo/redo; cross-track clips; automation disposal; normal-edit history boundaries; live drawing/editing/deleting; unchanged notes/tracks; rapid undo/redo; Stop behavior; late sample retry; async project edits; File event ordering/anchoring; piano view retention; and actual graph/processor retention after effect addition followed by note creation.
- Browser-console, audible listening and physical/tablet tests remain unverified. Managed preview requires the unavailable control-browser skill; no alternative browser path was used. The tests use DOM/pointer and Web Audio facades plus the existing render/DSP/worklet suites, not a browser session.

This fixes the demonstrated failure paths; it is not a claim that the complete application is universally bug-free.
