"use client";

import { Kbd } from "@sagui/ui";


// #region Hero
export function Hero() {
  return (
    <div className="flex items-center gap-4">
      <Kbd keys={["⌘", "K"]} />
      <Kbd keys="Esc" />
      <Kbd keys="⌘ D" variant="plain" />
    </div>
  );
}
// #endregion
