"use client";

import { Button, MultiSelect, PageHeading, SegmentedControl } from "@sagui/ui";

// #region Hero
export function Hero() {
  return (
    <PageHeading
      title="Vendor applications"
      description="Review onboarding submissions and promote approved vendors into MDM."
      actions={
        <>
          <Button variant="outline">Export</Button>
          <Button>Send invitation</Button>
        </>
      }
    />
  );
}
// #endregion

// #region Filters
export function Filters() {
  return (
    <PageHeading
      title="Sales overview"
      description="All 10 stores · Sep 6 to Oct 5, 2026"
      actions={
        <>
          <MultiSelect label="Stores" className="w-72" placeholder="All stores" options={[{ value: "STR001", label: "Austin Convention Center" }, { value: "STR002", label: "Dallas Uptown" }]} />
          <SegmentedControl label="Period" defaultValue="30d" options={[{ value: "7d", label: "7D" }, { value: "30d", label: "30D" }, { value: "90d", label: "90D" }, { value: "365d", label: "12M" }]} />
        </>
      }
    />
  );
}
// #endregion
