"use client";

import { Button, Form, FormActions, FormRow, FormSection, Input } from "@sagui/ui";


// #region Hero
export function Hero() {
  return (
    <Form className="w-full max-w-140" onSubmit={(e) => e.preventDefault()}>
      <FormSection title="Company" description="As it appears on tax documents.">
        <FormRow>
          <Input label="Legal name" />
          <Input label="Trading name" />
        </FormRow>
        <Input label="Website" />
      </FormSection>
      <FormActions divider>
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save</Button>
      </FormActions>
    </Form>
  );
}
// #endregion
