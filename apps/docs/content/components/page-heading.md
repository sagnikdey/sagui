---
title: PageHeading
slug: page-heading
description: "Title a page inside an AppShell with its status and actions."
category: navigation
component: PageHeading
keywords:
  - navigation
  - page heading
  - page title
  - page header
  - header actions
  - filters
---

Title a page inside an AppShell with its status and actions.

<!-- demo: Hero -->

## When to use

- The top of every page inside an AppShell. Page renders it for you, so most pages pass `title`, `description` and `actions` to Page.
- A single record, with `back` to its list and a `status` Badge.

## When not to use

- Use page-header for a page without an AppShell. It adds the breadcrumb and search row above the title.
- Don't put a breadcrumb or search here. They belong in the app-top-bar.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { Button, PageHeading } from "@sagui/ui";

export function ApplicationsHeading() {
  return (
    <PageHeading
      title="Vendor applications"
      description="Review onboarding submissions and promote approved vendors into MDM."
      actions={
        <>
          <Button variant="outline">Export</Button>
          <Button>Send invitation</Button>
        </>
      }
    />
  );
}
```

`actions` takes one of three patterns:

| Pattern | Contents | Use for |
| --- | --- | --- |
| Buttons | An outline Button, then one primary Button | List and record pages |
| Filters | A MultiSelect of stores and a SegmentedControl period | Reports and dashboards |
| Filters + button | The filters, then one primary Button | Reports you can act on |

Put the primary Button last. Below 640px the actions go full width under the title.

## Examples

### Filters

<!-- demo: Filters -->

## Accessibility

- The title is the page's only `h1`.
- Give each filter a real `label`. SegmentedControl and MultiSelect announce it.
