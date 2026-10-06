---
title: App shell
slug: app-shell
description: "The frame of an application: sidebar, top bar, main region and inspector."
category: layout
component: AppShell
keywords:
  - layout
  - app shell
  - react app shell
  - sidebar layout
  - collapsible sidebar
  - dashboard layout
  - admin layout
  - top navigation
  - navigation rail
  - inspector panel
---

The frame of an application: sidebar, top bar, main region and inspector.

<!-- demo: Hero -->

## When to use


- The outer layout of a product: every page renders inside one shell and fills its slots.
- Data-heavy SaaS and admin tools with more than a handful of top-level sections.
- Workflows that need a details or comments panel beside the content (the inspector).

## When not to use


- Marketing pages and docs, which want a content-first layout without persistent navigation.
- Focused flows such as onboarding or checkout: render them outside the shell.
- Fewer than five sections that fit in a top bar: use tabs in the header instead of a sidebar.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage


```tsx
import {
  AppShell, AppShellSidebar, AppShellHeader, AppShellPageHeader,
  SidebarHeader, SidebarBrand, SidebarContent, SidebarGroup, SidebarItem, SidebarFooter,
} from "@sagui/ui";
import Link from "next/link";

export function Layout({ children, pathname }: { children: React.ReactNode; pathname: string }) {
  return (
    <AppShell
      storageKey="app-sidebar"
      sidebar={
        <AppShellSidebar>
          <SidebarHeader><SidebarBrand logo={<Logo />} name="Acme" description="Pro plan" /></SidebarHeader>
          <SidebarContent>
            <SidebarGroup label="Workspace">
              <SidebarItem asChild icon={<Home />} label="Home" active={pathname === "/"}>
                <Link href="/" />
              </SidebarItem>
              <SidebarItem asChild icon={<Package />} label="Orders" badge={12} active={pathname.startsWith("/orders")}>
                <Link href="/orders" />
              </SidebarItem>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter><SidebarItem href="/settings" icon={<Settings />} label="Settings" /></SidebarFooter>
        </AppShellSidebar>
      }
      header={<AppShellHeader><Search /><UserMenu /></AppShellHeader>}
    >
      {children}
    </AppShell>
  );
}
```

## Examples

### With an inspector

The inspector docks beside the content when the shell is at least 1280px wide and floats over it below that.

<!-- demo: Inspector -->

### Collapsed to the rail

<!-- demo: Collapsed -->

### Mobile

<!-- demo: Mobile -->


## API reference


### AppShell

Root. Owns layout, responsive mode, sidebar and inspector state, the skip link and the keyboard shortcut.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sidebar` | `ReactNode` | – | The navigation panel, usually an AppShellSidebar. |
| `header` | `ReactNode` | – | The top bar, usually an AppShellHeader. |
| `aside` | `ReactNode` | – | The inspector, usually an AppShellAside. |
| `children` | `ReactNode` | – | Page content, rendered in the scrolling main region. |
| `collapsed` | `boolean` | – | Controlled desktop collapse state. |
| `defaultCollapsed` | `boolean` | `false` | Initial collapse state when uncontrolled. |
| `onCollapsedChange` | `(collapsed: boolean) => void` | – | Called when the desktop sidebar collapses or expands. |
| `asideOpen` | `boolean` | – | Controlled inspector state. |
| `defaultAsideOpen` | `boolean` | `false` | Initial inspector state when uncontrolled. |
| `onAsideOpenChange` | `(open: boolean) => void` | – | Called when the inspector opens or closes. |
| `storageKey` | `string` | – | Remembers the desktop collapse preference in localStorage. |
| `shortcut` | `boolean` | `true` | Mod+B toggles the sidebar. |
| `skipLinkLabel` | `string` | `"Skip to content"` | Label of the skip link. |
| `mainClassName` | `string` | – | Classes for the main region. |
| `...props` | `HTMLAttributes<HTMLDivElement>` | – | Root props. The root is h-dvh by default; set a height in className to contain it. |

### AppShellSidebar

The `nav` landmark. Pinned on desktop, an icon rail on tablet that expands over the content, an off-canvas drawer on mobile.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"Main"` | Accessible name of the navigation landmark. |
| `...props` | `HTMLAttributes<HTMLElement>` | – | Nav props. |

### SidebarHeader, SidebarContent, SidebarFooter

The sidebar's three regions. The header matches the top bar height so their borders line up; the content scrolls.

### SidebarBrand

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `logo` (required) | `ReactNode` | – | A square mark that stays visible in the rail. |
| `name` (required) | `string` | – | Product or workspace name. |
| `description` | `string` | – | Second line, such as the plan or region. |

### SidebarGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | – | Section heading. In the rail it becomes a hairline divider. |

### SidebarItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` (required) | `ReactNode` | – | Icon shown in both the full sidebar and the rail. |
| `label` (required) | `string` | – | Visible label; the tooltip in the rail. |
| `active` | `boolean` | `false` | Sets aria-current="page" and moves the shared highlight here. |
| `badge` | `ReactNode` | – | Count or status at the end; a dot in the rail. |
| `href` | `string` | – | Renders a link. Without href or asChild the item is a button. |
| `asChild` | `boolean` | `false` | Fills your own link element, such as Next.js Link. |
| `disabled` | `boolean` | – | Disables the item. |

### AppShellHeader

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sidebarTrigger` | `boolean` | `true` | Shows the sidebar toggle at the start. |

### AppShellPageHeader

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` (required) | `ReactNode` | – | Page title, rendered as the h1. |
| `description` | `ReactNode` | – | Supporting line under the title. |
| `actions` | `ReactNode` | – | Page actions aligned to the end. |
| `breadcrumb` | `ReactNode` | – | Breadcrumbs above the title. |
| `sticky` | `boolean` | `false` | Pins the page header while the page scrolls. |

### AppShellAside

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` (required) | `string` | – | Panel title; also its accessible name. |
| `description` | `string` | – | Line under the title. |
| `label` | `string` | title | Overrides the landmark name. |

### SidebarTrigger, AsideTrigger

Icon buttons that toggle the sidebar and the inspector, with aria-expanded and aria-controls set. Pass `label` to rename them.

### useAppShell

Returns `mode` (`"mobile" | "tablet" | "desktop"`), `expanded`, `collapsed`, `setCollapsed`, `toggleSidebar`, `closeSidebar`, `asideOpen`, `asideDocked`, `setAsideOpen` and `toggleAside`, for custom controls inside the shell.

## Layout tokens

Override on `:root` for every shell, or in the AppShell `style` for one.

| Token | Default | Use |
| --- | --- | --- |
| `--sg-shell-header-h` | `3.5rem` | Top bar and sidebar header height. |
| `--sg-shell-sidebar-w` | `16rem` | Expanded sidebar width. |
| `--sg-shell-sidebar-w-collapsed` | `3.75rem` | Rail width. |
| `--sg-shell-aside-w` | `20rem` | Inspector width. |
| `--sg-shell-mobile-sidebar-w` | `18rem` | Mobile drawer width, capped at the shell width minus 3rem. |

## Keyboard interactions


| Keys | Action |
| --- | --- |
| Mod+B | Toggles the sidebar (collapse on desktop, expand the rail on tablet, open the drawer on mobile). |
| Escape | Closes the mobile drawer, the expanded rail, or a floating inspector. |
| Tab (first) | Reveals the skip link, which jumps to the main region. |

## Accessibility


- Landmarks: nav (named by label), header, main and aside, so screen reader users can jump between regions.
- The active item carries aria-current="page"; toggles expose aria-expanded and aria-controls.
- In the rail, labels stay in the accessible name and appear as tooltips for sighted users; badges keep their text.
- The mobile drawer is modal: the rest of the shell is inert while it is open, focus moves into it and returns to the toggle on close.
- Closed panels are inert, so hidden links never receive focus.

## Motion


- The sidebar and inspector resize and slide on a 240ms ease-out; labels fade so text never reflows mid-animation.
- The active highlight slides between items on a smooth spring.
- No transitions run on first paint, so a remembered collapsed state does not animate in. Reduced motion removes all transitions.

## Responsive behavior


- Modes follow the shell's own width, not the viewport, so contained shells and split views behave correctly.
- Below 768px the sidebar is a drawer; from 768px to 1023px it rests as a rail and expands over the content; from 1024px it is pinned.
- The inspector docks from 1280px and overlays below that. Choosing a sidebar item closes the floating sidebar.

## Notes


- Render the shell once in your root layout and change only the page inside it, so the sidebar keeps its state between routes.
- Use `storageKey` to remember collapse per user; pair with `collapsed` and `onCollapsedChange` to store it on the server instead.
- For a second level of navigation, put tabs in the page header or a SidebarGroup per section.

## Related

- [Drawer](/components/drawer): A temporary side surface for focused work.
- [Tabs](/components/tabs): Switch between related content in the same context.
- [Breadcrumb](/components/breadcrumb): Show where the page sits in the hierarchy.
- [Tooltip](/components/tooltip): Short supporting text for unfamiliar controls.
