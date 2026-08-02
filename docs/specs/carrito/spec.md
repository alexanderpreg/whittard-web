# Shopping Cart Functional Specification (Spec-Driven Development)

**Project:** E-commerce Frontend (Next.js 16)

**Feature:** Shopping Cart

**Version:** 1.0

**Status:** Draft

---

# 1. Objective

Implement a shopping cart that works transparently for both guest users and authenticated users.

The cart must:

- Persist data between sessions.
- Support synchronization with the backend.
- Maintain a single source of truth.
- Be scalable for future features such as coupons, promotions, shipping methods, inventory validation and saved carts.
- Provide a consistent user experience regardless of authentication state.

---

# 2. Scope

This specification covers:

- Guest cart
- Authenticated cart
- Cart persistence
- Cart synchronization
- Quantity management
- Product validation
- Price updates
- Cart calculations
- Session transitions
- Error handling
- State management
- Future extensibility

Out of scope:

- Checkout
- Payment
- Order creation
- Wishlist
- Product recommendations

---

# 3. Architecture Principles

## 3.1 Single Source of Truth

The application must expose a single cart state through a global store.

UI components must never maintain their own cart state.

---

## 3.2 UI Independence

UI components must never know whether the cart is stored:

- locally
- remotely

The cart implementation is transparent.

Example:

```
Product Card

↓

addToCart()

↓

Cart Service

↓

Repository

↓

Local Storage
or
Backend API
```

---

## 3.3 Repository Pattern

The Cart Service interacts only with an abstract repository.

Possible implementations:

- LocalCartRepository
- RemoteCartRepository

Both repositories expose the same API.

---

# 4. Cart Model

A cart contains:

```
Cart

id (optional)

items[]

currency

subtotal

discount

shipping

tax

total

updatedAt
```

---

Each item contains:

```
CartItem

productId

sku

name

slug

image

unitPrice

quantity

maxQuantity

subtotal
```

---

# 5. Cart Persistence

## Guest User

Cart is stored locally.

Persistence survives:

- page refresh
- browser restart

Storage mechanism:

```
localStorage
```

through Zustand Persist.

---

## Authenticated User

Cart is managed by the backend.

The frontend only caches the latest version.

---

# 6. Cart Initialization

Scenario

Application starts.

Given

No user session exists.

Then

Load cart from Local Storage.

---

Scenario

Application starts.

Given

Authenticated session exists.

Then

Load cart from Backend.

---

# 7. Add Product

Scenario

Guest user adds a product.

Given

Product is available.

When

User clicks "Add to Cart".

Then

Product is added locally.

---

Scenario

Authenticated user adds a product.

Given

Product is available.

When

User clicks "Add to Cart".

Then

Frontend sends request to Backend.

Backend returns updated cart.

Frontend replaces local state.

---

# 8. Duplicate Product

Scenario

Product already exists.

When

User adds same product.

Then

Increase quantity.

Do not create another line.

---

# 9. Quantity Update

Scenario

User increases quantity.

Then

Quantity increases by one.

Subtotal updates.

Total updates.

---

Scenario

User decreases quantity.

If quantity > 1

Decrease quantity.

If quantity == 1

Remove product.

---

Scenario

User edits quantity manually.

Quantity must be validated.

Invalid values:

- negative
- decimal
- NaN
- empty

System restores previous valid quantity.

---

# 10. Remove Product

Scenario

User removes product.

Then

Product disappears.

Totals recalculate.

Cart persists.

---

# 11. Empty Cart

Scenario

Last product removed.

Then

Cart becomes empty.

Display Empty Cart state.

---

# 12. Stock Validation

Scenario

Requested quantity exceeds stock.

Then

System limits quantity according to backend rules.

User receives feedback.

---

Scenario

Product becomes unavailable.

Then

Remove item during synchronization.

Notify user.

---

# 13. Price Changes

Prices displayed in cart are informative.

Backend is always authoritative.

Scenario

