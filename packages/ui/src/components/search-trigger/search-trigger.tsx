import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "../../lib/cn";
import { Kbd } from "../kbd/kbd";

export interface SearchTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Called on click and on the keyboard shortcut. Open Advanced Search here. */
  onOpen?: () => void;
  placeholder?: string;
  /** Listen for ⌘K (Ctrl+K on Windows and Linux) on the whole page. Turn off if another element owns the shortcut. */
  shortcut?: boolean;
  /** "field" looks like a search field with the ⌘K hint. "icon" is a 40px icon button, for small screens. "auto" (default) is icon below 640px. */
  variant?: "field" | "icon" | "auto";
}

const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/**
 * The app-wide search entry in a header: a field-shaped button that shows the ⌘K hint and opens Advanced Search.
 * It never takes typing itself.
 */
export const SearchTrigger = React.forwardRef<HTMLButtonElement, SearchTriggerProps>(function SearchTrigger(
  { onOpen, placeholder = "Search…", shortcut = true, variant = "auto", className, onClick, ...props },
  ref
) {
  const [mac, setMac] = React.useState(true);
  React.useEffect(() => setMac(isMac()), []);
  React.useEffect(() => {
    if (!shortcut || !onOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey) {
        event.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut, onOpen]);

  const keys = mac ? "⌘ K" : "Ctrl K";
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { onClick?.(event); if (!event.defaultPrevented) onOpen?.(); };
  const field = (
    <span className="flex w-full min-w-0 items-center gap-2">
      <Search aria-hidden className="size-4.5 flex-none text-fg-muted" />
      <span className="min-w-0 flex-1 truncate text-left type-body-sm text-fg-muted">{placeholder}</span>
      {shortcut && <Kbd keys={keys} aria-hidden />}
    </span>
  );

  return (
    <button
      ref={ref}
      type="button"
      aria-label={variant === "field" ? undefined : placeholder.replace(/…$/, "")}
      aria-keyshortcuts={shortcut ? (mac ? "Meta+K" : "Control+K") : undefined}
      aria-haspopup="dialog"
      onClick={handleClick}
      className={cn(
        "inline-flex flex-none cursor-pointer items-center rounded-control text-fg-default transition-[border-color,background-color] duration-[var(--duration-fast)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
        variant === "icon" && "size-10 justify-center hover:bg-bg-muted",
        variant !== "icon" && "h-10 w-90 max-w-full border border-border-default bg-bg-surface pr-2 pl-3 [@media(hover:hover)_and_(pointer:fine)]:hover:border-border-strong",
        variant === "auto" && "max-sm:size-10 max-sm:w-10 max-sm:justify-center max-sm:border-0 max-sm:bg-transparent max-sm:p-0 max-sm:hover:bg-bg-muted",
        className
      )}
      {...props}
    >
      {variant === "icon" ? <Search aria-hidden className="size-5" /> : variant === "auto" ? (
        <>
          <span className="flex w-full min-w-0 max-sm:hidden">{field}</span>
          <Search aria-hidden className="size-5 sm:hidden" />
        </>
      ) : field}
    </button>
  );
});
SearchTrigger.displayName = "SearchTrigger";
