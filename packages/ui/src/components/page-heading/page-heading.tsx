import * as React from "react";
import { PageHeader, type PageHeaderProps } from "../page-header/page-header";

export type PageHeadingProps = Omit<PageHeaderProps, "breadcrumb" | "search">;

/**
 * The Figma Page Header for pages inside an AppShell: back link, title, status, description and actions.
 * The breadcrumb and search live in the AppTopBar, so PageHeading leaves them out.
 * `actions` takes one of three patterns: buttons (outline, then one primary), filters (such as stores and a period), or filters then one primary button.
 */
export function PageHeading(props: PageHeadingProps) {
  return <PageHeader {...props} />;
}
