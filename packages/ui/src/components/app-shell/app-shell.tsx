import * as React from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { PanelLeft, PanelRight, X } from "lucide-react";
import { spring } from "@sagui/tokens/motion";
import { cn } from "../../lib/cn";
import { closeButtonClass } from "../../lib/swap-text";
import { Tooltip } from "../tooltip/tooltip";

/* ------------------------------------------------------------------------------------------------
 * Layout modes follow the shell's own width, not the viewport, so a shell inside a docs demo or a
 * split view behaves like a shell of that size.
 *   mobile  (< 768)       sidebar is an off-canvas drawer over a scrim
 *   tablet  (768 – 1023)  sidebar rests as an icon rail and expands over the content
 *   desktop (>= 1024)     sidebar is pinned and collapses to the rail
 * The inspector (aside) docks beside the content from 1280 up and overlays it below that.
 * ---------------------------------------------------------------------------------------------- */

export type AppShellMode = "mobile" | "tablet" | "desktop";

const TABLET = 768;
const DESKTOP = 1024;
const ASIDE_DOCK = 1280;

const modeFor = (width: number): AppShellMode => (width < TABLET ? "mobile" : width < DESKTOP ? "tablet" : "desktop");

interface AppShellContextValue {
  mode: AppShellMode;
  /** Whether the sidebar is showing labels right now (pinned open, expanded over content, or the mobile drawer). */
  expanded: boolean;
  /** The desktop preference: pinned rail instead of full sidebar. */
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  asideOpen: boolean;
  asideDocked: boolean;
  setAsideOpen: (open: boolean) => void;
  toggleAside: () => void;
  sidebarId: string;
  asideId: string;
  mainId: string;
  shortcutLabel: string | null;
}

const AppShellContext = React.createContext<AppShellContextValue | null>(null);

/** Shell state for custom controls: the current mode, sidebar and aside state, and their toggles. */
export function useAppShell() {
  const context = React.useContext(AppShellContext);
  if (!context) throw new Error("useAppShell must be used inside <AppShell>.");
  return context;
}

function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (next: T) => void) {
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;
  const set = React.useCallback((next: T) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  }, [value, onChange]);
  return [current, set] as const;
}

const readStored = (key: string) => {
  try { return window.localStorage.getItem(key); } catch { return null; }
};
const writeStored = (key: string, value: string) => {
  try { window.localStorage.setItem(key, value); } catch { /* storage blocked: the preference lives for this visit only */ }
};

const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export interface AppShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** The navigation panel, usually an AppShellSidebar. */
  sidebar?: React.ReactNode;
  /** The top bar, usually an AppShellHeader. */
  header?: React.ReactNode;
  /** A collapsible inspector on the right, usually an AppShellAside. */
  aside?: React.ReactNode;
  /** Page content. Rendered inside the shell's scrolling main region. */
  children?: React.ReactNode;
  /** Controlled desktop collapse state (rail instead of full sidebar). */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Controlled inspector state. */
  asideOpen?: boolean;
  defaultAsideOpen?: boolean;
  onAsideOpenChange?: (open: boolean) => void;
  /** Remembers the desktop collapse preference in localStorage under this key. */
  storageKey?: string;
  /** Mod+B toggles the sidebar while focus is in this shell. Pass false to turn it off. */
  shortcut?: boolean;
  /** Label for the skip link that jumps past navigation to the main content. */
  skipLinkLabel?: string;
  mainClassName?: string;
}

/**
 * The frame of an application: navigation sidebar, top bar, scrolling main region and an optional
 * inspector. Pages fill the slots; the shell owns layout, responsiveness, and keyboard access.
 */
