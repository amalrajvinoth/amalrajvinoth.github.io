# Design System Document

## 1. Overview & Creative North Star: "The Digital Architect"

This design system is engineered for high-level technical professionals, specifically tailored to elevate a Senior Backend Engineer’s profile into a premium, editorial experience. We move beyond the standard "developer portfolio" by embracing **The Digital Architect**—a creative north star that prioritizes structural integrity, vast negative space, and a sophisticated interplay of depth.

Instead of a traditional flat grid, this system utilizes intentional asymmetry and "The Layering Principle" to showcase technical mastery. We replace noisy borders with tonal transitions, creating a UI that feels less like a website and more like a high-end physical architectural monograph. The aesthetic is rooted in **Soft Minimalism**: a breathable, high-contrast environment where every pixel of whitespace is a deliberate choice.

---

## 2. Colors

The palette is built on a foundation of "Deep Slate" and "Sophisticated Teals," moving away from pure blacks and greys to create a richer, more expensive-feeling environment.

### Core Palette
*   **Primary (`#00685f`)**: Our emerald-inflected teal. Used for high-impact CTAs and branding.
*   **Surface Foundation (`#f8fafa`)**: A cool-tinted white that reduces eye strain and feels more premium than pure `#FFFFFF`.
*   **On-Surface (`#191c1d`)**: A deep slate for high-readability text.

### The "No-Line" Rule
To achieve an editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through:
1.  **Background Color Shifts:** Use `surface_container_low` sections sitting on a `surface` background to define distinct content blocks.
2.  **Negative Space:** Use the Spacing Scale (e.g., `16` or `20`) to create "visual chasms" that naturally separate ideas.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials.
*   **Base:** `surface`
*   **Secondary Content Blocks:** `surface_container_low`
*   **Interactive Cards/Modules:** `surface_container_lowest` (Pure White) to create a subtle "lift" against the off-white background.

### Signature Textures
Apply a subtle linear gradient to main CTAs and hero headers transitioning from `primary` to `primary_container`. This adds a "lithographic" quality to the digital interface, suggesting depth and professional polish.

---

## 3. Typography

The typography strategy pairs the technical precision of **Plus Jakarta Sans** with the classic readability of **Inter**. 

*   **Display & Headlines (Plus Jakarta Sans):** Used for big, bold statements (e.g., `display-lg` for "Amal James"). The 98% weight provides a custom, "ink-heavy" look that feels authoritative and bespoke.
*   **Body & Titles (Inter):** Leveraged for its legendary legibility. Used for technical descriptions and data-heavy sections to ensure the user’s focus remains on the content.
*   **Monospace Accents (ui-monospace):** Used sparingly for "Metadata" or "Technical Stats" (e.g., `label-sm`) to nod to the backend engineering focus without making the entire site feel like a terminal.

---

## 4. Elevation & Depth

We reject the "drop shadow" of the 2010s in favor of **Tonal Layering** and **Ambient Light**.

### The Layering Principle
Depth is achieved by stacking. Place a `surface_container_lowest` card on a `surface_container_low` section. The human eye perceives this subtle shift in brightness as a change in physical elevation without the need for structural lines.

### Ambient Shadows
For floating elements like Navigation Bars or Primary Modals:
*   **Color:** Use a tinted version of `on_surface` at 4-6% opacity.
*   **Blur:** High diffusion (e.g., `24px` to `48px`).
*   **Spread:** Minimal. This creates a soft "glow" of shadow that feels natural and non-obtrusive.

### Glassmorphism & Depth
For the "Active Header" or "Floating Action Buttons," utilize **Glassmorphism**:
*   **Background:** `surface_container_lowest` with 70% opacity.
*   **Effect:** `backdrop-blur: 12px`.
*   **Result:** This allows the vibrant backend content to bleed through slightly, integrating the UI layers into a cohesive whole.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use the `outline_variant` token at **15% opacity**. It should be a suggestion of a container, not a cage.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` background, `on_primary` text. Use `xl` (0.75rem) roundedness. No shadows on resting state; a subtle `primary_container` glow on hover.
*   **Secondary:** `surface_container_high` background with no border. A "ghostly" appearance that only reveals its interactive nature on hover.

### Cards & Technical Modules
*   **Rule:** Forbid divider lines.
*   **Structure:** Use vertical whitespace (Token `8` or `10`) to separate the "Job Title" from the "Description."
*   **Elevation:** Use `surface_container_lowest` on a `surface_container_low` background to create a "tab" effect for technical skills.

### Chips (Skill Tags)
*   **Style:** `surface_container_high` background with `on_surface_variant` text.
*   **Interaction:** On hover, shift to `primary_fixed` with `on_primary_fixed` text. This provides a "vibrant pop" of emerald/teal that rewards the user's curiosity.

### Input Fields
*   **Style:** Minimalist. Only a bottom-weighted `outline_variant` (20% opacity). On focus, the line expands and shifts to `primary` color. Use `inter` body-md for all input text.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Offset a project description to the right while leaving the left column empty for a "Display" headline.
*   **Use Tonal Transitions:** Define sections by alternating between `surface` and `surface_container_low`.
*   **Prioritize Type Scale:** Let the difference between a `display-lg` and `body-md` do the heavy lifting for hierarchy.

### Don't:
*   **Never use 100% Black:** Use `on_surface` (`#191c1d`) to maintain a sophisticated, soft-contrast feel.
*   **Avoid "Bento Grid" Fatigue:** Do not box everything. Let some content breathe without a container.
*   **No High-Contrast Borders:** If you feel the need to draw a line, try adding 24px of whitespace instead.
*   **Don't Over-Animate:** Use simple 200ms ease-in-out transitions for opacity and slight Y-axis shifts (4px) to maintain the "Architectural" stability.