---
title: Search Trigger
slug: search-trigger
description: "Open Advanced Search from a field-like button or ⌘K."
category: navigation
component: SearchTrigger
keywords:
  - search
  - command k
  - shortcut
  - trigger
---

Open Advanced Search from a field-like button or ⌘K.

<!-- demo: Hero -->

## When to use

- In the App Bar or Page Header, to open app-wide search.

## When not to use

- Use SearchField to filter a single list in place.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { SearchTrigger, AdvancedSearch } from "@sagui/ui";

<SearchTrigger onOpen={() => setOpen(true)} />
<AdvancedSearch open={open} onOpenChange={setOpen} results={results} />
```

## Accessibility

- A real button with `aria-haspopup="dialog"` and `aria-keyshortcuts`.
- The icon variant keeps “Search” as its accessible name.
