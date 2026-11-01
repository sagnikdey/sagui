---
title: Separator
slug: separator
description: "Divide content into groups with a thin line."
category: data-display
component: Separator
keywords:
  - separator
  - divider
  - rule
  - hr
---

Divide content into groups with a thin line.

<!-- demo: Hero -->

## When to use

- Between groups in a menu, card or toolbar.
- A labeled divider such as “or” between sign-in options.

## When not to use

- Use spacing alone when the groups are already clear.
- Use Card or FormSection to group whole sections.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { Separator } from "@sagui/ui";

<Separator />
<Separator label="or" />
```

## Accessibility

- Decorative by default (hidden from screen readers). Set `decorative={false}` when the split carries meaning, and it renders `role="separator"` with its orientation.
