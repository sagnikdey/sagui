import type { Meta, StoryObj } from "@storybook/react-vite";
import { MobileNavigation } from "@sagui/ui";

const nav = [{ items: [{ label: "Overview", href: "/" }, { label: "Vendors", href: "/vendors", badge: 3 }, { label: "Products", href: "/products" }] }];

const meta = {
  title: "Navigation/MobileNavigation",
  component: MobileNavigation,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "mobile1" } },
  args: { open: true, onOpenChange: () => {}, title: "Acme MDM", description: "10 stores", nav, currentHref: "/vendors" },
} satisfies Meta<typeof MobileNavigation>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
