"use client";

import { Heart, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import SuggestionModal from "./SuggestionModal";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resources = [
    { label: "Privacy Policy", href: "/privacypolicy" },
    { label: "Terms of Service", href: "/termsconditions" },
    {
      label: "Suggest Feature",
      onClick: () => setIsModalOpen(true),
      isModal: true,
    },
  ];

  return (
    <>
      <footer
        className={`bg-[var(--background-light)] text-white ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                  <Heart size={24} fill="white" color="white" />
                </div>
                <span className="text-2xl font-bold">KarunaHub</span>
              </div>
              <p className="text-white/80 leading-relaxed mb-6 max-w-md">
                Connecting communities with verified NGOs to create lasting
                social impact. Discover, volunteer, and donate to organizations
                making a difference near you.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin size={18} className="flex-shrink-0" />
                  <span className="text-sm">Jaipur, Rajasthan, India</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Mail size={18} className="flex-shrink-0" />
                  <span className="text-sm">karunahub@zohomail.in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {resources.map((link, index) =>
                  link.isModal ? (
                    <li key={index}>
                      <button
                        onClick={link.onClick}
                        className="text-white/80 hover:text-[var(--primary-color)] transition-colors duration-200 text-sm text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ) : (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/80 hover:text-[var(--primary-color)] transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-sm text-center md:text-left">
                © {currentYear} KarunaHub. All rights reserved. Made with{" "}
                <Heart
                  size={14}
                  className="inline text-[var(--primary-color)] fill-current"
                />{" "}
                for social good.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <SuggestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
