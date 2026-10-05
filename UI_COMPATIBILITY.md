# BYTEBASH device UI and audio stability revision — 2026-10-02

The existing DAW remains intact. This revision changes controls and layout, and hardens live graph editing.

## Application skin and input

- All visible selects use custom searchable listboxes, including dynamically created instrument, routing, effect, export and settings controls. Long lists render a small virtual window while preserving full scrolling/search/keyboard navigation.
- Number fields retain typed editing and application events, with custom steppers and bounded decimal stepping. Hold repetition ends on release, cancellation, loss of capture or window blur.
- Color inputs use an application HSV/hex picker with Apply/Cancel rather than the browser color dialog.
- Sliders, checkbox/radio controls, progress bars, disclosures, scrollbars, buttons, fields, menus, dialogs and tooltips share the application theme. Original inputs remain backing state for existing event handlers.
- Dropdowns opened in a modal stay inside the modal's top layer. Popups respect visual viewport offsets and software keyboard size.
- Keyboard focus states, accessible names, menu navigation, selection announcements and reduced-motion/high-contrast adjustments are included.
- Dynamic-control observation ignores meter/transport text updates, and avoids repeating identical disabled-attribute writes.

## Responsive workspace

Desktop retains the dense docked workspace. At widths up to 1024px, Sounds and Instrument / FX open as mutually exclusive overlays, with visible close actions and outside dismissal. Transport overflow has a More tray. The primary playback/microphone controls remain visible on phones. Toolbars scroll instead of clipping actions.

Side-panel placement follows actual transport height. Safe-area insets, orientation changes, the visual viewport and bounded editor heights are respected. Touch targets, faders, resize handles, touch sample dragging, Hand navigation and pinch zoom remain available. During sample dragging the browser panel/backdrop move out of the drop path. Effects also have explicit Move up / Move down controls.

## Audio corrections

- Bypass changes the existing processor parameter rather than restarting transport or rebuilding the rack.
- Rack/routing changes retain each track's input node, so existing audio and live MIDI voices continue feeding the new chain.
- Replacement graphs are constructed and validated before disconnecting the previous graph. Failure preserves the old output path.
- Disconnected effect processors receive a disposal message and terminate, instead of accumulating always-active worklets.
- Effect processor failures report a console/status error and bypass the failed insert to preserve remaining audio. Remove/re-add the insert to retry.
- Master parameter updates address effect IDs rather than shifted array positions.
- Curved automation uses short ramps, avoiding native AudioParam overlap errors when replacing an active value curve.
- Solo routing to None is bounded rather than entering an infinite walk.
- Effect deletion removes effect-specific automation and macro mappings atomically; undo restores all references.
- Missing microphone/storage APIs and missing audio engine support produce useful application messages.

## Verification and limits

`node scripts/check.mjs` validates modules, HTML assets/IDs/actions and all 360 sample paths. The full Node regression suite includes graph connection tracing for repeated MIDI/bus/master bypass/delete changes, failure rollback and recovery, processor failure handling, automation edits, solo-to-None, effect-delete undo, control event behavior, popup geometry, color conversion and observation bounds.

Popup geometry is checked at 320×568, 390×844, 768×1024, 1024×768, 844×390, 1920×1080 and 3840×2160. These are mathematical placement tests, not screenshots or physical device tests. UI interaction fixtures simulate DOM event contracts; audio graph fixtures trace connections and parameter scheduling. Existing DSP/processed-render tests verify actual PCM independently.

Browser-console, real-device microphone, visual screenshot and listening QA were unavailable: the Sites managed-preview instructions require the control-browser skill, which is absent; this plain static project also has no compatible supervised preview server. No live-site browser QA is claimed.

This targets current browsers with Web Audio, AudioWorklet, IndexedDB and Pointer Events. It cannot promise every historical browser, device or embedded webview. MIDI, compressed formats, storage capacity and microphone availability depend on browser/device support. OS file selection and permission prompts are necessarily managed by the OS/browser; all in-application controls are themed.
