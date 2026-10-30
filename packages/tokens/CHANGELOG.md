# @sagui/tokens

## 0.2.0

### Minor Changes

- 4d846f7: Add the button family: ActionButton, SplitButton, ButtonGroup, FloatingButtonGroup, ExpandingButtonGroup, CopyButton and ConfirmMorph, plus a Tooltip. Tokens gain spring and ease presets, success and border-strong colors, and resting, raised and floating shadows. Ported from the open source Arc library (uiarc.dev).
- bf894e3: Add charts (line, bar, donut, sparkline, gauge, streamgraph, brush, waffle, slope, activity heatmap, ridgeline, treemap), SortableDataTable, Timeline and text effects (TextReveal, InViewTitle, TextMorph, TextShimmer), ported from Arc (uiarc.dev). They are styled by prefixed stylesheets (`sg-<component>-*`) bundled into `@sagui/ui/styles.css`.

  Tokens: a four colour chart palette (`--color-chart-1` to `--color-chart-4`), and `--duration-instant` / `--duration-considered`, which several components already referenced, so their transitions now run instead of snapping.

  `motion` is now ^12.

- 4d846f7: Foundations: an explicit type scale with tracking on large steps, `type-*` role utilities, radius roles (`control`, `container`, `overlay`, `pill`) plus `xs` and `2xl` steps, and a fifth elevation level (`shadow-overlay`) with theme-aware shadows that are denser in dark mode. Dialog and Drawer now use `shadow-overlay`. Fix the AvatarGroup neighbour hover shift.
- 4d846f7: Add the inputs: Input, Textarea, PasswordField, PasswordStrength, SearchField, ExpandingSearch and InlineEdit, plus the special inputs NumberField, MoneyInput, PhoneInput (with the phone helpers and country table) and TagInput. Adds a `warning` color token. Ported from the open source Arc library (uiarc.dev).
