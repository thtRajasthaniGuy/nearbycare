// components/search/NGOCard.tsx
"use client";

import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import type { NGO } from "./SearchNGOContent";
interface NGOCardProps {
  ngo: NGO;
  location: string;
}
export default function NGOCard({ ngo, location }: NGOCardProps) {
  const router = useRouter();
  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 hover:border-[var(--primary-color)]/30 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={() => router.push(`/searchngo/${ngo.slug}/${location}`)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-[var(--text-dark)] group-hover:text-[var(--primary-color)] transition-colors">
                {ngo?.name}
              </h3>
              {ngo && (
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
              {ngo.type}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{ngo.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin
              size={16}
              className="text-[var(--primary-color)] flex-shrink-0"
            />
            <span className="line-clamp-1">{ngo.address?.city}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <a
            href={`tel:${ngo.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-[var(--primary-color)] text-[var(--primary-color)] hover:text-white rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <Phone size={16} />
            <span className="hidden sm:inline">Call</span>
          </a>

          <a
            href={`mailto:${ngo.email}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-[var(--primary-color)] text-[var(--primary-color)] hover:text-white rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">Email</span>
          </a>

          {/* <a
            href={`https://${ngo.website}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-[var(--primary-color)] text-[var(--primary-color)] hover:text-white rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <Globe size={16} />
            <span className="hidden sm:inline">Visit</span>
          </a> */}
        </div>
      </div>
    </div>
  );
}
