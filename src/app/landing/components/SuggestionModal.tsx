"use client";

import { useState } from "react";
import {
  Lightbulb,
  Bug,
  MessageSquare,
  Send,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { addSuggestion } from "@/api/feature-suggestions";

interface FooterProps {
  className?: string;
}

interface SuggestionFormData {
  type: "feature" | "bug" | "feedback";
  title: string;
  description: string;
  email: string;
}

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SuggestionModal({ isOpen, onClose }: SuggestionModalProps) {
  const [formData, setFormData] = useState<SuggestionFormData>({
    type: "feature",
    title: "",
    description: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const suggestionTypes = [
    {
      value: "feature",
      label: "Feature Request",
      icon: Lightbulb,
      color: "#f25912",
    },
    { value: "bug", label: "Bug Report", icon: Bug, color: "#ef4444" },
    {
      value: "feedback",
      label: "General Feedback",
      icon: MessageSquare,
      color: "#5c3e94",
    },
  ];

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) return;
    setIsSubmitting(true);

    try {
      await addSuggestion({
        type: formData.type,
        title: formData.title,
        description: formData.description,
        email: formData.email || "",
      });

      setSubmitStatus("success");
      setTimeout(() => {
        onClose();
        setFormData({ type: "feature", title: "", description: "", email: "" });
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-dark)]">
              Share Your Ideas
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Help us improve KarunaHub
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-dark)] mb-3">
              What would you like to share?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {suggestionTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.type === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, type: type.value as any })
                    }
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-[var(--primary-color)] bg-[var(--primary-color)]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      size={24}
                      className="mx-auto mb-2"
                      style={{ color: isSelected ? type.color : "#9ca3af" }}
                    />
                    <div className="text-sm font-medium text-[var(--text-dark)]">
                      {type.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder={
                formData.type === "feature"
                  ? "e.g., Add NGO rating system"
                  : formData.type === "bug"
                  ? "e.g., Search not working on mobile"
                  : "e.g., Love the new interface!"
              }
              className="text-[var(--text-dark)] w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={5}
              placeholder="Tell us more about your suggestion..."
              className="text-[var(--text-dark)] w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 outline-none transition-all resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
            >
              Email (Optional)
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="your@email.com"
              className="text-[var(--text-dark)] w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll notify you when we review your suggestion
            </p>
          </div>

          {submitStatus === "success" && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              <CheckCircle size={20} />
              <span className="text-sm font-medium">
                Thank you! Your suggestion has been submitted.
              </span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">
                Something went wrong. Please try again.
              </span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-[var(--text-dark)] font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                isSubmitting || !formData.title || !formData.description
              }
              className="flex-1 px-6 py-3 rounded-lg bg-[var(--primary-color)] text-white font-medium hover:bg-[var(--primary-color)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestionModal;
