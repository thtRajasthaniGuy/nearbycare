import React from "react";

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  touched?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export default function FormSelect({
  id,
  name,
  label,
  required = false,
  value,
  onChange,
  onBlur,
  error,
  touched,
  options,
  placeholder = "Select an option",
}: FormSelectProps) {
  const hasError = touched && error;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[var(--text-dark)]"
      >
        {label}
        {required && (
          <span className="text-[var(--primary-color)] ml-1">*</span>
        )}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-20
          text-[var(--text-dark)] appearance-none cursor-pointer
          bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgN0wxMCAxMkwxNSA3IiBzdHJva2U9IiM2QjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=')] bg-[length:20px_20px] bg-[right_1rem_center] bg-no-repeat
          ${
            hasError
              ? "border-red-400 bg-red-50"
              : "border-gray-200 hover:border-gray-300 focus:border-[var(--primary-color)]"
          }
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <p className="text-sm text-red-600 flex items-center gap-1 animate-in fade-in duration-200">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
