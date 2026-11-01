import * as React from "react";
import { cn } from "../../lib/cn";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Keys to show. A string such as "⌘ K" renders as one key cap; an array renders one cap per key,
   * for shortcuts pressed in sequence such as ["G", "D"].
   */
  keys?: string | string[];
  /** "key" draws a filled cap. "plain" is borderless muted text, for dense lists such as menu shortcuts. */
  variant?: "key" | "plain";
}

const cap = {
  key: "inline-flex h-6 min-w-6 items-center justify-center gap-0.5 rounded-control-sm border border-border-default bg-bg-muted px-1.5 font-sans text-xs font-medium text-fg-muted",
  plain: "inline-flex items-center gap-0.5 font-sans text-xs text-fg-muted",
} as const;

/** A keyboard hint, such as ⌘K beside a search field or Esc in an overlay. */
export function Kbd({ keys, variant = "key", className, children, ...props }: KbdProps) {
  const list = Array.isArray(keys) ? keys : [keys ?? (typeof children === "string" ? children : "")];
  if (!keys && typeof children !== "string") {
    return <kbd className={cn(cap[variant], className)} {...props}>{children}</kbd>;
  }
  if (list.length === 1) return <kbd className={cn(cap[variant], className)} {...props}>{list[0]}</kbd>;
  return (
    <span className={cn("inline-flex items-center gap-1", className)} {...props}>
      {list.map((key, index) => <kbd key={index} className={cap[variant]}>{key}</kbd>)}
    </span>
  );
}
