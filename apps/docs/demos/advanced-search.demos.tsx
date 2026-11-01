"use client";

import { useState } from "react";
import { AdvancedSearch, SearchTrigger } from "@sagui/ui";


// #region Hero
export function Hero() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SearchTrigger onOpen={() => setOpen(true)} shortcut={false} />
      <AdvancedSearch
        open={open}
        onOpenChange={setOpen}
        scopes={[{ id: "all", label: "All" }, { id: "vendors", label: "Vendors", count: 2 }, { id: "orders", label: "Orders", count: 1 }]}
        results={[
          { id: "1", title: "Acme Supply", meta: "Vendor · New York", group: "Vendors", badge: { label: "Active", tone: "success" } },
          { id: "2", title: "Acme Logistics", meta: "Vendor · Newark", group: "Vendors" },
          { id: "3", title: "PO-10422", meta: "Order · Acme Supply", group: "Orders" },
        ]}
        commands={[{ id: "new", label: "Create vendor" }, { id: "theme", label: "Switch theme" }]}
      />
    </>
  );
}
// #endregion
