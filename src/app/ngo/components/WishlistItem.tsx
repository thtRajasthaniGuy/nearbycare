"use client";

import { useState } from "react";
import {
  Package,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit2,
  MoreVertical,
} from "lucide-react";
import { WishlistItem as WishlistItemType } from "@/types/ngo";
import EditWishlistItemModal from "./EditWishlistItemModal";

interface WishlistItemProps {
  item: WishlistItemType;
  onUpdate: (updates: Partial<WishlistItemType>) => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export default function WishlistItem({
  item,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: WishlistItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const urgencyConfig = {
    low: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      badge: "bg-blue-100",
      label: "Low Priority",
    },
    medium: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      badge: "bg-yellow-100",
      label: "Medium Priority",
    },
    high: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      badge: "bg-red-100",
      label: "High Priority",
    },
  };

  const config = urgencyConfig[item.urgency];

  const handleMarkFulfilled = () => {
    onUpdate({ fulfilled: !item.fulfilled });
    setShowMenu(false);
  };

  const handleDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div
        className={`relative bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden ${
          item.fulfilled
            ? "border-green-200 opacity-75"
            : `${config.border} hover:shadow-lg`
        }`}
      >
        {/* Fulfilled Badge Overlay */}
        {item.fulfilled && (
          <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-xs font-semibold rounded-bl-lg flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Fulfilled
          </div>
        )}

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div
                className={`p-2.5 ${
                  item.fulfilled ? "bg-green-100" : config.badge
                } rounded-lg flex-shrink-0`}
              >
                <Package
                  className={`w-5 h-5 ${
                    item.fulfilled ? "text-green-700" : config.text
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-[var(--text-dark)] truncate">
                  {item.item}
                </h4>
                {item.quantity && (
                  <p className="text-sm text-gray-600 mt-0.5">
                    Quantity: {item.quantity}
                  </p>
                )}
              </div>
            </div>

            {/* Menu Button */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isUpdating || isDeleting}
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-20">
                    <button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Item
                    </button>
                    <button
                      onClick={handleMarkFulfilled}
                      disabled={isUpdating}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {item.fulfilled ? "Mark as Active" : "Mark as Fulfilled"}
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(true);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Item
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Urgency Badge */}
          {!item.fulfilled && (
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 ${config.badge} ${config.text} px-3 py-1 rounded-full text-xs font-medium`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {config.label}
              </span>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                item.fulfilled
                  ? "bg-green-500 w-full"
                  : item.urgency === "high"
                  ? "bg-red-500 w-3/4"
                  : item.urgency === "medium"
                  ? "bg-yellow-500 w-1/2"
                  : "bg-blue-500 w-1/4"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditWishlistItemModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={item}
        onUpdate={onUpdate}
        isUpdating={isUpdating}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-dark)]">
                  Delete Item?
                </h3>
                <p className="text-gray-600 mt-1">
                  Are you sure you want to delete "{item.item}"? This action
                  cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
