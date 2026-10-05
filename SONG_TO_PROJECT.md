# Song → Project

The arrangement toolbar, File menu and command palette now open Song → Project. Choose/drop a song, analyze it, review tempo/confidence and audition extracted samples, then create a new BYTEBASH project. The current session is saved before switching; canceling analysis leaves it untouched.

The importer creates:
- Original-song audio clips referencing the original encoded source.
- Estimated tonal and percussion layers, arranged in editable four-bar phrase clips.
- Percussion MIDI mapped to automatically created drum sampler zones.
- Candidate bass and pitched/polyphonic MIDI patterns, with confidence annotations and tone samples mapped to their detected roots.
- Phrase/energy-change markers and estimated tempo.
- Extracted sounds in the Files browser, immediately searchable, draggable, pitchable and usable with the normal effects chain.

Song layers switches playback between original audio, separated layers, and MIDI/sampler reconstruction. Extra tracks remain unaffected. Ordinary track mute, edits, automation, effects, resampling, MIDI export and project saving still work. Sustained detected notes crossing phrase boundaries are preserved as editable continuations. Imported tonal samples use gated chromatic samplers with configurable looping; percussion uses mapped one-shots.

## Honest limits

This is classical signal analysis, not exact recovery of the original production session. It does not identify original plug-ins/effect settings, separate singers from every instrument, or recreate perfect MIDI from dense mixes. Tonal/percussive components are estimated by tiled median-filtered STFT masks; pitched candidates use harmonic salience with residual suppression. Confidence is an estimate, not a calibrated probability. Tempo is constant and phrase grouping assumes 4/4; review/manual correction are provided. Overlapping samples may contain other sounds. Detected percussion timbres are heuristically grouped, not named with certainty.

Analysis, previews and recovered sample/layer playback use 12 kHz audio; separation is mono. The imported source's encoded bytes remain unchanged in local storage and portable archives. The source comparison is decoded at the bounded analysis rate for playback. Maximum source duration is 10 minutes and maximum encoded file size is 128 MB. Source duration is checked before decoding. Source ranges can be analyzed within that bound. Up to 24,000 note candidates and 18 samples are retained; reaching the note bound is reported in review.

## Stability

Heavy analysis runs in a dedicated transferable-buffer worker with progress. Cancel terminates that worker and rejects its pending operation without terminating the shared render/export worker. Spectrogram memory is tiled rather than retaining the full complex spectrum. Only audible recovered layers are preloaded, and recovered material is decoded at its stored rate instead of allocating 48 kHz duplicate PCM. Lazy scheduling loads newly enabled layers without transport/FX reconstruction. Partial saves are removed on persistence failure/cancellation. Original encoded sources are copied into portable projects instead of re-encoding them, and their MIME/provenance survives reopen. Offline shell includes all importer modules.

## Verification

178 bounded automated tests passed, including 20 new tests: known 150 BPM mixed rhythm plus simultaneous bass/lead; complementary separated PCM and unchanged input; anti-phase stereo and silence; tempo ambiguity/confidence fallback; bounds/malformed inputs; monotonic progress; sampler mappings and project assets; sustained notes across phrase boundaries; BPM override and source offsets; audible audio/MIDI renders and comparison behavior; selective asset preloading; bounded-rate decoding; scheduling changes without graph changes; actual isolated worker transfers; complete choose/analyze/review/create workflow; cancellation; partial-save cleanup; original-byte portable export/reopen; mix rendering with only audible assets; and preservation of unused extracted samples in portable projects. Existing 158 editing, audio graph, MIDI, DSP, export and workflow tests remain passing. Syntax/import/asset checks cover 22 modules, 54 HTML IDs and 360 bundled samples.

The known-input fixtures and DOM/Web Audio facades are automated tests, not subjective listening or real browser QA. Browser-console/listening/physical tablet QA remains unavailable: managed preview requires the missing control-browser skill and prohibits improvised browser-control alternatives.

## Method references

- Derry FitzGerald, Harmonic/Percussive Separation using Median Filtering (DAFx 2010): https://arrow.tudublin.ie/argcon/67/
- Anssi Klapuri, Multiple Fundamental Frequency Estimation by Summing Harmonic Amplitudes (ISMIR 2006): https://archives.ismir.net/ismir2006/paper/000125.pdf
- Web Audio API: cross-context AudioBuffer sharing and decode sample-rate behavior: https://www.w3.org/TR/webaudio/

## Trained separation upgrade

The earlier 12 kHz heuristic separator described above remains only under the explicitly selected Quick analysis option. Default Song → Project now uses SCNet Base for drums/bass/other/vocal stems at 44.1 kHz stereo, with stem-specific note and sample extraction. See SCNET_SEPARATION.md for the current workflow, device limits, provenance and verification.
