"use client";

import type { FormFieldConfig } from "@/lib/formFieldTypes";

const inputClass =
  "w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
const inputErrorClass =
  "w-full border border-red-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent";
const labelClass = "block text-sm font-medium text-text mb-1";

interface DynamicFieldProps {
  field: FormFieldConfig;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  error?: string;
}

export default function DynamicField({ field, value, onChange, error }: DynamicFieldProps) {
  const cls = error ? inputErrorClass : inputClass;
  const displayValue = value ?? field.defaultValue ?? "";
  const requiredMark = field.required ? " *" : "";

  const handleChange = (val: string | number) => {
    onChange(field.name, val);
  };

  const renderInput = () => {
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={displayValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={3}
            className={cls}
          />
        );

      case "select":
        return (
          <select
            id={field.name}
            name={field.name}
            value={displayValue}
            onChange={(e) => handleChange(e.target.value)}
            required={field.required}
            className={cls}
          >
            {field.placeholder && <option value="">{field.placeholder}</option>}
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="flex flex-wrap gap-2">
            {field.options?.map((opt) => (
              <label
                key={opt.value}
                className={`inline-flex items-center px-3 py-2 border rounded-lg text-sm cursor-pointer transition-colors ${
                  String(displayValue) === opt.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-text hover:border-primary/50"
                }`}
              >
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={String(displayValue) === opt.value}
                  onChange={(e) => handleChange(e.target.value)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            ))}
          </div>
        );

      case "number":
        return (
          <div className="flex items-center">
            {field.prefix && (
              <span className="text-text-light mr-1 text-sm">{field.prefix}</span>
            )}
            <input
              type="number"
              id={field.name}
              name={field.name}
              value={displayValue}
              onChange={(e) => handleChange(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder={field.placeholder}
              required={field.required}
              min={field.min as number | undefined}
              max={field.max as number | undefined}
              className={cls}
            />
            {field.suffix && (
              <span className="text-text-light ml-1 text-sm">{field.suffix}</span>
            )}
          </div>
        );

      case "date":
      case "time":
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={displayValue}
            onChange={(e) => handleChange(e.target.value)}
            required={field.required}
            min={field.min as string | undefined}
            max={field.max as string | undefined}
            className={cls}
          />
        );

      default:
        // text, email, tel
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={displayValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={cls}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={field.name} className={labelClass}>
        {field.label}{requiredMark}
      </label>
      {renderInput()}
      {field.helpText && (
        <p className="text-xs text-text-light mt-1">{field.helpText}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}
