import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "@sagui/ui";

import { figma } from "../.storybook/figma";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: figma("284:243") },
  args: { page: 1, pageCount: 24, onPageChange: () => {} },
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Middle: Story = { args: { page: 12 } };
export const Compact: Story = { args: { layout: "compact" } };
