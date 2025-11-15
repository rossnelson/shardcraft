# Task Completion Checklist

## When Completing a Task

Since this project currently has minimal tooling, the completion checklist is relatively simple:

### 1. Code Quality
- [ ] Ensure TypeScript strict mode passes (no type errors)
- [ ] Follow the code style conventions (see `code_style_and_conventions.md`)
- [ ] Use guard clauses instead of else statements
- [ ] Maintain immutability in core game logic
- [ ] Add appropriate type annotations

### 2. Build Validation
- [ ] Run `pnpm build` to ensure the production build succeeds
- [ ] Fix any build errors or warnings

### 3. Manual Testing
- [ ] Test the changes locally with `pnpm dev`
- [ ] Verify game functionality works as expected
- [ ] Check for console errors in browser DevTools
- [ ] Test on different screen sizes if UI changes were made

### 4. Git Workflow
- [ ] Review changes with `git status` and `git diff`
- [ ] Stage relevant files with `git add`
- [ ] Commit with a clear, descriptive message
- [ ] Run git commands one at a time (never chain with `&&` or `;`)
- [ ] Check current branch before committing (avoid committing to main/master)
- [ ] Push changes if appropriate

## Future Improvements
Consider adding the following tools to enhance the development workflow:
- **Testing**: Vitest or Jest for unit tests, Playwright for e2e tests
- **Linting**: ESLint for code quality
- **Formatting**: Prettier for consistent code formatting
- **Type Checking**: Explicit `tsc --noEmit` script for type validation