export function AppShell({
  sidebar,
  header,
  aside,
  children,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  asideOpen: asideOpenProp,
  defaultAsideOpen = false,
  onAsideOpenChange,
  storageKey,
  shortcut = true,
  skipLinkLabel = "Skip to content",
  className,
  mainClassName,
  ...props
}: AppShellProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();
  const sidebarId = `${id}-sidebar`;
  const asideId = `${id}-aside`;
  const mainId = `${id}-main`;

  const [width, setWidth] = React.useState<number | null>(null);
  const [ready, setReady] = React.useState(false);
  const mode = width === null ? "desktop" : modeFor(width);
  const asideDocked = width === null ? true : width >= ASIDE_DOCK;

  const [collapsed, setCollapsedState] = useControllable(collapsedProp, defaultCollapsed, onCollapsedChange);
  const [asideOpen, setAsideOpen] = useControllable(asideOpenProp, defaultAsideOpen, onAsideOpenChange);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tabletOpen, setTabletOpen] = React.useState(false);
  const [shortcutLabel, setShortcutLabel] = React.useState<string | null>(null);

  // Measure before paint so the first frame already has the right mode, then allow transitions.
  React.useLayoutEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    setWidth(node.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  React.useEffect(() => { if (shortcut) setShortcutLabel(isMac() ? "⌘B" : "Ctrl+B"); }, [shortcut]);

  // Restore the stored preference once on the client, uncontrolled only.
  React.useEffect(() => {
    if (!storageKey || collapsedProp !== undefined) return;
    const stored = readStored(storageKey);
    if (stored === "collapsed" || stored === "expanded") setCollapsedState(stored === "collapsed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const setCollapsed = React.useCallback((next: boolean) => {
    setCollapsedState(next);
    if (storageKey) writeStored(storageKey, next ? "collapsed" : "expanded");
  }, [setCollapsedState, storageKey]);

  // Transient states reset when the mode changes, so a drawer left open on mobile does not reappear later.
  React.useEffect(() => { setMobileOpen(false); setTabletOpen(false); }, [mode]);

  const toggleSidebar = React.useCallback(() => {
    if (mode === "mobile") setMobileOpen((open) => !open);
    else if (mode === "tablet") setTabletOpen((open) => !open);
    else setCollapsed(!collapsed);
  }, [mode, collapsed, setCollapsed]);
  const closeSidebar = React.useCallback(() => { setMobileOpen(false); setTabletOpen(false); }, []);
  const toggleAside = React.useCallback(() => setAsideOpen(!asideOpen), [asideOpen, setAsideOpen]);

  const expanded = mode === "mobile" ? true : mode === "tablet" ? tabletOpen : !collapsed;
  const overlayOpen = (mode === "mobile" && mobileOpen) || (mode === "tablet" && tabletOpen);

  // Focus moves into the mobile drawer and returns to whatever opened it.
  const returnFocus = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (mode !== "mobile") return;
    const panel = document.getElementById(sidebarId);
    if (mobileOpen) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      panel?.querySelector<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])")?.focus();
    } else if (returnFocus.current) {
      returnFocus.current.focus();
      returnFocus.current = null;
    }
  }, [mobileOpen, mode, sidebarId]);

  // Mod+B: only the shell that holds focus responds, or the first shell on the page when nothing is focused.
  React.useEffect(() => {
    if (!shortcut) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "b" || !(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
      const root = rootRef.current;
      const active = document.activeElement;
      const owns = root?.contains(active) || ((!active || active === document.body) && document.querySelector("[data-sg-app-shell]") === root);
      if (!owns) return;
      event.preventDefault();
      toggleSidebar();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut, toggleSidebar]);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    props.onKeyDown?.(event);
    if (event.key !== "Escape" || event.defaultPrevented) return;
    if (overlayOpen) { event.preventDefault(); closeSidebar(); }
    else if (asideOpen && !asideDocked) { event.preventDefault(); setAsideOpen(false); }
  }

  const value = React.useMemo<AppShellContextValue>(() => ({
    mode, expanded, collapsed, setCollapsed, mobileOpen, toggleSidebar, closeSidebar,
    asideOpen, asideDocked, setAsideOpen, toggleAside, sidebarId, asideId, mainId, shortcutLabel,
  }), [mode, expanded, collapsed, setCollapsed, mobileOpen, toggleSidebar, closeSidebar, asideOpen, asideDocked, setAsideOpen, toggleAside, sidebarId, asideId, mainId, shortcutLabel]);

  return (
    <AppShellContext.Provider value={value}>
      <LayoutGroup id={id}>
        <div
          {...props}
          ref={rootRef}
          data-sg-app-shell=""
          data-mode={mode}
          data-sidebar={expanded ? "expanded" : "collapsed"}
          data-ready={ready || undefined}
          onKeyDown={onKeyDown}
          style={{ ...props.style, ["--sg-shell-w" as string]: width === null ? "100vw" : `${width}px` }}
          className={cn("group/shell relative isolate flex h-dvh w-full overflow-hidden bg-background text-foreground", className)}
        >
          <a
            href={`#${mainId}`}
            className="absolute top-2 left-2 z-60 -translate-y-16 rounded-[var(--radius-control)] bg-foreground px-3 py-2 text-sm font-medium text-background shadow-raised focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:transition-transform"
          >
            {skipLinkLabel}
          </a>
          {sidebar}
          {/* The scrim sits under the drawer and over the content; only the mobile drawer is modal. */}
          {mode === "mobile" ? (
            <div
              aria-hidden="true"
              onClick={closeSidebar}
              className={cn(
                "absolute inset-0 z-30 bg-[oklch(10%_0_0/.32)] backdrop-blur-[2px] [transition:opacity_var(--duration-standard)_var(--ease-out-quint)] motion-reduce:transition-none",
                mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            />
          ) : null}
          <div
            className="flex min-w-0 flex-1 flex-col"
            inert={mode === "mobile" && mobileOpen ? true : undefined}
            // The expanded rail floats over content; pressing anywhere outside it puts it away.
            onPointerDown={mode === "tablet" && tabletOpen ? () => setTabletOpen(false) : undefined}
          >
            {header}
            <div className="relative flex min-h-0 flex-1">
              <main id={mainId} tabIndex={-1} className={cn("min-w-0 flex-1 overflow-auto overscroll-contain focus:outline-none [scrollbar-width:thin]", mainClassName)}>
                {children}
              </main>
              {aside}
            </div>
          </div>
        </div>
      </LayoutGroup>
    </AppShellContext.Provider>
  );
}

/* ---------------------------------------------------------------------------------------------- */

const transition = "group-data-[ready]/shell:[transition:width_var(--duration-standard)_var(--ease-out-quint),transform_var(--duration-standard)_var(--ease-out-quint),box-shadow_var(--duration-standard)_var(--ease-out-quint)] motion-reduce:!transition-none";

export interface AppShellSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Accessible name for the navigation landmark. */
  label?: string;
}

