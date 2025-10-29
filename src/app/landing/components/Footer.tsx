"use client";

import {
  Heart,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About Us", href: "#about" },
    { label: "Find NGOs", href: "/ngos" },
    { label: "Suggest NGO", href: "#suggest" },
    { label: "How It Works", href: "#how" },
  ];

  const resources = [
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className={`bg-[var(--background-light)] text-white ${className}`}>
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
              Connecting communities with verified NGOs to create lasting social
              impact. Discover, volunteer, and donate to organizations making a
              difference near you.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <MapPin size={18} className="flex-shrink-0" />
                <span className="text-sm">Jaipur, Rajasthan, India</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-sm">contact@KarunaHub.org</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-sm">+91 (XXX) XXX-XXXX</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-[var(--primary-color)] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-[var(--primary-color)] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
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

            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--primary-color)] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
