---
title: Page
slug: page
description: "The standard body of an app page: its header, then its sections."
category: navigation
component: Page
keywords:
  - navigation
  - page
  - layout
  - page layout
  - page template
  - app page
---

The standard body of an app page: its header, then its sections.

<!-- demo: Hero -->

## When to use

- Every page inside an AppShell. Start the route with `<Page>` so the title, padding and spacing match across apps.
- Dashboards and lists use the default full width. Long forms and reading pages use `width="contained"`.

## When not to use

- Use page-header alone for a page that is not inside an AppShell, such as a full-screen wizard.
- Don't add your own `h1` or outer padding around a Page. It already has both.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { Page, MetricCard } from "@sagui/ui";

export default function DashboardPage() {
  return (
    <Page title="Dashboard" description="Convenience store master data overview">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Stores" value={10} context="9 active" />
      </div>
    </Page>
  );
}
```

Page renders the PageHeader and stacks its children with a `gap-6`, inside `p-4` (`p-6` from 640px). Pass filters or the page's one primary Button as `actions`.

## The standard app frame

Page is one half of the frame every SagUI app shares. The other half is the AppShell, set up the same way in each app:

```tsx
<AppShell
  variant="inset"
  background="dots"
  nav={nav}
  currentHref={pathname}
  linkComponent={Link}
  brand={<Select label="Team" value={team} options={teams} onValueChange={setTeam} />}
  brandMark={<TeamMark />}
  header={<Breadcrumb items={crumbs} linkComponent={Link} />}
  actions={
    <>
      <SearchTrigger onOpen={() => setSearching(true)} />
      {/* App-specific actions, such as NotificationCenter, go here */}
      <UserMenu user={user} theme={theme} onThemeChange={setTheme} />
    </>
  }
>
  {children}
</AppShell>
```

- The breadcrumb lives in the top bar, so Page doesn't repeat it.
- Search comes first in `actions` and the UserMenu comes last. App-specific controls go between them.
- The UserMenu holds the theme choice. Don't add a separate theme toggle.

## Examples

### Contained width with actions

<!-- demo: Contained -->

## Accessibility

- The title is the page's only `h1`. Give sections inside the page `h2` headings, or use Cards, which title themselves.
- Page is a plain `div`. AppShell already provides the `main` landmark and the skip link target.
