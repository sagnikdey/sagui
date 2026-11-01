import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "../button/button";

export interface PageHeaderBack {
  label?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  /** One line under the title. */
  description?: React.ReactNode;
  /** A Breadcrumb, shown above the title from 640px. */
  breadcrumb?: React.ReactNode;
  /** Back link for a detail page, such as "Back to queue". Shown on every screen size. */
  back?: PageHeaderBack;
  /** Status of the record beside the title, usually a Badge. */
  status?: React.ReactNode;
  /** Global search on the right of the top row, usually a SearchTrigger. Hidden below 640px, where the App Bar carries search. */
  search?: React.ReactNode;
  /** Page actions on the right of the title row. At most one primary Button; put it last. Below 640px the actions go full width under the title. */
  actions?: React.ReactNode;
  /** Element for the back link when it has an href. Pass your router's Link. Defaults to `a`. */
  linkComponent?: React.ElementType;
}

/**
 * The top of every app page: breadcrumb or back link with global search, then the title, status, description
 * and actions. Compacts on small screens: the breadcrumb and search drop out and the actions stack under the title.
 */
export function PageHeader({ title, description, breadcrumb, back, status, search, actions, linkComponent: Link = "a", className, ...props }: PageHeaderProps) {
  const backLabel = back?.label ?? "Back";
  const backButton = back ? (
    back.href ? (
      <Button asChild variant="ghost" size="sm" className="-ml-3 sm:-ml-2">
        <Link href={back.href} onClick={back.onClick}><ArrowLeft aria-hidden />{backLabel}</Link>
      </Button>
    ) : (
      <Button variant="ghost" size="sm" className="-ml-3 sm:-ml-2" leadingIcon={<ArrowLeft aria-hidden />} onClick={back.onClick}>{backLabel}</Button>
    )
  ) : null;
  const hasTop = backButton || breadcrumb || search;

  return (
    <header className={cn("grid gap-3", className)} {...props}>
      {hasTop && (
        <div className="flex min-h-8 items-center gap-3">
          {backButton}
          {backButton && breadcrumb && <span aria-hidden className="h-4 w-px bg-border-default max-sm:hidden" />}
          {breadcrumb && <div className="min-w-0 max-sm:hidden">{breadcrumb}</div>}
          {search && <div className="ml-auto flex-none max-sm:hidden">{search}</div>}
        </div>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="grid min-w-0 flex-1 gap-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="type-h2 text-fg-default max-sm:text-xl">{title}</h1>
            {status}
          </div>
          {description && <p className="type-body-sm text-fg-muted">{description}</p>}
        </div>
        {actions && <div className="flex flex-none items-center gap-2 max-sm:[&>*]:flex-1">{actions}</div>}
      </div>
    </header>
  );
}
