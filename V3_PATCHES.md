# BYTEBASH v3 — editing and variation patch

## MIDI notes

Use **Select all**, **Clear**, **Multi select** and **Selection…** in the piano roll. Select supports drawing a selection rectangle on desktop and touch. Multi select switches to Select and lets you tap notes to add/remove them without a keyboard; turn it off to move the selected group. Right-click/long-press a note preserves an existing group selection and offers copy/paste, duplicate, mute, delete, invert and bulk operations.

Selection operations include transpose, move, velocity, pan, probability, length, length scaling, every-N repeats, quantize, humanize, reverse, mute/unmute, duplicate and delete. Edits affect the selected notes and use one undo. Group nudge and bulk transposition stop at bounds together. Duplicate/paste preserves relative rhythm and extends the pattern when needed. Humanize and Transpose now honor selection; their existing dedicated buttons apply to all notes when none are selected. Locked patterns cannot be edited. On touch, choose **Resize notes** for deliberate length dragging; a short note no longer acts entirely like a resize handle.

The normal piano-roll clipboard shortcuts now copy/paste notes. Arrangement pattern context actions explicitly target clips, even while note selection exists. Delete with no selected piano notes does not delete the entire pattern.

## Tracks

Tick track-header checkboxes, Ctrl/Shift-click header space, or use **Edit → Track selection operations**. The ⋯ above the track list opens the same panel with track selectors. Apply mute/unmute, solo/unsolo, arm/disarm, gain, pan, color, output routing, clip lock/unlock, duplicate, move up/down or delete in one undoable operation. Routing rejects feedback loops transactionally.

Track duplication retains instruments, clips, FX, automation and macro mappings; copied IDs and links are remapped. Duplicated track groups preserve their internal output/send connections. Frozen copies retain an independent source snapshot without reconnecting the original bus inputs. Track deletion clears dangling outputs, sends and sidechain references, including master inserts.

## Beat variation

Seeds now choose a shared groove family, varied hat rhythm, backbeat ghosts at higher complexity, percussion answers, fill shape, bass contour and phrase response. Longer phrases develop pressure/release and alternate sections. Floor styles keep a clear initial pulse, with later kick gaps/doubles and gated melodic kick variation. Broken styles use distinct kick recipes. These are editable musical starting points, not complete songs or a guarantee of taste.

**New seed** picks fresh unlocked samples by default. Disable that option to retain your kit. Project instruments remain preferred for the initial draft. Lane locks retain their notes and sounds. Shuffle sounds genuinely picks fresh sample candidates. Replacing a lane sound updates the draft immediately. Previous draft recovery remains exact; a seed alone reproduces a fresh generation with the same settings and kit, while mutation also depends on the source beat.

Mutating several patterns of the same role preserves each pattern's own source identity. Pitched kick notes are included in single-zone mutation. Fill-empty merges multiple roles into an empty drum-pad pattern instead of overwriting earlier roles.

## Stability patches

New drum patterns open around their notes rather than below the visible roll. Phone metronome remains visible; BPM controls no longer inflate the transport. Async crop/processing resolves the current source after undo, captures the requested crop range, and preserves material edited during the job. Resampling doesn't mute a source changed while rendering. Freeze refuses to replace a changed project with stale rendered material. Completed renders remain usable sounds even when their original target changes.

The service-worker cache version is advanced to v3. Existing capabilities, packaged samples and full FP32 separation weights are retained.

## Verification scope

See V3_TEST_RESULTS.txt. Automated and headless Chromium checks cover the patched workflows, live AudioWorklet playback/effect edits, actual sampler/worker renders, a phone viewport, and a simulated microphone. These are not physical-device or subjective listening tests. Real microphone hardware, iOS/Safari, external MIDI hardware and the subjective quality of every seed remain unverified.