/** The navigation panel. Pinned on desktop, an icon rail on tablet, an off-canvas drawer on mobile. */
export function AppShellSidebar({ label = "Main", className, children, ...props }: AppShellSidebarProps) {
  const shell = useAppShell();
  const { mode, expanded, mobileOpen } = shell;
  const fullWidth = "var(--sg-shell-sidebar-w)";
  const railWidth = "var(--sg-shell-sidebar-w-collapsed)";
  // The spacer reserves layout space; the panel inside it can be wider and float over content on tablet.
  const spacer = mode === "mobile" ? "0px" : mode === "tablet" ? railWidth : expanded ? fullWidth : railWidth;
  const panelWidth = mode === "mobile" ? "min(var(--sg-shell-mobile-sidebar-w), calc(var(--sg-shell-w) - 3rem))" : expanded ? fullWidth : railWidth;
  const floating = (mode === "tablet" && expanded) || mode === "mobile";

  return (
    <div className={cn("relative h-full flex-none", transition)} style={{ width: spacer }}>
      <nav
        {...props}
        id={shell.sidebarId}
        aria-label={label}
        data-sidebar={expanded ? "expanded" : "collapsed"}
        inert={mode === "mobile" && !mobileOpen ? true : undefined}
        style={{ width: panelWidth, ...props.style }}
        className={cn(
          "group/sidebar absolute inset-y-0 left-0 flex flex-col overflow-hidden border-r border-border bg-background",
          transition,
          floating ? "z-40 bg-surface shadow-floating" : "z-20 shadow-none",
          mode === "mobile" && !mobileOpen && "-translate-x-full shadow-none",
          mode === "mobile" && "rounded-r-[var(--radius-overlay)] border-y-0",
          className
        )}
      >
        {children}
      </nav>
    </div>
  );
}

