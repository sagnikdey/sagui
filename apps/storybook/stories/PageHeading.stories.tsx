import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";
import { Badge, Button, MultiSelect, PageHeading, SegmentedControl } from "@sagui/ui";

import { figma } from "../.storybook/figma";

const stores = ["Austin Convention Center", "Dallas Uptown", "Houston Heights", "San Antonio Pearl"].map((label, index) => ({ value: `STR00${index + 1}`, label }));
const periods = [
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
  { value: "365d", label: "12M" },
];

const filters = (
  <>
    <MultiSelect label="Stores" className="w-72" placeholder="All stores" maxVisible={2} options={stores} defaultValue={[]} />
    <SegmentedControl label="Period" defaultValue="30d" options={periods} />
  </>
);

/** The three patterns for `actions`. Pick one in the Controls panel to swap it, like the Actions property in Figma. */
const actionPatterns = {
  Buttons: (
    <>
      <Button variant="outline">Export</Button>
      <Button leadingIcon={<Plus />}>Send invitation</Button>
    </>
  ),
  Filters: filters,
  "Filters + button": (
    <>
      {filters}
      <Button leadingIcon={<Plus />}>New report</Button>
    </>
  ),
  None: null,
};

const meta = {
  title: "Navigation/PageHeading",
  component: PageHeading,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: figma("300:245") },
  argTypes: {
    actions: { options: Object.keys(actionPatterns), mapping: actionPatterns, control: { type: "select" } },
    status: { control: false },
  },
  args: {
    title: "Vendor applications",
    description: "Review onboarding submissions and promote approved vendors into MDM.",
    actions: "Buttons" as unknown as React.ReactNode,
  },
} satisfies Meta<typeof PageHeading>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Type=Simple, Size=Default. */
export const Buttons: Story = {};

/** The Sales Analytics header: stores and period filters in place of buttons. */
export const Filters: Story = {
  args: { title: "Sales overview", description: "All 10 stores · Sep 6 to Oct 5, 2026", actions: "Filters" as unknown as React.ReactNode },
};

export const FiltersAndButton: Story = {
  name: "Filters + button",
  args: { title: "Sales overview", description: "All 10 stores · Sep 6 to Oct 5, 2026", actions: "Filters + button" as unknown as React.ReactNode },
};

/** Figma: Type=Detail, Size=Default, for a single record. The breadcrumb stays in the AppTopBar. */
export const Detail: Story = {
  parameters: { design: figma("300:190") },
  args: {
    title: "Sagnik Drinks",
    description: "Beverage supplier · Applied Oct 28, 2026",
    back: { label: "Applications", href: "#" },
    status: <Badge tone="info">Under review</Badge>,
  },
};
