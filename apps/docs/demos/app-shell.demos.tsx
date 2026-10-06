"use client";

import * as React from "react";
import { BarChart3, Boxes, CircleHelp, Home, Inbox, Package, Plus, Settings, Store, Truck } from "lucide-react";
import {
  AppShell,
  AppShellAside,
  AppShellHeader,
  AppShellPageHeader,
  AppShellSidebar,
  AsideTrigger,
  Avatar,
  Badge,
  Button,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
} from "@sagui/ui";

const frame = "h-[560px] rounded-[var(--radius-container)] border border-border";
const logo = <span className="grid size-full place-items-center bg-primary text-xs font-bold text-primary-foreground">S</span>;

function Placeholder() {
  return (
    <div className="grid gap-4 px-4 pb-8 sm:grid-cols-2 sm:px-8">
      {Array.from({ length: 6 }, (_, i) => <div key={i} className="h-28 rounded-[var(--radius-container)] border border-border bg-surface shadow-resting" />)}
    </div>
  );
}

function Sidebar({ page, setPage }: { page: string; setPage: (page: string) => void }) {
  const item = (id: string, label: string, icon: React.ReactNode, badge?: number) => (
    <SidebarItem key={id} href={`#${id}`} icon={icon} label={label} badge={badge} active={page === id} onClick={(event) => { event.preventDefault(); setPage(id); }} />
  );
  return (
    <AppShellSidebar>
      <SidebarHeader><SidebarBrand logo={logo} name="Quickstop" description="Houston region" /></SidebarHeader>
      <SidebarContent>
        <SidebarGroup label="Operate">
          {item("home", "Home", <Home />)}
          {item("inbox", "Inbox", <Inbox />, 12)}
          {item("orders", "Orders", <Package />)}
          {item("deliveries", "Deliveries", <Truck />)}
        </SidebarGroup>
        <SidebarGroup label="Catalog">
          {item("products", "Products", <Boxes />)}
          {item("stores", "Stores", <Store />)}
          {item("reports", "Reports", <BarChart3 />)}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {item("help", "Help", <CircleHelp />)}
        {item("settings", "Settings", <Settings />)}
      </SidebarFooter>
    </AppShellSidebar>
  );
}

// #region Hero
export function Hero() {
  const [page, setPage] = React.useState("orders");
  return (
    <AppShell
      className={frame}
      sidebar={<Sidebar page={page} setPage={setPage} />}
      header={
        <AppShellHeader>
          <span className="text-sm font-medium">Orders</span>
          <Avatar name="Sagnik Dey" size="sm" className="ml-auto" />
        </AppShellHeader>
      }
    >
      <AppShellPageHeader
        title="Orders"
        description="Replenishment orders across every store."
        actions={<Button size="sm" leadingIcon={<Plus />}>New order</Button>}
      />
      <Placeholder />
    </AppShell>
  );
}
// #endregion

// #region Inspector
export function Inspector() {
  const [page, setPage] = React.useState("orders");
  return (
    <AppShell
      className={frame}
      defaultAsideOpen
      sidebar={<Sidebar page={page} setPage={setPage} />}
      header={
        <AppShellHeader>
          <span className="text-sm font-medium">Orders</span>
          <AsideTrigger label="Toggle order details" className="ml-auto" />
        </AppShellHeader>
      }
      aside={
        <AppShellAside title="Order #48213" description="Placed today, 9:42 AM">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3">
            <dt className="text-muted-foreground">Status</dt><dd className="m-0"><Badge tone="warning">Picking</Badge></dd>
            <dt className="text-muted-foreground">Store</dt><dd className="m-0">#1042 Westheimer</dd>
            <dt className="text-muted-foreground">Items</dt><dd className="m-0">24 lines</dd>
          </dl>
        </AppShellAside>
      }
    >
      <AppShellPageHeader title="Orders" />
      <Placeholder />
    </AppShell>
  );
}
// #endregion

// #region Collapsed
export function Collapsed() {
  const [page, setPage] = React.useState("inbox");
  return (
    <AppShell
      className={frame}
      defaultCollapsed
      sidebar={<Sidebar page={page} setPage={setPage} />}
      header={<AppShellHeader><span className="text-sm font-medium">Inbox</span></AppShellHeader>}
    >
      <AppShellPageHeader title="Inbox" description="Hover a rail icon for its label." />
      <Placeholder />
    </AppShell>
  );
}
// #endregion

// #region Mobile
export function Mobile() {
  const [page, setPage] = React.useState("home");
  return (
    <div className="mx-auto w-[375px] max-w-full">
      <AppShell
        className={frame}
        sidebar={<Sidebar page={page} setPage={setPage} />}
        header={<AppShellHeader><span className="text-sm font-medium">Quickstop</span></AppShellHeader>}
      >
        <AppShellPageHeader title="Home" description="Open the menu from the header." />
        <Placeholder />
      </AppShell>
    </div>
  );
}
// #endregion
