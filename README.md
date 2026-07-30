# Product Selector

A Vue 3 multi-step product configurator that guides users through selecting drive specifications and outputs matching product SKUs.

## Project Setup

```bash
npm install
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Build for production → dist/
npm run preview  # Preview production build
```

## Project Structure

```
product-selector/
├── index.html                          # HTML entry point
├── vite.config.js                      # Vite + Vue + SASS config
├── public/
│   ├── data.csv                        # Product data (loaded at runtime)
│   └── content/                        # Markdown content for side panel
│       ├── step-voltage.md             #   (one per step)
│       ├── step-power.md
│       ├── step-type.md
│       ├── step-emi.md
│       ├── step-heatsink.md
│       ├── step-overload.md
│       ├── step-control.md
│       └── heatsink-*.md               #   (one per heatsink option)
├── src/
│   ├── main.js                         # App entry point
│   ├── App.vue                         # Root component + layout
│   ├── styles/
│   │   ├── _variables.scss             # SASS variables, colors, mixins
│   │   └── main.scss                   # Global styles, buttons, options
│   ├── assets/
│   │   ├── f6-wallmount.jpg            # F6 product image
│   │   └── s6-rackmount.png            # S6 product image
│   ├── data/
│   │   ├── steps.js                    # Step definitions + column mappings
│   │   ├── typeCards.js                # F6/S6 card data + image imports
│   │   ├── controlCards.js             # Control board card metadata
│   │   └── content.js                  # Embedded markdown fallbacks
│   ├── composables/
│   │   ├── useProductFilter.js         # Core filtering + navigation logic
│   │   └── useSideContent.js           # Markdown loading + caching
│   └── components/
│       ├── AppHeader.vue               # Logo + title
│       ├── ProgressBar.vue             # Step progress indicator
│       ├── SidePanel.vue               # Markdown side panel w/ shimmer
│       ├── StepNav.vue                 # Back/Next navigation buttons
│       ├── FileUpload.vue              # CSV upload fallback overlay
│       ├── steps/
│       │   ├── VoltageStep.vue         # IEC/UL toggle + options
│       │   ├── PowerStep.vue           # kW/Hp toggle + options
│       │   ├── TypeStep.vue            # F6/S6 image cards
│       │   ├── ControlStep.vue         # Control board feature cards
│       │   └── DefaultStep.vue         # Generic radio option list
│       └── results/
│           ├── ResultsView.vue         # Full results page layout
│           ├── SkuCard.vue             # Expandable product spec card
│           ├── SelectionSummary.vue    # Selections recap table
│           └── ContactForm.vue         # Gated STEP file download form
```

## Key Architecture Decisions

- **Composables** (`useProductFilter`, `useSideContent`) hold all business logic and state, keeping components thin and focused on rendering.
- **Data files** (`steps.js`, `controlCards.js`, etc.) separate configuration from logic, making it easy to add/remove steps or modify card content.
- **Markdown content** lives in `public/content/` and is loaded at runtime with preloading + caching. Embedded fallbacks in `data/content.js` ensure the app works even without the files.
- **SASS variables** are globally injected via `vite.config.js` so every component has access to `$accent`, `$surface`, mixins, etc.

## Editing Guide

| To do this... | Edit this... |
|---|---|
| Change step order or add/remove steps | `src/data/steps.js` |
| Update control board card specs | `src/data/controlCards.js` |
| Change type card images | Replace files in `src/assets/`, update `src/data/typeCards.js` |
| Edit side panel content | Markdown files in `public/content/` |
| Modify colors/typography | `src/styles/_variables.scss` |
| Change global button/option styles | `src/styles/main.scss` |
| Wire up the contact form to an API | `src/components/results/ContactForm.vue` → `submit()` |
| Update the product data | Replace `public/data.csv` |
