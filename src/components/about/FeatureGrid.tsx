"use client";

import { MapPin, Users, Heart } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeatureGrid() {
  const features = [
    {
      icon: (
        <MapPin
          className="w-8 h-8"
          strokeWidth={2}
          style={{ color: "var(--primary-color)" }}
        />
      ),
      title: "Discover Nearby NGOs",
      description:
        "Find verified social organizations and NGOs working in your community. See their impact, mission, and how you can get involved.",
      iconBgColor: "bg-orange-100",
    },
    {
      icon: (
        <Users
          className="w-8 h-8"
          strokeWidth={2}
          style={{ color: "var(--secondary-color)" }}
        />
      ),
      title: "Submit & Recommend",
      description:
        "Know an amazing NGO that should be on our platform? Submit their information and help expand our network of changemakers.",
      iconBgColor: "bg-purple-100",
    },
    {
      icon: (
        <Heart
          className="w-8 h-8"
          strokeWidth={2}
          style={{ color: "var(--primary-color)" }}
        />
      ),
      title: "Support Their Mission",
      description:
        "Make a difference through verified donations or by volunteering your time and skills to causes that resonate with you.",
      iconBgColor: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          iconBgColor={feature.iconBgColor}
          index={index}
        />
      ))}
    </div>
  );
}
