# Architecture: Config-Driven Form System

**Date:** 2026-03-11
**Status:** Draft — Awaiting Review
**Related:** [PRD-config-driven-forms.md](./PRD-config-driven-forms.md)

---

## 1. Architecture Overview

```
productConfig.ts (DATA LAYER)
├── Product metadata (existing — unchanged)
├── quoteFields[]        ← NEW: customer form field definitions
├── autoQuoteFields[]    ← NEW: operator config field definitions
└── searchMeta           ← NEW (future): category, tags, popular flag

                    ↓ consumed by

RENDERING LAYER (generic components)
├── DynamicField          — renders a single field by type
├── DynamicFormFields     — renders a list of fields with layout
├── QuoteForm             — base fields + DynamicFormFields(quoteFields)
├── ManagedQuoteForm      — base fields + budget + DynamicFormFields(quoteFields)
└── AutoQuoteConfig       — toggle + DynamicFormFields(autoQuoteFields)

                    ↓ submits to

API LAYER (unchanged)
├── /api/leads            — receives base + details JSON
└── /api/operator/*       — receives operator config

                    ↓ validated by

VALIDATION LAYER (new)
├── generateZodSchema()   — builds Zod schema from field config
├── Client-side           — validates on blur + submit
└── Server-side           — validates in API route before DB insert

                    ↓ stored in

DATABASE (unchanged)
├── leads.details         — JSONB column, product-specific data
└── auto_quote_configs.config — JSONB column, operator pricing
```

---

## 2. Type Definitions

### 2.1 New File: `src/lib/formFieldTypes.ts`

This file defines the field configuration types used across all forms.

```ts
// ─── Field Types ─────────────────────────────────────────────

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "date"
  | "number"
  | "radio";

export interface FieldOption {
  value: string;
  label: string;
}

export interface ConditionalRule {
  /** Name of the field this depends on */
  field: string;
  /** Value(s) that trigger visibility. String for single, array for multiple. */
  value: string | string[];
}

export interface FormFieldConfig {
  /** Unique field name — used as form input name and in submitted data */
  name: string;
  /** Display label */
  label: string;
  /** Input type */
  type: FieldType;
  /** Whether field is required */
  required?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Options for select/radio types */
  options?: FieldOption[];
  /** Default value */
  defaultValue?: string | number;
  /** Render at half width (2-column grid) */
  half?: boolean;
  /** Prefix text (e.g. "£") */
  prefix?: string;
  /** Suffix text (e.g. "per day") */
  suffix?: string;
  /** Min value for number/date */
  min?: number | string;
  /** Max value for number/date */
  max?: number | string;
  /** Conditional visibility rule */
  conditionalOn?: ConditionalRule;
  /** Help text displayed below field */
  helpText?: string;
}
```

### 2.2 Extended ProductConfig Interface

```ts
// In productConfig.ts — additions to existing interface

export interface ProductConfig {
  // ...all existing fields unchanged...

  /** Customer-facing quote form fields (product-specific section) */
  quoteFields: FormFieldConfig[];

  /** Operator auto-quote configuration fields */
  autoQuoteFields?: FormFieldConfig[];
}
```

---

## 3. Component Architecture

### 3.1 Component Tree (Current vs. Proposed)

**CURRENT:**
```
QuoteForm
├── Hardcoded base fields (name, email, phone)
├── if productId === "skip-hire" → inline JSX for skip fields
├── if productId === "van-hire" → inline JSX for van fields
├── if productId === "locksmith" → inline JSX for locksmith fields
├── ... (9 product blocks)
└── Hardcoded message field + submit button
```

**PROPOSED:**
```
QuoteForm
├── Hardcoded base fields (name, email, phone)    ← unchanged
├── DynamicFormFields
│   ├── DynamicField (field 1)
│   ├── DynamicField (field 2)
│   ├── DynamicField (field 3, conditional — may be hidden)
│   └── ...
├── Hardcoded message field + submit button        ← unchanged
└── Form submission logic (reads all field values from config)
```

### 3.2 New File: `src/components/form/DynamicField.tsx`

Renders a single form field based on its `FormFieldConfig`.

```
Props:
  - field: FormFieldConfig
  - value: string | number
  - onChange: (name: string, value: string | number) => void
  - error?: string

Responsibilities:
  - Switch on field.type to render correct input element
  - Apply field.prefix / field.suffix as adornments
  - Show field.helpText below input
  - Show error message when provided
  - Apply consistent styling (reuse existing inputClass pattern)
```

**Mapping of field.type to rendered element:**

