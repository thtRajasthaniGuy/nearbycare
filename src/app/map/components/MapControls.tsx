// components/map/MapControls.tsx
"use client";
import React from "react";
import { Navigation } from "lucide-react";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onLocate,
}) => {
  return (
    <div className="absolute top-24 right-4 flex flex-col gap-2 z-10">
      <button
        onClick={onZoomIn}
        className="bg-white hover:bg-gray-50 p-3.5 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 border border-gray-100"
        aria-label="Zoom in"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-gray-700"
        >
          <line x1="10" y1="5" x2="10" y2="15" />
          <line x1="5" y1="10" x2="15" y2="10" />
        </svg>
      </button>
      <button
        onClick={onZoomOut}
        className="bg-white hover:bg-gray-50 p-3.5 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 border border-gray-100"
        aria-label="Zoom out"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-gray-700"
        >
          <line x1="5" y1="10" x2="15" y2="10" />
        </svg>
      </button>
      <div className="h-px bg-gray-200 my-1" />
      <button
        onClick={onLocate}
        className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] hover:opacity-90 p-3.5 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 text-white"
        aria-label="My location"
      >
        <Navigation size={20} />
      </button>
    </div>
  );
};
