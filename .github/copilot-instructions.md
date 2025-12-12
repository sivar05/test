<!-- Copilot / AI agent instructions for the `test` repo -->
# Repository Snapshot

- This is a small, static multi-page client-side demo implementing basic auth UI flows (Sign In, Sign Up, Forgot Email/Password, Reset Password, Homepage). No backend or build system is present.
- Layout: each feature lives in its own folder with paired `.html`, `.css`, and `.js` files (e.g. `signup/signup.html`, `signup/signup.css`, `signup/signup.js`). Shared assets live under `image/` and some scripts at the repo root (e.g. `script.js`).

# Quick Principles for Edits

- Keep files as simple static pages. There is no bundler or package.json—changes must preserve relative paths and global JS functions used by inline handlers.
- HTML relies on inline event handlers (e.g. `onclick`, `onsubmit`) that call globally-scoped functions in the corresponding `.js` files. If you refactor JS into modules, re-expose the functions on `window` or update the HTML to attach listeners programmatically.
- IDs and error-span patterns are significant. Many pages use `<span id="<field>-error">` pairs (for example `email-error`, `password-error`) — do not rename these IDs unless you update the consuming JS.

# Important Files / Patterns (use these as examples)

- `index.html` + `script.js` — global popup pattern `popup(message, callback)` and `goTo(path)` base-path handling for GitHub Pages.
- `signup/signup.html` + `signup/signup.js` — field-level validation pattern, error-span ids, and `togglePassword` usage.
- `homepage/`, `forgotpassword/`, `forgotemail/`, `resetpassword/` — follow the same per-feature folder convention.

# Project-Specific Gotchas

- `goTo()` base handling: `script.js` and `signup/signup.js` contain a `goTo()` that checks `location.hostname === "sivar05.github.io"` and sets `base = "/test/"` for GitHub Pages. If you rename repo or change hosting, update this function in both locations.
- Password toggle icons and image paths are relative and differ by folder depth (notice `image/symbol/view.png` vs `../image/symbol/open.png`). When moving files, update image `src` references accordingly.
- Many pages call `clearError('id')` or `clearError('id','error-id')`. Maintain these helper signatures when modifying validation logic.

# How To Run / Debug

- There is no build step. Open `index.html` directly in a browser for quick checks. For a local static server (recommended), use one of:

  - VS Code: install the "Live Server" extension and open the root folder.
  - Python: from repo root run `python -m http.server 3000` then open `http://localhost:3000`.
  - Node: if Node is available, use `npx http-server` to serve the root.

- Use browser DevTools for console logs, DOM inspection, and event listener debugging. To test navigation that uses `goTo()`, run from a server (not `file://`) so `location.hostname` behaves as expected.

# Refactoring Guidance for Agents

- When modifying UI behavior, update both HTML and JS together. Example: if you rename `email-error` to `emailErr`, change the HTML span id and every JS reference.
- If you move logic from inline handlers into scripts, either:
  - add `document.getElementById(...).addEventListener(...)` in the corresponding `.js` and remove inline attributes, or
  - keep HTML handlers and ensure functions remain globally accessible (attach to `window`).
- Preserve the popup contract: `popup(message, callback)` — pages depend on the callback to execute redirects.

# Useful Search Terms

- Search for `goTo(` to find navigation logic that depends on repo name.
- Search for `-error` to find all field validation/error-span conventions.
- Search for `togglePassword(` to see icon src differences that must be preserved.

# When You Commit Changes

- Keep edits minimal and local to a single feature when possible. Changing `script.js` affects many pages.
- Update relative paths and test the page in a static server before pushing.

# Contact / Feedback

- If any behavior is unclear (for example, expected redirect targets or a missing image path), ask for clarification rather than guessing repository or hosting settings.

-- End of instructions --