| field.type | Element | Notes |
|------------|---------|-------|
| `text` | `<input type="text">` | |
| `email` | `<input type="email">` | |
| `tel` | `<input type="tel">` | |
| `textarea` | `<textarea>` | 3 rows default |
| `select` | `<select>` with `<option>` children | First option is placeholder |
| `date` | `<input type="date">` | Supports min/max |
| `number` | `<input type="number">` | Supports min/max, prefix/suffix |
| `radio` | Horizontal `<input type="radio">` group | Styled as button group |

### 3.3 New File: `src/components/form/DynamicFormFields.tsx`

Renders a collection of fields with layout handling.

```
Props:
  - fields: FormFieldConfig[]
  - values: Record<string, string | number>
  - onChange: (name: string, value: string | number) => void
  - errors: Record<string, string>

Responsibilities:
  - Evaluate conditionalOn rules to show/hide fields
  - Apply half-width layout: consecutive half fields render in a grid row
  - Render DynamicField for each visible field
  - Manage the 2-column grid layout
```

**Layout Algorithm:**
```
for each field in fields:
  if field has conditionalOn and condition not met → skip
  if field.half === true:
    accumulate in currentRow
    if currentRow has 2 fields → flush as grid-cols-2 div
  else:
    flush any pending currentRow
    render as full-width div
```

### 3.4 Modified: `src/components/quote/QuoteForm.tsx`

**Changes:**
- Import `DynamicFormFields` and product config
- Replace all product-specific conditional blocks with:

```tsx
const config = PRODUCT_CONFIGS[productId];

// In JSX:
<DynamicFormFields
  fields={config.quoteFields}
  values={fieldValues}
  onChange={handleFieldChange}
  errors={fieldErrors}
/>
```

- Replace `handleSubmit` data assembly with:

```tsx
// Collect details from config fields
const details: Record<string, string> = {};
for (const field of config.quoteFields) {
  details[field.name] = fieldValues[field.name] || "";
}
const data = { ...base, details };
```

**State management change:**
- Current: direct DOM access via `form.elements.namedItem()`
- Proposed: controlled components with `useState<Record<string, string | number>>({})`
- Reason: needed for conditional field evaluation and validation

### 3.5 Modified: `src/components/quote/ManagedQuoteForm.tsx`

