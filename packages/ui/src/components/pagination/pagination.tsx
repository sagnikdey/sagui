import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "../button/button";

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Current page, starting at 1. */
  page: number;
  /** Total number of pages. Pagination renders nothing when there is only one page. */
  pageCount: number;
  onPageChange?: (page: number) => void;
  /** Builds a link for each page, so pages are real links that work without JavaScript. */
  getPageHref?: (page: number) => string;
  /** Element for page links when `getPageHref` is set. Pass your router's Link. Defaults to `a`. */
  linkComponent?: React.ElementType;
  /** Pages shown on each side of the current one in the full layout. */
  siblingCount?: number;
  /** Visible range on the left, such as "Showing 21–30 of 248". */
  summary?: React.ReactNode;
  /**
   * "full" shows Previous, page numbers and Next. "compact" shows arrows around "Page 3 of 25".
   * "auto" (default) uses full from 640px and compact below.
   */
  layout?: "full" | "compact" | "auto";
}

type Slot = number | "gap-start" | "gap-end";

/** First and last always show, with `siblings` pages around the current one and a gap marker for each skip. The row keeps a constant length so the controls don't jump. */
export function pageRange(page: number, pageCount: number, siblings = 1): Slot[] {
  const total = siblings * 2 + 5;
  const span = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
  if (pageCount <= total) return span(1, pageCount);
  const leftGap = page - siblings > 3;
  const rightGap = page + siblings < pageCount - 2;
  if (!leftGap) return [...span(1, total - 2), "gap-end", pageCount];
  if (!rightGap) return [1, "gap-start", ...span(pageCount - (total - 3), pageCount)];
  return [1, "gap-start", ...span(page - siblings, page + siblings), "gap-end", pageCount];
}

const pageClass = (current: boolean) =>
  cn(
    "inline-flex h-8 min-w-8 items-center justify-center rounded-control px-2 type-label tabular-nums transition-colors duration-[var(--duration-fast)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas",
    current ? "bg-accent-default text-fg-on-accent" : "cursor-pointer text-fg-subtle [@media(hover:hover)_and_(pointer:fine)]:hover:bg-bg-muted [@media(hover:hover)_and_(pointer:fine)]:hover:text-fg-default"
  );

/** Moves through pages of a long table or list. Sits directly under what it controls. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  getPageHref,
  linkComponent: Link = "a",
  siblingCount = 1,
  summary,
  layout = "auto",
  className,
  "aria-label": ariaLabel = "Pagination",
  ...props
}: PaginationProps) {
  if (pageCount <= 1) return null;
  const go = (target: number) => (event: React.MouseEvent) => {
    if (!getPageHref) event.preventDefault();
    if (target >= 1 && target <= pageCount && target !== page) onPageChange?.(target);
  };
  const isFirst = page <= 1;
  const isLast = page >= pageCount;

  const pageItem = (p: number) => {
    const current = p === page;
    const common = { "aria-current": current ? ("page" as const) : undefined, "aria-label": `Page ${p}`, className: pageClass(current) };
    if (getPageHref && !current) return <Link href={getPageHref(p)} onClick={go(p)} {...common}>{p}</Link>;
    return <button type="button" onClick={go(p)} {...common}>{p}</button>;
  };

  const stepButton = (direction: "previous" | "next", compact: boolean) => {
    const target = direction === "previous" ? page - 1 : page + 1;
    const disabled = direction === "previous" ? isFirst : isLast;
    const label = direction === "previous" ? "Previous" : "Next";
    const Icon = direction === "previous" ? ChevronLeft : ChevronRight;
    if (compact) {
      return (
        <Button variant="ghost" size="icon" aria-label={`${label} page`} disabled={disabled} onClick={go(target)}>
          <Icon aria-hidden />
        </Button>
      );
    }
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={go(target)}
        leadingIcon={direction === "previous" ? <Icon aria-hidden /> : undefined}
        trailingIcon={direction === "next" ? <Icon aria-hidden /> : undefined}
      >
        {label}
      </Button>
    );
  };

  const full = (
    <ol className="flex items-center gap-1">
      <li>{stepButton("previous", false)}</li>
      {pageRange(page, pageCount, siblingCount).map((slot) => (
        <li key={slot}>
          {typeof slot === "number" ? pageItem(slot) : <span aria-hidden className="inline-flex h-8 min-w-8 items-center justify-center type-label text-fg-muted">…</span>}
        </li>
      ))}
      <li>{stepButton("next", false)}</li>
    </ol>
  );
  const compact = (
    <div className="flex items-center gap-1">
      {stepButton("previous", true)}
      <span className="type-label tabular-nums text-fg-default" aria-live="polite">Page {page} of {pageCount}</span>
      {stepButton("next", true)}
    </div>
  );

  return (
    <nav aria-label={ariaLabel} className={cn("flex w-full items-center gap-4", className)} {...props}>
      {summary && <p className="min-w-0 flex-1 truncate type-body-sm text-fg-muted">{summary}</p>}
      <div className={cn("flex", !summary && "flex-1 justify-end")}>
        {layout === "full" && full}
        {layout === "compact" && compact}
        {layout === "auto" && (
          <>
            <div className="max-sm:hidden">{full}</div>
            <div className="sm:hidden">{compact}</div>
          </>
        )}
      </div>
    </nav>
  );
}
