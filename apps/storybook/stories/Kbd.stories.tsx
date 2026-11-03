import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd } from "@sagui/ui";

import { figma } from "../.storybook/figma";

const meta = {
  title: "Basics/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: figma("28:103") },
  args: { keys: "Esc" },
} satisfies Meta<typeof Kbd>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Key: Story = {};
export const Combo: Story = { args: { keys: ["⌘", "Shift", "P"] } };
export const Plain: Story = { args: { variant: "plain", keys: "⌘ D" } };
