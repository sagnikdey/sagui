"use client";

import { Field } from "@sagui/ui";

const control = "h-10 w-full rounded-control border border-border-default bg-bg-surface px-3 type-body text-fg-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus aria-invalid:border-border-danger";

// #region Hero
export function Hero() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <Field label="Store code" description="Six letters or numbers.">
        <input className={control} placeholder="NYC001" />
      </Field>
      <Field label="Fax" optional>
        <input className={control} />
      </Field>
      <Field label="Tax ID" error="Enter a 9-digit tax ID.">
        <input className={control} defaultValue="12-34" />
      </Field>
    </div>
  );
}
// #endregion
