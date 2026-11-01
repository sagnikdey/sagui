import * as React from "react";
import { Menu } from "lucide-react";
import { cn } from "../../lib/cn";

export interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Workspace or product mark and name. */
  brand?: React.ReactNode;
  /** Opens Mobile Navigation. The menu button only renders when this is set. */
  onMenuClick?: () => void;
  /** Whether the navigation it opens is showing, for aria-expanded. */
  menuOpen?: boolean;
  /** Global search, usually a SearchTrigger (a field from 640px, an icon below). */
  search?: React.ReactNode;
  /** End of the bar, such as the user's Avatar or UserMenu. */
  actions?: React.ReactNode;
  /** Hide the bar from 1024px, where the Sidebar takes over. On by default. */
  hideOnDesktop?: boolean;
}

/**
 * The top bar of signed-in apps on tablets and phones (below 1024px), where the Sidebar becomes Mobile Navigation:
 * a menu button, the workspace, search and the user.
 */
export function AppBar({ brand, onMenuClick, menuOpen, search, actions, hideOnDesktop = true, className, ...props }: AppBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 flex-none items-center gap-2 border-b border-border-default bg-bg-surface/90 pr-3 pl-2 backdrop-blur",
        hideOnDesktop && "lg:hidden",
        className
      )}
      {...props}
    >
      {onMenuClick && (
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
          className="grid size-10 flex-none cursor-pointer place-items-center rounded-control text-fg-default transition-colors duration-[var(--duration-fast)] hover:bg-bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <Menu aria-hidden className="size-5" />
        </button>
      )}
      <div className="flex min-w-0 flex-1 items-center gap-2">{brand}</div>
      {search}
      {actions && <div className="flex flex-none items-center gap-2">{actions}</div>}
    </header>
  );
}
