# Git Workflow

## Branch Strategy

This document defines the Git workflow used throughout the project. It covers branch strategy, commit message conventions, Git Hooks, Continuous Integration (CI), and pull request requirements to ensure consistency, traceability, and code quality during development.

### Main Branches

| Branch     | Purpose      |
| ---------- | ------------ |
| main       | Production   |
| develop    | Integration  |
| staging    | Testing      |
| feature/\* | New features |
| fix/\*     | Bug fixes    |

---

## Commit Convention

Commit messages follow the Conventional Commits specification.

### Examples

```text
feat: add shopping cart

fix: resolve login redirect issue

refactor: simplify authentication flow

docs: update deployment guide
```

### Scoped Examples

For feature-specific changes, commit scopes can be used to indicate the affected module or area of the application.

```text
feat(auth): implement password recovery

fix(products): resolve product filtering issue

refactor(cart): simplify state management

docs(deployment): update production guide

ci(husky): add commit message validation
```

Common scopes:

- auth
- products
- cart
- checkout
- users
- orders
- deployment
- docker
- husky
- docs

---

## Supported Commit Types

| Type     | Description              |
| -------- | ------------------------ |
| feat     | New feature              |
| fix      | Bug fix                  |
| refactor | Internal improvements    |
| docs     | Documentation            |
| style    | Formatting changes       |
| test     | Tests                    |
| chore    | Maintenance              |
| build    | Build configuration      |
| ci       | CI/CD configuration      |
| perf     | Performance improvements |

---

## Git Hooks

The project uses Husky to automate validation before code reaches the repository.

### Pre-Commit

Executed before creating a commit.

Checks:

- Prettier formatting
- ESLint validation

### Commit Message

Executed before creating a commit.

Checks:

- Conventional Commit validation
- Commitlint rules enforcement
- Commit type validation
- Commit message format validation

### Pre-Push

Executed before pushing code.

Checks:

- TypeScript validation
- Production build verification

---

## Continuous Integration

The project uses GitHub Actions to perform automated validation after code is pushed to the repository.

Checks:

- ESLint validation
- TypeScript validation
- Production build verification

CI acts as the source of truth and ensures that all changes meet the project's quality standards before being merged.

---

## Pull Request Guidelines

Before opening a Pull Request:

- Ensure the build succeeds
- Ensure lint validation passes
- Ensure TypeScript validation passes
- Keep changes focused on a single objective
- Follow the Conventional Commits specification
- Use scopes when changes affect a specific module or feature

### Example Pull Request Flow

```text
Create Feature Branch
        │
        ▼
Implement Changes
        │
        ▼
Pre-Commit Validation
        │
        ▼
Commit Message Validation
        │
        ▼
Pre-Push Validation
        │
        ▼
Push Changes
        │
        ▼
Open Pull Request
        │
        ▼
CI Validation
        │
        ▼
Code Review
        │
        ▼
Merge
```
