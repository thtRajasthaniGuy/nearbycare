"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import NGOCard from "./NgoSearchCard";
import { MapPin, Search, Filter, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getOrganizationByCityName } from "@/api/ngo";
import { useDebounce } from "@/hooks/useDebounce";

export type NGO = {
  name: string;
  type: string;
  tagline: string;
  description: string;
  phone: string;
  alternatePhone: string;
  email: string;
  facebook: string;
  instagram: string;
  twitter: string;
  address: any;
  contact?: any;
  slug?: string;
  images?: [];
  wishlist?: [];
};

const categories = [
  "All",
  "Education",
  "Healthcare",
  "Environment",
  "Food & Nutrition",
  "Disaster Relief",
  "Animal Welfare",
  "Women Empowerment",
];

interface Props {
  initialLocation?: string;
}

export default function SearchNGOContent({ initialLocation = "" }: Props) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(initialLocation);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const { data: ngos = [], isLoading } = useQuery({
    queryKey: ["ngos", debouncedSearchQuery],
    queryFn: () => getOrganizationByCityName(debouncedSearchQuery),
    enabled: Boolean(debouncedSearchQuery),
    staleTime: 1000 * 60 * 10,
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    router.push(
      `/searchngo?location=${encodeURIComponent(searchQuery.trim())}`
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };
  const filteredNGOs = ngos;

  if (isLoading) {
    return <div className="text-center py-10">Searching NGOs...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar onSubmitClick={() => {}} />

      <div className="bg-gradient-to-br from-[var(--background-light)] to-[var(--secondary-color)] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            NGOs in {initialLocation || "Your Area"}
          </h1>
          <p className="text-white/90 mb-8 text-lg">
            {filteredNGOs.length} verified organizations found
          </p>

          <div className="relative max-w-3xl">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4">
                <MapPin
                  className="text-[var(--primary-color)] flex-shrink-0"
                  size={24}
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search by location..."
                  className="flex-1 text-base md:text-lg outline-none text-[var(--text-dark)] placeholder:text-gray-400"
                />

                {/* <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Search size={20} />
                  <span className="hidden sm:inline">Search</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[var(--primary-color)] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors lg:hidden"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredNGOs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No NGOs Found
            </h3>
            <p className="text-gray-600">
              Try searching for a different location or category
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredNGOs.map((ngo) => (
              <NGOCard key={ngo.name} ngo={ngo} location={initialLocation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
