import * as React from "react";
import { cn } from "../../lib/cn";

export type PanelElevation = "flat" | "resting" | "raised";

const elevations: Record<PanelElevation, string> = {
  flat: "",
  resting: "shadow-resting",
  raised: "shadow-raised",
};

export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  /** Flat is the default. Lift the panel only when it must stand off its surroundings. */
  elevation?: PanelElevation;
}

/** A plain surface for forms, details and any other composed content. */
export function Panel({ elevation = "flat", className, ...props }: PanelProps) {
  return <section className={cn("flex min-w-0 flex-col rounded-container border border-border-default bg-bg-surface text-fg-default", elevations[elevation], className)} {...props} />;
}

export function PanelHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1 px-5 pt-5", className)} {...props} />;
}

export function PanelTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("m-0 text-base font-medium leading-snug", className)} {...props} />;
}

export function PanelDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("m-0 text-sm leading-snug text-fg-muted", className)} {...props} />;
}

export function PanelContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-w-0 p-5 text-sm", className)} {...props} />;
}

/** Actions for the panel. Leave it out when there are none. */
export function PanelFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-wrap items-center gap-3 border-t border-border-default p-5", className)} {...props} />;
}
