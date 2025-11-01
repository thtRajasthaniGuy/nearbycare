"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Upload, Image as ImageIcon, AlertCircle, Info } from "lucide-react";
import ImageUploadModal from "./ImageUploadModal";
import ImageGallery from "./ImageGallery";
import EmptyImageState from "./EmptyImageState";
import { OrganizationImage } from "@/types/ngo";

interface ImageUploadSectionProps {
  orgId: string;
}

const MAX_IMAGES = 5;

export default function ImageUploadSection({ orgId }: ImageUploadSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch images
  const {
    data: images = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orgImages", orgId],
    queryFn: async () => {
      const orgRef = doc(db, "organizations", orgId);
      const orgSnap = await getDoc(orgRef);
      return orgSnap.exists() ? orgSnap.data().images || [] : [];
    },
    enabled: !!orgId,
  });

  // Delete image mutation
  const deleteImageMutation = useMutation({
    mutationFn: async (imageId: string) => {
      const imageToDelete = images.find(
        (img: OrganizationImage) => img.imageId === imageId
      );

      if (!imageToDelete) throw new Error("Image not found");

      const orgRef = doc(db, "organizations", orgId);
      await updateDoc(orgRef, {
        images: arrayRemove(imageToDelete),
        updatedAt: Timestamp.now(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orgImages", orgId] });
    },
  });

  // Update image order mutation
  const updateOrderMutation = useMutation({
    mutationFn: async (reorderedImages: OrganizationImage[]) => {
      const orgRef = doc(db, "organizations", orgId);
      await updateDoc(orgRef, {
        images: reorderedImages.map((img, idx) => ({ ...img, order: idx })),
        updatedAt: Timestamp.now(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orgImages", orgId] });
    },
  });

  // Update caption mutation
  const updateCaptionMutation = useMutation({
    mutationFn: async ({
      imageId,
      caption,
    }: {
      imageId: string;
      caption: string;
    }) => {
      const updatedImages = images.map((img: OrganizationImage) =>
        img.imageId === imageId ? { ...img, caption } : img
      );

      const orgRef = doc(db, "organizations", orgId);
      await updateDoc(orgRef, {
        images: updatedImages,
        updatedAt: Timestamp.now(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orgImages", orgId] });
    },
  });

  const canAddMore = images.length < MAX_IMAGES;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-red-900 font-semibold">Error loading images</h3>
            <p className="text-red-700 text-sm mt-1">
              Unable to load your images. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-lg">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-dark)]">
                Organization Photos
              </h2>
              <p className="text-gray-600 mt-1">
                Showcase your work with up to {MAX_IMAGES} images
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!canAddMore}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg ${
              canAddMore
                ? "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white hover:shadow-xl hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Upload className="w-5 h-5" />
            Upload Image
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">
              {images.length} of {MAX_IMAGES} images uploaded
            </span>
            <span
              className={`font-semibold ${
                images.length >= MAX_IMAGES
                  ? "text-green-600"
                  : "text-[var(--primary-color)]"
              }`}
            >
              {Math.round((images.length / MAX_IMAGES) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] transition-all duration-500"
              style={{ width: `${(images.length / MAX_IMAGES) * 100}%` }}
            />
          </div>
        </div>

        {/* Info Box */}
        {images.length >= MAX_IMAGES && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              You've reached the maximum of {MAX_IMAGES} images. Delete an
              existing image to upload a new one.
            </p>
          </div>
        )}
      </div>

      {/* Gallery or Empty State */}
      {images.length === 0 ? (
        <EmptyImageState onUploadClick={() => setIsModalOpen(true)} />
      ) : (
        <ImageGallery
          images={images}
          onDelete={(imageId) => deleteImageMutation.mutate(imageId)}
          onUpdateCaption={(imageId, caption) =>
            updateCaptionMutation.mutate({ imageId, caption })
          }
          onReorder={(reorderedImages) =>
            updateOrderMutation.mutate(reorderedImages)
          }
          isDeleting={deleteImageMutation.isPending}
          isUpdating={
            updateCaptionMutation.isPending || updateOrderMutation.isPending
          }
        />
      )}

      {/* Upload Modal */}
      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orgId={orgId}
        currentImageCount={images.length}
        maxImages={MAX_IMAGES}
      />
    </div>
  );
}
