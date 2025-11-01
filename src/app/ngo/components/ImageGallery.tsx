"use client";

import { useState } from "react";
import { OrganizationImage } from "@/types/ngo";
import {
  Trash2,
  Edit2,
  GripVertical,
  X,
  Save,
  Eye,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

interface ImageGalleryProps {
  images: OrganizationImage[];
  onDelete: (imageId: string) => void;
  onUpdateCaption: (imageId: string, caption: string) => void;
  onReorder: (reorderedImages: OrganizationImage[]) => void;
  isDeleting: boolean;
  isUpdating: boolean;
}

export default function ImageGallery({
  images,
  onDelete,
  onUpdateCaption,
  onReorder,
  isDeleting,
  isUpdating,
}: ImageGalleryProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<OrganizationImage | null>(
    null
  );
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  const handleEditClick = (image: OrganizationImage) => {
    setEditingId(image.imageId);
    setEditCaption(image.caption || "");
  };

  const handleSaveCaption = (imageId: string) => {
    onUpdateCaption(imageId, editCaption);
    setEditingId(null);
  };

  const handleDragStart = (imageId: string) => {
    setDraggedId(imageId);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = sortedImages.findIndex(
      (img) => img.imageId === draggedId
    );
    const targetIndex = sortedImages.findIndex(
      (img) => img.imageId === targetId
    );

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newImages = [...sortedImages];
    const [draggedItem] = newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, draggedItem);

    onReorder(newImages);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
          <GripVertical className="w-5 h-5 text-gray-400" />
          Your Images (Drag to reorder)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedImages.map((image) => (
            <div
              key={image.imageId}
              draggable
              onDragStart={() => handleDragStart(image.imageId)}
              onDragOver={(e) => handleDragOver(e, image.imageId)}
              onDragEnd={handleDragEnd}
              className={`group relative bg-white rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                draggedId === image.imageId
                  ? "border-[var(--primary-color)] shadow-xl scale-105 opacity-50"
                  : "border-gray-200 hover:border-[var(--primary-color)] hover:shadow-lg"
              } cursor-move`}
            >
              {/* Order Badge */}
              <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-semibold">
                #{image.order + 1}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setPreviewImage(image)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditClick(image)}
                  disabled={isUpdating}
                  className="p-2 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-white rounded-lg transition-colors disabled:opacity-50"
                  title="Edit Caption"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(image.imageId)}
                  disabled={isDeleting}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Image */}
              <div className="aspect-video bg-gray-100">
                <img
                  src={image.thumbnailUrl}
                  alt={image.caption || "Organization image"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption Section */}
              <div className="p-4">
                {editingId === image.imageId ? (
                  <div className="space-y-2">
                    <textarea
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      rows={3}
                      maxLength={200}
                      className="w-full px-3 py-2 border-2 border-[var(--primary-color)] rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20"
                      placeholder="Add a caption..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveCaption(image.imageId)}
                        disabled={isUpdating}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                      {image.caption || (
                        <span className="text-gray-400 italic">
                          No caption added
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {format(
                        image.uploadedAt?.toDate?.() || new Date(),
                        "MMM dd, yyyy"
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Drag Handle */}
              <div className="absolute left-1/2 bottom-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewImage.url}
              alt={previewImage.caption || "Preview"}
              className="w-full h-auto rounded-xl"
            />
            {previewImage.caption && (
              <div className="mt-4 bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg">
                <p className="text-sm">{previewImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-dark)]">
                  Delete Image?
                </h3>
                <p className="text-gray-600 mt-1">
                  Are you sure you want to delete this image? This action cannot
                  be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
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
