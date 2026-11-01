import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "@sagui/ui";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { page: 1, pageCount: 24, onPageChange: () => {} },
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Middle: Story = { args: { page: 12 } };
export const Compact: Story = { args: { layout: "compact" } };
