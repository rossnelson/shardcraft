# Code Style and Conventions

## TypeScript Configuration
- **Strict Mode**: Enabled (`strict: true`)
- **Source Maps**: Enabled for debugging
- **Module Resolution**: Bundler mode
- **Check JS**: Enabled (JavaScript files are type-checked)
- **Force Consistent Casing**: File names must match in casing

## Coding Style

### General Principles
- **Functional Programming**: Prefer functional style with immutable data structures
- **No Else Statements**: Use early returns and guard clauses instead
- **Type-First Development**: Explicit type definitions for all data structures
- **Immutability**: Functions return new objects rather than mutating existing ones

### Naming Conventions
- **Functions/Variables**: camelCase (e.g., `createBoard`, `selectedPosition`)
- **Types/Interfaces**: PascalCase (e.g., `Board`, `GameStoreState`, `Position`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_CONFIG`)
- **File Names**: kebab-case for utilities, PascalCase for components

### Function Style
- **Arrow Functions**: Preferred for simple functions and callbacks
- **Early Returns**: Use guard clauses at the beginning of functions
- **Single Responsibility**: Each function has one clear purpose
- **Pure Functions**: Core logic functions are pure (no side effects)

### Code Examples

**Early Returns (Good)**:
```typescript
export const getGem = (board: Board, pos: Position): Gem | null => {
  if (!isValidPosition(board, pos)) {
    return null;
  }
  return board.gems[pos.row][pos.col];
};
```

**Immutable Updates (Good)**:
```typescript
export const setGem = (board: Board, pos: Position, gem: Gem): Board => {
  if (!isValidPosition(board, pos)) {
    return board;
  }

  const newGems = board.gems.map((row, r) =>
    row.map((g, c) => (r === pos.row && c === pos.col ? gem : g))
  );

  return { ...board, gems: newGems };
};
```

### Svelte Conventions
- **Script Tag**: Use `<script lang="ts">` for TypeScript
- **Component Imports**: Use SvelteKit's `$lib` alias for imports
- **Component Files**: PascalCase naming (e.g., `Board.svelte`, `Gem.svelte`)

### State Management
- **Stores**: Use Svelte stores for shared state
- **Store Creation**: Factory pattern for creating stores with methods
- **Updates**: Use `update` function for transformations, `set` for replacements
