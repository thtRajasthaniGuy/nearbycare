import React from "react";

interface StepHeaderProps {
  currentStep: number;
}

const stepInfo = {
  1: {
    title: "Organization Details",
    description: "Tell us about your organization",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  2: {
    title: "Location & Contact",
    description: "Where are you located?",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  3: {
    title: "Social Media",
    description: "Connect your social profiles",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
    ),
  },
};

export default function StepHeader({ currentStep }: StepHeaderProps) {
  const info = stepInfo[currentStep as keyof typeof stepInfo];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] flex items-center justify-center text-white shadow-lg">
          {info.icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-dark)] mb-1">
            {info.title}
          </h1>
          <p className="text-gray-600 text-lg">{info.description}</p>
        </div>
      </div>
    </div>
  );
}
