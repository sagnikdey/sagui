---
title: App Bar
slug: app-bar
description: "The top bar on tablets and phones, with the menu button, workspace, search and user."
category: navigation
component: AppBar
keywords:
  - app bar
  - top bar
  - header
  - mobile
  - menu button
---

The top bar on tablets and phones, with the menu button, workspace, search and user.

<!-- demo: Hero -->

## When to use

- Below 1024px in a signed-in app, paired with MobileNavigation.

## When not to use

- AppShell already includes its own bar. Use AppBar when you compose the layout yourself.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { AppBar, MobileNavigation, SearchTrigger, Avatar } from "@sagui/ui";

<AppBar brand="Acme" onMenuClick={() => setOpen(true)} menuOpen={open} search={<SearchTrigger variant="icon" onOpen={openSearch} />} actions={<Avatar name="Sagnik Dey" size="sm" />} />
```

## Accessibility

- The menu button has `aria-expanded` and opens a dialog.
- Hidden from 1024px by default, where the Sidebar takes over.
