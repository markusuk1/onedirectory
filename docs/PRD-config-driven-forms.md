# PRD: Config-Driven Form System

**Author:** Claude (AI-assisted)
**Date:** 2026-03-11
**Status:** Draft — Awaiting Review
**Priority:** High (pre-requisite for scaling to 60+ products)

---

## 1. Problem Statement

OneDirectory currently supports 9 products. Each product has custom form fields defined as inline conditional blocks inside `QuoteForm.tsx` (666 lines), `ManagedQuoteForm.tsx` (902 lines), and `AutoQuoteConfig.tsx` (269 lines).

The business plans to scale to **60+ products**. Under the current architecture:

- `QuoteForm.tsx` would grow to ~4,000+ lines of `if/else` blocks
- `ManagedQuoteForm.tsx` would grow to ~6,000+ lines
- Every new product requires editing 3-4 component files and the TypeScript union type
- No validation beyond HTML5 `required` attributes — risk of bad data increases with scale
- Testing and review burden grows linearly with every product addition
- Duplicated form field rendering logic between QuoteForm and ManagedQuoteForm

**The current approach does not scale.**

---

## 2. Goals

| # | Goal | Metric |
|---|------|--------|
| G1 | Adding a new product requires **zero component file changes** | New product = 1 config entry only |
| G2 | Form field definitions are **data, not code** | All product-specific fields defined in config |
| G3 | Customer quote forms and managed quote forms share field definitions | Single source of truth per product |
| G4 | Operator auto-quote config fields are also config-driven | Same pattern as customer forms |
| G5 | Proper validation with clear error messages | Zod schemas generated from field config |
| G6 | No breaking changes to existing functionality | All 9 current products work identically after migration |
| G7 | No changes to the database schema | `details` JSONB column continues to store product-specific data |

---

## 3. Non-Goals

- Drag-and-drop form builder UI (this is developer-authored config, not user-authored)
- Multi-step/wizard forms (all products use single-page forms currently)
- Changing the leads API contract or database schema
- Product search/filter feature (separate initiative)
- Operator registration flow changes
- Changes to ProfileForm or AdvertForm (these are already product-agnostic)

---

## 4. User Personas

### 4.1 Customer (End User)
- Visits a product/location page
- Fills in a quote request form with fields relevant to that specific product
- Expects fast, simple form with clear labels and validation feedback
- **No change to their experience** — forms look and behave identically

### 4.2 Operator (Business Owner)
- Logs into operator dashboard
- Configures auto-quote pricing fields specific to their product
- Expects fields relevant to their trade (e.g. skip prices for skip hire, daily rates for van hire)
- **No change to their experience** — same fields, same save flow

### 4.3 Developer (Internal)
- Adds new products to the platform
- Currently: edits 3-4 TSX files, adds conditional blocks, updates union type
- After: adds one config entry in `productConfig.ts` with field definitions
- **Massively reduced effort and risk of errors**

---

## 5. Detailed Requirements

### 5.1 Field Type System

The config must support these field types (covers all existing products):

| Type | Description | Current Usage |
|------|-------------|---------------|
| `text` | Single-line text input | Names, locations, addresses |
| `email` | Email input with validation | Customer email |
| `tel` | Phone number input | Customer phone |
| `textarea` | Multi-line text | Messages, descriptions |
| `select` | Dropdown with predefined options | Skip size, van type, service type, etc. |
| `date` | Date picker | Event dates, move dates, start dates |
| `number` | Numeric input | Passengers, hours, prices |
| `radio` | Radio button group | Indoor/outdoor, yes/no choices |

### 5.2 Field Definition Schema

Each field in the config must support:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Form field name (used in data submission, must be unique within product) |
| `label` | string | Yes | Display label shown to user |
| `type` | FieldType | Yes | One of the types above |
| `required` | boolean | No | Whether field is mandatory (default: false) |
| `placeholder` | string | No | Placeholder text |
| `options` | Option[] | For select/radio | `{ value: string, label: string }[]` |
| `defaultValue` | string/number | No | Pre-filled value |
| `half` | boolean | No | Render at half-width in 2-column grid (default: false) |
| `prefix` | string | No | Display prefix e.g. "£" (for number fields) |
| `suffix` | string | No | Display suffix e.g. "per day" (for number fields) |
| `min` / `max` | number | No | For number/date fields |
| `conditionalOn` | object | No | Show field only when another field has a specific value (see 5.3) |
| `helpText` | string | No | Small help text below the field |

