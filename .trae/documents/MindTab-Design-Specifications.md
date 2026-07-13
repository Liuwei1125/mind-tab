# MindTab Design Specifications

## Design System - Based on Claude's Design Language

This document defines the design system and style guidelines for MindTab, following a warm, editorial aesthetic inspired by Claude/Anthropic.

---

## 1. Color Palette

### Brand & Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | #cc785c | Primary CTAs, coral accents (warm coral, not blue) |
| `primary-active` | #a9583e | Hover/press darker variant |
| `primary-disabled` | #e6dfd8 | Desaturated disabled state |
| `accent-teal` | #5db8a6 | Secondary accents (terminal indicators) |
| `accent-amber` | #e8a55a | Category badges, inline highlights |

### Surface Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `canvas` | #faf9f5 | Default page floor (warm cream, NOT white) |
| `surface-soft` | #f5f0e8 | Section dividers, soft band backgrounds |
| `surface-card` | #efe9de | Feature cards, content cards (one step darker than canvas) |
| `surface-cream-strong` | #e8e0d2 | Emphasized section bands |
| `surface-dark` | #181715 | Code mockups, dark cards, footer |
| `surface-dark-elevated` | #252320 | Elevated cards inside dark bands |
| `surface-dark-soft` | #1f1e1b | Code block backgrounds inside dark cards |
| `hairline` | #e6dfd8 | 1px borders on cream surfaces |
| `hairline-soft` | #ebe6df | Barely-visible dividers |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | #141413 | Headlines, primary text (warm dark, not pure black) |
| `body-strong` | #252523 | Emphasized paragraphs |
| `body` | #3d3d3a | Default running text |
| `muted` | #6c6a64 | Sub-headings, breadcrumbs |
| `muted-soft` | #8e8b82 | Captions, fine-print |
| `on-primary` | #ffffff | Text on coral buttons |
| `on-dark` | #faf9f5 | Text on dark surfaces (echoes canvas) |
| `on-dark-soft` | #a09d96 | Footer body text on dark |

### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `success` | #5db872 | Green status dots, available indicators |
| `warning` | #d4a017 | Warning callouts |
| `error` | #c64545 | Validation errors |

---

## 2. Typography

### Font Stack
- **Display / Headlines**: Copernicus / Tiempos Headline / Cormorant Garamond (serif)
  - Weight: 400 (regular, never bold)
  - Letter-spacing: -0.02em to -1.5px (negative tracking is essential)
- **Body / UI**: Inter / -apple-system / BlinkMacSystemFont (humanist sans)
- **Code**: JetBrains Mono

### Type Scale
| Token | Size | Weight | Line Height | Use |
|-------|------|--------|-------------|-----|
| `display-xl` | 64px | 400 | 1.05 | Hero headlines |
| `display-lg` | 48px | 400 | 1.1 | Section heads |
| `display-md` | 36px | 400 | 1.15 | Sub-section heads |
| `display-sm` | 28px | 400 | 1.2 | Callout headlines |
| `title-lg` | 22px | 500 | 1.3 | Card titles |
| `title-md` | 18px | 500 | 1.4 | Feature titles |
| `title-sm` | 16px | 500 | 1.4 | List labels |
| `body-md` | 16px | 400 | 1.55 | Default body text |
| `body-sm` | 14px | 400 | 1.55 | Footer body |
| `caption` | 13px | 500 | 1.4 | Badges, captions |
| `caption-uppercase` | 12px | 500 | 1.4 | Category tags |
| `code` | 14px | 400 | 1.6 | Code blocks |
| `button` | 14px | 500 | 1.0 | Button labels |
| `nav-link` | 14px | 500 | 1.4 | Navigation items |

---

## 3. Spacing System

Base unit: 4px

| Token | Value | Use |
|-------|-------|-----|
| `xxs` | 4px | Micro spacing |
| `xs` | 8px | Tight spacing |
| `sm` | 12px | Small gaps |
| `md` | 16px | Standard spacing |
| `lg` | 24px | Card padding |
| `xl` | 32px | Section padding |
| `xxl` | 48px | Large spacing |
| `section` | 96px | Section rhythm |

---

## 4. Border Radius Scale

| Token | Value | Use |
|-------|-------|-----|
| `xs` | 4px | Badge accents |
| `sm` | 6px | Small buttons, dropdown items |
| `md` | 8px | Standard buttons, inputs |
| `lg` | 12px | Content cards |
| `xl` | 16px | Hero containers |
| `pill` | 9999px | Pills, badges, tags |
| `full` | 50% | Avatars, circular icons |

---

## 5. Elevation & Depth

Philosophy: **Color-block first, shadow rare**

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow, no border | Body sections, nav |
| Soft | 1px `hairline` border | Inputs, sub-nav |
| Card | `surface-card` bg, no shadow | Feature cards |
| Dark | `surface-dark` bg, no shadow | Code mockups |

Shadows used sparingly: `0 1px 3px rgba(20,20,19,0.08)`

---

## 6. Component Styles

### Buttons

**Primary Button**
- Background: `primary` (#cc785c)
- Text: `on-primary` (white)
- Padding: 12px × 20px
- Height: 40px
- Border-radius: `md` (8px)
- Hover: `primary-active` (#a9583e)

**Secondary Button**
- Background: `canvas`
- Border: 1px `hairline`
- Text: `ink`
- Same padding/height/radius as primary

**Secondary on Dark**
- Background: `surface-dark-elevated` (#252320)
- Text: `on-dark`

**Text Link**
- Color: `primary` (coral)
- Underlined on press

### Cards

**Feature Card**
- Background: `surface-card` (#efe9de)
- Border-radius: `lg` (12px)
- Padding: `xl` (32px)

**Dark Product Card**
- Background: `surface-dark` (#181715)
- Border-radius: `lg` (12px)
- Padding: `xl` (32px)

**Code Window Card**
- Background: `surface-dark` with `surface-dark-soft` inner block
- Border-radius: `lg` (12px)
- Padding: `lg` (24px)
- Font: JetBrains Mono

---

## 7. Layout

### Container
- Max width: ~1200px centered
- Section padding: `section` (96px)
- Card internal padding: `xl` (32px)

### Grid
- Feature cards: 3-up desktop, 2-up tablet, 1-up mobile
- Content columns: Single column or 2/3 split

### Whitespace
- Uniform section spacing: 96px
- Generous card internal padding: 32px
- Editorial pacing - let content breathe

---

## 8. Animations & Transitions

- Transition duration: 150ms - 300ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Hover states: subtle background color shifts
- No jarring animations

---

## 9. Dark Mode Support

When supporting dark mode:
- Canvas becomes: `surface-dark` (#181715)
- Surface cards become: `surface-dark-elevated` (#252320)
- Text adapts to `on-dark` tones
- Maintain warm undertones, avoid pure blacks

---

## 10. Design Principles

1. **Warm over cool**: Cream (#faf9f5) over white, coral (#cc785c) over blue
2. **Editorial feel**: Serif headlines + humanist sans body = literary magazine aesthetic
3. **Color over shadow**: Depth through color contrast, not drop shadows
4. **Generous whitespace**: Let content breathe, don't cram
5. **Consistent radius**: Follow the radius scale strictly
6. **Negative tracking on serifs**: Essential for brand voice

---

*Last Updated: 2026-05-08*
*Based on: Claude/Web Design Language System*
