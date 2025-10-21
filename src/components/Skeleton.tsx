// components/InlineSkeleton.tsx
import React from "react";

interface InlineSkeletonProps {
  width?: string; // Tailwind width class like 'w-16', 'w-24'
  height?: string; // Tailwind height class like 'h-4', 'h-6'
  className?: string;
}

const InlineSkeleton: React.FC<InlineSkeletonProps> = ({
  width = "w-16",
  height = "h-4",
  className = "",
}) => {
  return (
    <span
      className={`inline-block ${width} ${height} bg-gray-300 dark:bg-gray-700 rounded animate-pulse ${className}`}
    />
  );
};

export default InlineSkeleton;
