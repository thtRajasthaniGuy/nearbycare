"use client";

import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchNGOSectionProps {
  className?: string;
}

export default function SearchNGOSection({
  className = "",
}: SearchNGOSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(
        `/searchngo?location=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const selectCity = (city: string) => {
    setSearchQuery(city);
    router.push(`/searchngo?location=${encodeURIComponent(city)}`);
  };

  return (
    <section className={`py-16 px-4 md:py-24 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--text-dark)]">
            Find NGOs Near You
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover verified social organizations making a difference in your
            community
          </p>
        </div>

        <div className="relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />

            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-5">
                <MapPin
                  className="text-[var(--primary-color)] flex-shrink-0"
                  size={24}
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your city (e.g., Jaipur, Mumbai)"
                  className="flex-1 text-base md:text-lg outline-none text-[var(--text-dark)] placeholder:text-gray-400"
                />

                <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  <Search size={20} />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-3">Popular locations:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Mumbai", "Delhi", "Bangalore", "Jaipur", "Pune", "Chennai"].map(
              (city) => (
                <button
                  key={city}
                  onClick={() => selectCity(city)}
                  className="px-4 py-2 rounded-full border border-gray-200 hover:border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white text-sm text-gray-600 transition-all duration-300"
                >
                  {city}
                </button>
              )
            )}
          </div>
        </div>

        {/* <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-2">
              500+
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Verified NGOs
            </div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="text-3xl md:text-4xl font-bold text-[var(--secondary-color)] mb-2">
              50+
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Cities Covered
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-2">
              10k+
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Lives Impacted
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
