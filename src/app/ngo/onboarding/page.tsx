"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createOrganization, getOrganization } from "@/api/ngo";

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Organization name must be at least 3 characters")
    .max(100, "Organization name is too long")
    .required("Organization name is required"),
  type: Yup.string()
    .oneOf([
      "ngo",
      "orphanage",
      "senior_centre",
      "animal_shelter",
      "educational",
      "healthcare",
      "other",
    ])
    .required("Organization type is required"),
  tagline: Yup.string().max(150, "Tagline must be 150 characters or less"),
  description: Yup.string()
    .min(50, "Description must be at least 50 characters")
    .max(2000, "Description must be 2000 characters or less")
    .required("Description is required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number")
    .required("Phone number is required"),
  alternatePhone: Yup.string().matches(
    /^[6-9]\d{9}$/,
    "Enter valid 10-digit mobile number"
  ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  street: Yup.string().required("Street address is required"),
  area: Yup.string().required("Area/Locality is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
});

export default function NgoOnboardingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Check if already has organization
        try {
          const org = await getOrganization(currentUser.uid);
          if (org && org.status === "active") {
            router.replace("/ngo/dashboard");
          }
        } catch (err) {
          console.error("Error checking organization:", err);
        }
        setIsLoading(false);
      } else {
        router.replace("/ngo/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      tagline: "",
      description: "",
      phone: "",
      alternatePhone: "",
      email: "",
      facebook: "",
      instagram: "",
      twitter: "",
      street: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!user) {
        setError("User not authenticated");
        return;
      }

      try {
        setError("");
        await createOrganization(user.uid, values, user.photoURL);
        router.refresh();
      } catch (err) {
        console.error("Submission error:", err);
        setError("Failed to submit form. Please try again.");
      }
    },
  });

  // Set email when user loads
  useEffect(() => {
    if (user?.email && !formik.values.email) {
      formik.setFieldValue("email", user.email);
    }
  }, [user]);

  const nextStep = async () => {
    const step1Fields = ["name", "type", "description", "phone", "email"];
    const step2Fields = ["street", "area", "city", "state", "pincode"];

    if (currentStep === 1) {
      const errors = await formik.validateForm();
      const hasStep1Errors = step1Fields.some(
        (field) => errors[field as keyof typeof errors]
      );
      if (hasStep1Errors) {
        step1Fields.forEach((field) => formik.setFieldTouched(field, true));
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const errors = await formik.validateForm();
      const hasStep2Errors = step2Fields.some(
        (field) => errors[field as keyof typeof errors]
      );
      if (hasStep2Errors) {
        step2Fields.forEach((field) => formik.setFieldTouched(field, true));
        return;
      }
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of 3
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / 3) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {currentStep === 1 && "Organization Details"}
              {currentStep === 2 && "Location & Contact"}
              {currentStep === 3 && "Social Media (Optional)"}
            </h1>
            <p className="mt-2 text-gray-600">
              {currentStep === 1 && "Tell us about your organization"}
              {currentStep === 2 && "Where are you located?"}
              {currentStep === 3 && "Connect your social profiles"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* STEP 1: BASIC INFO */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Organization Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    {...formik.getFieldProps("name")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="E.g., Akshaya Patra Foundation"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Organization Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    {...formik.getFieldProps("type")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formik.touched.type && formik.errors.type
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Type</option>
                    <option value="ngo">NGO</option>
                    <option value="orphanage">Orphanage</option>
                    <option value="senior_centre">Senior Care Centre</option>
                    <option value="animal_shelter">Animal Shelter</option>
                    <option value="educational">Educational Institution</option>
                    <option value="healthcare">Healthcare Facility</option>
                    <option value="other">Other</option>
                  </select>
                  {formik.touched.type && formik.errors.type && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.type}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="tagline"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tagline (Optional)
                  </label>
                  <input
                    id="tagline"
                    name="tagline"
                    type="text"
                    {...formik.getFieldProps("tagline")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="A short, catchy description (max 150 chars)"
                    maxLength={150}
                  />
                  {formik.touched.tagline && formik.errors.tagline && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.tagline}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formik.values.tagline.length}/150 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    {...formik.getFieldProps("description")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formik.touched.description && formik.errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Describe your organization's mission, activities, and impact..."
                    maxLength={2000}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.description}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formik.values.description.length}/2000 characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Primary Phone *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      {...formik.getFieldProps("phone")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.phone && formik.errors.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="alternatePhone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Alternate Phone
                    </label>
                    <input
                      id="alternatePhone"
                      name="alternatePhone"
                      type="tel"
                      {...formik.getFieldProps("alternatePhone")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.alternatePhone &&
                        formik.errors.alternatePhone
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                    {formik.touched.alternatePhone &&
                      formik.errors.alternatePhone && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.alternatePhone}
                        </p>
                      )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="contact@organization.org"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: LOCATION */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Street Address *
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    {...formik.getFieldProps("street")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formik.touched.street && formik.errors.street
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Building/House number and street name"
                  />
                  {formik.touched.street && formik.errors.street && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.street}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="area"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Area/Locality *
                  </label>
                  <input
                    id="area"
                    name="area"
                    type="text"
                    {...formik.getFieldProps("area")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formik.touched.area && formik.errors.area
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Locality or neighborhood"
                  />
                  {formik.touched.area && formik.errors.area && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.area}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      City *
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      {...formik.getFieldProps("city")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.city && formik.errors.city
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Jaipur"
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      State *
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      {...formik.getFieldProps("state")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.state && formik.errors.state
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Rajasthan"
                    />
                    {formik.touched.state && formik.errors.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.state}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pincode *
                    </label>
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      {...formik.getFieldProps("pincode")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.pincode && formik.errors.pincode
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="302001"
                      maxLength={6}
                    />
                    {formik.touched.pincode && formik.errors.pincode && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.pincode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      {...formik.getFieldProps("country")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: SOCIAL MEDIA */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Optional:</strong> Add your social media profiles to
                    help people connect with you.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="facebook"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </span>
                  </label>
                  <input
                    id="facebook"
                    name="facebook"
                    type="url"
                    {...formik.getFieldProps("facebook")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div>
                  <label
                    htmlFor="instagram"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-pink-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      Instagram
                    </span>
                  </label>
                  <input
                    id="instagram"
                    name="instagram"
                    type="url"
                    {...formik.getFieldProps("instagram")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://instagram.com/yourprofile"
                  />
                </div>

                <div>
                  <label
                    htmlFor="twitter"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-sky-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      Twitter/X
                    </span>
                  </label>
                  <input
                    id="twitter"
                    name="twitter"
                    type="url"
                    {...formik.getFieldProps("twitter")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {formik.isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              )}
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Your application will be reviewed by our team within 24-48 hours
          </p>
        </div>
      </div>
    </div>
  );
}
