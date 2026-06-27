# Prompt for Adding Features Without Changing Layout

Use this prompt with Bolt, Cursor, Codex, or another web AI:

You are editing the Credit Vivo React/Vite website. Add the requested feature without changing the public page layout, visual hierarchy, font scale, spacing system, hero sections, card grids, navigation, or bottom button behavior.

Hard rules:
- Do not add new public sections unless explicitly requested.
- Do not change the header, footer, hero layout, pricing card layout, FAQ layout, or page grids.
- Do not add Free Scan or Findings to the public top nav.
- Do not repeat the current page in bottom buttons.
- Keep all existing copy unless the task specifically asks to revise copy.
- Add functionality behind existing buttons/cards/routes whenever possible.
- If adding a new feature, prefer a private/member route or dashboard panel.
- Preserve the current design style and typography scale.

After changes, run:
- npm run typecheck
- npm run build
