import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, MetricCard, Page } from "@sagui/ui";

const meta = {
  title: "Navigation/Page",
  component: Page,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    title: "Dashboard",
    description: "Convenience store master data overview",
    children: (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Stores" value={10} context="9 active" />
        <MetricCard label="Vendors" value={25} context="25 suppliers" />
        <MetricCard label="Products" value={28} context="28 active SKUs" />
        <MetricCard label="Inventory records" value={33} context="33 availability rules" />
      </div>
    ),
  },
} satisfies Meta<typeof Page>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithActions: Story = { args: { actions: <Button>Invite vendor</Button> } };
export const Contained: Story = { args: { width: "contained" } };
