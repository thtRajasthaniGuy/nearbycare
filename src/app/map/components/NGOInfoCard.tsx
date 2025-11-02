// components/map/NGOInfoCard.tsx
"use client";
import React from "react";
import { Heart, Users, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface NGOInfoCardProps {
  ngo: {
    id: string; // Add id
    name: string;
    category: string;
    city?: string;
    description?: string;
    volunteers?: number;
    established?: string;
    type?: string;
    slug?: string; // Add slug
  };
  categoryColor: string;
  onClose: () => void;
}

export const NGOInfoCard: React.FC<NGOInfoCardProps> = ({
  ngo,
  categoryColor,
  onClose,
}) => {
  // const router = useRouter();

  // const handleViewDetails = () => {
  //   // Use slug if available, otherwise use id or name
  //   const identifier =
  //     ngo.slug || ngo.id || ngo.name.toLowerCase().replace(/\s+/g, "-");
  //   router.push(`/ngo/${identifier}`);
  // }

  const router = useRouter();

  const handleViewDetails = () => {
    if (!ngo) return;

    const slug =
      ngo.slug ||
      (ngo.name
        ? ngo.name
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-") // safer: removes special chars
            .replace(/^-+|-+$/g, "") // trim extra dashes
        : ngo.id);

    router.push(`/map/${slug}`);
  };

  return (
    <div className="absolute bottom-28 left-6 bg-white rounded-3xl shadow-2xl p-6 z-20 w-full max-w-md animate-slide-up border border-gray-100">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
      >
        <X size={18} className="text-gray-400" />
      </button>

      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${categoryColor}20, ${categoryColor}10)`,
          }}
        >
          <Heart size={28} style={{ color: categoryColor }} />
        </div>
        <div className="flex-1 pt-1">
          <h3 className="font-bold text-xl text-[var(--text-dark)] mb-2 leading-tight">
            {ngo.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            {ngo.type && (
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{
                  backgroundColor: `${categoryColor}15`,
                  color: categoryColor,
                }}
              >
                {ngo.type}
              </span>
            )}
            {ngo.city && (
              <span className="text-xs text-gray-500 font-medium">
                📍 {ngo.city}
              </span>
            )}
          </div>
        </div>
      </div>

      {ngo.description && (
        <p className="text-sm text-gray-600 mb-5 leading-relaxed line-clamp-3">
          {ngo.description}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleViewDetails}
          className="flex-1 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] hover:opacity-90 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
