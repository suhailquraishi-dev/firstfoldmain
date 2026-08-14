# FirstFold Design System

This file is the working contract for keeping the site balanced. Use it before adding new visual patterns.

## Component Library

Shared UI primitives live in `app/components/UIPrimitives.tsx`.

- `MotionText`: headline reveal animation with reduced-motion support.
- `SectionFrame`: standard section wrapper, heading block, optional eyebrow, and accent theme.
- `PremiumButton`: primary and secondary pill CTA. Use `meeting` for the Google Meet mark and `hideArrow` only when the design explicitly removes the arrow.
- `TextCta`: unboxed text CTA with the shared arrow.
- `StatusBadge`: base badge shell for labels such as Most Popular.
- `CtaArrow`: shared right-arrow asset wrapper.
- `MeetingIcons`: shared Google Meet mark wrapper.
- `FoldGlyph`: FirstFold geometric mark for small inline identity moments.

Page composition stays in `app/components/SiteSections.tsx`. New reusable UI should go into `UIPrimitives.tsx` first, then be consumed by sections/pages.

## Color Usage

Core color tokens are defined in `app/globals.css` under `:root`.

- Page base: `--color-page`
- Primary text: `--color-ink`, `--color-ink-soft`, `--color-ink-strong`, `--color-ink-warm`
- Secondary text: `--color-ink-muted`, `--color-ink-subtle`, `--color-ink-cool`, `--color-ink-faint`
- Surfaces: `--color-surface`, `--color-surface-soft`, `--color-surface-warm`
- Lines: `--color-line`, `--color-line-soft`, `--color-line-strong`
- Dark panels: `--color-dark`, `--color-dark-panel`, `--color-on-dark`, `--color-on-dark-muted`, `--color-on-dark-soft`, `--color-on-dark-subtle`, `--color-on-dark-faint`
- Action orange: `--color-action`, `--color-action-soft`
- Accent fills: `--color-highlight`, `--color-highlight-soft`, `--color-highlight-wash`, `--color-highlight-chip`, `--color-info`, `--color-info-soft`, `--color-info-wash`, `--color-peach-soft`
- Process/support fills: `--color-process-blue`, `--color-process-neutral`, `--color-neutral-soft`, `--color-neutral-line`, `--color-neutral-hover`, `--color-neutral-chip`

Raw hex values should stay in the `:root` token block. New component styles should use semantic tokens.

## Type Hierarchy

Type tokens are defined in `app/globals.css`.

- Navigation: `--type-nav`
- Small body: `--type-body-sm`
- Body: `--type-body`
- Large body: `--type-body-lg`
- Card titles: `--type-card-title`
- Section titles: `--type-section-title`
- Page titles: `--type-page-title`
- Hero title: `--type-hero-title`

Weight tokens:

- `--weight-light`
- `--weight-regular`
- `--weight-medium`
- `--weight-semibold`
- `--weight-bold`

Use section-scale type only for true section headings. Cards, badges, buttons, and compact panels should use body or card-title scale.

## Icon Usage

Prefer shared primitives and existing Lucide icons.

- CTA arrows: always use `CtaArrow`.
- Meeting mark: always use `MeetingIcons`.
- Feature/check lists: use Lucide `Check` with orange only for benefit emphasis.
- Navigation/menu controls: use Lucide icons.
- Decorative capability marks: keep them as CSS shapes in `.capability-icon`.

Icon sizes should map to `--icon-sm`, `--icon-md`, `--icon-lg`, or `--icon-xl` unless a component has a fixed design constraint.

## Hygiene Checklist

Before shipping a visual change:

- Reuse a primitive before writing repeated markup.
- Use semantic color, type, radius, spacing, and shadow tokens where practical.
- Keep raw colors rare and intentional.
- Confirm mobile does not overflow horizontally.
- Respect `prefers-reduced-motion`.
- Run `pnpm run design:audit` to catch direct asset usage, missing foundation tokens, and raw color drift outside the token root.
- Run `pnpm run lint`, `pnpm test`, and `pnpm run build`.
- Check the local preview at `http://localhost:3000`.
