---
title: Form
slug: form
description: "Lay out fields, sections and actions with consistent spacing."
category: inputs
component: Form
keywords:
  - form
  - form layout
  - fieldset
  - form actions
---

Lay out fields, sections and actions with consistent spacing.

<!-- demo: Hero -->

## When to use

- Any page or dialog that collects several fields.
- Splitting a long form into titled sections, with paired fields side by side.

## When not to use

- Use Stepper with one Form per step for long linear flows.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { Form, FormSection, FormRow, FormActions, Input, Button } from "@sagui/ui";

<Form onSubmit={save}>
  <FormSection title="Company">
    <FormRow>
      <Input label="Legal name" />
      <Input label="Trading name" />
    </FormRow>
  </FormSection>
  <FormActions>
    <Button variant="secondary">Cancel</Button>
    <Button type="submit">Save</Button>
  </FormActions>
</Form>
```

## Accessibility

- FormSection is a `fieldset` with its title as the `legend`.
- On phones, actions stack with the primary action on top and fill the width.
