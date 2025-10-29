"use client";
import React from "react";
import { Search, X, Loader2 } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  searchType?: "city_state" | "address";
  radius?: number;
  onRadiusChange?: (radius: number) => void;
  resultsCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  isLoading = false,
  searchType = "city_state",
  radius = 5,
  onRadiusChange,
  resultsCount = 0,
}) => {
  return (
    <div className="absolute top-4 left-4 z-10 w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-2 backdrop-blur-sm border border-gray-100 transition-all duration-200 hover:shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="ml-2 p-2.5 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl">
            {isLoading ? (
              <Loader2 className="text-white animate-spin" size={20} />
            ) : (
              <Search className="text-white" size={20} />
            )}
          </div>
          <input
            type="text"
            placeholder="Search by city, state, or address..."
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

        {value && searchType === "address" && onRadiusChange && (
          <div className="mt-2 px-2 pb-1">
            <select
              value={radius}
              onChange={(e) => onRadiusChange(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-gray-50"
            >
              <option value={2}>Within 2 km</option>
              <option value={5}>Within 5 km</option>
              <option value={10}>Within 10 km</option>
              <option value={20}>Within 20 km</option>
              <option value={50}>Within 50 km</option>
            </select>
          </div>
        )}

        {value && !isLoading && (
          <div className="mt-2 px-4 pb-2 text-xs text-gray-500">
            {searchType === "city_state"
              ? `${resultsCount} organizations found`
              : `${resultsCount} organizations within ${radius}km`}
          </div>
        )}
      </div>
    </div>
  );
};
