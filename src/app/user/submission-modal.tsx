"use client";

import Modal from "@/components/Modal";
import SubmissionForm from "./submissionForm";
import { X } from "lucide-react";

export default function SubmissionModal({ onClose, isOpen }: any) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <X size={24} className="text-[var(--text-dark)]" />
        </button>
        <SubmissionForm
          onSuccess={() => {
            onClose?.();
          }}
        />
      </Modal>
    </>
  );
}
