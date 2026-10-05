# Trained browser separation and phone workflow

Song → Project defaults to SCNet Base, a trained 10.6M-parameter four-source neural network. Actual bundled ONNX weights produce drums, bass, other instruments and vocals at 44.1 kHz stereo. ONNX Runtime Web 1.21.0 uses single-thread WebAssembly/SIMD inside a dedicated worker; no server inference, uploads, API keys, WebGPU requirement or SharedArrayBuffer requirement. First use downloads ~43 MiB of model weights plus ~13 MiB runtime. Model cache is optional: storage failures permit uncached operation. A fixed SHA-256 verifies weights before model initialization.

The fixed neural graph processes 11-second windows serially. BYTEBASH implements SCNet's centered, reflection-padded, normalized rectangular STFT/ISTFT, with genuine one-second overlapping chunk predictions and normalized crossfades. Input, output and session tensors are released after use. Cancel terminates the dedicated worker, including in-flight inference; the current project remains intact. No heuristic fallback occurs silently. Quick analysis remains an explicitly labeled option preserving prior functionality.

The four stems can be auditioned before creation, become separately editable tracks, and enter the normal effects/resample/sample-to-MIDI workflow. Drum, bass, instrument and vocal stems are independently analyzed for sample and MIDI candidates; recovered sample fragments retain the full-rate stereo stem audio. Tempo and MIDI detection are still classical estimates, clearly labeled, and cannot recover original plug-ins, arrangements or perfect notes. Confidence review and original/audio/MIDI comparison remain available.

## Device bounds and phone controls

Phones (viewport ≤700px) and devices reporting ≤4 GB RAM default to a maximum 30-second separation; ordinary desktops allow up to 180 seconds. Phones require source files ≤3 minutes / 32 MiB before decoding; desktop sources ≤10 minutes / 128 MiB. Export a shorter source on low-memory devices. Phone section length defaults to 30 seconds; start offsets allow a chosen portion of a longer permitted source. Even one neural window has substantial intermediate tensor memory, and older devices may fail gracefully; universal phone/model compatibility is not claimed. Current project data is not replaced before review and successful persistence.

A fixed phone workspace dock exposes Sounds, Arrange, Notes, FX and Mix. Arrangement can expand by collapsing the editor. Transport scrolls instead of overflowing narrow screens, forms stack, dialogs use the visible viewport and safe areas, action buttons remain reachable in long import dialogs, and track/effect controls have larger touch targets. Existing tablet gestures, recording, custom controls, undo, effects and exports remain intact.

## Reproducible checks

- `node --max-old-space-size=192 --test --test-concurrency=1 tests/*.test.js`
- `node scripts/check.mjs`
- `node --max-old-space-size=512 scripts/verify-separation.mjs` runs the exact bundled ONNX Runtime Web/WASM graph and trained weights, with a known bass signal. This is not a mocked inference session. See SCNET_TEST_RESULTS.txt.
- SCNET_MUSIC_TEST_RESULTS.txt records actual native ONNX inference and the complete stem→notes/samples analysis on an 11-second music excerpt. Ground-truth isolated stems were unavailable; this is workflow/numerical verification, not a published SDR benchmark or listening test.

Browser UI, listening and physical phone QA remain unverified. Automated model, workflow and subpath checks do not substitute for device testing.

## Model provenance

- Architecture / original implementation: https://github.com/starrytong/SCNet (MIT).
- MUSDB18 pretrained checkpoint: https://github.com/ZFTurbo/Music-Source-Separation-Training/releases/download/v.1.0.6/scnet_checkpoint_musdb18.ckpt (MSST MIT project).
- Browser export: https://huggingface.co/elicwhite/scnet-browser-onnx/tree/3402761519775515d44f7eaa35e39333d55298e5 and export code https://github.com/elicwhite/scnet-web-wasm/tree/c0fdc19399d9a7d27b5f1d6b34b4c95419decfc6 . BYTEBASH implements its own DSP/worker integration using the export interface.
- SHA-256 of concatenated three model parts: 29137273515c3f10dc69e22a84a63bfc09b71abdf27cf801da463e0644870ade.
- ONNX Runtime Web: https://github.com/microsoft/onnxruntime/tree/v1.21.0 (MIT).

License notices accompany the model and runtime assets. Weights are split into 16 MiB static chunks for hosting asset limits; the validated concatenation is the original export.
