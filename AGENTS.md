# Repository Guidelines

## Project Structure & Module Organization

- `App.tsx` and `index.tsx` are the entry points for the React app.
- `components/` contains UI modules like charts and result panels.
- `services/` holds any data/logic helpers.
- `assets/` stores images used in the README and UI.
- `types.ts` and `constants.ts` define shared TypeScript types and config values.
- JSON examples live in `mock-data.json` and `test.json`.

## Build, Test, and Development Commands

- `npm install` installs dependencies.
- `npm run dev` starts the Vite dev server for local development.
- `npm run build` produces a production build in `dist/`.
- `npm run preview` serves the built app locally for verification.

## Coding Style & Naming Conventions

- TypeScript + React 19 with JSX in `.tsx` files.
- Indentation uses 2 spaces; keep semicolons and single quotes as in existing files.
- Component names use PascalCase (e.g., `LifeKLineChart`).
- File names follow the same casing as the component or module they export.

## Testing Guidelines

- There is no automated test setup in this repo.
- Validate changes manually with `npm run dev` and (if needed) `npm run build` + `npm run preview`.
- If you add tests, document the framework and update this section.

## Commit & Pull Request Guidelines

- Commit history follows a simple Conventional Commit style: `type: short summary` (e.g., `fix: 修复评分显示兼容百分制和十分制`).
- Keep commit messages concise and action-oriented; Chinese or English is fine.
- PRs should include a clear description, link relevant issues, and attach screenshots for UI changes.

## Configuration & Deployment Notes

- Vite config lives in `vite.config.ts`; deployment is set up for Vercel in `vercel.json`.
- Assets referenced in README should stay in `assets/` to keep docs stable.
