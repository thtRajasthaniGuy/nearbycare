"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import SubmissionForm from "./submissionForm";

export default function SubmissionModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        New Submission
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Submit NGO Info"
        size="lg"
      >
        <SubmissionForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
