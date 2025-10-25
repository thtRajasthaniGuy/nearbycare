"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Heart,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
  Filter,
  X,
} from "lucide-react";
import NavBar from "@/components/NavBar";

// Mock NGO data - replace with actual Firebase data later
const mockNGOs = [
  {
    id: "1",
    name: "Smile Foundation",
    category: "Education",
    description:
      "Working towards education and welfare of underprivileged children across India",
    location: "Jaipur, Rajasthan",
    address: "Vaishali Nagar, Jaipur, Rajasthan, 302021",
    phone: "+91 98765 43210",
    email: "contact@smilefoundation.org",
    website: "www.smilefoundation.org",
    verified: true,
    distance: "2.5 km",
  },
  {
    id: "2",
    name: "Akshaya Patra Foundation",
    category: "Food & Nutrition",
    description:
      "Providing mid-day meals to school children and fighting hunger",
    location: "Jaipur, Rajasthan",
    address: "Malviya Nagar, Jaipur, Rajasthan, 302017",
    phone: "+91 98765 43211",
    email: "info@akshayapatra.org",
    website: "www.akshayapatra.org",
    verified: true,
    distance: "4.1 km",
  },
  {
    id: "3",
    name: "Goonj",
    category: "Disaster Relief",
    description: "Turning urban waste into rural development resource",
    location: "Jaipur, Rajasthan",
    address: "C-Scheme, Jaipur, Rajasthan, 302001",
    phone: "+91 98765 43212",
    email: "contact@goonj.org",
    website: "www.goonj.org",
    verified: true,
    distance: "5.8 km",
  },
];

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

function SearchNGOContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const location = searchParams.get("location") || "";

  const [searchQuery, setSearchQuery] = useState(location);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [ngos, setNgos] = useState(mockNGOs);

  useEffect(() => {
    // TODO: Fetch NGOs from Firebase based on location
    console.log("Searching for NGOs in:", location);
  }, [location]);

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

  const filteredNGOs =
    selectedCategory === "All"
      ? ngos
      : ngos.filter((ngo) => ngo.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar onSubmitClick={() => {}} />

      {/* Hero Section with Search */}
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
            NGOs in {location || "Your Area"}
          </h1>
          <p className="text-white/90 mb-8 text-lg">
            {filteredNGOs.length} verified organizations found
          </p>

          {/* Search Bar */}
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

                <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Search size={20} />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
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

      {/* Results Section */}
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
              <NGOCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NGOCard({ ngo }: { ngo: any }) {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 hover:border-[var(--primary-color)]/30 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={() => router.push(`/searchngo/${ngo.id}`)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-[var(--text-dark)] group-hover:text-[var(--primary-color)] transition-colors">
                {ngo.name}
              </h3>
              {ngo.verified && (
                <div className="w-5 h-5 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <span className="inline-block px-3 py-1 bg-[var(--secondary-color)]/10 text-[var(--secondary-color)] rounded-full text-sm font-medium">
              {ngo.category}
            </span>
          </div>

          {/* <button className="w-10 h-10 rounded-full bg-gray-50 hover:bg-[var(--primary-color)] hover:text-white flex items-center justify-center transition-all duration-300 group/heart">
            <Heart size={18} className="group-hover/heart:fill-current" />
          </button> */}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{ngo.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin
              size={16}
              className="text-[var(--primary-color)] flex-shrink-0"
            />
            <span className="line-clamp-1">{ngo.address}</span>
          </div>
          {/* {ngo.distance && (
            <div className="text-sm text-[var(--primary-color)] font-medium">
              📍 {ngo.distance} away
            </div>
          )} */}
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <a
            href={`tel:${ngo.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-[var(--primary-color)] hover:text-white rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <Phone size={16} />
            <span className="hidden sm:inline">Call</span>
          </a>
          <a
            href={`mailto:${ngo.email}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-[var(--primary-color)] hover:text-white rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">Email</span>
          </a>
          <a
            href={`https://${ngo.website}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-[var(--primary-color)] hover:text-white rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <Globe size={16} />
            <span className="hidden sm:inline">Visit</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SearchNGOPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading NGOs...</p>
          </div>
        </div>
      }
    >
      <SearchNGOContent />
    </Suspense>
  );
}
