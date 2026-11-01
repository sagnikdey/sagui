---
title: Dropdown Menu
slug: dropdown-menu
description: "Show a short list of actions from a button."
category: overlays
component: DropdownMenu
keywords:
  - menu
  - dropdown
  - actions
  - more
  - overflow
---

Show a short list of actions from a button.

<!-- demo: Hero -->

## When to use

- A row’s or page’s overflow (⋯) actions.
- Up to about eight actions, grouped by separators.

## When not to use

- Use Select to choose a value, and CommandPalette for many commands.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@sagui/ui";

<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="More" /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem shortcut="⌘ D">Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Accessibility

- Built on Radix Dropdown Menu: arrow keys move, typing jumps to an item, Escape closes and returns focus to the trigger.
