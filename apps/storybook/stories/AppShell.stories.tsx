import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, BarChart3, Boxes, CircleHelp, Home, Inbox, Package, Plus, Search, Settings, Store, Truck, Users } from "lucide-react";
import {
  AppShell,
  AppShellAside,
  AppShellHeader,
  AppShellPageHeader,
  AppShellSidebar,
  AsideTrigger,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  type AppShellProps,
} from "@sagui/ui";

const meta = {
  title: "Layout/App Shell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

const nav = [
  { group: "Operate", items: [
    { id: "home", label: "Home", icon: <Home /> },
    { id: "inbox", label: "Inbox", icon: <Inbox />, badge: 12 },
    { id: "orders", label: "Orders", icon: <Package /> },
    { id: "deliveries", label: "Deliveries", icon: <Truck /> },
  ] },
  { group: "Catalog", items: [
    { id: "products", label: "Products", icon: <Boxes /> },
    { id: "stores", label: "Stores", icon: <Store /> },
    { id: "suppliers", label: "Suppliers", icon: <Users /> },
  ] },
  { group: "Insights", items: [{ id: "reports", label: "Reports", icon: <BarChart3 /> }] },
];

const logo = <span className="grid size-full place-items-center bg-primary text-xs font-bold text-primary-foreground">S</span>;

function Example({ withAside = false, ...props }: Partial<AppShellProps> & { withAside?: boolean }) {
  const [page, setPage] = React.useState("orders");
  const title = nav.flatMap((g) => g.items).find((item) => item.id === page)?.label ?? "";
  return (
    <AppShell
      {...props}
      sidebar={
        <AppShellSidebar>
          <SidebarHeader><SidebarBrand logo={logo} name="Quickstop" description="Houston region" /></SidebarHeader>
          <SidebarContent>
            {nav.map((group) => (
              <SidebarGroup key={group.group} label={group.group}>
                {group.items.map((item) => (
                  <SidebarItem key={item.id} href={`#${item.id}`} icon={item.icon} label={item.label} badge={item.badge} active={page === item.id} onClick={(e) => { e.preventDefault(); setPage(item.id); }} />
                ))}
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem icon={<CircleHelp />} label="Help" />
            <SidebarItem icon={<Settings />} label="Settings" active={page === "settings"} onClick={() => setPage("settings")} />
          </SidebarFooter>
        </AppShellSidebar>
      }
      header={
        <AppShellHeader>
          <div className="hidden min-w-0 flex-1 md:block"><Breadcrumb items={[{ label: "Quickstop", href: "#" }, { label: title || "Settings" }]} /></div>
          <div className="ml-auto flex items-center gap-1">
            <button type="button" className="mr-1 hidden h-8 w-60 cursor-pointer items-center gap-2 rounded-[var(--radius-control)] border border-border bg-surface px-2.5 text-sm text-muted-foreground shadow-resting hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex">
              <Search size={15} aria-hidden="true" /> Search orders, stores…
              <kbd className="ml-auto rounded-[var(--radius-xs)] border border-border px-1 font-sans text-xs">⌘K</kbd>
            </button>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="size-8"><Bell size={18} /></Button>
            {withAside ? <AsideTrigger label="Toggle order details" /> : null}
            <Avatar name="Sagnik Dey" size="sm" className="ml-1" />
          </div>
        </AppShellHeader>
      }
      aside={withAside ? (
        <AppShellAside title="Order #48213" description="Placed today, 9:42 AM">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3">
            <dt className="text-muted-foreground">Status</dt><dd className="m-0"><Badge tone="warning">Picking</Badge></dd>
            <dt className="text-muted-foreground">Store</dt><dd className="m-0">#1042 Westheimer</dd>
            <dt className="text-muted-foreground">Items</dt><dd className="m-0">24 lines, 312 units</dd>
            <dt className="text-muted-foreground">Supplier</dt><dd className="m-0">Gulf Coast Distribution</dd>
          </dl>
        </AppShellAside>
      ) : undefined}
    >
      <AppShellPageHeader
        title={title || "Settings"}
        description="Track replenishment orders across stores and suppliers."
        actions={<><Button variant="outline" size="sm">Export</Button><Button size="sm" leadingIcon={<Plus />}>New order</Button></>}
      />
      <div className="grid gap-4 px-4 pb-10 sm:grid-cols-2 sm:px-8 xl:grid-cols-3">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="h-36 rounded-[var(--radius-container)] border border-border bg-surface shadow-resting" />
        ))}
      </div>
    </AppShell>
  );
}

/** Pinned sidebar with grouped navigation, a top bar, and a page header. Resize the canvas to see the rail (tablet) and drawer (mobile) modes. Mod+B collapses the sidebar. */
export const Default: Story = { render: () => <Example storageKey="sagui-storybook-shell" /> };

/** The right-hand inspector docks beside the content from 1280px and floats over it below that. */
export const WithInspector: Story = { render: () => <Example withAside defaultAsideOpen /> };

/** Starts as the icon rail; labels move into tooltips and badges become dots. */
export const Collapsed: Story = { render: () => <Example defaultCollapsed /> };

/** Mobile: the sidebar is an off-canvas drawer, opened from the header toggle. */
export const Mobile: Story = {
  render: () => <Example />,
  globals: { viewport: { value: "mobile2" } },
};