Identical pattern to QuoteForm changes. The only difference:
- Includes budget field (stays hardcoded as it's common to all managed quotes)
- Type is `"managed_quote"` instead of `"quote_request"`

Both forms share `DynamicFormFields` — the product-specific sections are identical because they read from the same `config.quoteFields`.

### 3.6 Modified: `src/components/operator/AutoQuoteConfig.tsx`

**Changes:**
- Remove `MinibusConfig`, `SkipConfig`, `VanConfig`, `LocksmithConfig` components
- Replace product-specific conditional blocks with:

```tsx
const config = PRODUCT_CONFIGS[product as ProductId];

// In JSX (replaces all product === "xxx" blocks):
{config.autoQuoteFields && config.autoQuoteFields.length > 0 ? (
  <DynamicFormFields
    fields={config.autoQuoteFields}
    values={configValues}
    onChange={handleConfigChange}
    errors={{}}
  />
) : (
  <p className="text-sm text-text-light">
    No configuration options available for this product yet.
  </p>
)}
```

- The existing `NumberField` component is superseded by `DynamicField` handling `type: "number"`
- The nested config structure (e.g. `prices.mini`) is handled by dot-notation in field names, with a utility to get/set nested values

---

## 4. Validation Architecture

### 4.1 New File: `src/lib/formValidation.ts`

```ts
import { z } from "zod";
import type { FormFieldConfig } from "./formFieldTypes";

/**
 * Generates a Zod schema from an array of field configs.
 * Used for both client-side and server-side validation.
 */
export function generateZodSchema(fields: FormFieldConfig[]): z.ZodObject<any> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    let validator: z.ZodTypeAny;

    switch (field.type) {
      case "number":
        validator = z.coerce.number();
        if (field.min !== undefined) validator = (validator as z.ZodNumber).min(field.min as number);
        if (field.max !== undefined) validator = (validator as z.ZodNumber).max(field.max as number);
        break;
      case "email":
        validator = z.string().email();
        break;
      case "select":
      case "radio":
        if (field.options) {
          validator = z.enum(field.options.map(o => o.value) as [string, ...string[]]);
        } else {
          validator = z.string();
        }
        break;
      default:
        validator = z.string();
    }

    if (!field.required) {
      validator = validator.optional().or(z.literal(""));
    }

    shape[field.name] = validator;
  }

  return z.object(shape);
}

/**
 * Validates form values against field configs.
 * Returns map of field name → error message, or empty map if valid.
 */
export function validateFields(
  fields: FormFieldConfig[],
  values: Record<string, unknown>
): Record<string, string> {
  const schema = generateZodSchema(fields);
  const result = schema.safeParse(values);

  if (result.success) return {};

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const fieldName = issue.path[0] as string;
    errors[fieldName] = issue.message;
  }
  return errors;
}
```

### 4.2 Client-Side Validation Flow

```
User blurs a field
  → validateFields([that field], { [name]: value })
  → Set error state for that field

User submits form
  → validateFields(allVisibleFields, allValues)
  → If errors: set all error states, focus first error field, abort submit
  → If valid: proceed with API call
```

### 4.3 Server-Side Validation (API Route)

In `/api/leads/route.ts`:

```ts
import { PRODUCT_CONFIGS } from "@/lib/productConfig";
import { validateFields } from "@/lib/formValidation";

// Inside POST handler:
const config = PRODUCT_CONFIGS[body.product as ProductId];
if (config?.quoteFields) {
  const errors = validateFields(config.quoteFields, body.details || {});
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 400 });
  }
}
```

---

## 5. Data Flow

### 5.1 Customer Quote Submission

```
┌──────────────────────────────────────────────────────┐
│ QuoteForm / ManagedQuoteForm                         │
│                                                       │
│  Base fields:   name, email, phone, message           │
│  Dynamic fields: read from config.quoteFields         │
│                                                       │
│  On submit:                                           │
│    1. Collect base fields                             │
│    2. Iterate config.quoteFields → build details {}   │
│    3. Client-side validate                            │
│    4. POST to /api/leads                              │
└───────────────────────┬──────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│ /api/leads (POST)                                     │
│                                                       │
│  1. Parse body                                        │
│  2. Look up PRODUCT_CONFIGS[product]                  │
│  3. Validate body.details against quoteFields schema  │
│  4. INSERT into leads table                           │
│     - base fields → named columns                     │
│     - details → JSONB column (unchanged)              │
│  5. Trigger PostHog event                             │
│  6. Return 200                                        │
└──────────────────────────────────────────────────────┘
```

### 5.2 Operator Auto-Quote Config Save

```
┌──────────────────────────────────────────────────────┐
│ AutoQuoteConfig                                       │
│                                                       │
│  Toggle: enabled/disabled                             │
│  Dynamic fields: read from config.autoQuoteFields     │
│                                                       │
│  On save:                                             │
│    1. Collect all field values                         │
│    2. PUT to /api/operator/auto-quotes                │
│       { slug, product, site, enabled, config: {...} } │
└───────────────────────┬──────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│ /api/operator/auto-quotes (PUT)                       │
│                                                       │
│  1. Auth check                                        │
│  2. UPSERT auto_quote_configs                         │
│     - config column = JSONB (unchanged)               │
│  3. Return 200                                        │
└──────────────────────────────────────────────────────┘
```

---

## 6. File Changes Summary

### New Files

| File | Purpose | Size Estimate |
|------|---------|---------------|
| `src/lib/formFieldTypes.ts` | TypeScript types for field config | ~60 lines |
| `src/components/form/DynamicField.tsx` | Single field renderer | ~150 lines |
| `src/components/form/DynamicFormFields.tsx` | Field list renderer with layout | ~80 lines |
| `src/lib/formValidation.ts` | Zod schema generator + validation helpers | ~80 lines |

### Modified Files

| File | Change | Impact |
|------|--------|--------|
| `src/lib/productConfig.ts` | Add `quoteFields` and `autoQuoteFields` to each product config + extend interface | Large (adds field definitions for all 9 products) |
| `src/components/quote/QuoteForm.tsx` | Replace ~450 lines of conditionals with DynamicFormFields | Major reduction (666 → ~120 lines) |
| `src/components/quote/ManagedQuoteForm.tsx` | Replace ~650 lines of conditionals with DynamicFormFields | Major reduction (902 → ~150 lines) |
| `src/components/operator/AutoQuoteConfig.tsx` | Replace 4 config components with DynamicFormFields | Major reduction (269 → ~80 lines) |
| `src/app/api/leads/route.ts` | Add server-side validation using field config | Small addition (~15 lines) |

### Deleted Code (Within Modified Files)

| Code | Location | Reason |
|------|----------|--------|
| `MinibusConfig` component | AutoQuoteConfig.tsx | Replaced by DynamicFormFields |
| `SkipConfig` component | AutoQuoteConfig.tsx | Replaced by DynamicFormFields |
| `VanConfig` component | AutoQuoteConfig.tsx | Replaced by DynamicFormFields |
| `LocksmithConfig` component | AutoQuoteConfig.tsx | Replaced by DynamicFormFields |
| `NumberField` component | AutoQuoteConfig.tsx | Replaced by DynamicField |
| All `productId === "xxx"` blocks | QuoteForm.tsx | Replaced by config-driven rendering |
| All `productId === "xxx"` blocks | ManagedQuoteForm.tsx | Replaced by config-driven rendering |

### Unchanged Files

| File | Why No Change |
|------|---------------|
| `src/components/operator/ProfileForm.tsx` | Already product-agnostic |
| `src/components/operator/AdvertForm.tsx` | Already product-agnostic |
| `src/lib/db-schema.ts` | JSONB columns handle any structure |
| `src/types/index.ts` | Lead interface stays flexible |

---

## 7. Migration Strategy

### Phase-by-phase approach (not big-bang):

**Phase 1: Foundation (no behaviour change)**
1. Create `formFieldTypes.ts` with type definitions
2. Create `DynamicField.tsx` and `DynamicFormFields.tsx` components
3. Create `formValidation.ts`
4. Unit test the components in isolation with mock field configs

**Phase 2: Config migration (one product at a time)**
1. Add `quoteFields` to the minibus-hire config (the default/most-used product)
2. Modify QuoteForm to use DynamicFormFields for minibus-hire only (feature flag or check for quoteFields existence)
3. Test thoroughly — compare rendered HTML and submitted payloads
4. Once verified, migrate remaining 8 products one at a time
5. After all 9 are migrated, remove the old conditional code paths

**Phase 3: Operator config migration**
1. Add `autoQuoteFields` to the 4 products that have auto-quote configs
2. Modify AutoQuoteConfig to use DynamicFormFields
3. Test operator dashboard for all 4 products
4. Remove old per-product config components

**Phase 4: Managed quote form**
1. Modify ManagedQuoteForm to use DynamicFormFields (same quoteFields)
2. Test all 9 products
3. Remove old conditional code

**Phase 5: Validation**
1. Add client-side validation to DynamicFormFields
2. Add server-side validation to `/api/leads`
3. Test error states and edge cases

### Rollback strategy:
- Each phase is a separate commit/PR
- Old code is only deleted after new code is verified
- The `quoteFields` property is optional on ProductConfig during migration — products without it fall back to old rendering
- If anything breaks, revert the single phase commit

---

## 8. Handling Nested Auto-Quote Config

Some operator configs have nested structures (e.g. skip hire prices by size). Two approaches:

### Option A: Dot-Notation Field Names (Recommended)

```ts
autoQuoteFields: [
  { name: "prices.mini", label: "Mini Skip", type: "number", prefix: "£" },
  { name: "prices.midi", label: "Midi Skip", type: "number", prefix: "£" },
]
```

A utility converts dot-notation to nested objects on save:
```ts
// "prices.mini" = 120 → { prices: { mini: 120 } }
function unflatten(data: Record<string, unknown>): Record<string, unknown>
```

And flattens on load:
```ts
// { prices: { mini: 120 } } → { "prices.mini": 120 }
function flatten(data: Record<string, unknown>): Record<string, unknown>
```

**Pros:** Simple field definitions, no special handling in DynamicField
**Cons:** Need flatten/unflatten utilities

### Option B: Grouped Fields

```ts
autoQuoteFields: [
  {
    name: "prices",
    label: "Skip Prices",
    type: "group",
    children: [
      { name: "mini", label: "Mini Skip", type: "number", prefix: "£" },
      { name: "midi", label: "Midi Skip", type: "number", prefix: "£" },
    ]
  }
]
```

**Pros:** More explicit structure
**Cons:** Adds complexity to type system and renderer

**Recommendation:** Option A (dot-notation). The flatten/unflatten utilities are ~20 lines each and keep the field config flat and simple.

---

## 9. Styling Consistency

All form fields must match the existing design system. The current `inputClass` pattern:

```ts
const inputClass =
  "w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
```

This is currently defined locally in QuoteForm.tsx. It should be:
1. Moved to a shared constant in `DynamicField.tsx` (or a shared styles file)
2. Used consistently by all DynamicField renderings
3. Error state adds: `border-red-500 focus:ring-red-500`

Label styling (also currently inline):
```ts
const labelClass = "block text-sm font-medium text-text mb-1";
```

Error message styling:
```ts
const errorClass = "text-xs text-red-600 mt-1";
```

---

## 10. Testing Strategy

### Unit Tests

| Test | What It Verifies |
|------|-----------------|
| `DynamicField` renders correct element for each field type | Component contract |
| `DynamicField` shows/hides prefix/suffix | Adornment rendering |
| `DynamicFormFields` hides conditional fields when condition not met | Conditional logic |
| `DynamicFormFields` shows conditional fields when condition met | Conditional logic |
| `DynamicFormFields` applies half-width layout correctly | Grid rendering |
| `generateZodSchema` creates correct schema for required fields | Validation contract |
| `generateZodSchema` creates correct schema for select fields with options | Enum validation |
| `validateFields` returns empty errors for valid data | Happy path |
| `validateFields` returns field-level errors for invalid data | Error path |
| `flatten` / `unflatten` handle nested objects | Utility correctness |
| Every product in PRODUCT_CONFIGS has valid quoteFields | Config integrity |
| Every quoteField with type "select" has non-empty options | Config integrity |

### Integration Tests

| Test | What It Verifies |
|------|-----------------|
| QuoteForm renders correct fields for each product | End-to-end rendering |
| QuoteForm submits correct payload structure for each product | Data contract |
| ManagedQuoteForm submits correct payload structure | Data contract |
| AutoQuoteConfig renders and saves for each product with autoQuoteFields | Operator flow |

### Manual Verification Checklist

For each of the 9 products:
- [ ] Quote form renders all expected fields
- [ ] Quote form field order matches current production
- [ ] Required fields show validation errors when empty
- [ ] Select dropdowns contain all correct options
- [ ] Conditional fields show/hide correctly
- [ ] Form submission sends correct JSON to `/api/leads`
- [ ] Managed quote form renders same product fields + budget
- [ ] Operator auto-quote config renders correct pricing fields
- [ ] Operator auto-quote config saves and loads correctly

---

## 11. Dependencies

### New Package: Zod

```bash
npm install zod
```

- Already widely used in Next.js ecosystems
- Zero runtime dependencies
- ~13KB gzipped
- Used for both client and server validation

### No Other New Dependencies

- No form library (React Hook Form, Formik, etc.) — the config-driven approach with controlled components is simpler for this use case
- No UI component library — maintains existing Tailwind approach
- Fuse.js for search is a **separate initiative**, not part of this work

---

## 12. Performance Considerations

| Concern | Assessment |
|---------|------------|
| Bundle size increase | Minimal — field configs are small JSON, Zod is ~13KB |
| Runtime rendering | Faster — single map() call vs. 9 conditional evaluations |
| productConfig.ts file size growth | Moderate — field configs add ~30-50 lines per product. At 60 products, ~3000 lines of field config. Consider splitting into separate files per product if it becomes unwieldy |
| Validation performance | Negligible — Zod schema generation is cheap, runs once per form mount |

### Config Splitting (Future)

If `productConfig.ts` becomes too large at 60+ products:

```ts
// src/lib/products/skip-hire.ts
export const skipHireConfig: ProductConfig = { ... };

// src/lib/products/index.ts
import { skipHireConfig } from "./skip-hire";
export const PRODUCT_CONFIGS = { "skip-hire": skipHireConfig, ... };
```

This is a simple refactor when needed and doesn't affect any component code.

---

## 13. Decision Log

| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| Config in TypeScript, not JSON/YAML | Type safety, IDE autocompletion, can coexist with existing config | JSON files (no type safety), DB-driven (overkill for dev-authored config) |
| Controlled components over uncontrolled | Needed for conditional field evaluation and validation | Keep current `form.elements.namedItem()` approach (can't evaluate conditionals) |
| Zod for validation | Lightweight, TypeScript-native, works client and server | Yup (heavier), manual validation (error-prone), JSON Schema (less ergonomic) |
| No React Hook Form | Config-driven fields with simple state is sufficient; RHF adds abstraction without clear benefit here | React Hook Form (extra dependency, learning curve, registration pattern doesn't fit config-driven approach well) |
| Dot-notation for nested config | Keeps field definitions flat and simple | Grouped field type (more complex type system and renderer) |
| Phase-by-phase migration | Reduces risk, allows verification at each step | Big-bang rewrite (higher risk, harder to debug issues) |
| quoteFields shared between QuoteForm and ManagedQuoteForm | Single source of truth; they already share the same product-specific fields | Separate field configs per form type (duplication) |
