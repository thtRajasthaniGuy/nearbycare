"use client";

import { Package, Plus, Heart, Users } from "lucide-react";

interface EmptyWishlistStateProps {
  onAddClick: () => void;
}

export default function EmptyWishlistState({
  onAddClick,
}: EmptyWishlistStateProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-full mb-6">
          <Package className="w-12 h-12 text-[var(--primary-color)]" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[var(--text-dark)] mb-3">
          No Needs Listed Yet
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Share what your organization needs. Help donors understand exactly how
          they can make a difference.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-[var(--text-dark)] mb-1">
              Attract Donors
            </h4>
            <p className="text-sm text-gray-600">
              Show what you need to receive targeted support
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-[var(--text-dark)] mb-1">
              Build Trust
            </h4>
            <p className="text-sm text-gray-600">
              Transparency builds confidence with supporters
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-[var(--text-dark)] mb-1">
              Track Progress
            </h4>
            <p className="text-sm text-gray-600">
              Mark items as fulfilled when received
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] hover:opacity-90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Plus className="w-6 h-6" />
          Add Your First Need
        </button>

        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-6">
          Examples: Rice bags, Blankets, Medical supplies, Volunteers for events
        </p>
      </div>
    </div>
  );
}
