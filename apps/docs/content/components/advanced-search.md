---
title: Advanced Search
slug: advanced-search
description: "Search everything, or run a command, from one ⌘K dialog."
category: navigation
component: AdvancedSearch
keywords:
  - search
  - command k
  - command palette
  - scopes
  - filters
  - results
---

Search everything, or run a command, from one ⌘K dialog.

<!-- demo: Hero -->

## When to use

- App-wide search across records, with scopes, filters and a preview.
- Typing “>” to switch to commands.

## When not to use

- Use CommandPalette for commands only, and SearchField for one list.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { AdvancedSearch } from "@sagui/ui";

<AdvancedSearch open={open} onOpenChange={setOpen} results={results} scopes={scopes} onSelect={(r) => router.push(r.href)} />
```

## Accessibility

- The input is a `combobox` that controls a `listbox`, with `aria-activedescendant` on the active row.
- ↑ and ↓ move, Enter opens, ⌘/Ctrl+Enter opens in a new tab, Escape closes.
- Full screen on phones, with a Cancel button.
