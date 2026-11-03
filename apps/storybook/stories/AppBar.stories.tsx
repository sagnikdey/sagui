import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppBar } from "@sagui/ui";

import { figma } from "../.storybook/figma";

const meta = {
  title: "Navigation/AppBar",
  component: AppBar,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: figma("327:1598") },
  args: { hideOnDesktop: false, brand: "Acme MDM", onMenuClick: () => {} },
} satisfies Meta<typeof AppBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
