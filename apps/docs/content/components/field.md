---
title: Field
slug: field
description: "Give any control a label, helper text and an error."
category: inputs
component: Field
keywords:
  - field
  - label
  - form field
  - helper text
  - error
---

Give any control a label, helper text and an error.

<!-- demo: Hero -->

## When to use

- A control that has no label of its own, such as a custom picker or a native input.
- Marking a field optional or adding a hint beside the label.

## When not to use

- Input, Textarea and Select already include a label, description and error. Use their props.

## Installation

Install the package and import the styles once. The [installation guide](/docs/installation) covers the Tailwind setup.

```bash
npm install @sagui/ui
```

## Usage

```tsx
import { Field } from "@sagui/ui";

<Field label="Store code" description="Six letters or numbers." error={error}>
  <input />
</Field>
```

## Accessibility

- The label is linked to the control by id. The description and error are linked with `aria-describedby`, and an error sets `aria-invalid`.
