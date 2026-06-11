# Frontend Architecture

## Overview

This project follows a feature-based architecture focused on scalability, maintainability, and separation of concerns.

Business domains are isolated into independent modules while reusable resources remain centralized in a shared layer.

---

## Project Structure

```text
src
│
├── app/          # Routes, layouts and pages
├── modules/      # Business features
├── shared/       # Shared resources
├── providers/    # Global providers
├── store/        # Global state
├── config/       # Application configuration
├── constants/    # Global constants
├── types/        # Shared types
└── styles/       # Global styles
```

---

## App Layer

The `app` directory contains routing, layouts, loading states and error boundaries.

Responsibilities:

- Route management
- Layout composition
- Error handling
- Loading states
- Route groups

---

## Feature Modules

Business logic is grouped by domain.

```text
modules
│
├── auth
├── products
├── cart
├── checkout
├── users
└── orders
```

Each module may contain:

```text
feature
│
├── components
├── hooks
├── services
├── store
├── schemas
├── types
├── constants
└── utils
```

Benefits:

- Better scalability
- Clear ownership
- Reduced coupling
- Easier maintenance

---

## Shared Layer

Contains reusable resources shared across the application.

```text
shared
│
├── components
├── layouts
├── hooks
├── utils
├── types
├── constants
└── icons
```

---

## Data Flow

Application data follows a layered flow.

```text
Page
 │
 ▼
Component
 │
 ▼
Custom Hook
 │
 ▼
Service
 │
 ▼
Backend API
```

---

## State Management

### Global State

Managed using Zustand.

Examples:

- Authentication state
- User information
- Application settings
- UI state

### Local State

Managed using React hooks.

Examples:

- useState
- useReducer
- useMemo
- useCallback

---

## Authentication

Authentication is based on secure HttpOnly cookies.

Flow:

```text
User Login
    │
    ▼
Authenticated Session
    │
    ▼
Protected Request
    │
    ▼
Session Validation
```

Route protection is handled through middleware and application state.

---

## Providers

Global providers are centralized in the providers directory.

Examples:

- AppProvider
- AuthProvider
- ThemeProvider

---

## Design Principles

- Feature-Based Architecture
- Separation of Concerns
- Reusable Components
- Type Safety
- API Abstraction
- Scalability
- Maintainability
