# @sagui/ui

## 0.2.0

### Minor Changes

- 8127feb: Add `variant="inset"` to AppShell: the sidebar floats as a rounded panel, the top bar drops its border, and the fold toggle moves into the top bar. Fix dark-theme styles in BarChart and UserMenu that used CSS Modules `:global()` in plain stylesheets, so browsers dropped them.
- 64ce9aa: Add AppShell, an original app frame: a sticky sidebar that folds into an icon rail (Cmd/Ctrl + B) and becomes a drawer below 1024px, with a top bar for the title and actions. Add UserMenu, CommandPalette, NotificationCenter and Skeleton, ported from Arc's free components (uiarc.dev).
- f9c16be: Add ApprovalCard: human-in-the-loop questions an agent asks before it acts.
- 4d846f7: Add the button family: ActionButton, SplitButton, ButtonGroup, FloatingButtonGroup, ExpandingButtonGroup, CopyButton and ConfirmMorph, plus a Tooltip. Tokens gain spring and ease presets, success and border-strong colors, and resting, raised and floating shadows. Ported from the open source Arc library (uiarc.dev).
- 4d846f7: Add Card (with an optional quick look that grows out of the card), MetricCard, AnimatedCounter and EmptyState. Ported from the open source Arc library (uiarc.dev).
- bf894e3: Add charts (line, bar, donut, sparkline, gauge, streamgraph, brush, waffle, slope, activity heatmap, ridgeline, treemap), SortableDataTable, Timeline and text effects (TextReveal, InViewTitle, TextMorph, TextShimmer), ported from Arc (uiarc.dev). They are styled by prefixed stylesheets (`sg-<component>-*`) bundled into `@sagui/ui/styles.css`.

  Tokens: a four colour chart palette (`--color-chart-1` to `--color-chart-4`), and `--duration-instant` / `--duration-considered`, which several components already referenced, so their transitions now run instead of snapping.

  `motion` is now ^12.

- f50f67f: SortableDataTable: add `resizableColumns` with drag and keyboard resize handles, per-column `resizable` and `minWidth`, and `onColumnResize`.
- d8cdd6d: SortableDataTable: add a toolbar with search (`searchable`), per-column filters (`filterable` columns) and a View menu for column visibility (`viewOptions`).
- 4d846f7: Foundations: an explicit type scale with tracking on large steps, `type-*` role utilities, radius roles (`control`, `container`, `overlay`, `pill`) plus `xs` and `2xl` steps, and a fifth elevation level (`shadow-overlay`) with theme-aware shadows that are denser in dark mode. Dialog and Drawer now use `shadow-overlay`. Fix the AvatarGroup neighbour hover shift.
- 4d846f7: Add the inputs: Input, Textarea, PasswordField, PasswordStrength, SearchField, ExpandingSearch and InlineEdit, plus the special inputs NumberField, MoneyInput, PhoneInput (with the phone helpers and country table) and TagInput. Adds a `warning` color token. Ported from the open source Arc library (uiarc.dev).
- 4d846f7: Add Alert, Toast, Dialog, Drawer, BottomSheet and Popover, and upgrade Tooltip: strings now crossfade and the bubble resizes on a spring, and it opens on all four sides. Ported from the open source Arc library (uiarc.dev).
- 4d846f7: Add Tabs, Accordion, Breadcrumb, Avatar, Avatar group and Badge.
- 4d846f7: Add the selection controls: Checkbox, RadioGroup, RadioCards, Select, MorphSelect, Combobox and MultiSelect. Ported from the open source Arc library (uiarc.dev).

  Also adds Switch, SegmentedControl and ChipGroup.

### Patch Changes

- 0e0fb2d: Bundle the motion tokens into the build, so apps outside this monorepo can install `@sagui/ui` without transpiling `@sagui/tokens`. Fix transition timing on Accordion, Avatar, AvatarGroup, Badge, Breadcrumb and Tabs, whose `duration-*` classes generated no CSS in Tailwind v4.
- Updated dependencies [4d846f7]
- Updated dependencies [bf894e3]
- Updated dependencies [4d846f7]
- Updated dependencies [4d846f7]
  - @sagui/tokens@0.2.0
