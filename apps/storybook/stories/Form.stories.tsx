import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, Button, Input, FormSection, FormRow, FormActions } from "@sagui/ui";

import { figma } from "../.storybook/figma";

const meta = {
  title: "Form Elements/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: figma("362:3640") },
  args: { children: <><FormSection title="Company"><FormRow><Input label="Legal name" /><Input label="Trading name" /></FormRow></FormSection><FormActions><Button variant="secondary">Cancel</Button><Button>Save</Button></FormActions></> },
} satisfies Meta<typeof Form>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
