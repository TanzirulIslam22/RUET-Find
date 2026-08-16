---
name: Academic Clarity
colors:
  surface: '#f4fafd'
  surface-dim: '#d4dbdd'
  surface-bright: '#f4fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef5f7'
  surface-container: '#e8eff1'
  surface-container-high: '#e2e9ec'
  surface-container-highest: '#dde4e6'
  on-surface: '#161d1f'
  on-surface-variant: '#49454f'
  inverse-surface: '#2b3234'
  inverse-on-surface: '#ebf2f4'
  outline: '#7a757f'
  outline-variant: '#cac4d0'
  surface-tint: '#64568b'
  primary: '#64568b'
  on-primary: '#ffffff'
  primary-container: '#9d8ec7'
  on-primary-container: '#332658'
  inverse-primary: '#cebefa'
  secondary: '#65529c'
  on-secondary: '#ffffff'
  secondary-container: '#c1adfe'
  on-secondary-container: '#4f3d85'
  tertiary: '#685f18'
  on-tertiary: '#ffffff'
  tertiary-container: '#b8ad5e'
  on-tertiary-container: '#474000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e8ddff'
  primary-fixed-dim: '#cebefa'
  on-primary-fixed: '#1f1243'
  on-primary-fixed-variant: '#4c3f72'
  secondary-fixed: '#e8ddff'
  secondary-fixed-dim: '#cebdff'
  on-secondary-fixed: '#200755'
  on-secondary-fixed-variant: '#4d3a83'
  tertiary-fixed: '#f1e48f'
  tertiary-fixed-dim: '#d4c876'
  on-tertiary-fixed: '#201c00'
  on-tertiary-fixed-variant: '#4f4700'
  background: '#f4fafd'
  on-background: '#161d1f'
  surface-variant: '#dde4e6'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  max-width: 1120px
---

## Brand & Style

This design system is built on the principles of **Modern Minimalism** with a focus on utility and empathy. Designed specifically for a Lost & Found utility within a university context, the aesthetic prioritizes clarity and speed of use over decorative flair. 

The visual language draws inspiration from high-end productivity tools—utilizing expansive whitespace, precise alignment, and a controlled color palette to reduce cognitive load during potentially stressful situations (losing a personal item). The emotional response should be one of calm, reliability, and institutional trust. 

Key stylistic pillars:
- **Quiet Interface:** No unnecessary decorative elements; every line and color serves a functional purpose.
- **Human-Centric:** Soft primary tones to feel approachable rather than overly corporate or cold.
- **Precise Execution:** Heavy reliance on mathematical spacing and high-quality typography.

## Colors

The palette is anchored by a soft lavender primary tone that distinguishes the platform from generic administrative tools while maintaining a professional "human-designed" feel.

- **Primary & Secondary:** Use the lavender (#9d8ec7) for primary actions. The deeper purple (#7c69b5) is reserved exclusively for interactive states like hover and active presses to provide tactile feedback.
- **Neutrals:** Deep charcoal is used for all primary text to ensure high legibility. Backgrounds alternate between pure white for cards/content areas and a very light gray for page scaffolding.
- **Semantic Colors:** These are muted to prevent them from overwhelming the interface. They should appear primarily in small indicators (chips, icons, or thin borders) rather than large blocks of color.

## Typography

The design system uses **Inter** exclusively to lean into its systematic, utilitarian nature. The typeface's tall x-height ensures excellent legibility even at small sizes in data-heavy lists.

- **Headlines:** Use tighter letter-spacing and heavier weights to create a strong visual anchor.
- **Body Text:** Standard weight (400) with generous line-height to facilitate scanning long descriptions of lost items.
- **Labels:** Used for metadata (dates, categories, status). These often employ a medium weight (500) to stand out against body text without requiring a larger font size.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid Grid**. Content is housed within a maximum-width container of 1120px for desktop viewing to prevent line lengths from becoming unreadable.

- **The 4px Rule:** All spacing increments are multiples of 4, ensuring mathematical harmony across the UI.
- **Grid:** On desktop, use a 12-column grid with 24px gutters. On mobile, transition to a single-column layout with 16px side margins.
- **Density:** Maintain "Generous Whitespace." Elements should have ample breathing room to highlight the "Found" or "Lost" status clearly.

## Elevation & Depth

This design system avoids heavy drop shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Flat):** The main background (#f8f9fa).
- **Level 1 (Raised):** White surfaces (#ffffff) with a 1px solid border (#dfe6e9). This is the primary container for list items and cards.
- **Level 2 (Interaction):** When a card is hovered, apply a very soft, diffused shadow: `0 4px 12px rgba(0,0,0,0.05)`. 

Depth is primarily communicated through color shifts (White cards on Gray backgrounds) rather than physical simulation.

## Shapes

The shape language is disciplined and professional. 

- **Standard Radius:** 4px for small components like checkboxes and input fields.
- **Large Radius:** 8px (rounded-lg) for cards and main action buttons.
- **Avoidance:** Do not use 100% circular pills for buttons, as the sharper (but soft) corners maintain a more "professional/institutional" tone.

## Components

### Buttons
- **Primary:** Solid Lavender (#9d8ec7) with white text. 8px corner radius.
- **Secondary:** Transparent background with a 1px border (#dfe6e9) and Charcoal (#2d3436) text.
- **State Change:** On hover, primary buttons shift to #7c69b5.

### Input Fields
- **Default:** 1px solid border (#dfe6e9), 4px radius, white background.
- **Focus:** 1px solid border (#9d8ec7) with a subtle 2px outer glow in the primary color at 20% opacity.

### Chips (Status Indicators)
- Small, 4px rounded boxes with a light background tint of the semantic color (e.g., Success background at 10% opacity) and dark semantic text for contrast.

### Cards
- The core of the Lost & Found experience. Use a white background, 8px radius, and the subtle 1px border. Internal padding should be at least 24px (lg).

### Lists
- For lost item feeds, use a clean list with 1px bottom dividers. Avoid zebra-striping; use whitespace to separate entries.