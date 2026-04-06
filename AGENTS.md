# AGENTS.md

## Purpose
This project stores in-repo agent definitions so design and implementation work can stay consistent as the team grows.

## Active Agents
- `UI/Design Agent`
  - Owns Figma-to-UI translation.
  - Improves visual quality without breaking UX.
  - Protects consistency across screens, components, spacing, and typography.
- `Frontend Agent`
  - Owns React + Tailwind implementation quality.
  - Breaks UI into reusable components.
  - Preserves architecture and mobile-first behavior.
- `Refactor/Polish Agent`
  - Owns final visual polish of the interface.
  - Improves motion, perceived quality, and micro-UX details.
  - Removes visual noise without changing product logic.

## Shared Rules
- Keep changes minimal, reviewable, and product-safe.
- Improve visuals without degrading usability.
- Prefer consistency over one-off decoration.
- Treat project references in `design-references/` as the visual source of truth when the task is design-related.

## Agent Files
- `agents/ui-design/README.md`
- `agents/ui-design/manifest.json`
- `agents/ui-design/AGENT.md`
- `agents/frontend/README.md`
- `agents/frontend/manifest.json`
- `agents/frontend/AGENT.md`
- `agents/refactor-polish/README.md`
- `agents/refactor-polish/manifest.json`
- `agents/refactor-polish/AGENT.md`
