"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X, Edit2, AlertCircle } from "lucide-react";
import { WishlistItem } from "@/types/ngo";

interface EditWishlistItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: WishlistItem;
  onUpdate: (updates: Partial<WishlistItem>) => void;
  isUpdating: boolean;
}

const validationSchema = Yup.object({
  item: Yup.string()
    .required("Item name is required")
    .min(3, "Item name must be at least 3 characters")
    .max(100, "Item name must be less than 100 characters"),
  quantity: Yup.string().max(50, "Quantity must be less than 50 characters"),
  urgency: Yup.string()
    .oneOf(["low", "medium", "high"])
    .required("Please select urgency level"),
});

export default function EditWishlistItemModal({
  isOpen,
  onClose,
  item,
  onUpdate,
  isUpdating,
}: EditWishlistItemModalProps) {
  if (!isOpen) return null;

  const initialValues = {
    item: item.item,
    quantity: item.quantity || "",
    urgency: item.urgency,
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-lg w-full my-8 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Edit2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Edit Item</h2>
                <p className="text-white/90 text-sm mt-0.5">
                  Update your wishlist item details
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isUpdating}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onUpdate(values);
            onClose();
          }}
        >
          {({ errors, touched, isValid }) => (
            <Form className="p-6 space-y-5">
              {/* Item Name */}
              <div>
                <label
                  htmlFor="item"
                  className="block text-sm font-semibold text-[var(--text-dark)] mb-2"
                >
                  Item Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  id="item"
                  name="item"
                  placeholder="e.g., Rice bags, Blankets, Medical supplies"
                  className={`text-[var(--text-dark)] w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    errors.item && touched.item
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-[var(--primary-color)]"
                  } focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20`}
                  disabled={isUpdating}
                />
                <ErrorMessage
                  name="item"
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

              {/* Quantity */}
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-semibold text-[var(--text-dark)] mb-2"
                >
                  Quantity (Optional)
                </label>
                <Field
                  type="text"
                  id="quantity"
                  name="quantity"
                  placeholder="e.g., 10 bags, 20 pieces, 5 units"
                  className={`text-[var(--text-dark)] w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    errors.quantity && touched.quantity
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-[var(--primary-color)]"
                  } focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20`}
                  disabled={isUpdating}
                />
                <ErrorMessage
                  name="quantity"
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

              {/* Urgency */}
              <div>
                <label className="block text-sm font-semibold text-[var(--text-dark)] mb-3">
                  Priority Level <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <Field name="urgency">
                    {({ field }: any) => (
                      <>
                        <label
                          className={`relative flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            field.value === "low"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300 bg-white"
                          }`}
                        >
                          <input
                            {...field}
                            type="radio"
                            value="low"
                            disabled={isUpdating}
                            className="sr-only"
                          />
                          <div
                            className={`w-3 h-3 rounded-full mb-2 ${
                              field.value === "low"
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              field.value === "low"
                                ? "text-blue-700"
                                : "text-gray-600"
                            }`}
                          >
                            Low
                          </span>
                        </label>

                        <label
                          className={`relative flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            field.value === "medium"
                              ? "border-yellow-500 bg-yellow-50"
                              : "border-gray-200 hover:border-yellow-300 bg-white"
                          }`}
                        >
                          <input
                            {...field}
                            type="radio"
                            value="medium"
                            disabled={isUpdating}
                            className="sr-only"
                          />
                          <div
                            className={`w-3 h-3 rounded-full mb-2 ${
                              field.value === "medium"
                                ? "bg-yellow-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              field.value === "medium"
                                ? "text-yellow-700"
                                : "text-gray-600"
                            }`}
                          >
                            Medium
                          </span>
                        </label>

                        <label
                          className={`relative flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            field.value === "high"
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-red-300 bg-white"
                          }`}
                        >
                          <input
                            {...field}
                            type="radio"
                            value="high"
                            disabled={isUpdating}
                            className="sr-only"
                          />
                          <div
                            className={`w-3 h-3 rounded-full mb-2 ${
                              field.value === "high"
                                ? "bg-red-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              field.value === "high"
                                ? "text-red-700"
                                : "text-gray-600"
                            }`}
                          >
                            High
                          </span>
                        </label>
                      </>
                    )}
                  </Field>
                </div>
                <ErrorMessage
                  name="urgency"
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

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isUpdating}
                  className="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating || !isValid}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] hover:opacity-90 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "Updating..." : "Update Item"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
