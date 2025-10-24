"use client";

import NavBar from "@/components/NavBar";
import AboutSection from "@/components/about/AboutSection";
import { useState } from "react";
import SubmissionModal from "@/app/user/submission-modal";

export default function LandingPage() {
  const [showSuggestNgoModal, setShowSuggestNgoModal] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <NavBar onSubmitClick={() => setShowSuggestNgoModal(true)} />

      <main className="pt-5">
        <AboutSection />
      </main>

      {showSuggestNgoModal && (
        <SubmissionModal
          isOpen={showSuggestNgoModal}
          onClose={() => setShowSuggestNgoModal(false)}
        />
      )}
    </div>
  );
}