Backend returns updated price.

Then

Replace local price.

Notify user.

---

# 14. Authentication Transition

## Guest → Login

Given

Guest cart exists.

Backend cart exists.

When

Login succeeds.

Then

Frontend sends guest cart.

Backend merges carts.

Backend returns final cart.

Frontend stores returned cart.

Local Storage is cleared.

---

Scenario

Guest cart exists.

Backend cart empty.

Then

Backend receives guest cart.

Returned cart replaces local state.

---

Scenario

Guest cart empty.

Backend cart exists.

Then

Frontend loads backend cart.

---

# 15. Logout

Scenario

User logs out.

Backend cart remains associated with account.

Frontend clears in-memory state.

Frontend loads local guest cart.

If no guest cart exists

Create empty cart.

---

# 16. Synchronization Rules

Frontend never performs merge logic.

Merge responsibility belongs to backend.

Frontend only sends:

- local items
- quantities

Backend decides:

- duplicated items
- stock
- promotions
- prices

---

# 17. Cart Calculations

Calculated values:

Subtotal

```
Σ(unitPrice × quantity)
```

Discount

```
Backend value
```

Shipping

```
Backend value
```

Tax

```
Backend value
```

Total

```
subtotal
- discount
+ shipping
+ tax
```

---

# 18. Error Handling

Scenario

Network unavailable.

Guest:

Continue using local cart.

Authenticated:

Display synchronization error.

Retry automatically when possible.

---

Scenario

Backend unavailable.

User actions remain disabled until synchronization succeeds or fails definitively.

---

# 19. Persistence Rules

Persist:

- items
- currency
- updatedAt

Do NOT persist:

- loading
- errors
- requests
- totals
- temporary states

---

# 20. UI States

Empty

Loading

Updating

Success

Error

Offline

Synchronizing

---

# 21. Business Rules

BR-001

Same product cannot appear twice.

---

BR-002

Quantity must always be integer.

---

BR-003

Minimum quantity is 1.

---

BR-004

Maximum quantity determined by backend.

---

BR-005

Backend is authoritative.

---

BR-006

Guest cart survives browser restart.

---

BR-007

Authenticated cart survives logout/login.

---

BR-008

Login performs synchronization only once.

---

BR-009

Frontend never calculates promotions.

---

BR-010

Frontend never validates inventory.

---

# 22. Non-Functional Requirements

State updates must be immediate.

Cart operations should feel optimistic whenever possible.

Synchronization should not block navigation.

Cart should recover after refresh.

Implementation must be independent from UI components.

---

# 23. Acceptance Criteria

## AC-01

Guest can add products.

---

## AC-02

Guest cart survives refresh.

---

## AC-03

Guest cart survives browser restart.

---

## AC-04

Authenticated user uses backend cart.

---

## AC-05

Duplicate products increase quantity.

---

## AC-06

Removing last item shows Empty Cart.

---

## AC-07

Login merges guest and backend carts.

---

## AC-08

Logout restores guest cart.

---

## AC-09

Prices update from backend.

---

## AC-10

Stock changes are reflected after synchronization.

---

## AC-11

Totals are recalculated after every modification.

---

## AC-12

Application behaves consistently regardless of authentication state.

---

# 24. Future Extensions

This architecture should support without major refactoring:

- Coupons
- Gift cards
- Promotions
- Tier pricing
- Bundles
- Product personalization
- Multiple warehouses
- Shipping estimations
- Inventory reservations
- Saved carts
- Multiple carts
- Buy Again
- Recently viewed
- Cross-selling
- Upselling
- Analytics events
- Abandoned cart recovery

---

# 25. Technical Recommendations

- Next.js 16 (App Router)
- Zustand for global cart state
- Zustand Persist for guest persistence
- Repository Pattern to abstract local and remote implementations
- Cart Service as the application layer
- UI components consuming only hooks and selectors
- Backend responsible for pricing, inventory, promotions and merge operations
