// components/map/SearchBar.tsx
"use client";
import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
}) => {
  return (
    <div className="absolute top-4 left-4 z-10 w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-2 flex items-center gap-3 backdrop-blur-sm border border-gray-100 transition-all duration-200 hover:shadow-2xl">
        <div className="ml-2 p-2.5 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl">
          <Search className="text-white" size={20} />
        </div>
        <input
          type="text"
          placeholder="Search NGOs, categories, cities..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 py-3 px-2 outline-none text-sm font-medium text-[var(--text-dark)] placeholder:text-gray-400"
        />
        {value && (
          <button
            onClick={onClear}
            className="mr-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} className="text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};
