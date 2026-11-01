import * as React from "react";
import { cn } from "../../lib/cn";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Horizontal rules divide stacked content; vertical rules divide items in a row, such as toolbar groups. */
  orientation?: "horizontal" | "vertical";
  /**
   * Purely visual separators are hidden from assistive technology. Set to false when the rule separates
   * meaningful sections and should be announced.
   */
  decorative?: boolean;
  /** Short text centered on a horizontal rule, such as "or". */
  label?: React.ReactNode;
}

/** A 1px hairline in the default border color that divides content. Optionally carries a centered label. */
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = "horizontal", decorative = true, label, className, ...props },
  ref
) {
  const a11y = decorative
    ? { role: "none" as const, "aria-hidden": true }
    : { role: "separator" as const, "aria-orientation": orientation };

  if (label && orientation === "horizontal") {
    return (
      <div ref={ref} {...a11y} className={cn("flex w-full items-center gap-3", className)} {...props}>
        <span className="h-px flex-1 bg-border-default" />
        <span className="type-caption text-fg-muted">{label}</span>
        <span className="h-px flex-1 bg-border-default" />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      {...a11y}
      className={cn("shrink-0 bg-border-default", orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch", className)}
      {...props}
    />
  );
});
Separator.displayName = "Separator";
