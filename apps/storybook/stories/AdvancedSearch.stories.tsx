import type { Meta, StoryObj } from "@storybook/react-vite";
import { AdvancedSearch } from "@sagui/ui";

const meta = {
  title: "Navigation/AdvancedSearch",
  component: AdvancedSearch,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { open: true, onOpenChange: () => {}, results: [{ id: "1", title: "Acme Supply", meta: "Vendor · New York", group: "Vendors" }, { id: "2", title: "PO-10422", meta: "Order", group: "Orders" }] },
} satisfies Meta<typeof AdvancedSearch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
