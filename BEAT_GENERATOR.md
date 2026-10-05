# Generate Beat

Open **Create → Generate beat**, use the piano-roll button, or right-click / long-press a MIDI pattern. A groove is ready immediately. Preview plays without editing the project; **Insert beat** commits ordinary MIDI patterns in one undoable action. Song conversion, separation, analysis, tempo maps and maintenance now live under **Tools**. File/Edit/Create/Tools/View/Help keep the permanent transport focused on playback, recording, timing and undo.

Choose Hardstyle, Rawstyle, Hardcore, Gabber, Techno, House, DnB, Breakbeat, Trap, Hip-hop or Custom, and 1/2/4/8/16 bars. Complexity, Energy and Chaos are visible first. Expand Groove & variation for syncopation, humanization, variation, fills, velocity dynamics, free timing and groove lock. Current project BPM and time signature are used; generation does not silently change either.

The engine establishes a repeating motif, develops it through the phrase and places turnarounds at phrase boundaries. Floor styles establish a pulse; DnB/Breakbeat use broken kicks and backbeats; Trap uses a halftime backbeat and rolls. Rawstyle adds kick gaps/doubles and Hardcore/Gabber can use denser kick work. Silence and sparse supporting percussion remain part of the groove. Chaos remains on the project grid unless Free timing is enabled. Seeds now select groove families, hat accents, fills, bass contours and phrase responses; see V3_PATCHES.md. Bass lines are deliberately limited starting points, not harmonic analysis of a whole song.

## Fast iteration

- **Generate** builds a fresh groove with the current seed/settings/sounds.
- **Mutate** retains most existing hits and core anchors while adding/removing controlled detail.
- **Regenerate unlocked** replaces unlocked roles more aggressively.
- **↻ beside a lane** regenerates that lane while preserving the others.
- **Next variation** advances the seed and mutates the current draft.
- **New seed** gives a new groove. **Previous seed** restores the exact preceding draft, including its sound choices and settings.

Lock kick/snare/etc. before iterating. Groove lock retains meter, phrase length and timing feel. A locked lane retains its full phrase, so changing the requested length while a lane is locked keeps the previous phrase length; unlock to resize. Seed text can be copied/pasted. A seed reproduces generation with the same settings and sounds; mutations additionally depend on their source beat. History preserves 32 complete drafts during the current app session, across closing/reopening the dialog. Inserted patterns retain the seed/style and project undo/redo; closing the browser does not save uninserted draft history.

## Sounds and destinations

Project instruments and mapped drum-pad samples are preferred. Sound dropdowns allow role-matching packaged samples and user recordings; name imported sounds Kick/Snare/etc. for automatic role discovery. No special generator instrument is required. The packaged source contains no dedicated hats, so default hats/ride use short filtered regions of its real noise recording, visibly labeled. Long sources should be trimmed to a one-shot before assigning them. Kick tails use sampler choke to avoid uncontrolled overlap.

**New patterns** keeps existing work and adds normal tracks/patterns at the current bar. **Fill empty lanes** skips occupied overlapping lanes and fills empty ones. **Replace selected pattern notes** is explicitly destructive and undoable: instruments, effects and other clips remain intact. Selected piano-roll notes restrict replacement to their pitch/time range; unselected notes remain. Locked clips and locked roles are respected. A drum-pad replacement preserves pitches belonging to other roles. To mutate existing material, select it before opening **Mutate beat**.

Auto preview can be turned off. In-project preview layers the draft over a playing project and aligns its cycle to the current playhead; the generator does not stop the project transport. Preview uses the normal renderer in the audio worker at 24 kHz, capped to the first 32 seconds to bound work/memory on smaller devices. Insertion keeps the entire phrase. Rapid preview requests are debounced/coalesced and stale results discarded. Mid-preview tempo-map changes do not continuously retime its rendered buffer; restart preview after tempo edits. Closing the dialog stops only its own preview.

## Verification

Automated tests cover repeatability, genre templates, motifs, 220 style/length/meter combinations at maximum chaos, opt-in free timing, locked lanes/clips, selection preservation, phrase shortening, normal MIDI data, undo/redo and renderer output. A simulated DOM run exercised custom selectors, menus, generation, mutation, seed recovery, insertion, undo/redo and reopening history. Actual bundled WAVs rendered finite audible PCM for all eleven styles. These checks do not establish subjective musical quality or physical phone compatibility. V3_TEST_RESULTS.txt records the newer headless browser workflow and viewport checks. See BEAT_TEST_RESULTS.txt for the recorded scope. The trained FP32 separation model and all packaged sample files are unchanged.
