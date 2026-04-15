# Skyfall Beacon

Guided, motivating, learner-first EdTech design system for course platforms, student dashboards, learning journeys, and educator tools.

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Storybook dev server |
| `npm run build` | Build the library for distribution |
| `npm run build:storybook` | Build static Storybook site |
| `npm run typecheck` | Run TypeScript type checking |

## Architecture

```
src/
  tokens/       Design tokens (CSS variables + TypeScript constants)
  components/   React components organized by name
  charts/       Chart primitives wrapping recharts
  utils/        Shared utilities
  hooks/        Custom React hooks
  types/        Shared TypeScript types
  stories/      Overview, Introduction, Installation, Tokens
```

## Design Principles

1. **Guided growth** — Every surface points to the next meaningful step
2. **Visible progress** — Learners always know where they stand
3. **Optimistic clarity** — Bright, supportive, never overwhelming
4. **Accessibility built in** — Inclusive by default (WCAG 2.2 AA)
5. **Scalable to dashboards** — From single-lesson players to cohort analytics

## Family

Skyfall Beacon is part of the Skyfall design-system family. It shares its foundation, structure, and primitives with [Skyfall Aegis](https://github.com/skyfall-consulting/skyfall-aegis) (healthcare) and Skyfall Ledger (fintech), wrapped in an EdTech identity.

## License

MIT
