import React from "react";

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  touched?: boolean;
  showCharCount?: boolean;
}

export default function FormTextarea({
  id,
  name,
  label,
  required = false,
  placeholder,
  maxLength,
  rows = 4,
  value,
  onChange,
  onBlur,
  error,
  touched,
  showCharCount = false,
}: FormTextareaProps) {
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
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-20
          placeholder:text-gray-400 text-[var(--text-dark)] resize-none
          ${
            hasError
              ? "border-red-400 bg-red-50"
              : "border-gray-200 hover:border-gray-300 focus:border-[var(--primary-color)]"
          }
        `}
      />
      <div className="flex justify-between items-center">
        {hasError ? (
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
        ) : (
          <div />
        )}
        {showCharCount && maxLength && (
          <span className="text-xs text-gray-500 font-medium">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
