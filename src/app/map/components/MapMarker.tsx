// components/map/MapMarker.tsx
"use client";
import React from "react";

interface MapMarkerProps {
  categoryColor: string;
  onClick: () => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  categoryColor,
  onClick,
}) => {
  return (
    <div className="ngo-marker" onClick={onClick}>
      <div className="marker-container">
        <div className="marker-pin" style={{ background: categoryColor }}>
          <div className="marker-pin-inner"></div>
        </div>
      </div>
    </div>
  );
};

// Add these styles to your main component or global CSS
export const markerStyles = `
  .ngo-marker {
    cursor: pointer;
    position: relative;
    width: 40px;
    height: 40px;
  }

  .marker-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .marker-pin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    border: 3px solid white;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .ngo-marker:hover .marker-pin {
    transform: translate(-50%, -50%) scale(1.25);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  }

  .marker-pin-inner {
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
  }
`;
