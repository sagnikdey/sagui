import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppTopBar, Breadcrumb, NotificationCenter, SearchTrigger, UserMenu, type NotificationItem } from "@sagui/ui";

const notifications: NotificationItem[] = [
  { id: "1", title: "Energy drink out of stock", description: "Austin Convention Center", time: "Critical", tone: "warning" },
  { id: "2", title: "Salad overstocked", description: "Dallas Uptown", time: "Today", tone: "warning", read: true },
];

const meta = {
  title: "Navigation/AppTopBar",
  component: AppTopBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    breadcrumb: <Breadcrumb items={[{ label: "Dashboard", href: "#" }, { label: "Vendors", href: "#" }, { label: "Applications" }]} />,
    search: <SearchTrigger shortcut={false} placeholder="Search vendors, products, documents…" />,
    alerts: <NotificationCenter notifications={notifications} label="Alerts" />,
    user: <UserMenu user={{ name: "MDM Admin", email: "admin@convenience-store.com" }} />,
  },
} satisfies Meta<typeof AppTopBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** No alerts: the user menu closes the row. */
export const WithoutAlerts: Story = { args: { alerts: undefined } };

function ThemedUser() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  return <UserMenu user={{ name: "Regional Sales Director", email: "sales.director@example.com" }} theme={theme} onThemeChange={setTheme} />;
}

/** The user menu holds the theme choice, so there is no separate theme toggle. */
export const WithTheme: Story = { args: { user: <ThemedUser /> } };
