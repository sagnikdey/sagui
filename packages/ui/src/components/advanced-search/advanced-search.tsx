import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, Search } from "lucide-react";
import { cn } from "../../lib/cn";
import { Badge, type BadgeTone } from "../badge/badge";
import { Kbd } from "../kbd/kbd";
import type { CommandItem } from "../command-palette/command-palette";

export interface AdvancedSearchResult {
  id: string;
  title: string;
  /** One line under the title: type, key fields. */
  meta?: string;
  /** Results are grouped by this label, in the order they first appear ("Vendors", "Products"). */
  group: string;
  icon?: React.ReactNode;
  /** Status shown at the end of the row. */
  badge?: { label: string; tone?: BadgeTone };
  href?: string;
}

export interface AdvancedSearchScope {
  id: string;
  label: string;
  /** Matches in this scope for the current query. */
  count?: number;
}

export interface AdvancedSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Controlled query. Leave unset to let the component hold it. */
  query?: string;
  onQueryChange?: (query: string) => void;
  /** Results for the current query and scope. Filtering and ranking are yours, so server search works the same as local search. */
  results: AdvancedSearchResult[];
  /** Shown before anything is typed: recent searches, saved searches, pages to jump to. Grouped by `group`. */
  recent?: AdvancedSearchResult[];
  /** Commands listed when the query starts with ">". Filtered here by label, description and keywords. */
  commands?: CommandItem[];
  scopes?: AdvancedSearchScope[];
  scope?: string;
  onScopeChange?: (scope: string) => void;
  /** Filter controls under the scopes, usually small Buttons that open menus. Use the secondary variant for active filters. */
  filters?: React.ReactNode;
  /** Content of the preview pane for the highlighted result. The pane shows from 768px. */
  renderPreview?: (result: AdvancedSearchResult) => React.ReactNode;
  /** A result was chosen. `newTab` is true for ⌘↵ / Ctrl+↵. */
  onSelect?: (result: AdvancedSearchResult, options: { newTab: boolean }) => void;
  onCommand?: (command: CommandItem) => void;
  /** Action in the no-results state, such as a "Clear filters" Button. */
  emptyAction?: React.ReactNode;
  placeholder?: string;
  /** Right side of the footer, such as "Searching Texas Operations". */
  context?: React.ReactNode;
  /** Accessible name of the dialog. */
  label?: string;
}

type Row = { kind: "result"; result: AdvancedSearchResult } | { kind: "command"; command: CommandItem };

const groupBy = <T,>(items: T[], key: (item: T) => string) => {
  const map = new Map<string, T[]>();
  for (const item of items) { const k = key(item); map.set(k, [...(map.get(k) ?? []), item]); }
  return [...map.entries()];
};

const overlay = [
  "fixed inset-0 z-50 bg-bg-scrim backdrop-blur-[4px]",
  "[transition:opacity_var(--duration-base)_var(--ease-out-quint)] starting:data-[state=open]:opacity-0",
  "data-[state=closed]:opacity-0 data-[state=closed]:animate-[sg-exit_160ms_linear_both]",
].join(" ");

const panel = [
  "fixed z-51 flex flex-col overflow-hidden bg-bg-surface text-fg-default outline-none",
  // Small screens: full screen. From 640px: an 880px overlay near the top.
  "inset-0 sm:inset-auto sm:top-24 sm:left-1/2 sm:w-[min(55rem,calc(100vw-2rem))] sm:-translate-x-1/2 sm:rounded-overlay sm:border sm:border-border-default sm:shadow-overlay",
  "sm:max-h-[calc(100dvh-8rem)]",
  "[transition:opacity_var(--duration-fast)_var(--ease-enter),transform_var(--duration-spring)_var(--ease-spring)]",
  "starting:data-[state=open]:opacity-0 sm:starting:data-[state=open]:[transform:translate(-50%,-6px)_scale(.98)]",
  "data-[state=closed]:opacity-0 data-[state=closed]:animate-[sg-exit_130ms_linear_both]",
  "motion-reduce:!transform-none sm:motion-reduce:![transform:translateX(-50%)]",
].join(" ");

/**
 * App-wide search and commands in one place, opened with ⌘K from a SearchTrigger. Before typing it offers recent
 * and saved searches; typing searches every record type, grouped by type, with scopes and filters to narrow it and
 * a preview of the highlighted result. A query that starts with ">" lists commands instead. Full screen below 640px.
 */