### 5.3 Conditional Fields

Some products need fields that appear conditionally. Example: minibus hire shows a "Return Date" field only when journey type is "return".

```ts
{
  name: "returnDate",
  label: "Return Date",
  type: "date",
  conditionalOn: { field: "journeyType", value: "return" }
}
```

This replaces the current `useState` + conditional rendering in ManagedQuoteForm for journey type handling, and generalises it for any product.

### 5.4 Field Groups / Layout

Fields should support optional grouping for visual organisation:

```ts
quoteFields: [
  { name: "date", label: "Date", type: "date", half: true, required: true },
  { name: "passengers", label: "Passengers", type: "number", half: true, required: true },
  { name: "pickup", label: "Pickup Location", type: "text", required: true },
  { name: "destination", label: "Destination", type: "text", required: true },
]
```

The `half: true` flag means two fields render side-by-side. This replicates the current grid layout without needing separate row definitions.

### 5.5 Operator Auto-Quote Config Fields

Each product config also defines operator-side pricing/config fields:

```ts
autoQuoteFields: [
  { name: "maxPassengers", label: "Max Passengers", type: "number", placeholder: "16" },
  { name: "minPrice", label: "Minimum Price", type: "number", prefix: "£", placeholder: "50" },
]
```

This replaces the current per-product React components (`MinibusConfig`, `SkipConfig`, `VanConfig`, `LocksmithConfig`).

### 5.6 Validation

**Client-side:**
- Required fields show inline error message on blur and on submit
- Email fields validate format
- Phone fields validate basic format
- Number fields respect min/max
- Date fields respect min (e.g. tomorrow for future bookings)

**Server-side:**
- Zod schema auto-generated from product field config
- Validates the `details` object in `/api/leads` before database insert
- Returns structured error response if validation fails

### 5.7 Common (Base) Fields

The following fields are shared across ALL products and are NOT part of the per-product config:

- Full Name (required)
- Email Address (required)
- Phone Number (required)
- Message / Additional Details (optional)
- Budget (managed quote form only)

These remain hardcoded in the form components as they never vary.

---

## 6. Migration of Existing Products

All 9 current products must be migrated to the config-driven system. Here is the complete field mapping:

### 6.1 Minibus Hire
```
quoteFields: date, passengers, pickup, destination, journeyType, returnDate (conditional)
autoQuoteFields: maxPassengers, minPrice
```

### 6.2 Skip Hire
```
quoteFields: skipSize, wasteType, address, duration, placement
autoQuoteFields: prices.mini, prices.midi, prices.builders, prices.large
```

### 6.3 Van Hire
```
quoteFields: vanSize, driveType, startDate, endDate, collectionLocation
autoQuoteFields: dailyRates.swb, dailyRates.lwb, dailyRates.luton, dailyRates.tipper
```

### 6.4 Locksmith
```
quoteFields: serviceType, urgency, propertyType, location
autoQuoteFields: calloutFee, emergencyCalloutFee
```

### 6.5 Removal Companies
```
quoteFields: moveType, bedrooms, movingFrom, movingTo, moveDate, needPacking
autoQuoteFields: (none currently defined)
```

### 6.6 Bouncy Castle Hire
```
quoteFields: eventType, eventDate, venue, indoorOutdoor, ageRange
autoQuoteFields: (none currently defined)
```

### 6.7 Limo Hire
```
quoteFields: occasion, eventDate, pickupLocation, destination, passengers, hours
autoQuoteFields: (none currently defined)
```

### 6.8 Plant Hire
```
quoteFields: equipmentType, startDate, duration, siteLocation, operatedOrSelfDrive
autoQuoteFields: (none currently defined)
```

### 6.9 Driving Lessons
```
quoteFields: lessonType, transmission, experience, area
autoQuoteFields: (none currently defined)
```

---

## 7. Success Criteria

| # | Criterion | How to Verify |
|---|-----------|---------------|
| SC1 | All 9 existing products produce identical form HTML before and after migration | Visual regression test / manual comparison |
| SC2 | All 9 existing products submit identical data payloads to `/api/leads` | Compare request bodies in dev tools |
| SC3 | Adding a 10th test product requires only a config entry | Developer adds config, form renders correctly with no component changes |
| SC4 | Operator auto-quote configs render and save correctly for all products | Manual test of operator dashboard |
| SC5 | Client-side validation shows errors for required fields | Submit empty form, verify error messages |
| SC6 | Server-side validation rejects malformed payloads | Send bad data to API, verify 400 response |
| SC7 | No increase in bundle size beyond config data | Check build output |

