"use client";

import { Button, MetricCard, Page, SegmentedControl } from "@sagui/ui";

// #region Hero
export function Hero() {
  return (
    <Page title="Dashboard" description="Convenience store master data overview">
      <div className="grid gap-4 sm:grid-cols-2">
        <MetricCard label="Stores" value={10} context="9 active" />
        <MetricCard label="Vendors" value={25} context="25 suppliers" />
      </div>
    </Page>
  );
}
// #endregion

// #region Contained
export function Contained() {
  return (
    <Page
      width="contained"
      title="Sales overview"
      description="All 10 stores · Sep 6 to Oct 5, 2026"
      actions={
        <>
          <SegmentedControl label="Period" defaultValue="30d" options={[{ value: "7d", label: "7D" }, { value: "30d", label: "30D" }, { value: "90d", label: "90D" }]} />
          <Button>Export</Button>
        </>
      }
    >
      <MetricCard label="Revenue" value={283.5} prefix="$" suffix="k" decimals={1} change="-2.2%" context="vs previous 30 days" />
    </Page>
  );
}
// #endregion
