"use client";

import NavBar from "@/components/NavBar";
import AboutSection from "@/components/about/AboutSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <main className="pt-5">
        <AboutSection />
      </main>
    </div>
  );
}
