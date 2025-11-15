# ShardCraft - Project Overview

## Purpose
ShardCraft is a match-3 puzzle game (similar to Bejeweled or Candy Crush Saga) built as a web application. Players swap adjacent gems to create matches of 3 or more identical gems, which are then removed and replaced with new gems falling from above.

## Tech Stack
- **Framework**: SvelteKit 2.0
- **UI Library**: Svelte 5.0
- **Language**: TypeScript 5.0 (strict mode enabled)
- **Build Tool**: Vite 5.0
- **Package Manager**: pnpm 10.12.3
- **Adapter**: @sveltejs/adapter-auto (auto-detects deployment platform)

## Project Structure
```
src/
├── lib/
│   ├── core/          # Core game logic
│   │   ├── board.ts   # Board manipulation functions
│   │   ├── match.ts   # Match detection logic
│   │   ├── gravity.ts # Gravity and refill logic
│   │   ├── swap.ts    # Gem swapping logic
│   │   ├── types.ts   # TypeScript type definitions
│   │   └── constants.ts # Game constants
│   ├── stores/        # Svelte stores for state management
│   │   └── game.ts    # Main game store
│   ├── utils/         # Utility functions
│   │   └── sprites.ts # Sprite handling utilities
│   └── components/    # Svelte components
│       ├── Gem.svelte # Individual gem component
│       └── Board.svelte # Game board component
├── routes/            # SvelteKit routes
│   ├── +page.svelte   # Main game page
│   ├── +page.ts       # Page data/config
│   └── +layout.svelte # Layout component
├── app.html           # HTML template
└── app.css            # Global styles

static/
└── assets/            # Static assets
    ├── gems/          # Gem sprites (original and variants)
    └── ui/            # UI elements (backgrounds, frames)
```

## Game Architecture
- **Immutable State**: All game state is immutable; operations return new board instances
- **Centralized Store**: Game state managed through a Svelte store pattern
- **Core Game Loop**: 
  1. Player selects two adjacent gems
  2. Gems are swapped
  3. Board is validated for matches
  4. Matches are removed
  5. Gravity applies (gems fall down)
  6. Empty spaces are refilled
  7. Process repeats until no matches remain
- **Multiple Gem Types**: Supports various gem shapes (circular, square, diamond, teardrop, rectangular, oval, heart, orb, pentagonal, shard)
