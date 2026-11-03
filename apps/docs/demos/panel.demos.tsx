"use client";

import { Button, Panel, PanelContent, PanelDescription, PanelFooter, PanelHeader, PanelTitle } from "@sagui/ui";

// #region Hero
export function Hero() {
  return (
    <Panel className="max-w-md">
      <PanelHeader>
        <PanelTitle>Banking</PanelTitle>
        <PanelDescription>Account ending 4821</PanelDescription>
      </PanelHeader>
      <PanelContent>Payments settle within two business days.</PanelContent>
      <PanelFooter>
        <Button variant="outline">Change account</Button>
      </PanelFooter>
    </Panel>
  );
}
// #endregion

// #region Raised
export function Raised() {
  return (
    <Panel elevation="raised" className="max-w-md">
      <PanelHeader>
        <PanelTitle>Shipping address</PanelTitle>
      </PanelHeader>
      <PanelContent>1200 Congress Ave, Austin, TX 78701</PanelContent>
    </Panel>
  );
}
// #endregion
