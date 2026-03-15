export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "date"
  | "time"
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
  /** Require value to contain a full UK postcode (e.g. NE1 4ST) */
  requiresPostcode?: boolean;
}
