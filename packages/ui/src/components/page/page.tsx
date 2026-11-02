import * as React from "react";
import { cn } from "../../lib/cn";
import { PageHeader, type PageHeaderProps } from "../page-header/page-header";

export interface PageProps extends Pick<PageHeaderProps, "title" | "description" | "status" | "actions" | "back" | "linkComponent">, Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** "full" (default) fills the main column, like the MDM admin. "contained" caps the width at 80rem and centers it, for reading-heavy pages. */
  width?: "full" | "contained";
}

/**
 * The body of every page inside an AppShell: the PageHeader, then the page's sections, with the standard padding and gap.
 * The breadcrumb and global search belong in the AppShell top bar, so Page leaves them out.
 */
export function Page({ title, description, status, actions, back, linkComponent, width = "full", className, children, ...props }: PageProps) {
  return (
    <div className={cn("grid min-w-0 content-start gap-6 p-4 sm:p-6", width === "contained" && "mx-auto w-full max-w-7xl", className)} {...props}>
      <PageHeader title={title} description={description} status={status} actions={actions} back={back} linkComponent={linkComponent} />
      {children}
    </div>
  );
}
