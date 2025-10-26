"use client";
import React, { useState } from "react";
import { Layers, ChevronDown } from "lucide-react";

const MAP_STYLES = [
  {
    id: "light",
    name: "Light",
    url: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  },
  {
    id: "streets",
    name: "Streets",
    url: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  },
  {
    id: "dark",
    name: "Dark",
    url: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  },
];

interface MapStyleSelectorProps {
  currentStyle: string;
  onStyleChange: (styleUrl: string) => void;
}

export const MapStyleSelector: React.FC<MapStyleSelectorProps> = ({
  currentStyle,
  onStyleChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentStyleObj = MAP_STYLES.find((s) => s.url === currentStyle);

  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white hover:bg-gray-50 px-4 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl flex items-center gap-2 backdrop-blur-sm border border-gray-100"
      >
        <Layers size={18} className="text-[var(--primary-color)]" />
        <span className="font-semibold text-sm text-[var(--text-dark)]">
          {currentStyleObj?.name}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 bg-white rounded-xl shadow-2xl p-2 min-w-[160px] animate-slide-down border border-gray-100">
          {MAP_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => {
                onStyleChange(style.url);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                currentStyle === style.url
                  ? "bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-opacity-10 text-[var(--primary-color)]"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <span className="font-medium text-sm">{style.name}</span>
              {currentStyle === style.url && (
                <div className="w-2 h-2 rounded-full bg-[var(--primary-color)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
