"use client";

import { AppBar, Avatar, SearchTrigger } from "@sagui/ui";


// #region Hero
export function Hero() {
  return (
    <AppBar className="w-full" hideOnDesktop={false} brand={<span className="type-label">Acme MDM</span>} onMenuClick={() => {}} search={<SearchTrigger variant="icon" onOpen={() => {}} shortcut={false} />} actions={<Avatar name="Sagnik Dey" size="sm" />} />
  );
}
// #endregion
