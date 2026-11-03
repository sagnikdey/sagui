---
title: AppTopBar
slug: app-top-bar
description: "The AppShell top bar: breadcrumb, search, alerts and the user, in the same order in every app."
category: navigation
component: AppTopBar
keywords:
  - navigation
  - top bar
  - app header
  - toolbar
  - breadcrumb
  - user menu
---

The AppShell top bar: breadcrumb, search, alerts and the user, in the same order in every app.

<!-- demo: Hero -->

## When to use

- Every app built on AppShell. Pass it as AppShell's `header` and leave `actions` empty.

## When not to use

- Don't put page actions or filters here. They belong in page-heading.
- Use app-bar for the mobile bar with the menu button.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { AppShell, AppTopBar, Breadcrumb, NotificationCenter, SearchTrigger, UserMenu } from "@sagui/ui";

<AppShell
  variant="inset"
  background="dots"
  nav={nav}
  header={
    <AppTopBar
      breadcrumb={<Breadcrumb items={crumbs} linkComponent={Link} />}
      search={<SearchTrigger onOpen={() => setSearching(true)} />}
      alerts={<NotificationCenter notifications={notifications} label="Alerts" />}
      user={<UserMenu user={user} theme={theme} onThemeChange={setTheme} />}
    />
  }
>
  {children}
</AppShell>
```

The order is fixed: breadcrumb on the left, then search, `extra`, alerts and the user on the right. Use `extra` for one or two app-specific controls. The UserMenu holds the theme choice, so don't add a separate theme toggle.

## Examples

### Without alerts

<!-- demo: WithoutAlerts -->

## Accessibility

- Each slot keeps its own semantics: Breadcrumb is a `nav`, and SearchTrigger owns ⌘K.
- Give NotificationCenter a `label` that says what the alerts are about.