export function AdvancedSearch({
  open,
  onOpenChange,
  query: queryProp,
  onQueryChange,
  results,
  recent = [],
  commands = [],
  scopes,
  scope,
  onScopeChange,
  filters,
  renderPreview,
  onSelect,
  onCommand,
  emptyAction,
  placeholder = "Search, or type > for commands",
  context,
  label = "Search",
}: AdvancedSearchProps) {
  const [innerQuery, setInnerQuery] = React.useState("");
  const query = queryProp ?? innerQuery;
  const setQuery = (next: string) => { if (queryProp === undefined) setInnerQuery(next); onQueryChange?.(next); };
  const listId = React.useId();
  const [active, setActive] = React.useState(0);

  const commandMode = query.trimStart().startsWith(">");
  const commandQuery = commandMode ? query.trimStart().slice(1).trim().toLowerCase() : "";
  const showingRecent = !commandMode && query.trim() === "" && recent.length > 0;

  const rows: Row[] = React.useMemo(() => {
    if (commandMode) {
      return commands
        .filter((c) => !commandQuery || [c.label, c.description, ...(c.keywords ?? [])].filter(Boolean).join(" ").toLowerCase().includes(commandQuery))
        .map((command) => ({ kind: "command" as const, command }));
    }
    const source = showingRecent ? recent : results;
    // Grouped order, so arrow keys move through rows in the order they appear.
    return groupBy(source, (r) => r.group).flatMap(([, items]) => items).map((result) => ({ kind: "result" as const, result }));
  }, [commandMode, commandQuery, commands, showingRecent, recent, results]);

  React.useEffect(() => setActive(0), [query, scope, results]);
  const activeRow = rows[Math.min(active, rows.length - 1)];
  const optionId = (index: number) => `${listId}-option-${index}`;

  const choose = (row: Row | undefined, newTab = false) => {
    if (!row) return;
    if (row.kind === "command") onCommand?.(row.command);
    else onSelect?.(row.result, { newTab });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") { event.preventDefault(); setActive((i) => (rows.length ? (i + 1) % rows.length : 0)); }
    else if (event.key === "ArrowUp") { event.preventDefault(); setActive((i) => (rows.length ? (i - 1 + rows.length) % rows.length : 0)); }
    else if (event.key === "Home") { event.preventDefault(); setActive(0); }
    else if (event.key === "End") { event.preventDefault(); setActive(Math.max(rows.length - 1, 0)); }
    else if (event.key === "Enter") { event.preventDefault(); choose(activeRow, event.metaKey || event.ctrlKey); }
  };

  React.useEffect(() => {
    document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  let index = -1;
  const grouped = commandMode
    ? [["Commands", rows] as const]
    : groupBy(rows, (row) => (row as { result: AdvancedSearchResult }).result.group);
  const preview = !commandMode && !showingRecent && activeRow?.kind === "result" && renderPreview ? renderPreview(activeRow.result) : null;
  const empty = rows.length === 0;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={overlay} />
        <DialogPrimitive.Content className={panel} aria-label={label} aria-describedby={undefined}>
          <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>

          <div className="flex flex-none items-center gap-3 border-b border-border-subtle py-3.5 pr-4 pl-4 sm:pl-5">
            <Search aria-hidden className={cn("size-5 flex-none", query ? "text-fg-default" : "text-fg-muted")} />
            <input
              autoFocus
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={activeRow ? optionId(Math.min(active, rows.length - 1)) : undefined}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              className="min-w-0 flex-1 border-0 bg-transparent p-0 type-body text-fg-default outline-none placeholder:text-fg-muted"
            />
            <DialogPrimitive.Close className="hidden cursor-pointer sm:inline-flex" aria-label="Close search">
              <Kbd keys="Esc" />
            </DialogPrimitive.Close>
            <DialogPrimitive.Close className="cursor-pointer type-label text-accent-default sm:hidden">Cancel</DialogPrimitive.Close>
          </div>

          {!commandMode && (scopes?.length || filters) && (
            <div className="grid flex-none gap-2 border-b border-border-subtle px-4 pt-3 pb-3">
              {scopes?.length ? (
                <div role="group" aria-label="Scope" className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none]">
                  {scopes.map((s) => {
                    const selected = s.id === scope;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onScopeChange?.(s.id)}
                        className={cn(
                          "inline-flex h-8 flex-none cursor-pointer items-center gap-1.5 rounded-pill border px-3.5 type-label transition-colors duration-[var(--duration-fast)]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                          selected ? "border-accent-border bg-accent-subtle text-accent-default" : "border-border-default bg-bg-surface text-fg-default hover:bg-bg-muted"
                        )}
                      >
                        {s.label}
                        {s.count != null && <span className={cn("tabular-nums", selected ? "text-accent-default" : "text-fg-muted")}>{s.count}</span>}
                      </button>
                    );
                  })}
                </div>
              ) : null}
              {filters && (
                <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none]">
                  <span className="flex-none type-caption text-fg-muted">Filters</span>
                  {filters}
                </div>
              )}
            </div>
          )}

          <div className="flex min-h-0 flex-1 sm:h-[30rem] sm:flex-none">
            <div id={listId} role="listbox" aria-label={commandMode ? "Commands" : showingRecent ? "Suggestions" : "Results"} className="min-h-0 flex-1 overflow-y-auto p-2">
              {empty ? (
                <div className="grid h-full place-content-center justify-items-center gap-2 p-8 text-center">
                  <span className="grid size-12 place-items-center rounded-control bg-bg-muted text-fg-muted"><Search aria-hidden className="size-5" /></span>
                  <p className="type-title text-fg-default">{commandMode ? "No matching commands" : `No results for “${query.trim()}”`}</p>
                  <p className="type-body-sm text-fg-muted">Check the spelling, try fewer words, or clear the filters.</p>
                  {emptyAction && <div className="mt-2">{emptyAction}</div>}
                </div>
              ) : (
                grouped.map(([group, groupRows]) => (
                  <div key={group} role="group" aria-label={group} className="mb-1.5 last:mb-0">
                    <p className="px-2 pt-2 pb-1 type-caption text-fg-muted" aria-hidden>
                      {group}{!commandMode && !showingRecent ? ` · ${groupRows.length}` : ""}
                    </p>
                    {groupRows.map((row) => {
                      index += 1;
                      const i = index;
                      const isActive = i === Math.min(active, rows.length - 1);
                      const onPointer = () => setActive(i);
                      if (row.kind === "command") {
                        const c = row.command;
                        return (
                          <div key={c.id} id={optionId(i)} role="option" aria-selected={isActive} onPointerMove={onPointer} onClick={() => choose(row)}
                            className={cn("flex min-h-9 cursor-pointer items-center gap-2.5 rounded-control-sm px-2", isActive && "bg-bg-muted")}>
                            {c.icon && <span aria-hidden className="flex size-4 flex-none text-fg-subtle [&_svg]:size-4">{c.icon}</span>}
                            <span className="truncate type-label text-fg-default">{c.label}</span>
                            {c.description && <span className="truncate type-caption text-fg-muted max-sm:hidden">{c.description}</span>}
                            <span className="ml-auto flex flex-none items-center gap-2">
                              {c.shortcut && <Kbd keys={c.shortcut} variant="plain" />}
                              {isActive && <ArrowRight aria-hidden className="size-4 text-fg-muted" />}
                            </span>
                          </div>
                        );
                      }
                      const r = row.result;
                      return (
                        <div key={r.id} id={optionId(i)} role="option" aria-selected={isActive} onPointerMove={onPointer} onClick={(e) => choose(row, e.metaKey || e.ctrlKey)}
                          className={cn("flex min-h-12 cursor-pointer items-center gap-3 rounded-control-sm py-2 pr-3 pl-2", isActive && "bg-bg-muted")}>
                          <span aria-hidden className={cn("grid size-8 flex-none place-items-center rounded-control-sm border border-border-subtle text-fg-subtle [&_svg]:size-4", isActive ? "bg-bg-surface" : "bg-bg-muted")}>
                            {r.icon ?? <Search />}
                          </span>
                          <span className="grid min-w-0 flex-1">
                            <span className="truncate type-label text-fg-default">{r.title}</span>
                            {r.meta && <span className="truncate type-caption text-fg-muted">{r.meta}</span>}
                          </span>
                          {r.badge && <Badge size="sm" tone={r.badge.tone ?? "neutral"} className="flex-none">{r.badge.label}</Badge>}
                          {isActive && <ArrowRight aria-hidden className="size-4 flex-none text-fg-muted max-sm:hidden" />}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
            {preview && (
              <aside aria-label="Preview" className="hidden w-80 flex-none overflow-y-auto border-l border-border-subtle p-5 md:block">
                {preview}
              </aside>
            )}
          </div>

          <div className="hidden flex-none items-center gap-4 border-t border-border-subtle bg-bg-muted px-4 py-2.5 sm:flex">
            {[["↑ ↓", "Navigate"], ["↵", "Open"], ["⌘ ↵", "Open in new tab"], [">", "Commands"]].map(([keys, text]) => (
              <span key={text} className="flex items-center gap-1.5 type-caption text-fg-muted"><Kbd keys={keys} />{text}</span>
            ))}
            {context && <span className="ml-auto truncate type-caption text-fg-muted">{context}</span>}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
