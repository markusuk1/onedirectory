import { z } from "zod";
import type { FormFieldConfig } from "./formFieldTypes";

/**
 * Generates a Zod schema from an array of field configs.
 * Used for both client-side and server-side validation.
 */
export function generateZodSchema(fields: FormFieldConfig[]): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    let validator: z.ZodTypeAny;

    switch (field.type) {
      case "number":
        validator = z.coerce.number();
        if (typeof field.min === "number")
          validator = (validator as z.ZodNumber).min(field.min);
        if (typeof field.max === "number")
          validator = (validator as z.ZodNumber).max(field.max);
        break;
      case "email":
        validator = z.string().email();
        break;
      case "select":
      case "radio":
        if (field.options && field.options.length > 0) {
          validator = z.enum(
            field.options.map((o) => o.value) as [string, ...string[]]
          );
        } else {
          validator = z.string();
        }
        break;
      default:
        validator = z.string();
    }

    if (field.requiresPostcode && (field.type === "text" || field.type === "textarea")) {
      const postcodePattern = /[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}/i;
      validator = (validator as z.ZodString).refine(
        (val) => postcodePattern.test(val),
        { message: "Please include a full UK postcode (e.g. NE1 4ST)" }
      );
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
 * Returns map of field name -> error message, or empty map if valid.
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