/** The top of the sidebar, aligned with the header height. Holds the brand or workspace switcher. */
export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("flex h-[var(--sg-shell-header-h)] flex-none items-center gap-2 border-b border-border px-3", className)} />;
}

/** The scrolling middle of the sidebar for navigation groups. */
export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("flex min-h-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto px-2 py-3 [scrollbar-width:thin]", className)} />;
}

/** The bottom of the sidebar, for settings, help or the signed-in user. */
export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("flex flex-none flex-col gap-0.5 border-t border-border p-2", className)} />;
}

const fadeLabel = "min-w-0 truncate whitespace-nowrap [transition:opacity_var(--duration-quick)_var(--ease-out-quint)] group-data-[sidebar=collapsed]/sidebar:opacity-0 motion-reduce:transition-none";

export interface SidebarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A square mark that stays visible in the rail. */
  logo: React.ReactNode;
  name: string;
  /** A second line, such as the plan or workspace. */
  description?: string;
}

/** Product or workspace identity: a mark that stays in the rail and a name that fades with the labels. */
export function SidebarBrand({ logo, name, description, className, ...props }: SidebarBrandProps) {
  return (
    <div {...props} className={cn("flex min-w-0 flex-1 items-center gap-2.5 pl-1", className)}>
      <span className="grid size-7 flex-none place-items-center overflow-hidden rounded-[var(--radius-sm)]">{logo}</span>
      <span className={cn("grid leading-tight", fadeLabel)}>
        <span className="truncate text-sm font-semibold">{name}</span>
        {description ? <span className="truncate text-xs text-muted-foreground">{description}</span> : null}
      </span>
    </div>
  );
}

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section heading. In the rail it becomes a hairline divider. */
  label?: string;
}

/** A labelled set of navigation items. */
export function SidebarGroup({ label, className, children, ...props }: SidebarGroupProps) {
  const id = React.useId();
  return (
    <div {...props} role="group" aria-labelledby={label ? id : undefined} className={cn("flex flex-col gap-0.5", className)}>
      {label ? (
        <div className="relative flex h-7 items-center px-2.5">
          <span id={id} className={cn("text-xs font-medium text-muted-foreground", fadeLabel)}>{label}</span>
          <span aria-hidden="true" className="absolute inset-x-3 top-1/2 h-px bg-border opacity-0 [transition:opacity_var(--duration-quick)_var(--ease-out-quint)] group-data-[sidebar=collapsed]/sidebar:opacity-100" />
        </div>
      ) : null}
      {children}
    </div>
  );
}

export interface SidebarItemProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  icon: React.ReactNode;
  label: string;
  /** Marks the current page: sets aria-current and moves the shared highlight here. */
  active?: boolean;
  /** A count or short status shown at the end; a dot in the rail. */
  badge?: React.ReactNode;
  /** Render your own link (for example Next.js Link) and let the item fill it. */
  asChild?: boolean;
  children?: React.ReactElement;
  /** Renders a button instead of a link when there is no href. */
  disabled?: boolean;
}

