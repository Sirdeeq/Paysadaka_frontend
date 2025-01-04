import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormField {
  name?: string;
  label?: string;
  type: string; // "text", "number", "select", "custom", etc.
  placeholder?: string;
  required?: boolean;
  options?: Option[];
  value?: string | number;
  disabled?: boolean;
  render?: () => React.ReactNode; // Add this for custom fields
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string | number>) => void;
  submitLabel: string;
}

export const Form: React.FC<FormProps> = ({ fields, onSubmit, submitLabel }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as Record<string, string | number>;
    console.log('Form Data:', data); // Log data to console
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {fields.map((field) => (
          <div key={field.name || Math.random()}>
            {field.type === 'custom' ? (
              field.render?.()
            ) : (
              <>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field.label}
                </label>
                {field.type === 'select' && field.options ? (
                  <select
                    name={field.name}
                    id={field.name}
                    required={field.required}
                    disabled={field.disabled}
                    defaultValue={field.value}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 disabled:bg-gray-100"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    defaultValue={field.value}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 disabled:bg-gray-100"
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};
