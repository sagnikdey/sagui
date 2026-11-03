---
title: Panel
slug: panel
description: "A plain surface for forms, details and any other composed content."
category: cards
component: Panel
keywords:
  - surface
  - section
  - container
  - form panel
  - details
---

A plain surface for forms, details and any other composed content.

<!-- demo: Hero -->

## When to use

- Grouping a form or a block of details on a page.
- A dashboard section with a title and a chart or table inside.

## When not to use

- Use card for a titled summary with media, a byline or a quick look.
- Use metric-card for a single number with context.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { Button, Panel, PanelContent, PanelDescription, PanelFooter, PanelHeader, PanelTitle } from "@sagui/ui";

<Panel>
  <PanelHeader>
    <PanelTitle>Banking</PanelTitle>
    <PanelDescription>Account ending 4821</PanelDescription>
  </PanelHeader>
  <PanelContent>Payments settle within two business days.</PanelContent>
  <PanelFooter>
    <Button variant="outline">Change account</Button>
  </PanelFooter>
</Panel>
```

`elevation` is `flat` (default), `resting` or `raised`. Use elevation only when the panel must lift off its surroundings. Leave out PanelFooter when there are no actions.

## Examples

### Raised

<!-- demo: Raised -->

## Accessibility

- Panel renders a `section` and PanelTitle an `h2`. Pass `aria-labelledby` with the title's id so the section is named.