/** A navigation link with an icon. In the rail the label becomes a tooltip; the active highlight slides between items. */
export function SidebarItem({ icon, label, active = false, badge, asChild = false, children, className, onClick, href, disabled, ...props }: SidebarItemProps) {
  const shell = useAppShell();
  const reduced = useReducedMotion();
  const rail = !shell.expanded;

  const content = (
    <>
      {active ? (
        <motion.span
          layoutId="sg-sidebar-active"
          aria-hidden="true"
          className="absolute inset-0 -z-1 rounded-[var(--radius-sm)] bg-muted shadow-resting"
          transition={reduced ? { duration: 0 } : (spring.smooth as never)}
        />
      ) : null}
      <span aria-hidden="true" className={cn("grid size-5 flex-none place-items-center [&_svg]:size-[18px] [&_svg]:stroke-[1.75]", active ? "text-foreground" : "text-muted-foreground group-hover/item:text-foreground")}>{icon}</span>
      <span className={cn("flex-1 text-left", fadeLabel)}>{label}</span>
      {badge !== undefined && badge !== null ? (
        <>
          <span className={cn("ml-auto rounded-[var(--radius-pill)] bg-muted px-1.5 text-xs font-medium tabular-nums text-muted-foreground", fadeLabel, active && "bg-surface")}>{badge}</span>
          <span aria-hidden="true" className="absolute top-1.5 left-[26px] size-1.5 rounded-full bg-primary opacity-0 ring-2 ring-background [transition:opacity_var(--duration-quick)_var(--ease-out-quint)] group-data-[sidebar=collapsed]/sidebar:opacity-100" />
        </>
      ) : null}
    </>
  );

  const itemClass = cn(
    "group/item relative isolate flex h-9 w-full cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-2.5 text-sm font-medium text-muted-foreground no-underline outline-none select-none",
    "[transition:color_var(--duration-quick)_var(--ease-out-quint),background-color_var(--duration-quick)_var(--ease-out-quint)]",
    "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-muted/60 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
    "focus-visible:ring-2 focus-visible:ring-ring",
    "aria-[current=page]:text-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    className
  );

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement & HTMLButtonElement>) => {
    onClick?.(event as React.MouseEvent<HTMLAnchorElement>);
    // Choosing a destination closes the floating sidebar; the pinned one stays.
    if (!event.defaultPrevented && shell.mode !== "desktop") shell.closeSidebar();
  };

  const shared = {
    "aria-current": active ? ("page" as const) : undefined,
    "data-active": active || undefined,
    className: itemClass,
    onClick: handleClick,
  };

  let element: React.ReactElement;
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<Record<string, unknown>>;
    element = React.cloneElement(child, { ...props, ...shared, className: cn(itemClass, child.props.className as string | undefined) }, content);
  } else if (href !== undefined) {
    element = <a {...props} {...shared} href={disabled ? undefined : href} aria-disabled={disabled || undefined}>{content}</a>;
  } else {
    element = <button {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} {...shared} type="button" disabled={disabled}>{content}</button>;
  }

  return rail ? <Tooltip content={label} side="right">{element}</Tooltip> : element;
}

/* ---------------------------------------------------------------------------------------------- */

const iconButton = cn(closeButtonClass, "border-transparent bg-transparent");

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

/** Collapses or expands the sidebar on desktop, expands the rail on tablet, and opens the drawer on mobile. */
export function SidebarTrigger({ label = "Toggle sidebar", className, onClick, children, ...props }: SidebarTriggerProps) {
  const shell = useAppShell();
  const open = shell.mode === "mobile" ? shell.mobileOpen : shell.expanded;
  const button = (
    <button
      {...props}
      type="button"
      aria-label={label}
      aria-controls={shell.sidebarId}
      aria-expanded={open}
      onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) shell.toggleSidebar(); }}
      className={cn(iconButton, className)}
    >
      {children ?? <PanelLeft size={18} strokeWidth={1.75} aria-hidden="true" />}
    </button>
  );
  return <Tooltip content={shell.shortcutLabel ? `${label} · ${shell.shortcutLabel}` : label} side="bottom">{button}</Tooltip>;
}

export interface AppShellHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Shows the sidebar toggle at the start of the header. On by default. */
  sidebarTrigger?: boolean;
}

