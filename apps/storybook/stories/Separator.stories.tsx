import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@sagui/ui";

const meta = {
  title: "Basics/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {},
} satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Labeled: Story = { args: { label: "or" } };
export const Vertical: Story = { args: { orientation: "vertical" }, decorators: [(S) => <div className="h-8"><S /></div>] };
