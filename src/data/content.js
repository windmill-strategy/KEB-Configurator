/**
 * Embedded markdown fallbacks. The app tries to load from public/content/
 * first; these are used when the fetch fails (e.g. during development
 * or if the content files aren't deployed).
 */

export const STEP_CONTENT = {
  voltage: `## Selecting Your Input Voltage

The input voltage is determined by the power supply available at your installation site.

### IEC vs UL

**IEC** voltages follow International Electrotechnical Commission standards, used in Europe, Asia, and most global markets.

**UL** voltages follow Underwriters Laboratories standards, primarily used in North America.

### Common Configurations

**230V 1-Phase** — Light commercial or workshop environments.

**230V 3-Phase** — Standard industrial supply for smaller motor applications.

**400V / 480V 3-Phase** — The most common configuration for industrial applications.`,

  power: `## Selecting the Right Power Rating

Select the power rating that matches your motor's nameplate specifications.

### kW vs Hp

**Kilowatts (kW)** are the standard unit in IEC regions.

**Horsepower (Hp)** is the standard unit in NEMA regions, primarily North America.

### Derating Considerations

At higher ambient temperatures or altitudes above 1000m, you may need to select a higher power rating.`,

  type: `## Selecting the Drive Type

The drive type determines the core topology, form factor, and feature set.

### F6 — Wallmount

The standard frequency inverter for general-purpose industrial applications. Wall-mounted form factor.

### S6 — Rackmount

The servo-grade variant for high-dynamic applications. Rackmount form factor optimized for multi-axis cabinet installations.`,

  emi: `## Selecting EMI Option

Electromagnetic interference (EMI) filters reduce conducted emissions from the drive.

### Options

**None** — No integrated EMI filter. Suitable for dedicated industrial networks.

**Integrated** — Built-in EMI filter for compliance with EN 61800-3 Category C2.`,

  heatsink: `## Selecting the Heatsink Configuration

The heatsink determines how the drive dissipates heat and how it is physically installed.

### Cooling Methods

**Air cooled** — Standard forced-air cooling with integrated fan.

**Air cooled (convection)** — Passive convection cooling without a fan.

**Water cooled** — Liquid-cooled heatsink for high power density installations.

### Mounting Types

**Panel mount** — Fully inside the cabinet.

**Push-through mount** — Heatsink protrudes through the cabinet rear.

**Book mount** — Compact side-by-side mounting format.`,

  overload: `## Selecting the Overload Characteristic

The rated switching frequency determines overload capability and waveform quality.

### Available Ratings

**2 kHz** — Highest overload capacity. Heavy-duty applications.

**4 kHz** — Standard for most industrial applications.

**6 kHz** — Improved current quality and reduced motor noise.

**8 kHz** — Smoothest waveform. Lowest motor noise.`,

  control: `## Selecting the Control / Safety Card

Select the control board matching your automation architecture and safety requirements.

### Tiers

**Basic** — Entry-level control.

**Standard** — Mid-range with common fieldbus protocols.

**High** — Premium with widest protocol support.`,
}

export const HEATSINK_CONTENT = {
  'air-cooled-panel-mount':
    '## Air Cooled — Panel Mount\n\nStandard forced-air cooling inside an electrical cabinet.\n\n### When to Choose\n\nThe most common configuration for standard industrial cabinets.',
  'air-cooled-push-through-mount':
    '## Air Cooled — Push-Through Mount\n\nForced-air cooling with heatsink protruding through the cabinet rear.\n\n### When to Choose\n\nIdeal when cabinet thermal management is a concern.',
  'air-cooled-book-mount':
    '## Air Cooled — Book Mount\n\nCompact side-by-side mounting with zero lateral clearance.\n\n### When to Choose\n\nBest for space-constrained installations.',
  'air-cooled-panel-mount-high-perf':
    '## Air Cooled — Panel Mount (High Performance)\n\nEnhanced heatsink for high switching frequencies without derating.\n\n### When to Choose\n\nSustained high switching frequencies or elevated ambient temperatures.',
  'air-cooled-convection-push-through-mount':
    '## Air Cooled (Convection) — Push-Through\n\nPassive convection cooling with no fan. Silent operation.\n\n### When to Choose\n\nLow-noise environments or where fan maintenance is difficult.',
  'water-cooled-panel-mount':
    '## Water Cooled — Panel Mount\n\nLiquid-cooled heatsink reducing cabinet thermal load by up to 95%.\n\n### When to Choose\n\nHigh power density installations or clean rooms.',
  'water-cooled-push-through-mount':
    '## Water Cooled — Push-Through Mount\n\nLiquid cooling with external coolant connections.\n\n### When to Choose\n\nMaximum thermal performance with separation between electrical and fluid.',
  'water-cooled-panel-mount-high-perf':
    '## Water Cooled — Panel Mount (High Performance)\n\nOptimized coolant channels for maximum heat extraction.\n\n### When to Choose\n\nFull-load at maximum switching frequency.',
  'water-cooled-push-through-mount-high-perf':
    '## Water Cooled — Push-Through (High Performance)\n\nTop-tier thermal configuration.\n\n### When to Choose\n\nThe most demanding applications.',
}
