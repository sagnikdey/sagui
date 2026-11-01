import * as React from "react";
import * as Menu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../lib/cn";
import { menuContent, menuItem, menuItemDestructive } from "../../lib/menu";
import { Kbd } from "../kbd/kbd";

export const DropdownMenu = Menu.Root;
export const DropdownMenuTrigger = Menu.Trigger;
export const DropdownMenuGroup = Menu.Group;

export interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof Menu.Content> {}

/** The menu panel. Grows from its trigger and leaves faster than it arrives, like every SagUI menu. */
export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(function DropdownMenuContent(
  { className, sideOffset = 6, align = "start", children, ...props },
  ref
) {
  // Items stagger in by their index.
  let i = 0;
  const staggered = React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, { style: { ...((child.props as { style?: React.CSSProperties }).style ?? {}), ["--i" as string]: i++ } }) : child
  );
  return (
    <Menu.Portal>
      <Menu.Content ref={ref} sideOffset={sideOffset} align={align} className={cn(menuContent, className)} {...props}>
        {staggered}
      </Menu.Content>
    </Menu.Portal>
  );
});

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof Menu.Item> {
  icon?: React.ReactNode;
  /** Shortcut hint at the end of the row, such as "⌘ D". */
  shortcut?: string;
  /** Red text and highlight, for actions that delete or remove. */
  destructive?: boolean;
}

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(function DropdownMenuItem(
  { icon, shortcut, destructive, className, children, ...props },
  ref
) {
  return (
    <Menu.Item ref={ref} className={cn(menuItem, destructive && menuItemDestructive, className)} {...props}>
      {icon && <span aria-hidden className="flex size-4 flex-none [&_svg]:size-4">{icon}</span>}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {shortcut && <Kbd keys={shortcut} variant="plain" className="ml-4" />}
    </Menu.Item>
  );
});

export function DropdownMenuLabel({ className, ...props }: React.ComponentPropsWithoutRef<typeof Menu.Label>) {
  return <Menu.Label className={cn("px-[11px] pt-2 pb-1 type-caption text-fg-muted", className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: React.ComponentPropsWithoutRef<typeof Menu.Separator>) {
  return <Menu.Separator className={cn("-mx-[5px] my-[5px] h-px bg-border-default", className)} {...props} />;
}
