"use client";

import { SearchTrigger } from "@sagui/ui";


// #region Hero
export function Hero() {
  return (
    <div className="flex items-center gap-4"><SearchTrigger onOpen={() => {}} shortcut={false} /><SearchTrigger variant="icon" onOpen={() => {}} shortcut={false} /></div>
  );
}
// #endregion
