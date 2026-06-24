# Frontend Architecture

## Overview

This project follows a Module-Based Architecture focused on scalability, maintainability, separation of concerns, and domain isolation.

Business logic is organized into independent modules, while reusable UI, utilities, and infrastructure concerns are centralized in dedicated layers.

---

## Project Structure

```text
src
│
├── app/          # Routes, layouts, pages and route groups
├── modules/      # Business domains
├── shared/       # Shared UI resources
├── lib/          # Reusable logic and utilities
├── providers/    # Global providers
├── store/        # Global state management
├── config/       # Application configuration
├── constants/    # Global constants
├── types/        # Shared types
└── styles/       # Global styles
```

---

## App Layer

The `app` directory contains routing and page composition.

Responsibilities:

- Route management
- Layout composition
- Error boundaries
- Loading states
- Route groups
- Metadata configuration

Example:

```text
app
│
├── (public)
├── (private)
├── layout.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

---

## Business Modules

Business logic is organized by domain.

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

Each module owns its functionality and can contain:

```text
module
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

Example:

```text
modules
└── cart
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

- Clear ownership
- Reduced coupling
- Easier maintenance
- Independent evolution of domains
- Better scalability
- Strong business boundaries

---

## Shared Layer

Contains reusable UI resources shared across the application.

```text
shared
│
├── components
│   ├── custom-ui
│   └── shadcn-ui
│
├── layouts
└── icons
```

Examples:

- Button
- Input
- Modal
- Container
- Heading
- Skeleton
- EmptyState

Layouts:

```text
shared
└── layouts
    ├── StoreLayout
    ├── AdminLayout
    └── AuthLayout
```

The shared layer should only contain reusable presentation resources and should not contain business logic.

---

## Library Layer

Contains reusable application logic independent of business domains.

```text
lib
│
├── api
├── adapters
├── validators
├── formatters
├── mappers
├── hooks
├── utils
└── services
```

Examples:

### Utils

```ts
formatCurrency();
formatDate();
capitalize();
```

### Hooks

```ts
useDebounce();
useMediaQuery();
useIntersectionObserver();
```

### Adapters

```ts
meta - pixel.ts;
niubiz.ts;
google - tag - manager.ts;
```

### API

```ts
axios.ts;
interceptors.ts;
```

Responsibilities:

- Reusable logic
- Third-party integrations
- Data transformation
- Formatting
- Validation
- API abstraction

---

## Constants

Global application constants are centralized in:

```text
constants
│
├── routes.ts
├── roles.ts
├── permissions.ts
└── storage-keys.ts
```

Domain-specific constants should remain inside their corresponding module.

Example:

```text
modules
└── checkout
    └── constants
        ├── payment-methods.ts
        └── order-status.ts
```

---

## Data Flow

Application data follows a layered architecture.

```text
Page
 │
 ▼
Module Component
 │
 ▼
Custom Hook
 │
 ▼
Service
 │
 ▼
API Client
 │
 ▼
Backend API
```

This ensures clear separation between UI and data access.

---

## State Management

### Global State

Managed using Zustand.

Examples:

- Authentication state
- User session
- Cart state
- Application settings
- UI state

```text
store
│
├── auth.store.ts
├── cart.store.ts
└── ui.store.ts
```

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

```text
providers
│
├── AppProvider
├── AuthProvider
├── ThemeProvider
└── QueryProvider
```

Responsibilities:

- Context composition
- Theme management
- Authentication context
- React Query configuration
- Global application setup

---

## Design Principles

- Module-Based Architecture
- Separation of Concerns
- Domain Isolation
- Reusable Components
- Type Safety
- API Abstraction
- Dependency Direction
- Scalability
- Maintainability
- Single Responsibility Principle
- UI / Business Logic Separation
- Clear Ownership Boundaries

```

```
