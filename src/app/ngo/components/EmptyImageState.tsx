"use client";

import { Upload, Image, Eye, Heart } from "lucide-react";

interface EmptyImageStateProps {
  onUploadClick: () => void;
}

export default function EmptyImageState({
  onUploadClick,
}: EmptyImageStateProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-full mb-6">
          <Image className="w-12 h-12 text-[var(--primary-color)]" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[var(--text-dark)] mb-3">
          No Images Yet
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Upload photos to showcase your organization's work and build trust
          with donors and volunteers.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-[var(--text-dark)] mb-1">
              Increase Visibility
            </h4>
            <p className="text-sm text-gray-600">
              Stand out with compelling visual stories
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-[var(--text-dark)] mb-1">
              Build Trust
            </h4>
            <p className="text-sm text-gray-600">
              Show transparency through authentic photos
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <Image className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-[var(--text-dark)] mb-1">
              Tell Your Story
            </h4>
            <p className="text-sm text-gray-600">
              Share the impact of your work visually
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onUploadClick}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] hover:opacity-90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Upload className="w-6 h-6" />
          Upload Your First Image
        </button>

        {/* Help Text */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Upload high-quality images that showcase
            your work, team, beneficiaries, and facilities. You can add up to 5
            images.
          </p>
        </div>
      </div>
    </div>
  );
}
