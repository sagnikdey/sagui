import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "@sagui/ui";

const meta = {
  title: "Form Elements/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Store code", description: "Six letters or numbers.", children: <input className="h-10 w-72 rounded-control border border-border-default bg-bg-surface px-3" /> },
} satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Optional: Story = { args: { optional: true } };
export const WithError: Story = { args: { error: "Enter a 9-digit tax ID." } };
