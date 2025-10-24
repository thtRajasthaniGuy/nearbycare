"use client";
import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = "md",
}: ModalProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const sizeClasses: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-3xl",
    full: "w-full h-full m-0 rounded-none",
  };

  const modalClass =
    size === "full"
      ? "bg-white w-full h-full p-6 overflow-auto"
      : `bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full p-6 ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`;
  return (
    <>
      <div
        className="fixed inset-0 bg-[rgba(255,255,255,0.3)] backdrop-blur-md z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className={`${modalClass} transform transition-all duration-300 scale-95 opacity-0 animate-modalIn relative`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
          >
            <X size={22} className="text-[var(--text-dark)]" />
          </button>

          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-dark)] mb-6">
              {title}
            </h2>
          )}

          <div className="space-y-4">{children}</div>

          {actions && (
            <div className="flex justify-end gap-3 mt-6 flex-wrap">
              {actions}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes modalIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalIn {
          animation: modalIn 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Modal;
