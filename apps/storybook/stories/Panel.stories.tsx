import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Panel, PanelContent, PanelDescription, PanelFooter, PanelHeader, PanelTitle } from "@sagui/ui";

import { figma } from "../.storybook/figma";

const meta = {
  title: "Cards/Panel",
  component: Panel,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: figma("355:27") },
  argTypes: { elevation: { control: "inline-radio", options: ["flat", "resting", "raised"] } },
  args: { elevation: "flat" },
  render: (args) => (
    <Panel {...args} className="max-w-md" aria-labelledby="panel-title">
      <PanelHeader>
        <PanelTitle id="panel-title">Banking</PanelTitle>
        <PanelDescription>Account ending 4821</PanelDescription>
      </PanelHeader>
      <PanelContent>Payments settle within two business days.</PanelContent>
      <PanelFooter>
        <Button variant="outline">Change account</Button>
      </PanelFooter>
    </Panel>
  ),
} satisfies Meta<typeof Panel>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Elevation=Flat. */
export const Flat: Story = {};
export const Resting: Story = { args: { elevation: "resting" } };
export const Raised: Story = { args: { elevation: "raised" } };
