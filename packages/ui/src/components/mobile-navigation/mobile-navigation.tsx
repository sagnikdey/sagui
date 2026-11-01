import * as React from "react";
import { LayoutGroup } from "motion/react";
import { cn } from "../../lib/cn";
import { Drawer, DrawerContent } from "../drawer/drawer";
import { NavList, currentItem, type AppShellNavSection } from "../app-shell/app-shell";

export interface MobileNavigationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The same sections as the Sidebar, so destinations, order and the active item match on every screen size. */
  nav: AppShellNavSection[];
  /** Workspace name, shown as the drawer title. */
  title: string;
  /** One line under the title, such as "10 stores". */
  description?: string;
  /** Pinned to the bottom, such as the signed-in user and settings. */
  footer?: React.ReactNode;
  /** The current path. Marks the matching item, like AppShell. */
  currentHref?: string;
  /** Element for nav links. Pass your router's Link. Defaults to `a`. */
  linkComponent?: React.ElementType;
  /** Accessible name of the navigation landmark. */
  label?: string;
  /** Use the accent pill for the current page, matching the inset AppShell. */
  accent?: boolean;
  className?: string;
}

/**
 * The Sidebar's destinations in a left drawer for tablets and phones, opened from the App Bar's menu button. Slides
 * in over a blurred scrim and closes on the close button, a tap outside, Escape, a drag to the left, or choosing a page.
 */
export function MobileNavigation({
  open,
  onOpenChange,
  nav,
  title,
  description,
  footer,
  currentHref,
  linkComponent: Link = "a",
  label = "Main",
  accent = false,
  className,
}: MobileNavigationProps) {
  const current = currentItem(nav, currentHref);
  // A route change closes the drawer.
  React.useEffect(() => onOpenChange(false), [currentHref]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        side="left"
        title={title}
        description={description}
        className={cn("[--drawer-size:min(22rem,calc(100vw-3.5rem))] max-sm:[--drawer-size:min(21rem,calc(100vw-3.5rem))]", className)}
      >
        <div className="-mx-3 flex min-h-full flex-col gap-4">
          <LayoutGroup id="mobile-navigation">
            <NavList nav={nav} current={current} rail={false} Link={Link} label={label} layoutId="current" accent={accent} onNavigate={() => onOpenChange(false)} />
          </LayoutGroup>
          {footer && <div className="mt-auto border-t border-border-default px-3 pt-4">{footer}</div>}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
