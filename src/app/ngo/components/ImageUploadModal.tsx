"use client";

import { useState, useRef } from "react";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  X,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
} from "@imagekit/next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgId: string;
  currentImageCount: number;
  maxImages: number;
}

const validationSchema = Yup.object({
  caption: Yup.string().max(200, "Caption must be less than 200 characters"),
});

export default function ImageUploadModal({
  isOpen,
  onClose,
  orgId,
  currentImageCount,
  maxImages,
}: ImageUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  if (!isOpen) return null;

  // Fetch ImageKit auth params
  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Auth failed: ${errorText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication failed");
    }
  };

  // Handle upload
  const handleUpload = async (caption: string) => {
    if (!selectedFile) {
      setUploadError("No file selected");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadSuccess(false);
      abortControllerRef.current = new AbortController();

      console.log("🔹 Starting upload for:", selectedFile.name);

      // Get auth params
      const authParams = await authenticator();
      console.log("✅ Got auth params");

      // Upload to ImageKit
      console.log("📤 Uploading to ImageKit...");
      const uploadResponse = await upload({
        file: selectedFile,
        fileName: `${orgId}_${Date.now()}_${selectedFile.name}`,
        folder: `/ngo-images/${orgId}`,
        signature: authParams.signature,
        expire: authParams.expire,
        token: authParams.token,
        publicKey: authParams.publicKey,
        onProgress: (event) => {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
          console.log(`📊 Progress: ${Math.round(progress)}%`);
        },
        abortSignal: abortControllerRef.current.signal,
        transformation: {
          pre: "w-1200,h-1200,c-at_max",
        },
        useUniqueFileName: true,
      });

      console.log("✅ ImageKit upload successful:", uploadResponse);

      // Save to Firebase
      const imageData = {
        imageId: uploadResponse.fileId,
        url: uploadResponse.url,
        thumbnailUrl: uploadResponse.thumbnailUrl || uploadResponse.url,
        caption: caption || null,
        uploadedAt: Timestamp.now(),
        order: currentImageCount,
      };

      console.log("💾 Saving to Firebase...");
      const orgRef = doc(db, "organizations", orgId);
      await updateDoc(orgRef, {
        images: arrayUnion(imageData),
        updatedAt: Timestamp.now(),
      });

      console.log("✅ Saved to Firebase successfully!");

      setUploadSuccess(true);

      // Close modal after 1.5 seconds
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error: any) {
      console.error("❌ Upload error:", error);

      if (error instanceof ImageKitAbortError) {
        setUploadError("Upload cancelled");
      } else if (error instanceof ImageKitInvalidRequestError) {
        setUploadError("Invalid request. Please check your file.");
      } else if (error instanceof ImageKitUploadNetworkError) {
        setUploadError("Network error. Please check your connection.");
      } else if (error instanceof ImageKitServerError) {
        setUploadError("Server error. Please try again later.");
      } else {
        setUploadError(error.message || "Upload failed. Please try again.");
      }
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("📁 File selected:", file.name, file.type, file.size);

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
    setUploadError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    if (isUploading) {
      abortControllerRef.current?.abort();
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setUploadError(null);
    setUploadSuccess(false);
    setIsUploading(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isUploading) {
          handleClose();
        }
      }}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] p-6 rounded-t-xl sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Upload Image</h2>
                <p className="text-white/90 text-sm mt-0.5">
                  {currentImageCount} of {maxImages} images uploaded
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isUploading}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
              type="button"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <Formik
          initialValues={{ caption: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("📝 Form submitted with caption:", values.caption);
            handleUpload(values.caption);
          }}
        >
          {({ errors, touched }) => (
            <Form className="p-6 space-y-6">
              {/* File Upload Area */}
              <div>
                <label className="block text-sm font-semibold text-[var(--text-dark)] mb-3">
                  Select Image <span className="text-red-500">*</span>
                </label>

                {!selectedFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-[var(--primary-color)] rounded-xl p-12 text-center cursor-pointer transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                  >
                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-700 font-medium mb-2">
                      Click to upload an image
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                ) : previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      disabled={isUploading}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : null}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                  className="hidden"
                />
              </div>

              {/* Caption */}
              <div>
                <label
                  htmlFor="caption"
                  className="block text-sm font-semibold text-[var(--text-dark)] mb-2"
                >
                  Caption (Optional)
                </label>
                <Field
                  as="textarea"
                  id="caption"
                  name="caption"
                  rows={3}
                  placeholder="Add a caption to describe this image..."
                  disabled={isUploading}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 resize-none ${
                    errors.caption && touched.caption
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-[var(--primary-color)]"
                  } focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20`}
                />
                <ErrorMessage
                  name="caption"
                  component="div"
                  className="text-red-600 text-sm mt-1.5 flex items-center gap-1"
                >
                  {(msg) => (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      {msg}
                    </>
                  )}
                </ErrorMessage>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">
                      Uploading...
                    </span>
                    <span className="text-[var(--primary-color)] font-semibold">
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {uploadError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-800">{uploadError}</p>
                </div>
              )}

              {/* Success Message */}
              {uploadSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-800">
                    Image uploaded successfully!
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isUploading}
                  className="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || isUploading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] hover:opacity-90 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Image
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
