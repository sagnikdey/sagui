"use client";

import { useState } from "react";
import { Building2, LayoutDashboard, Package, Store } from "lucide-react";
import { Button, MobileNavigation } from "@sagui/ui";
import { Menu } from "lucide-react";

const nav = [{ items: [{ label: "Overview", href: "/", icon: <LayoutDashboard /> }, { label: "Vendors", href: "/vendors", icon: <Building2 />, badge: 3 }, { label: "Products", href: "/products", icon: <Package /> }, { label: "Stores", href: "/stores", icon: <Store /> }] }];

// #region Hero
export function Hero() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" leadingIcon={<Menu />} onClick={() => setOpen(true)}>Open navigation</Button>
      <MobileNavigation open={open} onOpenChange={setOpen} title="Acme MDM" description="10 stores" currentHref="/vendors" nav={nav} />
    </>
  );
}
// #endregion
