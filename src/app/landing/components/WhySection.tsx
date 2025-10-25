"use client";

import FeatureCard from "@/components/about/FeatureCard";
import { Heart, Users, Target, Sparkles } from "lucide-react";

interface WhySectionProps {
  className?: string;
}

export default function WhySection({ className = "" }: WhySectionProps) {
  const reasons = [
    {
      icon: (
        <Heart
          className="w-8 h-8"
          strokeWidth={2}
          style={{ color: "var(--primary-color)" }}
        />
      ),
      title: "Bridge the Gap",
      description:
        "Connect people who want to help with organizations that need support. Making social good accessible to everyone.",
      iconBgColor: "var(--primary-color)",
    },
    {
      icon: (
        <Users
          className="w-8 h-8"
          strokeWidth={2}
          style={{ color: "var(--primary-color)" }}
        />
      ),
      title: "Build Community",
      description:
        "Create a network of changemakers, volunteers, and NGOs working together to create lasting impact in local communities.",
      iconBgColor: "var(--secondary-color)",
    },
    {
      icon: (
        <Target
          className="w-8 h-8"
          strokeWidth={2}
          style={{ color: "var(--primary-color)" }}
        />
      ),
      title: "Ensure Trust",
      description:
        "Verify every NGO to build confidence. Your donations and time deserve to go to authentic organizations doing real work.",
      iconBgColor: "var(--primary-color)",
    },
    {
      icon: (
        <Sparkles
          className="w-8 h-8"
          strokeWidth={2}
          style={{ color: "var(--primary-color)" }}
        />
      ),
      title: "Simplify Giving",
      description:
        "One platform to discover, connect, volunteer, and donate. Remove the friction from doing good in the world.",
      iconBgColor: "var(--secondary-color)",
    },
  ];

  return (
    <section
      className={`py-16 px-4 md:py-24 bg-gradient-to-b from-white to-gray-50 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-medium mb-4">
            Our Mission
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--text-dark)]">
            Why NearbyCare Exists
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I created NearbyCare because finding trustworthy NGOs to support
            shouldn't be hard. Every community has incredible organizations
            doing amazing work, but they're often invisible to the people who
            want to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, index) => {
            return (
              <FeatureCard
                key={reason.title}
                icon={reason.icon}
                title={reason.title}
                description={reason.description}
                iconBgColor={reason.iconBgColor}
                index={index}
              />
            );
          })}
        </div>

        {/* <div className="bg-gradient-to-r from-[var(--background-light)] to-[var(--secondary-color)] rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Together, We Can Make a Difference
          </h3>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Whether you have five minutes or five hours, every contribution
            matters. Join thousands of people discovering meaningful ways to
            give back to their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-[var(--primary-color)] rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Explore NGOs
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
              Suggest an NGO
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
