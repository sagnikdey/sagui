---
title: Kbd
slug: kbd
description: "Show a keyboard key or shortcut."
category: data-display
component: Kbd
keywords:
  - kbd
  - keyboard
  - shortcut
  - hotkey
---

Show a keyboard key or shortcut.

<!-- demo: Hero -->

## When to use

- Shortcut hints in menus, tooltips and search.

## When not to use

- Use Badge for status or counts.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { Kbd } from "@sagui/ui";

<Kbd keys={["⌘", "K"]} />
```

## Accessibility

- Renders `kbd` elements, so screen readers announce them as keys.