---

## 8. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Config schema becomes complex / hard to author | Medium | Medium | Keep field types minimal; add types only when genuinely needed by a product |
| Conditional field logic grows complex | Medium | Low | Limit to single-field conditions initially; extend only if needed |
| Existing form submissions break during migration | High | Low | Migrate one product at a time; compare payloads before/after |
| Auto-quote pricing structures vary wildly between products | Medium | Medium | Use flat field list for simple products; nested config for complex pricing (like skip sizes) |
| Developer forgets required fields or makes typos in config | Medium | Medium | TypeScript strict typing on config; unit tests that validate all configs |

---

## 9. Out of Scope (Future Considerations)

These are explicitly deferred but worth noting for future planning:

- **Product categories/taxonomy** — needed for search/filter feature, not for forms
- **Multi-step form wizards** — some complex products may benefit from this later
- **File upload fields** — e.g. photos of locks, site photos (not currently needed)
- **Dependent dropdowns** — e.g. selecting a category filters sub-category options
- **A/B testing form variants** — testing which fields improve conversion
- **Form analytics** — tracking field-level abandonment rates

---

## 10. Timeline Estimate

| Phase | Scope | Effort |
|-------|-------|--------|
| Phase 1 | Define TypeScript types for field config schema | Small |
| Phase 2 | Build `DynamicField` renderer component | Medium |
| Phase 3 | Build `DynamicFormFields` container (handles layout, conditionals) | Medium |
| Phase 4 | Migrate QuoteForm to use dynamic fields | Medium |
| Phase 5 | Migrate ManagedQuoteForm to use dynamic fields | Small (reuses Phase 4 work) |
| Phase 6 | Migrate AutoQuoteConfig to use dynamic fields | Small |
| Phase 7 | Add Zod validation (client + server) | Medium |
| Phase 8 | Migrate all 9 products to config entries | Medium |
| Phase 9 | Testing and verification against success criteria | Medium |

---

## 11. Appendix: Example Full Product Config (Post-Migration)

```ts
"skip-hire": {
  id: "skip-hire",
  slug: "skip-hire",
  name: "Skip Hire",
  shortName: "Skip Hire",
  icon: "🗑️",
  // ...existing SEO/content fields unchanged...

  // NEW: Customer quote form fields
  quoteFields: [
    {
      name: "skipSize",
      label: "Skip Size",
      type: "select",
      required: true,
      half: true,
      options: [
        { value: "mini", label: "Mini Skip (2-3 yards)" },
        { value: "midi", label: "Midi Skip (4-5 yards)" },
        { value: "builders", label: "Builders Skip (6-8 yards)" },
        { value: "large", label: "Large Skip (12-16 yards)" },
        { value: "roro", label: "Roll-On Roll-Off (20-40 yards)" },
        { value: "not-sure", label: "Not sure — need advice" },
      ],
    },
    {
      name: "wasteType",
      label: "Waste Type",
      type: "select",
      half: true,
      options: [
        { value: "general", label: "General Household" },
        { value: "construction", label: "Construction / Rubble" },
        { value: "garden", label: "Garden Waste" },
        { value: "soil", label: "Soil / Earth" },
        { value: "mixed", label: "Mixed Waste" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
    { name: "address", label: "Delivery Address", type: "text", required: true },
    {
      name: "duration",
      label: "Hire Duration",
      type: "select",
      half: true,
      options: [
        { value: "1-week", label: "1 Week" },
        { value: "2-weeks", label: "2 Weeks" },
        { value: "1-month", label: "1 Month" },
        { value: "other", label: "Other (specify in message)" },
      ],
    },
    {
      name: "placement",
      label: "Skip Placement",
      type: "select",
      half: true,
      options: [
        { value: "driveway", label: "Driveway / Private Land" },
        { value: "road", label: "Road (permit may be required)" },
        { value: "not-sure", label: "Not sure yet" },
      ],
    },
  ],

  // NEW: Operator auto-quote pricing fields
  autoQuoteFields: [
    { name: "prices.mini", label: "Mini Skip Price", type: "number", prefix: "£", half: true },
    { name: "prices.midi", label: "Midi Skip Price", type: "number", prefix: "£", half: true },
    { name: "prices.builders", label: "Builders Skip Price", type: "number", prefix: "£", half: true },
    { name: "prices.large", label: "Large Skip Price", type: "number", prefix: "£", half: true },
  ],
}
```
