"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar({ onSubmitClick }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks: any = [{ href: "/", label: "Find NGOs Near You" }];

  return (
    <nav className="bg-[var(--background)] shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold hover:opacity-80 transition-opacity"
          style={{
            background:
              "linear-gradient(to right, var(--primary-color), var(--secondary-color))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          NearbyCare
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white px-5 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
              style={{
                background:
                  "linear-gradient(to right, var(--primary-color), rgba(242, 89, 18, 0.9))",
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/ngo/login"
            className="text-white px-5 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
            style={{
              background:
                "linear-gradient(to right, var(--primary-color), rgba(242, 89, 18, 0.9))",
            }}
          >
            Register Your NGO
          </Link>

          <button
            onClick={onSubmitClick}
            className="text-white px-5 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
            style={{
              background:
                "linear-gradient(to right, var(--primary-color), rgba(242, 89, 18, 0.9))",
            }}
          >
            Suggest an NGO
          </button>
        </div>

        <button
          className="md:hidden text-[var(--text-dark)] transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{
            color: isOpen ? "var(--primary-color)" : "var(--text-dark)",
          }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[var(--background)] shadow-inner px-6 pb-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link: any) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[var(--text-dark)] font-medium transition-colors py-2 hover:text-[var(--primary-color)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/ngo/login"
              onClick={() => setIsOpen(false)}
              className="text-white px-4 py-2.5 rounded-lg text-center hover:shadow-lg transition-all font-medium"
              style={{
                background:
                  "linear-gradient(to right, var(--primary-color), rgba(242, 89, 18, 0.9))",
              }}
            >
              Register Your NGO
            </Link>

            <button
              onClick={onSubmitClick}
              className="text-white px-4 py-2.5 rounded-lg text-center hover:shadow-lg transition-all font-medium"
              style={{
                background:
                  "linear-gradient(to right, var(--primary-color), rgba(242, 89, 18, 0.9))",
              }}
            >
              Suggest an NGO
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
