"use client";

import { AppTopBar, Breadcrumb, NotificationCenter, SearchTrigger, UserMenu } from "@sagui/ui";

const breadcrumb = <Breadcrumb items={[{ label: "Dashboard", href: "#" }, { label: "Vendors", href: "#" }, { label: "Applications" }]} />;
const user = <UserMenu user={{ name: "MDM Admin", email: "admin@convenience-store.com" }} />;

// #region Hero
export function Hero() {
  return (
    <AppTopBar
      breadcrumb={breadcrumb}
      search={<SearchTrigger shortcut={false} />}
      alerts={<NotificationCenter notifications={[{ id: "1", title: "Energy drink out of stock", description: "Austin Convention Center", time: "Critical", tone: "warning" }]} label="Alerts" />}
      user={user}
    />
  );
}
// #endregion

// #region WithoutAlerts
export function WithoutAlerts() {
  return <AppTopBar breadcrumb={breadcrumb} search={<SearchTrigger shortcut={false} />} user={user} />;
}
// #endregion
