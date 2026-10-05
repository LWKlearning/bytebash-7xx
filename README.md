# BYTEBASH 7XX — GitHub Pages edition

A complete static HTML/JavaScript DAW. No Sites account, backend, build step, API key or inference server is required. The package includes the full sample pack, phone UI, sampler/MIDI workflow, effects, resampling, recording and trained SCNet song separation.

## v3 editing and stability update

The piano roll now has touch selection, a note clipboard and undoable bulk operations. Track checkboxes and **Edit → Track selection operations** provide bulk track editing. Seeds choose stronger rhythmic/phrase variation and fresh unlocked samples. Async processing and playback-editing edge cases are patched. See [V3_PATCHES.md](V3_PATCHES.md) and V3_TEST_RESULTS.txt.

## Beat generator and menus

**Create → Generate beat** opens the new style-aware generator. Generate, mutate, lock lanes, recover seeds and insert ordinary editable MIDI in one undoable action. The piano roll and MIDI pattern context menu provide direct access. Secondary features, including **Song → Project**, now live under **Tools**. See [BEAT_GENERATOR.md](BEAT_GENERATOR.md) for controls, destinations, history and preview limits.

## Publish

1. Extract this ZIP. Upload/commit the **contents** of the extracted folder to a GitHub repository. `index.html`, `.nojekyll`, `assets/`, `samples/`, `models/` and `vendor/` must be at the repository root; don't upload the ZIP itself.
2. Open the repository's **Settings → Pages**.
3. Select **Deploy from a branch**, choose your branch (normally `main`) and **/ (root)**, then Save.
4. Open the URL shown by GitHub Pages after deployment completes. Both `https://USERNAME.github.io/` and `https://USERNAME.github.io/REPOSITORY/` are supported.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

This package is large, so uploading with Git is usually easier than the web uploader. Run these inside the extracted folder, replacing the remote with your own repository URL:

```sh
git init -b main
git add .
git commit -m "Add BYTEBASH static app"
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
git push -u origin main
```

The empty `.nojekyll` file must be included. It preserves the ordinary static site, including the neural runtime's `vendor/` directory. No npm install is needed to publish. Do not enable Git LFS for these assets: the package contains ordinary files suitable for static hosting, and each model part is under 17 MB.

## Model unchanged

The original **full FP32 SCNet Base ONNX graph and weights** are included byte-for-byte. There is no quantization, half-precision conversion, pruning or reduced neural model. The three `.bin` parts are simple file splitting, reconstructed exactly before inference; ZIP compression is lossless. Combined SHA-256:

`29137273515c3f10dc69e22a84a63bfc09b71abdf27cf801da463e0644870ade`

Song → Project separates drums, bass, vocals and other instruments at 44.1 kHz stereo using ONNX Runtime Web/WASM in a local worker. First use downloads about 43 MiB of model weights and the runtime from **your own GitHub Pages site**, then caches them when storage permits. User audio remains on the device. Tempo/MIDI restoration is still an estimate and is labeled accordingly. Quick heuristic analysis is an explicit separate option.

Phones start with a 30-second section; desktop neural sections are bounded at 180 seconds. Source/file limits are shown during import to avoid unbounded memory use. Choose a shorter exported source on older devices. Phone controls include Sounds/Arrange/Notes/FX/Mix navigation and touch-sized controls. No claim of support for every browser or device is made; microphone permissions, browser audio formats, WebAssembly/SIMD support and available memory still matter.

## Local use and testing

Serve this folder with a local HTTP server, for example `python3 -m http.server 8000`, then open `http://localhost:8000/`. Opening `index.html` directly as a `file://` URL does not support the worker/module/fetch workflow. Production recording and offline functionality use HTTPS, which GitHub Pages supplies.

Optional developer checks (Node.js; no npm dependencies):

```sh
node scripts/check.mjs
node --max-old-space-size=192 --test --test-concurrency=1 tests/*.test.js
node --max-old-space-size=512 scripts/verify-separation.mjs
```

The tests include effects/playback editing regressions, sample-to-MIDI, persistence, cancellation, original audio preservation, full model checksum, stereo STFT alignment and GitHub Pages path handling. Real shipped WebAssembly inference is recorded in SCNET_TEST_RESULTS.txt; a music inference/workflow test is recorded in SCNET_MUSIC_TEST_RESULTS.txt. Desktop and phone-viewport headless Chromium workflow checks are recorded in V3_TEST_RESULTS.txt. Physical-phone and listening QA remain unverified.

Projects and user recordings are saved in this browser's local database, not in your GitHub repository. Existing projects on the old hosted site's origin do not automatically transfer; use **File → Download portable project** on the old site and import that archive here. Keep portable backups before clearing browser storage.

License notices are included in THIRD_PARTY_LICENSES.txt, models/ and vendor/ort/.

Optional browser workflow regression (development only): install Playwright separately with `npm install --no-save playwright`, install its Chromium with `npx playwright install chromium`, then run `node scripts/browser-workflow-qa.mjs`. This uses fake microphone input and writes viewport screenshots. These development dependencies are not needed to deploy or use the app.
