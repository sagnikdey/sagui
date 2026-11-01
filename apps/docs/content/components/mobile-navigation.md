---
title: Mobile Navigation
slug: mobile-navigation
description: "The Sidebar’s pages in a left drawer for tablets and phones."
category: navigation
component: MobileNavigation
keywords:
  - mobile navigation
  - drawer
  - sidebar
  - hamburger
  - nav
---

The Sidebar’s pages in a left drawer for tablets and phones.

<!-- demo: Hero -->

## When to use

- Opened from AppBar’s menu button below 1024px.

## When not to use

- AppShell already includes it. Use it directly only with a custom layout.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { MobileNavigation } from "@sagui/ui";

<MobileNavigation open={open} onOpenChange={setOpen} title="Acme" nav={nav} currentHref={pathname} />
```

## Accessibility

- A modal drawer: focus is trapped inside and returns to the menu button on close.
- Escape, the close button, a tap outside or choosing a page closes it.
