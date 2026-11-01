import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchTrigger } from "@sagui/ui";

const meta = {
  title: "Navigation/SearchTrigger",
  component: SearchTrigger,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { onOpen: () => {}, shortcut: false },
} satisfies Meta<typeof SearchTrigger>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Field: Story = {};
export const Icon: Story = { args: { variant: "icon" } };
