"use client";

const CONTACT_METHODS = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "sms", label: "SMS" },
];

interface ContactConsentProps {
  allowed: boolean;
  methods: string[];
  onAllowedChange: (allowed: boolean) => void;
  onMethodsChange: (methods: string[]) => void;
}

export default function ContactConsent({
  allowed,
  methods,
  onAllowedChange,
  onMethodsChange,
}: ContactConsentProps) {
  function toggleMethod(value: string) {
    if (methods.includes(value)) {
      onMethodsChange(methods.filter((m) => m !== value));
    } else {
      onMethodsChange([...methods, value]);
    }
  }

  return (
    <div className="border border-accent/30 rounded-lg p-4 bg-accent/5">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={allowed}
          onChange={(e) => {
            onAllowedChange(e.target.checked);
            if (!e.target.checked) onMethodsChange([]);
          }}
          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
          data-testid="allow-direct-contact"
        />
        <div>
          <span className="text-sm font-medium text-text">
            Let businesses compete for my job
          </span>
          <p className="text-xs text-text-light mt-0.5">
            Interested businesses can contact you directly &mdash; giving you more quotes, faster responses, and the chance to negotiate the best deal
          </p>
        </div>
      </label>

      {allowed && (
        <div className="mt-3 ml-7">
          <p className="text-xs text-text-light mb-2">How would you like to be contacted?</p>
          <div className="flex flex-wrap gap-2" data-testid="contact-methods">
            {CONTACT_METHODS.map((method) => (
              <label
                key={method.value}
                className={`inline-flex items-center px-3 py-1.5 border rounded-lg text-sm cursor-pointer transition-colors ${
                  methods.includes(method.value)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-text hover:border-primary/50"
                }`}
              >
                <input
                  type="checkbox"
                  value={method.value}
                  checked={methods.includes(method.value)}
                  onChange={() => toggleMethod(method.value)}
                  className="sr-only"
                />
                {method.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
