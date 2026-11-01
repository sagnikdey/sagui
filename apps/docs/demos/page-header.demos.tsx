"use client";

import { Badge, Breadcrumb, Button, PageHeader } from "@sagui/ui";


// #region Hero
export function Hero() {
  return (
    <PageHeader
      className="w-full"
      breadcrumb={<Breadcrumb items={[{ label: "Vendors", href: "#" }, { label: "Acme Supply" }]} />}
      title="Acme Supply"
      status={<Badge tone="success">Active</Badge>}
      description="Vendor since March 2021"
      actions={<><Button variant="secondary">Edit</Button><Button>Create order</Button></>}
    />
  );
}
// #endregion

// #region Detail
export function Detail() {
  return (
    <PageHeader className="w-full" back={{ label: "Vendors", href: "#" }} title="Acme Supply" status={<Badge tone="warning">Pending review</Badge>} />
  );
}
// #endregion
