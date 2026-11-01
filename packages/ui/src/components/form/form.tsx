import * as React from "react";
import { cn } from "../../lib/cn";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** "narrow" (about 560px) suits task forms; "full" fills its container, for settings pages and dialogs. */
  width?: "narrow" | "full";
}

/** The form element with SagUI spacing: 32px between sections. */
export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form({ width = "narrow", className, ...props }, ref) {
  return <form ref={ref} className={cn("grid gap-8", width === "narrow" && "max-w-140", className)} {...props} />;
});
Form.displayName = "Form";

export interface FormSectionProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "title"> {
  /** Section heading, rendered as the fieldset legend so screen readers announce it with each field. */
  title?: React.ReactNode;
  description?: React.ReactNode;
}

/** A group of related fields under one heading, 20px apart. */
export function FormSection({ title, description, className, children, ...props }: FormSectionProps) {
  return (
    <fieldset className={cn("m-0 grid min-w-0 gap-5 border-0 p-0", className)} {...props}>
      {(title || description) && (
        <div className="grid gap-1">
          {title && <legend className="type-h3 p-0 text-fg-default">{title}</legend>}
          {description && <p className="type-body-sm text-fg-muted">{description}</p>}
        </div>
      )}
      {children}
    </fieldset>
  );
}

/** Puts short, related fields side by side, such as first and last name. Stacks to one column below 640px. */
export function FormRow({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid items-start gap-4 sm:auto-cols-fr sm:grid-flow-col", className)} {...props} />;
}

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "start" lines the buttons up with the fields on a page; "end" is for dialogs and drawers. */
  align?: "start" | "end" | "between";
  /** Draws a top divider, as at the bottom of a form card. */
  divider?: boolean;
}

/**
 * The button row at the end of a form. Put the primary action last. Below 640px the buttons stack full width
 * with the primary on top.
 */
export function FormActions({ align = "end", divider = false, className, ...props }: FormActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:items-center [&>*]:max-sm:w-full",
        align === "end" && "sm:justify-end",
        align === "between" && "sm:justify-between",
        divider && "border-t border-border-default pt-4",
        className
      )}
      {...props}
    />
  );
}
