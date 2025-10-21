"use client";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  size?: "sm" | "md" | "lg" | "full"; // control modal size
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

  // Size mapping
  const sizeClasses: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-3xl",
    full: "w-full h-full m-0 rounded-none",
  };

  const modalClass =
    size === "full"
      ? "bg-white dark:bg-gray-800 w-full h-full p-6 overflow-auto"
      : `bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full p-6 ${sizeClasses[size]}`;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className={`${modalClass} transform transition-all duration-300 scale-95 opacity-0 animate-modalIn`}
          onClick={(e) => e.stopPropagation()}
        >
          {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

          <div className="mb-4">{children}</div>

          {actions && (
            <div className="flex justify-end gap-2 flex-wrap">{actions}</div>
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
          animation: modalIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Modal;
