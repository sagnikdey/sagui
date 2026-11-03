import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageHeader, Badge, Breadcrumb, Button, SearchTrigger } from "@sagui/ui";

import { figma } from "../.storybook/figma";

const breadcrumb = <Breadcrumb items={[{ label: "Dashboard", href: "#" }, { label: "Vendors", href: "#" }, { label: "Applications" }]} />;
const search = <SearchTrigger shortcut={false} placeholder="Search vendors, products, documents…" />;

const meta = {
  title: "Navigation/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: figma("300:147") },
  args: { title: "Vendors", description: "468 active", actions: <Button>Add vendor</Button> },
} satisfies Meta<typeof PageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Type=Standard. For pages without an AppShell; inside one, use PageHeading and put the breadcrumb and search in the AppTopBar. */
export const Standard: Story = { args: { breadcrumb, search } };
/** Figma: Type=Detail. */
export const Detail: Story = {
  parameters: { design: figma("300:190") },
  args: { breadcrumb, search, back: { label: "Back", href: "#" }, title: "Sagnik Drinks", status: <Badge tone="info">Under review</Badge> },
};
export const WithBack: Story = { args: { back: { label: "Vendors", href: "#" } } };
