# Suggested Commands

## Development Commands

### Start Development Server
```bash
pnpm dev
```
Starts the Vite development server with hot module replacement (HMR).

### Build for Production
```bash
pnpm build
```
Creates an optimized production build.

### Preview Production Build
```bash
pnpm preview
```
Locally preview the production build.

## Package Management

### Install Dependencies
```bash
pnpm install
```

### Add a Dependency
```bash
pnpm add <package-name>
```

### Add a Dev Dependency
```bash
pnpm add -D <package-name>
```

## Git Commands (macOS/Darwin)
- `git status` - Check repository status
- `git add <files>` - Stage changes
- `git commit -m "message"` - Commit changes
- `git push` - Push to remote
- `git pull` - Pull from remote
- `git log` - View commit history

## File System Commands (macOS/Darwin)
- `ls` - List directory contents
- `ls -la` - List all files with details
- `cd <directory>` - Change directory
- `pwd` - Print working directory
- `mkdir <directory>` - Create directory
- `rm <file>` - Remove file
- `cp <source> <dest>` - Copy file
- `mv <source> <dest>` - Move/rename file

## Search Commands (macOS/Darwin)
- `grep -r "pattern" .` - Search for pattern in files
- `find . -name "filename"` - Find files by name

## Notes
- No testing framework is currently configured
- No linting tools (ESLint, Prettier) are currently configured
- No formatting commands are available yet
- Consider adding these in the future for better code quality
