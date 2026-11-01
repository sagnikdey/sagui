import * as React from "react";
import { cn } from "../../lib/cn";
import { FieldMessage, describedBy, fieldLabel } from "../../lib/field";

export interface FieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Visible label. It becomes the control's accessible name. */
  label: React.ReactNode;
  /** Helper copy under the control, linked with aria-describedby. */
  description?: string;
  /** Error copy. Sets aria-invalid on the control and is announced as an alert. */
  error?: string;
  /** Shows "Optional" beside the label. Mark the few optional fields rather than the many required ones. */
  optional?: boolean;
  /** Short note at the end of the label row, such as a character limit ("0/160"). Takes the place of "Optional". */
  hint?: React.ReactNode;
  /** Id of the control. Generated when omitted. */
  id?: string;
  /**
   * The control: one element that accepts id, aria-describedby and aria-invalid, such as a native input, select
   * or a custom control. Pass a function to wire the props yourself.
   */
  children: React.ReactElement | ((control: FieldControlProps) => React.ReactNode);
}

export interface FieldControlProps {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
}

/**
 * Wraps any control with a label, an optional or hint note, helper copy and an error, and wires the ids and aria
 * attributes between them. Use it for controls that don't carry their own label, such as a native select or a
 * third-party picker. SagUI fields like Input already include it.
 */
export function Field({ label, description, error, optional, hint, id, className, children, ...props }: FieldProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const control: FieldControlProps = {
    id: controlId,
    "aria-describedby": describedBy(descriptionId, errorId),
    "aria-invalid": error ? true : undefined,
  };
  const note = hint ?? (optional ? "Optional" : null);

  let rendered: React.ReactNode;
  if (typeof children === "function") rendered = children(control);
  else {
    const child = children as React.ReactElement<Record<string, unknown>>;
    rendered = React.cloneElement(child, {
      ...control,
      "aria-describedby": describedBy(child.props["aria-describedby"] as string | undefined, descriptionId, errorId),
    });
  }

  return (
    <div className={cn("grid min-w-0", className)} {...props}>
      <div className="flex items-baseline justify-between gap-3">
        <label className={fieldLabel} htmlFor={controlId}>{label}</label>
        {note && <span className="mb-2 type-caption text-fg-muted">{note}</span>}
      </div>
      {rendered}
      <FieldMessage id={descriptionId} text={description} />
      <FieldMessage id={errorId} text={error} tone="error" />
    </div>
  );
}