/** The top bar. Holds the sidebar toggle, breadcrumbs or title, global search, and account actions. */
export function AppShellHeader({ sidebarTrigger = true, className, children, ...props }: AppShellHeaderProps) {
  return (
    <header
      {...props}
      className={cn(
        "relative z-10 flex h-[var(--sg-shell-header-h)] flex-none items-center gap-2 border-b border-border bg-background/85 px-3 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-background sm:px-4",
        className
      )}
    >
      {sidebarTrigger ? <SidebarTrigger className="-ml-1" /> : null}
      {children}
    </header>
  );
}

export interface AppShellPageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Primary and secondary page actions, aligned to the end. */
  actions?: React.ReactNode;
  /** Breadcrumbs or a back link above the title. */
  breadcrumb?: React.ReactNode;
  /** Keeps the page header pinned while the page scrolls. */
  sticky?: boolean;
}

/** Title, description and actions for the current page, at the top of the main region. */
export function AppShellPageHeader({ title, description, actions, breadcrumb, sticky = false, className, ...props }: AppShellPageHeaderProps) {
  return (
    <div {...props} className={cn("flex flex-col gap-3 px-4 pt-6 pb-4 sm:px-8 sm:pt-8", sticky && "sticky top-0 z-5 border-b border-border bg-background/90 pb-4 backdrop-blur-md", className)}>
      {breadcrumb}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="grid min-w-0 gap-1">
          <h1 className="m-0 text-2xl font-semibold">{title}</h1>
          {description ? <p className="m-0 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-none flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------- */

export interface AppShellAsideProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: string;
  description?: string;
  /** Accessible name for the landmark; defaults to the title. */
  label?: string;
}

/** A right-hand inspector for details, comments, filters or an assistant. Docks beside the content on wide shells and floats over it on narrow ones. */
export function AppShellAside({ title, description, label, className, children, ...props }: AppShellAsideProps) {
  const shell = useAppShell();
  const { asideOpen: open, asideDocked: docked } = shell;
  const width = "var(--sg-shell-aside-w)";
  return (
    <div className={cn("h-full flex-none", docked ? "relative" : "absolute inset-y-0 right-0 z-30 pointer-events-none", transition)} style={{ width: docked ? (open ? width : "0px") : width }}>
      <aside
        {...props}
        id={shell.asideId}
        aria-label={label ?? title}
        inert={!open ? true : undefined}
        style={{ width: docked ? width : `min(${width}, calc(var(--sg-shell-w) - 1rem))`, ...props.style }}
        className={cn(
          "absolute inset-y-0 right-0 flex flex-col overflow-hidden border-l border-border bg-surface",
          transition,
          !docked && "pointer-events-auto rounded-l-[var(--radius-overlay)] border-y-0 shadow-floating",
          !open && "translate-x-full shadow-none",
          className
        )}
      >
        <div className="flex flex-none items-start justify-between gap-4 border-b border-border px-4 py-3.5">
          <div className="grid min-w-0 gap-0.5">
            <h2 className="m-0 truncate text-sm font-semibold">{title}</h2>
            {description ? <p className="m-0 text-xs text-muted-foreground">{description}</p> : null}
          </div>
          <button type="button" className={cn(closeButtonClass, "size-7 -my-0.5")} aria-label={`Close ${title}`} onClick={() => shell.setAsideOpen(false)}>
            <X size={14} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-4 text-sm [scrollbar-width:thin]">{children}</div>
      </aside>
    </div>
  );
}

export interface AsideTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

/** Opens and closes the inspector. */
export function AsideTrigger({ label = "Toggle details panel", className, onClick, children, ...props }: AsideTriggerProps) {
  const shell = useAppShell();
  return (
    <Tooltip content={label} side="bottom">
      <button
        {...props}
        type="button"
        aria-label={label}
        aria-controls={shell.asideId}
        aria-expanded={shell.asideOpen}
        onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) shell.toggleAside(); }}
        className={cn(iconButton, shell.asideOpen && "bg-muted text-foreground", className)}
      >
        {children ?? <PanelRight size={18} strokeWidth={1.75} aria-hidden="true" />}
      </button>
    </Tooltip>
  );
}
