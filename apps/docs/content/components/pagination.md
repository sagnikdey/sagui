---
title: Pagination
slug: pagination
description: "Move between pages of a long list or table."
category: navigation
component: Pagination
keywords:
  - pagination
  - pages
  - pager
  - table
---

Move between pages of a long list or table.

<!-- demo: Hero -->

## When to use

- Under a data table with more than one page of results.

## When not to use

- Use infinite loading for feeds, and Stepper for steps.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { Pagination } from "@sagui/ui";

<Pagination page={page} pageCount={24} onPageChange={setPage} summary="Showing 1–20 of 468" />
```

## Examples

### Compact

<!-- demo: Compact -->


## Accessibility

- Renders a `nav` labeled “Pagination”. The current page has `aria-current="page"`.
- Gaps are hidden from screen readers, and every page button has a full label.
