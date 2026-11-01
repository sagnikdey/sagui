---
title: Page Header
slug: page-header
description: "Title a page with its breadcrumb, status and actions."
category: navigation
component: PageHeader
keywords:
  - page header
  - header
  - title
  - breadcrumb
  - back button
  - actions
---

Title a page with its breadcrumb, status and actions.

<!-- demo: Hero -->

## When to use

- The top of every page inside AppShell.
- Detail pages that need a back link and a status Badge.

## When not to use

- Use a card title for sections within a page.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { PageHeader, Button } from "@sagui/ui";

<PageHeader title="Vendors" description="468 active" actions={<Button>Add vendor</Button>} />
```

## Examples

### Detail

<!-- demo: Detail -->


## Accessibility

- The title is the page’s only `h1`.
- On phones the breadcrumb and search hide, and the actions wrap under the title.
