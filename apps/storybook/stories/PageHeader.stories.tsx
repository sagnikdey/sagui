import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageHeader, Button } from "@sagui/ui";

const meta = {
  title: "Navigation/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Vendors", description: "468 active", actions: <Button>Add vendor</Button> },
} satisfies Meta<typeof PageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
export const WithBack: Story = { args: { back: { label: "Vendors", href: "#" } } };
