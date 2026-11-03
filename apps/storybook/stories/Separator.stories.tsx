import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@sagui/ui";

import { figma } from "../.storybook/figma";

const meta = {
  title: "Basics/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: figma("356:5") },
  args: {},
} satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Labeled: Story = { args: { label: "or" } };
export const Vertical: Story = { args: { orientation: "vertical" }, decorators: [(S) => <div className="h-8"><S /></div>] };
