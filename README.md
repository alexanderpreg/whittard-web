# Whittard Web

Frontend application built with Next.js and TypeScript.

## Overview

This project follows a feature-based architecture focused on scalability, maintainability, and separation of concerns.

### Core Technologies

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Zustand
- ESLint
- Prettier
- Husky
- Commitlint

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Available Scripts

### Development

```bash
pnpm dev
```

Starts the development server.

### Build

```bash
pnpm build
```

Creates a production build.

### Start Production Server

```bash
pnpm start
```

Runs the production build.

### Lint

```bash
pnpm lint
```

Runs ESLint validation.

### Type Check

```bash
pnpm typecheck
```

Runs TypeScript validation.

---

## Project Documentation

Additional documentation is available in the `docs` directory.

| Document        | Description                                    |
| --------------- | ---------------------------------------------- |
| architecture.md | Frontend architecture and project structure    |
| git-workflow.md | Git workflow, commit conventions, hooks and CI |
| deployment.md   | Deployment and release process                 |

---

## Code Quality

The project includes automated validation using:

- ESLint
- Prettier
- Husky
- Commitlint
- TypeScript

Validation runs automatically through Git Hooks and Continuous Integration workflows.

---

## License

Private project.
