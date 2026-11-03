import * as React from "react";
import { cn } from "../../lib/cn";

export interface AppTopBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Where the page sits, usually a Breadcrumb. Takes the free space on the left. */
  breadcrumb?: React.ReactNode;
  /** Global search, usually a SearchTrigger that opens AdvancedSearch. */
  search?: React.ReactNode;
  /** App-specific controls that sit between search and alerts. Keep it to one or two. */
  extra?: React.ReactNode;
  /** Alerts, usually a NotificationCenter. */
  alerts?: React.ReactNode;
  /** The signed-in account, usually a UserMenu. It holds the theme choice, so don't add a separate theme toggle. */
  user?: React.ReactNode;
}

/**
 * The AppShell top bar, in the same order in every app: breadcrumb on the left, then search, app extras, alerts and the user on the right.
 * Pass it as AppShell's `header` and leave `actions` empty.
 */
export function AppTopBar({ breadcrumb, search, extra, alerts, user, className, ...props }: AppTopBarProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)} {...props}>
      <div className="min-w-0 flex-1">{breadcrumb}</div>
      <div className="flex flex-none items-center gap-2">
        {search}
        {extra}
        {alerts}
        {user}
      </div>
    </div>
  );
}
