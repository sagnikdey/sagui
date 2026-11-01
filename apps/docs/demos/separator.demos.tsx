"use client";

import { Separator } from "@sagui/ui";


// #region Hero
export function Hero() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <p className="type-body">Account</p>
      <Separator />
      <p className="type-body">Billing</p>
      <Separator label="or" />
      <div className="flex h-6 items-center gap-3 type-body">Edit <Separator orientation="vertical" /> Share</div>
    </div>
  );
}
// #endregion
