"use client";

import type { FormFieldConfig } from "@/lib/formFieldTypes";
import DynamicField from "./DynamicField";

interface DynamicFormFieldsProps {
  fields: FormFieldConfig[];
  values: Record<string, string | number>;
  onChange: (name: string, value: string | number) => void;
  errors?: Record<string, string>;
}

function isConditionMet(
  field: FormFieldConfig,
  values: Record<string, string | number>
): boolean {
  if (!field.conditionalOn) return true;
  const { field: depField, value: expected } = field.conditionalOn;
  const actual = String(values[depField] ?? "");
  if (Array.isArray(expected)) {
    return expected.includes(actual);
  }
  return actual === expected;
}

export default function DynamicFormFields({
  fields,
  values,
  onChange,
  errors = {},
}: DynamicFormFieldsProps) {
  const visibleFields = fields.filter((f) => isConditionMet(f, values));

  // Group consecutive half-width fields into rows
  const rows: (FormFieldConfig | FormFieldConfig[])[] = [];
  let halfBuffer: FormFieldConfig[] = [];

  for (const field of visibleFields) {
    if (field.half) {
      halfBuffer.push(field);
      if (halfBuffer.length === 2) {
        rows.push(halfBuffer);
        halfBuffer = [];
      }
    } else {
      // Flush any pending half-width field as a solo
      if (halfBuffer.length > 0) {
        rows.push(halfBuffer[0]);
        halfBuffer = [];
      }
      rows.push(field);
    }
  }
  // Flush remaining half-width field
  if (halfBuffer.length > 0) {
    rows.push(halfBuffer[0]);
  }

  return (
    <>
      {rows.map((row) => {
        if (Array.isArray(row)) {
          // Two half-width fields in a grid row
          return (
            <div
              key={`${row[0].name}-${row[1].name}`}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {row.map((field) => (
                <DynamicField
                  key={field.name}
                  field={field}
                  value={values[field.name] ?? ""}
                  onChange={onChange}
                  error={errors[field.name]}
                />
              ))}
            </div>
          );
        }
        // Full-width field
        return (
          <DynamicField
            key={row.name}
            field={row}
            value={values[row.name] ?? ""}
            onChange={onChange}
            error={errors[row.name]}
          />
        );
      })}
    </>
  );
}
